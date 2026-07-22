import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const CINTENT_URL = "https://cintent.tech/";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "Architecture — CINTENT™ Technical Deep Dive" },
      {
        name: "description",
        content:
          "How CINTENT is actually built: the four-layer cognitive pipeline, the Intent-to-Refined-Intent-Understanding loop, the real API surface, and deployment surfaces — written for engineering evaluators.",
      },
      { property: "og:title", content: "CINTENT™ Architecture" },
      {
        property: "og:description",
        content: "The real system, not a diagram of a generic AI brain.",
      },
    ],
    links: [{ rel: "canonical", href: "/architecture" }],
  }),
  component: ArchitecturePage,
});

// Every term on this page already exists elsewhere in the vetted codebase
// (src/routes/platform.tsx's layers/API-surface/deployment-surfaces, and
// src/routes/index.tsx's lifecycleStages) — nothing new is introduced here.
// This page exists specifically so CR-10's interactive lifecycle strip and
// other CTAs have a real destination instead of a generic "coming soon."
const lifecycleStages = [
  {
    stage: "Intent",
    detail: "Resolve what the user or system is actually trying to accomplish, before anything else runs.",
    endpoint: "/intent",
  },
  {
    stage: "Context",
    detail: "Assemble the current world state — actors, constraints, recent events, live signals.",
    endpoint: "/context",
  },
  {
    stage: "Reason",
    detail: "Produce an explainable decision trace grounded in active memory and current signals, not a static prompt.",
    endpoint: "/reason",
  },
  {
    stage: "Decide",
    detail: "Arbitrate goals, constraints, confidence, and control policy into a ranked, structured recommendation.",
    endpoint: null,
  },
  {
    stage: "Act",
    detail: "Execute workflows, commands, or physical actions through orchestration, with monitored feedback and provenance.",
    endpoint: "/orchestrate",
  },
  {
    stage: "Learn",
    detail: "Improve from outcomes and feedback while preserving a full, auditable trace of why each decision was made.",
    endpoint: "/govern",
  },
  {
    stage: "Refined Intent Understanding",
    detail: "Outcomes feed back into how the next Intent is understood — the loop closes rather than resetting to zero.",
    endpoint: null,
  },
];

const layers = [
  {
    name: "Perception Layer",
    desc: "Normalizes signals from sensors, interfaces, text, image and telemetry streams into a shared representation.",
  },
  {
    name: "Cognitive Layer",
    desc: "Builds internal context and task-specific reasoning traces instead of answering each query in isolation.",
  },
  {
    name: "Decision Layer",
    desc: "Arbitrates goals, constraints, confidence and control policies into a ranked, structured recommendation.",
  },
  {
    name: "Action Layer",
    desc: "Executes workflows, commands or physical actions, with monitored feedback and full provenance.",
  },
];

const apiSurface = [
  ["/intent", "Resolve the user's real ask."],
  ["/context", "Assemble the world state."],
  ["/memory", "Shared, persistent spine across products, not per-app silos."],
  ["/reason", "Explainable decision trace."],
  ["/orchestrate", "Multi-agent workflows."],
  ["/govern", "Policy, audit, guardrails."],
] as const;

const deploymentSurfaces = [
  ["Edge", "Run local fusion, memory and action policies near devices and operators."],
  ["Cloud", "Use centralized supervision for analytics, fleet learning and large-scale orchestration."],
  ["Hybrid", "Split cognition between local control and remote strategic oversight."],
  ["Embedded", "Integrate lightweight cognitive loops into constrained hardware for motion-critical systems."],
] as const;

function ArchitecturePage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--violet)]" />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-10 md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker">Architecture</div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              How CINTENT is actually <span className="text-gradient-aurora">built</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Written for engineers evaluating the platform, not for a pitch deck. Real layers,
              real API surface, real deployment options — no invented model architecture or
              unverified benchmark comparisons.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-10 md:px-8">
        <Reveal>
          <div className="kicker">The lifecycle</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Intent → Context → Reason → Decide → Act → Learn → Refined Intent Understanding.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Seven stages, one closed loop. Each stage maps to a real part of the API surface below —
            this isn't a marketing diagram, it's how a request is actually processed.
          </p>
        </Reveal>

        <div className="mt-8 space-y-3">
          {lifecycleStages.map((s, i) => (
            <Reveal key={s.stage} delay={i * 40}>
              <div className="glass flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:w-8">
                  {i + 1}
                </div>
                <div className="font-display text-base font-bold sm:w-56 sm:shrink-0">{s.stage}</div>
                <div className="flex-1 text-sm text-muted-foreground">{s.detail}</div>
                {s.endpoint && (
                  <span className="shrink-0 rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 font-mono text-[10px] text-electric-soft">
                    {s.endpoint}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">Four inspectable layers</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Perception, cognition, decision, and action — kept separate on purpose.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Signal flow moves inward through cognition, then back outward into controlled action.
            Layer boundaries stay inspectable for debugging, governance, and operational review.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4">
          {layers.map((l, i) => (
            <Reveal key={l.name} delay={i * 60}>
              <div className="glass flex flex-col gap-4 rounded-2xl p-6 md:flex-row md:items-center">
                <div className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  L{i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg font-semibold">{l.name}</div>
                  <div className="text-sm text-muted-foreground">{l.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">API surface</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Six endpoints. One reasoning pipeline.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {apiSurface.map(([e, d], i) => (
            <Reveal key={e} delay={i * 50}>
              <div className="glass glass-hover rounded-xl p-5">
                <div className="font-mono text-sm font-semibold text-electric-soft">{e}</div>
                <div className="mt-1.5 text-sm text-muted-foreground">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">Deployment surfaces</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Edge, cloud, hybrid, or embedded — your call.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deploymentSurfaces.map(([title, desc], i) => (
            <Reveal key={title} delay={i * 60}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-soft">
                  0{i + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
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
              <div className="kicker">Want the full platform picture?</div>
              <h2 className="mt-4 font-display text-2xl font-bold sm:text-4xl">
                See capabilities and deployment options on the platform page, or get API access.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/platform"
                  className="btn-ghost-glow rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Platform overview
                </Link>
                <Link
                  to="/developers"
                  className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Get API access <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={CINTENT_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Connect to CINTENT.tech <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
