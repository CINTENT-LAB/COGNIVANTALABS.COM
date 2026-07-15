import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Send, Mail, MapPin } from "lucide-react";

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
  const [sent, setSent] = useState(false);
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
              Get API access, propose a pilot, or post your use case. We'll route it to the right
              team within 48 hours.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="glass rounded-2xl p-6 md:p-8 space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Name">
                  <input required className="input" placeholder="Your full name" />
                </Field>
                <Field label="Email">
                  <input required type="email" className="input" placeholder="you@company.com" />
                </Field>
              </div>
              <Field label="Organization">
                <input className="input" placeholder="Company / lab / institution" />
              </Field>
              <Field label="I'm interested in">
                <select className="input" defaultValue="api">
                  <option value="api">Get API access</option>
                  <option value="pilot">Propose a pilot</option>
                  <option value="usecase">Post a use case</option>
                  <option value="partner">Partner with us</option>
                  <option value="invest">Invest in us</option>
                </select>
              </Field>
              <Field label="Tell us more">
                <textarea
                  required
                  rows={5}
                  className="input resize-none"
                  placeholder="Describe your use case, domain, and constraints."
                />
              </Field>
              <button
                type="submit"
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                {sent ? (
                  "Sent — we'll be in touch"
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
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
                <div className="kicker">Fastest paths</div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>· API sandbox → same day</li>
                  <li>· Pilot scoping → within 5 business days</li>
                  <li>· Partnership intro → within 2 weeks</li>
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
