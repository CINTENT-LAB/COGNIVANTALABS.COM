import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  BrainCircuit,
  Cpu,
  ShieldCheck,
  Sparkles,
  Zap,
  Check,
  Minus,
  X,
  ChevronDown,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CintentCoreDiagram } from "@/components/site/CintentCoreDiagram";
import { OrbitDiagram } from "@/components/site/OrbitDiagram";

const CINTENT_URL = "https://cintent.tech/";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — CINTENT™ Cognitive Intent Platform" },
      {
        name: "description",
        content:
          "CINTENT™ is an API-first cognitive operating system fusing intent, context, memory, reasoning, orchestration, governance and decision intelligence.",
      },
      { property: "og:title", content: "CINTENT™ — the Cognitive Intent Platform" },
      {
        property: "og:description",
        content: "Perception → Cognitive → Decision → Action, bound by a shared memory spine.",
      },
    ],
    links: [{ rel: "canonical", href: "/platform" }],
  }),
  component: PlatformPage,
});

// CR-11: added `detail` + `endpoint` so each card can expand in place instead
// of navigating away. Detail text stays consistent with the same real layers
// and API surface already published lower on this page — nothing new claimed.
const capabilities = [
  {
    icon: BrainCircuit,
    name: "Context Awareness",
    desc: "Live internal models capture actors, relationships, constraints and recent events across digital and physical systems.",
    detail:
      "Powered by the Cognitive Layer, which builds internal context and task-specific reasoning traces instead of answering each query in isolation.",
    endpoint: "/context",
  },
  {
    icon: Layers,
    name: "Real-Time Reasoning",
    desc: "Inference is guided by active state, current signals and confidence thresholds rather than static prompts alone.",
    detail:
      "Every reasoning trace is explainable and grounded in active memory — not a black-box confidence score with no underlying signal.",
    endpoint: "/reason",
  },
  {
    icon: Sparkles,
    name: "Multi-Agent Orchestration",
    desc: "Specialized agents coordinate through shared cognitive memory, producing clearer role separation and better traceability.",
    detail:
      "Agents share the same memory spine rather than operating as isolated silos, so handoffs between agents preserve context instead of losing it.",
    endpoint: "/orchestrate",
  },
  {
    icon: Cpu,
    name: "Edge Autonomy",
    desc: "Critical loops can execute close to the environment to reduce latency, preserve privacy and survive connectivity loss.",
    detail:
      "Supports Edge and Embedded deployment surfaces — latency-sensitive perception and control can run locally while cloud services handle broader coordination.",
    endpoint: null,
  },
  {
    icon: Zap,
    name: "Adaptive Learning",
    desc: "The system improves from outcomes, feedback and changing conditions while preserving traceability.",
    detail:
      "This is the Learn stage of the Intent → Context → Reason → Decide → Act → Learn loop — outcomes feed back into how the next decision is made.",
    endpoint: "/govern",
  },
  {
    icon: ShieldCheck,
    name: "Governed Control",
    desc: "Safety policies, confidence thresholds and human review points guide decisions before execution.",
    detail:
      "Every decision carries full audit provenance and policy checks before it's allowed to execute — see the Architecture page for the governance model in full.",
    endpoint: "/govern",
  },
];

const deploymentSurfaces = [
  ["Edge", "Run local fusion, memory and action policies near devices and operators."],
  [
    "Cloud",
    "Use centralized supervision for analytics, fleet learning and large-scale orchestration.",
  ],
  ["Hybrid", "Split cognition between local control and remote strategic oversight."],
  [
    "Embedded",
    "Integrate lightweight cognitive loops into constrained hardware for motion-critical systems.",
  ],
] as const;

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

const winRows = [
  [
    "Input source",
    "Text prompt only",
    "Prompt + tools",
    "Multi-source: data, sensors, workflows, context",
  ],
  ["Output type", "Generated text", "Task execution", "Structured decisions + action steps"],
  [
    "Constraint handling",
    "Ignores constraints",
    "Executes despite constraints",
    "Evaluates within constraints before acting",
  ],
  [
    "Decision quality",
    "Pattern-based (hallucinations)",
    "Task-based, limited reasoning",
    "Constraint-evaluated, multi-scenario",
  ],
  ["Real-world readiness", "Low", "Medium", "High — decision-first, action-ready"],
  ["Audit & compliance", "Limited trail", "Partial logging", "Full decision provenance"],
] as const;

function PlatformPage() {
  return (
    <div className="relative overflow-x-clip">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--violet)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="flex items-center gap-3">
              <img src="/logos/cintent-icon.png" alt="CINTENT" className="h-10 w-10" />
              <div className="kicker">The Platform</div>
            </div>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-gradient-aurora">CINTENT™</span> — the Cognitive Intent
              Platform.
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">
              Not a model wrapper. CINTENT is a cognitive architecture that maintains state, reasons
              contextually, evaluates constraints and executes with human oversight — deterministic,
              explainable, and built for decisions that matter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="btn-electric rounded-md px-5 py-3 text-sm font-semibold inline-flex items-center gap-2"
              >
                Get API access <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="btn-ghost-glow rounded-md px-5 py-3 text-sm font-semibold"
              >
                See the ecosystem
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
          </Reveal>
          <Reveal delay={150}>
            <OrbitDiagram />
          </Reveal>
        </div>
      </section>

      <PlatformOverview />
      <CognitiveArchitectureSection />

      <CapabilitiesSection />

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="kicker">From Responses to Real Decisions</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            A text answer vs. a decision you can act on.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Illustrative example: a supply agreement with multiple risk factors and a
            time-sensitive call.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-2xl p-6">
              <div className="kicker">Generative AI · Text Output</div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                "This contract contains standard supply agreement terms. The 30-day termination
                clause is reasonable and provides flexibility. Volume commitments of 500 units/month
                are typical for this industry. You should review the dispute history to ensure
                similar claims are resolved. Delaware jurisdiction is generally favorable for
                commercial contracts."
              </p>
              <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4 text-xs text-muted-foreground">
                Legal team reads the text, debates interpretation, manually weighs risk. Decision
                delayed 3–5 days, with real risk of human error.
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="glass h-full rounded-2xl border border-electric/20 p-6">
              <div className="flex items-center justify-between">
                <div className="kicker text-electric-soft">CINTENT™ · Structured Decision</div>
                <span className="rounded-full border border-electric/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-electric-soft">
                  Illustrative output
                </span>
              </div>
              <div className="mt-4 font-display text-lg font-bold">Sign with conditions</div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
                  <span className="text-muted-foreground">Volume commitment (500/mo)</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-gold-soft">
                    Medium
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
                  <span className="text-muted-foreground">Termination clause (30-day)</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-electric-soft">
                    Low
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
                  <span className="text-muted-foreground">Enforceability (Delaware law)</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-electric-soft">
                    Favorable
                  </span>
                </div>
              </div>
              <div className="mt-5 rounded-lg border border-electric/20 bg-[color-mix(in_oklab,var(--electric)_6%,transparent)] p-4 text-xs text-muted-foreground">
                Legal team reviews the decision, sees the safeguards, approves or refines with
                clarity. Contract executed the same day.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CognitiveLoopSection />

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="kicker">Internal Architecture</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Explore CINTENT as a living cognitive brain network.
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            The internal architecture coordinates perception, contextual cognition, decision
            optimization and action systems as one continuous machine cognition loop. Four layers
            keep signal flow inspectable while the shared memory spine preserves continuity.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="glass rounded-2xl p-6">
              <div className="kicker text-electric-soft">Signal flow</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sensory signals move inward through cognition, then back outward into controlled
                action systems.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="glass rounded-2xl p-6">
              <div className="kicker text-electric-soft">Layer isolation</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Perception, cognition, decision and action boundaries remain inspectable for
                debugging, governance and operational review.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-4">
          {layers.map((l, i) => (
            <Reveal key={l.name} delay={i * 60}>
              <div className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground w-16 shrink-0">
                  L{i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-display text-lg font-semibold">{l.name}</div>
                  <div className="text-sm text-muted-foreground">{l.desc}</div>
                </div>
                <div className="h-1 flex-1 rounded-full bg-[var(--gradient-electric)] opacity-70" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://cognivantalabs.com/pages/cognitive-brain.html"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
          >
            Open Cognitive Brain <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={CINTENT_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
          >
            Connect to CINTENT.tech <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <DeploymentSection />

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="kicker">Why CINTENT Wins</div>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-4xl">
            Technical superiority across every dimension.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="glass mt-10 overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.03]">
                  <tr>
                    <th className="px-6 py-4 kicker">Dimension</th>
                    <th className="px-6 py-4 font-display text-base font-semibold">
                      Generative AI
                    </th>
                    <th className="px-6 py-4 font-display text-base font-semibold">Agentic AI</th>
                    <th className="px-6 py-4 font-display text-base font-semibold text-gradient-electric">
                      CINTENT™
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {winRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-white/5 last:border-0 align-top">
                      <td className="px-6 py-4 font-medium text-foreground">{row[0]}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="inline-flex items-start gap-1.5">
                          <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive/70" />
                          {row[1]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="inline-flex items-start gap-1.5">
                          <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-soft" />
                          {row[2]}
                        </span>
                      </td>
                      <td className="px-6 py-4 bg-[color-mix(in_oklab,var(--electric)_6%,transparent)] text-foreground">
                        <span className="inline-flex items-start gap-1.5">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-soft" />
                          {row[3]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
                <img
                  src="/hero/hero-rocket.png"
                  alt="The future we're building — together"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/60 lg:bg-gradient-to-l" />
              </div>
              <div className="relative p-8 md:p-12">
                <div className="kicker">The Future We're Building</div>
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  Scale CINTENT to power thousands of enterprises — together.
                </h2>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  <li>Expand the product ecosystem into 12+ key domains</li>
                  <li>Scale CINTENT to power thousands of enterprises and millions of users</li>
                  <li>Lead in autonomous systems — UAVs, robots, cobots and beyond</li>
                  <li>Grow global partnerships and presence</li>
                  <li>Create long-term value for stakeholders and society</li>
                </ul>
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
                  >
                    Propose a pilot <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="kicker">API Surface</div>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Six endpoints. One reasoning pipeline.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["/intent", "Resolve the user's real ask."],
            ["/context", "Assemble the world state."],
            ["/memory", "Shared, persistent spine."],
            ["/reason", "Explainable decision trace."],
            ["/orchestrate", "Multi-agent workflows."],
            ["/govern", "Policy, audit, guardrails."],
          ].map(([e, d], i) => (
            <Reveal key={e} delay={i * 50}>
              <div className="glass glass-hover rounded-xl p-5">
                <div className="font-mono text-sm font-semibold text-electric-soft">{e}</div>
                <div className="mt-1.5 text-sm text-muted-foreground">{d}</div>
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
                Start with a template, explore the playground, or get API access.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="https://cognivantalabs.com/askcogni/index.html"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-electric rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Try AskCOGNI
                </a>
                <Link
                  to="/contact"
                  className="btn-ghost-glow rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Submit a use case
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

// CR-11: cards expand in place on click to show real implementation detail.
// Click analytics (which capability gets clicked most) is deliberately not
// wired up — no analytics provider (GA4/Plausible/PostHog) is installed on
// the site yet; see docs/CLAIMS_REGISTER.md for that open item.
function CapabilitiesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="kicker">Capabilities</div>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Platform capabilities for autonomy and high-context reasoning.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Click any capability for how it actually maps to the CINTENT architecture.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((c, i) => {
          const open = openIndex === i;
          return (
            <Reveal key={c.name} delay={i * 60}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="glass glass-hover h-full w-full rounded-2xl p-6 text-left transition-colors"
              >
                <div className="flex items-start justify-between">
                  <c.icon className="h-6 w-6 text-electric-soft" />
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                {open && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm text-muted-foreground">{c.detail}</p>
                    {c.endpoint && (
                      <span className="mt-3 inline-flex rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 font-mono text-[10px] text-electric-soft">
                        {c.endpoint}
                      </span>
                    )}
                  </div>
                )}
              </button>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={300}>
        <Link
          to="/architecture"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-electric-soft hover:underline"
        >
          See the full architecture <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Reveal>
    </section>
  );
}

function CognitiveLoopSection() {
  const loopStages = ["Sensing", "Understanding", "Decision", "Action", "Learning"];

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal>
          <div className="kicker">Cognitive Loop</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            From sensing to learning in one operational loop.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Cognitive AI becomes useful when the system can close the loop between environmental
            state and future behavior. CINTENT keeps perception, understanding, decision and
            learning in circulation.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <div className="kicker text-electric-soft">Operational continuity</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                State does not disappear after a single output. It persists and conditions the next
                step.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="kicker text-electric-soft">Behavioral adaptation</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Learning is shaped by outcomes in the field, not only by offline training pipelines.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-8">
            <div className="aurora-blob right-0 top-0 h-40 w-40 bg-[var(--electric)] opacity-30" />
            <div className="relative">
              <div className="kicker">Continuous reasoning and action</div>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {loopStages.map((stage, index) => (
                  <div className="flex items-center gap-2" key={stage}>
                    <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-electric-soft">
                      {stage}
                    </span>
                    {index < loopStages.length - 1 ? (
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-white/10 pt-5 text-sm text-muted-foreground">
                The loop returns learned outcomes to the next understanding step, keeping every
                decision connected to context and control.
              </div>
              <a
                href={CINTENT_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-electric mt-6 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Connect to CINTENT.tech <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DeploymentSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="kicker">Deployment</div>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold sm:text-4xl">
          Designed for edge, cloud, hybrid and embedded deployment.
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          CINTENT supports multiple deployment surfaces so teams can place cognition where latency,
          privacy, bandwidth and safety require it.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {deploymentSurfaces.map(([title, desc], index) => (
          <Reveal key={title} delay={index * 70}>
            <div className="glass glass-hover h-full rounded-2xl p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-soft">
                0{index + 1}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <a
        href={CINTENT_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="btn-ghost-glow mt-8 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
      >
        Connect to CINTENT.tech <ArrowUpRight className="h-4 w-4" />
      </a>
    </section>
  );
}

function CognitiveArchitectureSection() {
  const principles = [
    [
      "Stateful context",
      "The system tracks entities, goals, hazards and historical interactions instead of discarding state after a single response.",
    ],
    [
      "Reasoning continuity",
      "Decisions are grounded in active memory and current environmental signals so the next step starts with context.",
    ],
    [
      "Action accountability",
      "Each decision can be tied back to context, policy and execution feedback before an approved action proceeds.",
    ],
  ] as const;

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Reveal>
          <div className="kicker">What Is Cognitive AI Architecture</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            A system architecture for persistent understanding and bounded action.
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Cognitive AI architecture brings together sensing, memory, reasoning and control.
            Instead of treating outputs as isolated responses, it maintains an evolving state
            representation that guides future decisions.
          </p>
          <a
            href={CINTENT_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost-glow mt-7 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
          >
            See CINTENT.tech in action <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {principles.map(([title, desc], index) => (
            <Reveal key={title} delay={index * 80}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-soft">
                  0{index + 1}
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformOverview() {
  const pillars = [
    {
      icon: BrainCircuit,
      title: "Intent + Context",
      desc: "Understand what a query really means before acting.",
    },
    {
      icon: Layers,
      title: "Memory + Reasoning",
      desc: "A shared spine across products, not per-app silos.",
    },
    {
      icon: Cpu,
      title: "Orchestration + Governance",
      desc: "Multi-agent workflows with audit trails built in.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <div className="kicker">The Platform</div>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              CINTENT™ — one <span className="text-gradient-aurora">cognitive core</span>, many
              products.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              An API-first cognitive operating system fusing intent, context, memory, reasoning,
              agent orchestration, governance, decision intelligence, multimodal intelligence and
              adaptive learning — into a single layer.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 100}>
                <div className="glass glass-hover h-full rounded-2xl p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-electric)]">
                    <pillar.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{pillar.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={150} className="relative hidden lg:block">
          <CintentCoreDiagram />
        </Reveal>
      </div>
    </section>
  );
}
