import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  MessageSquareCode,
  Workflow,
  FlaskConical,
  Share2,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { products, type Product } from "@/data/products";
import { getLucideIcon } from "@/lib/lucideIcon";

const ASKCOGNI_URL = "https://cognivantalabs.com/askcogni/index.html";

const apiPlatformFeatures = [
  {
    icon: MessageSquareCode,
    accent: "electric" as const,
    title: "Playground",
    desc: "Run real scenarios against CINTENT before writing a line of integration code — see intent recognition, context and the final decision unfold live.",
  },
  {
    icon: Workflow,
    accent: "violet" as const,
    title: "Orchestration",
    desc: "Sequence multi-step workflows across agents, devices and services, with safety policies and constraints enforced at every step.",
  },
  {
    icon: FlaskConical,
    accent: "gold" as const,
    title: "Simulation",
    desc: "Dry-run a pilot's reasoning against synthetic and historical scenarios — validate latency, autonomy bounds and edge cases before touching real systems.",
  },
  {
    icon: Share2,
    accent: "electric" as const,
    title: "Memory Graph",
    desc: "Persistent semantic state — actors, relationships, constraints and decision history — so a pilot's reasoning accumulates context instead of resetting on every call.",
  },
];

const accentClasses: Record<"electric" | "violet" | "gold", string> = {
  electric: "bg-[var(--gradient-electric)] shadow-[var(--shadow-glow-electric)]",
  violet: "bg-[var(--gradient-violet)] shadow-[var(--shadow-glow-violet)]",
  gold: "bg-[var(--gradient-gold)] shadow-[var(--shadow-glow-gold)]",
};

const pilotMethodStages = [
  {
    stage: "Stage 1",
    title: "Architecture framing",
    desc: "Identify the cognitive primitives required by the domain and define operational boundaries.",
  },
  {
    stage: "Stage 2",
    title: "Interaction and control design",
    desc: "Map how humans, agents, devices, and safety policies intersect through the platform.",
  },
  {
    stage: "Stage 3",
    title: "Pilot deployment",
    desc: "Validate reasoning quality, latency, autonomy bounds, and auditability in a constrained setting.",
  },
];

export const Route = createFileRoute("/pilots")({
  head: () => ({
    meta: [
      { title: "Pilot Platforms — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Applied programs built on the CINTENT core — research, deployment and enterprise pilots testing the cognitive architecture under real-world constraints.",
      },
      { property: "og:title", content: "Pilot Platforms — Cognivanta Labs" },
    ],
    links: [{ rel: "canonical", href: "/pilots" }],
  }),
  component: PilotsPage,
});

const categories = [
  {
    kicker: "🔬 Research Pilots",
    title: "Early-stage exploration",
    desc: "Novel domains driving architectural innovation through real-world constraints.",
  },
  {
    kicker: "🚀 Deployment Pilots",
    title: "Field-tested systems",
    desc: "Production-ready cognitive infrastructure in autonomous and assistive domains.",
  },
  {
    kicker: "💼 Enterprise Pilots",
    title: "Knowledge & intelligence",
    desc: "Systems bridging organizational decision-making with cognitive reasoning.",
  },
];

// Pilot-specific framing (as presented on the live pilots overview), mapped to
// each product's id in src/data/products.ts. Falls back to the product's own
// tagline/description if a pilot isn't listed here.
//
// CR-4 (evidence-governed solution profiles): `tier` maps each pilot onto the
// three maturity categories already defined below (Research / Deployment /
// Enterprise) so maturity is a visible, structured field rather than buried
// in a label string. "Production Ready" for CHAXU is carried over from
// existing site copy — flagged in docs/CLAIMS_REGISTER.md for confirmation,
// not independently verified here.
const pilotMeta: Record<
  string,
  { label: string; blurb: string; tier: "research" | "deployment" | "enterprise" }
> = {
  shunyai: {
    label: "Sparse intelligence",
    blurb:
      "A pilot for intelligence systems operating in low-data, incomplete, or ambiguous decision environments.",
    tier: "research",
  },
  blisstrail: {
    label: "Digital wellbeing",
    blurb:
      "A reflective intelligence layer for personal insight, adaptive guidance, and longitudinal behavior context.",
    tier: "research",
  },
  nyaynetra: {
    label: "Legal cognition",
    blurb:
      "A legal intelligence system built for evidentiary navigation, procedural reasoning, and contextual case support.",
    tier: "enterprise",
  },
  askcogni: {
    label: "Knowledge systems",
    blurb:
      "A cognitive knowledge interaction system for navigating research, architecture, and platform intelligence.",
    tier: "enterprise",
  },
  cobots: {
    label: "Embodied robotics",
    blurb:
      "Collaborative machines that combine situational awareness, task memory, and adaptive assistance.",
    tier: "deployment",
  },
  awcs: {
    label: "Assistive autonomy",
    blurb:
      "Mobility systems focused on safe navigation, human override, and intelligent context under constrained conditions.",
    tier: "deployment",
  },
  chaxu: {
    label: "Aerial autonomy",
    blurb:
      "Mission-aware drone intelligence for sensing, planning, and autonomous control in dynamic outdoor environments.",
    tier: "deployment",
  },
};

const tierMaturityLabel: Record<"research" | "deployment" | "enterprise", string> = {
  research: "Research pilot",
  deployment: "Deployment pilot",
  enterprise: "Enterprise pilot",
};

const pilotIds = ["shunyai", "blisstrail", "nyaynetra", "askcogni", "cobots", "awcs", "chaxu"];
const pilots = pilotIds
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is Product => Boolean(p));

function pilotTarget(p: Product): { to: string; external: boolean } {
  if (p.href && p.external) return { to: p.href, external: true };
  return { to: p.href ?? `/products/${p.id}`, external: false };
}

function PilotsPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--violet)]" />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-12 text-center md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker justify-center">Pilot Platforms</div>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
              Applied programs built on the <span className="text-gradient-electric">CINTENT™</span>{" "}
              core.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Each pilot extends the same cognitive substrate into a different operational domain,
              testing both software and field-deployment assumptions. Every pilot feeds back into
              the core platform.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-10 md:px-8">
        <Reveal>
          <div className="text-center">
            <div className="kicker justify-center">The API Platform Behind Every Pilot</div>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              One platform, four capabilities, every pilot runs on it.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
              Before a pilot ever touches production, it's built, tested and hardened on the same
              CINTENT™ API platform — the playground, orchestration, simulation and memory graph
              underneath every product on this page.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {apiPlatformFeatures.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="glass h-full rounded-2xl p-6">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl ${accentClasses[f.accent]}`}
                >
                  <f.icon className="h-5 w-5" />
                </span>
                <div className="mt-4 font-display text-base font-bold">{f.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={apiPlatformFeatures.length * 60}>
          <div className="glass relative mt-5 overflow-hidden rounded-2xl p-6 md:p-8">
            <div className="aurora-blob right-0 top-0 h-40 w-40 bg-[var(--electric)]" />
            <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--gradient-electric)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <div className="kicker">Ask COGNI, built in</div>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground md:text-base">
                    A dedicated Ask COGNI assistant sits alongside every pilot team — answering
                    architecture questions and walking through the playground, orchestration,
                    simulation and memory graph as you build, so pilots move from hypothesis to
                    bounded field validation faster.
                  </p>
                </div>
              </div>
              <a
                href={ASKCOGNI_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-electric inline-flex shrink-0 items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Ask COGNI <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="glass h-full rounded-2xl p-6">
                <div className="kicker">{c.kicker}</div>
                <div className="mt-3 font-display text-lg font-bold">{c.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pilots.map((p, i) => {
            const Icon = getLucideIcon(p.icon);
            const meta = pilotMeta[p.id];
            const { to, external } = pilotTarget(p);
            const inner = (
              <>
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/95 p-2">
                    {p.logo ? (
                      <img src={p.logo} alt="" className="h-full w-full object-contain" />
                    ) : (
                      <Icon className="h-5 w-5 text-background" />
                    )}
                  </span>
                  <div>
                    <div className="kicker">{meta?.label ?? p.tagline}</div>
                    <div className="mt-1 font-display text-lg font-bold">{p.name}</div>
                  </div>
                  {meta?.tier && (
                    <span className="ml-auto shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {tierMaturityLabel[meta.tier]}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {meta?.blurb ?? p.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-electric-soft">
                  {external ? "Visit platform" : "View one-pager"}
                  {external ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" />
                  )}
                </div>
              </>
            );
            return (
              <Reveal key={p.id} delay={i * 60}>
                {external ? (
                  <a
                    href={to}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="glass glass-hover block h-full rounded-2xl p-6"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link to={to} className="glass glass-hover block h-full rounded-2xl p-6">
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">Pilot Method</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            From architecture hypotheses to bounded field validation.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Each pilot is used to test specific assumptions about memory, reasoning, deployment, and
            human interaction. The goal is to produce platform knowledge, not isolated proofs of
            concept.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {pilotMethodStages.map((s, i) => (
            <Reveal key={s.stage} delay={i * 80}>
              <div className="glass h-full rounded-2xl p-6">
                <div className="kicker">{s.stage}</div>
                <div className="mt-3 font-display text-lg font-bold">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
        <Reveal>
          <div className="glass rounded-3xl p-10">
            <div className="kicker justify-center">Have a pilot program idea?</div>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              We're always exploring new domains and operational constraints.
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Propose a pilot
              </Link>
              <Link
                to="/products"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Explore all products
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
