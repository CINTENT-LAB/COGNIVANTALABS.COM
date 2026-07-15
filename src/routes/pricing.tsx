import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ArrowRight, ShieldCheck, Lock, Info } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Plans for building on CINTENT™ — from a free sandbox to governed enterprise deployment.",
      },
      { property: "og:title", content: "Pricing — Cognivanta Labs" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

interface Plan {
  id: string;
  name: string;
  monthly: number | null;
  annual: number | null;
  audience: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}

const plans: Plan[] = [
  {
    id: "sandbox",
    name: "Sandbox",
    monthly: 0,
    annual: 0,
    audience: "Explore the platform, no card required",
    features: [
      "60 requests/min",
      "Sandbox API keys",
      "Community support",
      "Access to Ask COGNI playground",
    ],
    cta: "Start free",
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 12999,
    annual: 129999,
    audience: "Teams shipping production features",
    features: [
      "600 requests/min",
      "Production + sandbox keys",
      "Usage analytics dashboard",
      "Priority email support",
      "Webhooks & event streams",
    ],
    highlight: true,
    cta: "Start free trial",
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 34999,
    annual: 349999,
    audience: "High-volume, multi-team deployments",
    features: [
      "Custom rate limits",
      "SLA-backed uptime",
      "Dedicated Slack/Teams channel",
      "Advanced audit & compliance exports",
      "Multi-environment key governance",
    ],
    cta: "Talk to sales",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    annual: null,
    audience: "On-prem, custom models, white-label",
    features: [
      "On-premise or private cloud",
      "Custom model fine-tuning",
      "White-label options",
      "Dedicated implementation team",
      "Custom integrations",
    ],
    cta: "Contact us",
  },
];

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState<Plan | null>(null);

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--gold)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--electric)]" />
        <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-10 text-center md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker justify-center">Pricing</div>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
              Plans built for every stage of{" "}
              <span className="text-gradient-aurora">building on CINTENT™</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Start free in the sandbox. Move to production when you're ready — every plan runs on
              the same governed, audited API surface.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mx-auto mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => setAnnual(false)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${!annual ? "bg-[var(--gradient-electric)] text-primary-foreground" : "text-muted-foreground"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${annual ? "bg-[var(--gradient-electric)] text-primary-foreground" : "text-muted-foreground"}`}
              >
                Annual <span className="text-electric-soft">· save ~17%</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p, i) => {
            const price = annual ? p.annual : p.monthly;
            return (
              <Reveal key={p.id} delay={i * 60}>
                <div
                  className={`card-premium flex h-full flex-col rounded-2xl p-6 ${p.highlight ? "border-electric/40" : ""}`}
                >
                  {p.highlight && <div className="kicker text-electric-soft">Most Popular</div>}
                  <h3 className="mt-1 font-display text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.audience}</p>
                  <div className="mt-4">
                    {price === null ? (
                      <div className="font-display text-2xl font-black">Custom</div>
                    ) : price === 0 ? (
                      <div className="font-display text-2xl font-black">Free</div>
                    ) : (
                      <div>
                        <span className="font-display text-2xl font-black">{formatINR(price)}</span>
                        <span className="text-xs text-muted-foreground">
                          /{annual ? "yr" : "mo"} + GST
                        </span>
                      </div>
                    )}
                  </div>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-soft" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {p.id === "enterprise" || p.id === "scale" ? (
                    <Link
                      to="/contact"
                      className="btn-ghost-glow mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setSelected(p)}
                      className="btn-electric mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={260}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="badge-security">
              <ShieldCheck className="h-3.5 w-3.5" /> PCI-minded checkout flow
            </span>
            <span className="badge-security">
              <Lock className="h-3.5 w-3.5" /> Keys scoped per environment
            </span>
          </div>
        </Reveal>
      </section>

      {selected && (
        <CheckoutPanel plan={selected} annual={annual} onClose={() => setSelected(null)} />
      )}

      <section className="relative mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
        <Reveal>
          <div className="glass rounded-3xl p-10">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Not sure which plan fits?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Talk to us about your call volume, deployment model, and compliance requirements —
              we'll help you pick the right starting point.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/developers"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                See the API platform
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/**
 * Checkout UI shell — collects billing + card details in the browser only.
 * There is NO live payment gateway wired up here: submitting shows an inline
 * notice instead of charging anything. Connecting a real processor (Razorpay,
 * Stripe, etc.) requires Ron's own merchant account and API keys, entered on
 * that provider's own dashboard/server-side — not something to fake here.
 */
function CheckoutPanel({
  plan,
  annual,
  onClose,
}: {
  plan: Plan;
  annual: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const price = annual ? plan.annual : plan.monthly;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-md rounded-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="kicker">Checkout</div>
            <h3 className="mt-1 font-display text-lg font-bold">{plan.name} plan</h3>
          </div>
          <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
            Close
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
          <span className="text-muted-foreground">Billed {annual ? "annually" : "monthly"}</span>
          <span className="font-display font-bold">
            {price === 0 ? "Free" : price ? `${formatINR(price)} + GST` : "Custom"}
          </span>
        </div>

        {submitted ? (
          <div className="mt-5 rounded-xl border border-electric/30 bg-[color-mix(in_oklab,var(--electric)_10%,transparent)] p-4 text-sm">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric-soft" />
              <p className="text-muted-foreground">
                This is a UI preview — no payment has been charged. A live gateway (Razorpay,
                Stripe, etc.) needs to be connected with your own merchant account before this
                button can process a real payment.
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn-ghost-glow mt-4 w-full rounded-md px-4 py-2.5 text-sm font-semibold"
            >
              Got it
            </button>
          </div>
        ) : (
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input required placeholder="Full name" className="input" />
            <input required type="email" placeholder="Work email" className="input" />
            <input placeholder="Company (optional)" className="input" />
            <div className="grid grid-cols-2 gap-3">
              <input required placeholder="Card number" inputMode="numeric" className="input" />
              <input required placeholder="MM/YY" inputMode="numeric" className="input" />
            </div>
            <button
              type="submit"
              className="btn-electric mt-1 w-full rounded-md px-4 py-3 text-sm font-semibold"
            >
              {price === 0 ? "Start free" : "Confirm & pay"}
            </button>
            <p className="text-center text-[11px] text-muted-foreground">
              Preview checkout only — no card data leaves your browser.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
