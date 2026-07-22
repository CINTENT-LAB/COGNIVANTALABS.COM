import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Users, Building2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CognitiveLoopDiagram } from "@/components/site/CognitiveLoopDiagram";

// Standalone page adapted from Ron's Emergent-built "Enterprise AI Hero"
// prototype (https://enterprise-ai-hero.preview.emergentagent.com/). Content
// and structure ported 1:1 from that prototype; visuals re-skinned to
// cognivanta-rising's existing dark theme (glass cards, aurora gradients)
// instead of the prototype's light/white theme, per Ron's direction.

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "Enterprise AI — From Responses to Real-World Decisions | Cognivanta Labs" },
      {
        name: "description",
        content:
          "CINTENT™ turns text, voice, documents, data and sensor signals into governed, structured decisions — ready for human approval or real-world execution.",
      },
      { property: "og:title", content: "From Responses to Real-World Decisions — CINTENT™" },
      {
        property: "og:description",
        content:
          "A cognitive loop that goes Ask → Decide → Act, with governance and human oversight built in.",
      },
    ],
    links: [{ rel: "canonical", href: "/enterprise" }],
  }),
  component: EnterprisePage,
});

const trustBadges = [
  { icon: ShieldCheck, label: "Governance-first" },
  { icon: Users, label: "Human-in-the-loop" },
  { icon: Building2, label: "Enterprise-ready" },
];

const loopSteps = [
  {
    tag: "ASK",
    title: "Every signal becomes an input.",
    desc: "Text, voice, documents, data feeds, sensors, vision and existing workflows all flow in alongside context: intent, situational context, objective, history, environment and the user themselves.",
  },
  {
    tag: "DECIDE",
    title: "The CINTENT™ core reasons over it.",
    desc: "Intent, context and memory are weighed against constraints and governance policy to produce one thing: a decision — not another paragraph of prose.",
  },
  {
    tag: "ACT",
    title: "A structured, governed output.",
    desc: 'Illustrative example: "Approve · Path A", low risk, constraints evaluated, routed for human approval — then executed into workflows across healthcare, finance, autonomy, robotics and infrastructure, with outcomes learned back into the loop.',
  },
];

function EnterprisePage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[8%] top-[12%] h-72 w-72 bg-[var(--electric)]" />
        <div className="aurora-blob right-[10%] top-[24%] h-64 w-64 bg-[var(--violet)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-electric" />
              CINTENT™ · Cognitive AI Platform
            </span>
            <h1 className="relative mt-6 inline-block font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              From Responses to Real-World Decisions.
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-electric-soft/50"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 8 Q 50 0, 100 7 T 200 6 T 300 7 T 400 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
            <p className="mt-8 max-w-xl text-muted-foreground md:text-lg">
              Cognivanta Labs builds cognitive AI systems that understand intent, maintain context,
              evaluate constraints and produce{" "}
              <strong className="font-semibold text-foreground">
                governed, structured decisions
              </strong>{" "}
              ready for human approval or real-world execution.
            </p>

            <div className="mt-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em]">
              <span>Ask</span>
              <ArrowRight className="h-3.5 w-3.5" />
              <span>Decide</span>
              <ArrowRight className="h-3.5 w-3.5" />
              <span className="text-electric-soft">Act</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn-electric inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                Ask for Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium"
              >
                Ask for Early Access
              </Link>
              <a
                href="https://cognivantalabs.com/askcogni/index.html"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--gradient-violet)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-glow-violet)] transition-transform hover:scale-[1.02]"
              >
                Ask COGNI
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {trustBadges.map((b) => (
                <span key={b.label} className="badge-security">
                  <b.icon className="h-3.5 w-3.5" /> {b.label}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-6">
            <CognitiveLoopDiagram />
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="kicker">How the loop works</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            Ask, decide, act — then learn.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {loopSteps.map((s, i) => (
            <Reveal key={s.tag} delay={i * 80}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-electric-soft">
                  {s.tag}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 text-center md:p-14">
            <div className="aurora-blob left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-[var(--electric)]" />
            <div className="relative">
              <div className="kicker">Ready to move beyond prompts?</div>
              <h2 className="mt-4 font-display text-2xl font-bold sm:text-4xl">
                See CINTENT™ turn your signals into governed decisions.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/contact"
                  className="btn-electric rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Ask for a demo
                </Link>
                <Link
                  to="/platform"
                  className="btn-ghost-glow rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Explore the platform
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
