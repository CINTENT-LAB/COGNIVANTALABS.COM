import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { TeamCard } from "@/components/site/TeamCard";
import { publishedTeam } from "@/data/team";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Indigenous Indian Cognitive AI platform. CINTENT™ MVP complete, platform-first architecture, multi-domain ecosystem, strong IP strategy, global vision.",
      },
      { property: "og:title", content: "About Cognivanta Labs" },
      { property: "og:description", content: "Human + AI. India-built for the world." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const points = [
  "Indigenous Indian Cognitive AI platform",
  "CINTENT™ MVP complete",
  "Platform-first architecture",
  "Multi-domain ecosystem",
  "Strong IP strategy",
  "Global vision, India-built",
];

const leadership = publishedTeam.filter((m) => m.group === "leadership");
const advisors = publishedTeam.filter((m) => m.group === "advisor");

const roadmap = [
  {
    year: "2026",
    title: "AI Accelerators",
    desc: "Optimized inference stacks for edge and cloud.",
  },
  {
    year: "2027",
    title: "Custom AI Chips",
    desc: "Purpose-built silicon for cognitive workloads.",
  },
  { year: "2028", title: "Edge AI", desc: "On-device cognition at scale." },
  {
    year: "2030",
    title: "Quantum Integration",
    desc: "Hybrid classical–quantum reasoning primitives.",
  },
];

function AboutPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)]" />
        <div className="aurora-blob right-[10%] top-[10%] h-72 w-72 bg-[var(--gold)]" />
        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-10 md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker">About · Why us</div>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              Human + AI. <span className="text-gradient-aurora">India-built for the world.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Cognivanta Labs is a deep-tech company building a governed cognitive core and a
              multi-domain ecosystem on top of it — backed by a leadership team of deep-tech
              operators and research advisors. Full credentials are below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <Reveal key={p} delay={i * 50}>
              <div className="glass rounded-xl p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-electric-soft" />
                <span className="text-sm">{p}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">The Core Team</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Human + AI, built by a team who's done this before.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The people bringing CINTENT™ to life — from deep-tech founders to enterprise delivery
            leaders and engineers who've shipped platforms at global scale.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((m, i) => (
            <Reveal key={m.id} delay={i * 40}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">Advisory Board</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            World-class advisors, deep-tech pedigree.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advisors.map((m, i) => (
            <Reveal key={m.id} delay={i * 40}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">Roadmap</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">2026 → 2030</h2>
          <Link
            to="/roadmap"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-electric-soft hover:underline"
          >
            See the full roadmap →
          </Link>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((r, i) => (
            <Reveal key={r.year} delay={i * 60}>
              <div className="glass rounded-2xl p-6 flex gap-5">
                <div className="font-display text-3xl font-black text-gradient-gold shrink-0">
                  {r.year}
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{r.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{r.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
