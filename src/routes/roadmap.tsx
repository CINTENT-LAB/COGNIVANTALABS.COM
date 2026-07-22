import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CircleDot } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Cognivanta Labs' technology roadmap: where CINTENT and its pilots stand today, and the direction the platform is heading through 2030.",
      },
      { property: "og:title", content: "Roadmap — Cognivanta Labs" },
      {
        property: "og:description",
        content: "Where CINTENT is today, and where it's headed.",
      },
    ],
    links: [{ rel: "canonical", href: "/roadmap" }],
  }),
  component: RoadmapPage,
});

// Same milestones already published on /about — promoted to a dedicated page
// per CR-8. No new dates, certifications, or commitments introduced here;
// see docs/CLAIMS_REGISTER.md for the governance note on why no quarter-level
// or certification-specific milestones (e.g. "FDA/ISO certification by Q3")
// are published without a real, confirmed target date from Ron.
const milestones = [
  {
    year: "2026",
    title: "AI Accelerators",
    desc: "Optimized inference stacks for edge and cloud.",
    status: "In progress",
  },
  {
    year: "2027",
    title: "Custom AI Chips",
    desc: "Purpose-built silicon for cognitive workloads.",
    status: "Planned",
  },
  {
    year: "2028",
    title: "Edge AI",
    desc: "On-device cognition at scale.",
    status: "Planned",
  },
  {
    year: "2030",
    title: "Quantum Integration",
    desc: "Hybrid classical–quantum reasoning primitives.",
    status: "Directional",
  },
];

const today = [
  {
    title: "CINTENT™ core platform",
    desc: "API-first cognitive operating system — intent, context, memory, reasoning, orchestration, and governance in active development, powering internal pilots today.",
  },
  {
    title: "Deployment-stage pilots",
    desc: "CHAXU (aerial autonomy), Cognitive Cobots (robotics), and AWCS (assistive mobility) are the most mature pilots running today — see /applications for the in-depth profiles.",
  },
  {
    title: "Research-stage pilots",
    desc: "NyayNetra, IKSHANA, and other domain pilots remain in research/early pilot stage — see /pilots for real, current maturity status per product.",
  },
];

function RoadmapPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--gold)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--electric)]" />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-10 md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker">Roadmap</div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Where CINTENT is today, and where it's <span className="text-gradient-aurora">headed</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Directional milestones toward 2030 — not investor commitments to specific dates or
              certifications we haven't confirmed. Real pilot status lives on /pilots and
              /applications; this page is about platform direction.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-10 md:px-8">
        <Reveal>
          <div className="kicker">Right now</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Current state of the platform.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {today.map((t, i) => (
            <Reveal key={t.title} delay={i * 60}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <h3 className="font-display text-base font-bold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">2026 → 2030</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Platform direction, year by year.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            These are directional priorities, not dated commitments — timelines will shift as real
            pilot data and market feedback come in.
          </p>
        </Reveal>

        <div className="mt-8 space-y-4">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 70}>
              <div className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
                <div className="font-display text-3xl font-black text-gradient-gold shrink-0 sm:w-24">
                  {m.year}
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg font-semibold">{m.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{m.desc}</div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:self-center">
                  <CircleDot className="h-3 w-3 text-electric-soft" />
                  {m.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-14">
            <div className="aurora-blob right-0 top-0 h-64 w-64 bg-[var(--electric)]" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="kicker">Want to be part of it?</div>
                <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  See active pilots, or talk to the team about what's next.
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/pilots"
                  className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
                >
                  View pilots
                </Link>
                <Link
                  to="/contact"
                  className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Talk to us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
