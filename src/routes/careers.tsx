import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Send, AlertCircle, CheckCircle2, Loader2, Mail } from "lucide-react";
import { useLeadForm } from "@/lib/useLeadForm";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Join the team building CINTENT, an indigenous Indian cognitive AI platform. No open roles listed today — register your interest and we'll reach out when there's a fit.",
      },
      { property: "og:title", content: "Careers at Cognivanta Labs" },
      {
        property: "og:description",
        content: "Human + AI. India-built for the world.",
      },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

// CR-9 — deliberately a holding page, not a full careers portal. Per
// docs/CLAIMS_REGISTER.md and -CR-SCOPE.md's CR-9 note: a specific tech-stack
// callout and a live ATS (Lever/Greenhouse) feed both need real inputs from
// Ron that don't exist in this repo yet. Rather than invent a stack or fake
// job listings, this page states honestly that there are no public openings
// today and offers a real, CR-0-backed way to register interest.
const areas = [
  "Cognitive AI / ML research",
  "Platform & backend engineering",
  "Robotics & embodied autonomy",
  "Product & design",
  "Go-to-market & partnerships",
  "Something else",
];

function CareersPage() {
  const { status, error, ticketId, routed, submit } = useLeadForm("careers");
  const [area, setArea] = useState(areas[0]);
  const [consent, setConsent] = useState(false);
  const submitting = status === "submitting";
  const showForm = status !== "success" && status !== "duplicate";

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--gold)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--electric)]" />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-10 md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker">Careers</div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Human + AI, built by people who care how it's <span className="text-gradient-aurora">built</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Cognivanta Labs is building CINTENT, an indigenous Indian cognitive AI platform,
              India-built for a global market. We're a small, early-stage team — there's no public
              job board today, but we're always glad to hear from people who want to build this
              with us.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-5 py-10 md:px-8">
        <Reveal>
          <div className="glass rounded-2xl p-6 md:p-8">
            <div className="kicker">Open roles, honestly</div>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              We don't have specific open roles publicly listed right now. Rather than post
              placeholder job descriptions, this page is a way to register interest — tell us what
              you do, and we'll reach out if and when there's a real fit. If a live careers portal
              goes up later, this is where it'll appear.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-5xl px-5 py-10 md:px-8">
        <Reveal>
          {showForm ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                void submit({
                  name: String(data.get("name") ?? ""),
                  email: String(data.get("email") ?? ""),
                  interest: area,
                  message: String(data.get("message") ?? ""),
                  consent,
                  honeypot: String(data.get("company_website") ?? ""),
                });
              }}
              className="glass space-y-5 rounded-2xl p-6 md:p-8"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name">
                  <input name="name" required className="input" placeholder="Your full name" />
                </Field>
                <Field label="Email">
                  <input
                    name="email"
                    required
                    type="email"
                    className="input"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field label="Area you're interested in">
                <select className="input" value={area} onChange={(e) => setArea(e.target.value)}>
                  {areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Tell us about yourself (background, portfolio/LinkedIn link, what you'd want to work on)">
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="input resize-none"
                  placeholder="A short intro and a link to your work is more useful than a formal resume."
                />
              </Field>

              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input name="company_website" tabIndex={-1} autoComplete="off" className="input" />
                </label>
              </div>

              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5"
                />
                <span>I agree to be contacted about future roles at Cognivanta Labs.</span>
              </label>

              {status === "error" && error && (
                <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    Sending <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Register interest <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="glass flex flex-col items-start gap-3 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 text-electric-soft">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-display text-lg font-semibold">
                  {status === "duplicate" ? "Already on file" : "Thanks for your interest"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {status === "duplicate"
                  ? "Looks like you already registered — we have it on file."
                  : routed
                    ? "We've received this and it's been routed to the team."
                    : "This has been recorded. Our lead-routing integration is still being connected, so if it's time-sensitive, email hello@cognivanta.com directly."}
              </p>
              {ticketId && ticketId !== "n/a" && (
                <p className="font-mono text-xs text-muted-foreground/70">Reference: {ticketId}</p>
              )}
            </div>
          )}
        </Reveal>

        <Reveal delay={100}>
          <div className="glass mt-6 flex items-center gap-3 rounded-2xl p-6">
            <Mail className="h-4 w-4 shrink-0 text-electric-soft" />
            <span className="text-sm text-muted-foreground">
              Prefer email? Reach us directly at hello@cognivanta.com.
            </span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="kicker mb-2 block">{label}</span>
      {children}
    </label>
  );
}
