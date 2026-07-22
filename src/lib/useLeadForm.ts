import { useState } from "react";
import { submitLead, type LeadFormType, type LeadSubmission } from "@/server/leadCapture";

export type LeadFormStatus = "idle" | "submitting" | "success" | "duplicate" | "error";

export interface UseLeadFormResult {
  status: LeadFormStatus;
  error: string | null;
  ticketId: string | null;
  routed: boolean;
  submit: (payload: Omit<LeadSubmission, "formType" | "sourcePath">) => Promise<void>;
  reset: () => void;
}

/**
 * Shared client-side state machine for every CR-0-backed form (contact, demo,
 * investor, press, partner, customer, API access, newsletter, pilot). Keeps
 * every form honest about failure/duplicate/pending-routing states instead of
 * flipping to a fake "sent" label on submit.
 */
export function useLeadForm(formType: LeadFormType): UseLeadFormResult {
  const [status, setStatus] = useState<LeadFormStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [routed, setRouted] = useState(false);

  async function submit(payload: Omit<LeadSubmission, "formType" | "sourcePath">) {
    setStatus("submitting");
    setError(null);
    try {
      const result = await submitLead({
        data: {
          ...payload,
          formType,
          sourcePath: typeof window !== "undefined" ? window.location.pathname : undefined,
        },
      });
      if (!result.ok) {
        setStatus("error");
        setError(result.error ?? "Something went wrong. Please try again.");
        return;
      }
      setTicketId(result.ticketId ?? null);
      setRouted(Boolean(result.routed));
      setStatus(result.duplicate ? "duplicate" : "success");
    } catch (err) {
      console.error("[useLeadForm] submission failed", err);
      setStatus("error");
      setError("We couldn't reach the server. Check your connection and try again.");
    }
  }

  function reset() {
    setStatus("idle");
    setError(null);
    setTicketId(null);
    setRouted(false);
  }

  return { status, error, ticketId, routed, submit, reset };
}
