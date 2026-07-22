import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Send, Mail, MapPin, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useLeadForm } from "@/lib/useLeadForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Get API access, propose a pilot, or post your use case for CINTENT™ and the Cognivanta ecosystem.",
      },
      { property: "og:title", content: "Contact Cognivanta Labs" },
      { property: "og:description", content: "Get API access. Propose a pilot. Post a use case." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { status, error, ticketId, routed, submit } = useLeadForm("contact");
  const [interest, setInterest] = useState("api");
  const [consent, setConsent] = useState(false);
  const submitting = status === "submitting";
  const showForm = status !== "success" && status !== "duplicate";

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)]" />
        <div className="aurora-blob right-[10%] top-[10%] h-72 w-72 bg-[var(--violet)]" />
        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-10 md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker">Get Started</div>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Build on <span className="text-gradient-aurora">CINTENT™</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Get API access, propose a pilot, or post your use case — it's routed to the right
              team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
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
                    organization: String(data.get("organization") ?? ""),
                    interest,
                    message: String(data.get("message") ?? ""),
                    consent,
                    honeypot: String(data.get("company_website") ?? ""),
                  });
                }}
                className="glass rounded-2xl p-6 md:p-8 space-y-5"
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
                      placeholder="you@company.com"
                    />
                  </Field>
                </div>
                <Field label="Organization">
                  <input
                    name="organization"
                    className="input"
                    placeholder="Company / lab / institution"
                  />
                </Field>
                <Field label="I'm interested in">
                  <select
                    className="input"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                  >
                    <option value="api">Get API access</option>
                    <option value="pilot">Propose a pilot</option>
                    <option value="usecase">Post a use case</option>
                    <option value="partner">Partner with us</option>
                    <option value="invest">Invest in us</option>
                  </select>
                </Field>
                <Field label="Tell us more">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="input resize-none"
                    placeholder="Describe your use case, domain, and constraints."
                  />
                </Field>

                {/* Honeypot: hidden from real visitors via CSS, left blank by
                    humans. Any bot that fills every field trips this. */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="input"
                    />
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
                  <span>I agree to be contacted about this request.</span>
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
                      Send message <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="glass flex flex-col items-start gap-3 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2 text-electric-soft">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-display text-lg font-semibold">
                    {status === "duplicate" ? "Already received" : "Message received"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {status === "duplicate"
                    ? "It looks like you already sent this — we have it on file."
                    : routed
                      ? "Your message has been routed to the team."
                      : "Your message has been recorded. Our lead-routing integration is still being connected, so if you don't hear back and it's urgent, email hello@cognivanta.com directly."}
                </p>
                {ticketId && ticketId !== "n/a" && (
                  <p className="font-mono text-xs text-muted-foreground/70">
                    Reference: {ticketId}
                  </p>
                )}
              </div>
            )}
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <div className="kicker">Direct</div>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-electric-soft" /> hello@cognivanta.com
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-electric-soft" /> India · Global
                  </div>
                </div>
              </div>
              <div className="glass rounded-2xl p-6">
                <div className="kicker">What happens next</div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>· Your request is recorded with a reference ID.</li>
                  <li>· It's routed based on what you selected above.</li>
                  <li>· For anything urgent, email hello@cognivanta.com directly.</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
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
