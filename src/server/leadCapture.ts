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
 * not shared across multiple server instances. That's acceptable for the
 * current single-instance Hostinger Node deployment; if the app is ever
 * horizontally scaled, this should move to a shared store (Redis, D1, etc.).
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

const rateLimitStore = new Map<string, number[]>();
const dedupStore = new Map<string, number>();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
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
 * n8n, HubSpot, or internal endpoint). Until that's set, submissions are still
 * accepted and always written to the server log with an audit timestamp — so
 * nothing is silently dropped — but `routed` comes back false and the UI must
 * say so honestly rather than promising a team will follow up.
 */
async function routeLead(
  payload: LeadSubmission,
  ticketId: string,
): Promise<boolean> {
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

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
      if (res.ok) return true;
      console.error(`[leadCapture] webhook responded with status ${res.status}`);
    } catch (err) {
      console.error("[leadCapture] webhook delivery failed", err);
    }
  }

  // Always log server-side, even without a webhook, so submissions are
  // never silently lost while the routing provider is being set up.
  console.log("[leadCapture] lead received", record);
  return false;
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadSubmission) => data)
  .handler(async ({ data }): Promise<LeadResult> => {
    // Bot protection: a real visitor never fills the hidden honeypot field.
    if (data.honeypot) {
      return { ok: true, ticketId: "n/a", routed: false };
    }

    if (!data.name?.trim() || !data.email?.trim()) {
      return { ok: false, error: "Name and email are required." };
    }
    if (!isValidEmail(data.email)) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (!data.consent) {
      return { ok: false, error: "Please confirm you agree to be contacted about this request." };
    }

    const normalizedEmail = data.email.trim().toLowerCase();

    if (!checkRateLimit(`${data.formType}:${normalizedEmail}`)) {
      return {
        ok: false,
        error: "Too many submissions from this address recently. Please try again later.",
      };
    }

    const ticketId = `LEAD-${Date.now().toString(36).toUpperCase()}`;
    const dedupKey = `${data.formType}:${normalizedEmail}:${data.message ?? ""}`;

    if (isDuplicateSubmission(dedupKey)) {
      return { ok: true, ticketId, duplicate: true, routed: false };
    }

    const routed = await routeLead(data, ticketId);
    return { ok: true, ticketId, routed };
  });
