import { createServerFn } from "@tanstack/react-start";

/**
 * CR-0 — Shared lead capture and form backend.
 *
 * Every public form on this site (contact, demo, investor, press, research,
 * partner, customer, API access, newsletter, pilot) routes through this one
 * server function. It is the single place that validates, rate-limits,
 * de-duplicates, and (when configured) forwards a submission — so no form on
 * the site is allowed to fake a "sent" success purely on the client.
 *
 * Known limitation (documented, not hidden): rate-limit and de-dup state is
 * kept in-memory in this server process. It resets on redeploy/restart and is
 * not shared across multiple server instances. A static Hostinger artifact
 * does not include this server runtime; an approved server deployment is
 * required before public forms can be routed.
 */

export type LeadFormType =
  | "contact"
  | "demo"
  | "investor"
  | "press"
  | "research"
  | "partner"
  | "customer"
  | "api-access"
  | "newsletter"
  | "pilot"
  | "careers";

export interface LeadSubmission {
  formType: LeadFormType;
  name: string;
  email: string;
  organization?: string;
  interest?: string;
  message?: string;
  consent: boolean;
  /** Hidden field. Must stay empty for real users; bots tend to fill it. */
  honeypot?: string;
  sourcePath?: string;
}

export interface LeadResult {
  ok: boolean;
  ticketId?: string;
  duplicate?: boolean;
  /** True only if the submission was actually forwarded to a configured
   *  webhook/CRM. False means it was accepted and logged server-side but is
   *  pending a routing provider — callers must not claim it reached a human. */
  routed?: boolean;
  error?: string;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const DEDUP_WINDOW_MS = 5 * 60 * 1000;
const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 320,
  organization: 200,
  interest: 160,
  message: 4000,
  honeypot: 200,
  sourcePath: 200,
} as const;
const ALLOWED_FORM_TYPES = new Set<LeadFormType>([
  "contact",
  "demo",
  "investor",
  "press",
  "research",
  "partner",
  "customer",
  "api-access",
  "newsletter",
  "pilot",
  "careers",
]);
const ALLOWED_FIELDS = new Set([
  "formType",
  "name",
  "email",
  "organization",
  "interest",
  "message",
  "consent",
  "honeypot",
  "sourcePath",
]);

const rateLimitStore = new Map<string, number[]>();
const dedupStore = new Map<string, number>();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function boundedText(value: unknown, maxLength: number, required = false): string | undefined {
  if (value === undefined && !required) return undefined;
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  if (required && !normalized) return undefined;
  if (normalized.length > maxLength) return undefined;
  return normalized || undefined;
}

function validateSubmission(input: unknown): { data?: LeadSubmission; error?: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "Invalid form submission." };
  }

  const record = input as Record<string, unknown>;
  if (Object.keys(record).some((key) => !ALLOWED_FIELDS.has(key))) {
    return { error: "Invalid form submission." };
  }

  const formType = record.formType;
  if (typeof formType !== "string" || !ALLOWED_FORM_TYPES.has(formType as LeadFormType)) {
    return { error: "Invalid form submission." };
  }

  const name = boundedText(record.name, MAX_FIELD_LENGTHS.name, true);
  const email = boundedText(record.email, MAX_FIELD_LENGTHS.email, true);
  if (!name || !email) return { error: "Name and email are required." };
  if (!isValidEmail(email)) return { error: "Enter a valid email address." };
  if (record.consent !== true) {
    return { error: "Please confirm you agree to be contacted about this request." };
  }

  const organization = boundedText(record.organization, MAX_FIELD_LENGTHS.organization);
  const interest = boundedText(record.interest, MAX_FIELD_LENGTHS.interest);
  const message = boundedText(record.message, MAX_FIELD_LENGTHS.message);
  const honeypot = boundedText(record.honeypot, MAX_FIELD_LENGTHS.honeypot);
  const sourcePath = boundedText(record.sourcePath, MAX_FIELD_LENGTHS.sourcePath);

  const optionalValues: Array<[unknown, number]> = [
    [record.organization, MAX_FIELD_LENGTHS.organization],
    [record.interest, MAX_FIELD_LENGTHS.interest],
    [record.message, MAX_FIELD_LENGTHS.message],
    [record.honeypot, MAX_FIELD_LENGTHS.honeypot],
    [record.sourcePath, MAX_FIELD_LENGTHS.sourcePath],
  ];
  if (
    optionalValues.some(
      ([value, maxLength]) => value !== undefined && !boundedText(value, maxLength) && value !== "",
    )
  ) {
    return { error: "Invalid form submission." };
  }
  if (sourcePath && !sourcePath.startsWith("/")) return { error: "Invalid form submission." };

  return {
    data: {
      formType: formType as LeadFormType,
      name,
      email,
      ...(organization ? { organization } : {}),
      ...(interest ? { interest } : {}),
      ...(message ? { message } : {}),
      consent: true,
      ...(honeypot ? { honeypot } : {}),
      ...(sourcePath ? { sourcePath } : {}),
    },
  };
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(key, timestamps);
    return false;
  }
  timestamps.push(now);
  rateLimitStore.set(key, timestamps);
  return true;
}

function isDuplicateSubmission(key: string): boolean {
  const now = Date.now();
  const last = dedupStore.get(key);
  if (last && now - last < DEDUP_WINDOW_MS) return true;
  dedupStore.set(key, now);
  return false;
}

/**
 * Forwards a validated lead to whatever routing provider is configured.
 *
 * Set LEAD_WEBHOOK_URL on the server (Hostinger environment variables, never
 * committed to the repo) to point at a real inbox/CRM webhook (e.g. a Zapier,
 * n8n, HubSpot, or internal endpoint). Until that's set, submissions are
 * accepted only in the server runtime and operational metadata is logged
 * without personal data; `routed` comes back false and the UI must say so
 * honestly rather than promising a team will follow up.
 */
async function routeLead(payload: LeadSubmission, ticketId: string): Promise<boolean> {
  const record = {
    ticketId,
    receivedAt: new Date().toISOString(),
    formType: payload.formType,
    name: payload.name,
    email: payload.email,
    organization: payload.organization,
    interest: payload.interest,
    message: payload.message,
    consent: payload.consent,
    sourcePath: payload.sourcePath,
  };

  const configuredWebhook = process.env.LEAD_WEBHOOK_URL?.trim();
  let webhookUrl: URL | undefined;
  if (configuredWebhook) {
    try {
      const parsed = new URL(configuredWebhook);
      if (parsed.protocol === "https:") webhookUrl = parsed;
    } catch {
      webhookUrl = undefined;
    }
  }

  if (configuredWebhook && !webhookUrl) {
    console.error("[leadCapture] webhook rejected: HTTPS URL required");
  }

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
        signal: AbortSignal.timeout(8_000),
      });
      if (res.ok) {
        console.info("[leadCapture] webhook delivered", { ticketId, formType: payload.formType });
        return true;
      }
      console.error("[leadCapture] webhook rejected submission", {
        ticketId,
        formType: payload.formType,
        status: res.status,
      });
    } catch {
      console.error("[leadCapture] webhook delivery failed", {
        ticketId,
        formType: payload.formType,
      });
    }
  }

  // Record only operational metadata. Never place names, emails, messages or
  // the webhook payload in application logs.
  console.info("[leadCapture] lead accepted without routing", {
    ticketId,
    formType: payload.formType,
  });
  return false;
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(async ({ data }): Promise<LeadResult> => {
    const validated = validateSubmission(data);
    if (!validated.data) return { ok: false, error: validated.error };

    const submission = validated.data;
    // Bot protection: a real visitor never fills the hidden honeypot field.
    if (submission.honeypot) {
      return { ok: true, ticketId: "n/a", routed: false };
    }

    const normalizedEmail = submission.email.toLowerCase();

    if (!checkRateLimit(`${submission.formType}:${normalizedEmail}`)) {
      return {
        ok: false,
        error: "Too many submissions from this address recently. Please try again later.",
      };
    }

    const ticketId = `LEAD-${Date.now().toString(36).toUpperCase()}`;
    const dedupKey = `${submission.formType}:${normalizedEmail}:${submission.message ?? ""}`;

    if (isDuplicateSubmission(dedupKey)) {
      return { ok: true, ticketId, duplicate: true, routed: false };
    }

    const routed = await routeLead(submission, ticketId);
    return { ok: true, ticketId, routed };
  });
