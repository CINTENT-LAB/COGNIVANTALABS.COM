import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Sparkles,
  Check,
  X,
  ShieldCheck,
  Cpu,
  Rocket,
  Terminal,
  FileText,
  CheckCircle2,
  RotateCcw,
  Eye,
  FileSearch,
  CloudOff,
  GitBranch,
  Zap,
  MessageSquareText,
} from "lucide-react";
import { OrbitDiagram } from "@/components/site/OrbitDiagram";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { EmergentCognitiveSections } from "@/components/site/EmergentCognitiveSections";
import { products, ecosystemApiCount } from "@/data/products";
import { industries } from "@/data/industries";
import { onPauseMotion } from "@/lib/heroMotion";
import { getLucideIcon } from "@/lib/lucideIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cognivanta Labs — CINTENT understands intent before AI decides or acts" },
      {
        name: "description",
        content:
          "Cognivanta Labs develops CINTENT™, a governed cognitive intelligence platform that understands intent, interprets context, reasons across knowledge and constraints, makes accountable decisions, and enables purposeful action.",
      },
      {
        property: "og:title",
        content: "Cognivanta Labs — CINTENT understands intent before AI decides or acts",
      },
      {
        property: "og:description",
        content:
          "Intent → Context → Reason → Decide → Act → Learn → Refined Intent Understanding.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 6);
  return (
    <div className="relative overflow-x-clip">
      <Hero />
      <Stats />
      <EmergentCognitiveSections />
      <ComparisonTable />
      <RealDecisionExample />
      <Architecture />
      <ApplicationsGrid />
      <ExecutionGap />
      <TrustSection />
      <AskCogniCallout />
      <ApiSample />
      <FeaturedProducts featured={featured} />
      <ClosingCta />
    </div>
  );
}

// CR-10: each stage's detail matches, word for word in substance, the same
// real terms already published on /platform's API surface and /architecture
// — no invented model architecture (e.g. no "Graph-Neural Network" claim).
const lifecycleStages = [
  { stage: "Intent", detail: "Resolve what the user or system is actually trying to accomplish." },
  { stage: "Context", detail: "Assemble the current world state — actors, constraints, recent events." },
  { stage: "Reason", detail: "Produce an explainable decision trace grounded in active memory." },
  { stage: "Decide", detail: "Arbitrate goals, constraints, and confidence into a ranked recommendation." },
  { stage: "Act", detail: "Execute workflows or actions through orchestration, with monitored feedback." },
  { stage: "Learn", detail: "Improve from outcomes while preserving a full, auditable decision trace." },
  {
    stage: "Refined Intent Understanding",
    detail: "Outcomes feed back into how the next Intent is understood — the loop closes.",
  },
];

function Hero() {
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const unsubscribe = onPauseMotion(() => setMotionPaused(true));
    return unsubscribe;
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-x-0 top-0 h-[clamp(26rem,66.67vw,56rem)] w-full overflow-hidden">
        <HeroSlideshow paused={motionPaused} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/25 to-transparent" />
      </div>
      <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)] opacity-40" />
      <div className="aurora-blob right-[5%] top-[30%] h-80 w-80 bg-[var(--violet)] opacity-30" />
      <div className="aurora-blob left-[35%] bottom-0 h-64 w-64 bg-[var(--gold)] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32 lg:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
              </span>
              <span className="kicker">Human + AI · India-built for the world</span>
            </div>
          </Reveal>

          <Reveal>
            <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              CINTENT understands what people and enterprises{" "}
              <span className="text-gradient-aurora">intend</span> — before AI decides or acts.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-foreground md:text-lg">
              Traditional AI responds to instructions. CINTENT first understands the purpose behind
              them.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Cognivanta Labs develops <span className="text-foreground">CINTENT™</span>, a governed
              cognitive intelligence platform that understands intent, interprets context, reasons
              across knowledge and constraints, makes accountable decisions and enables purposeful
              action.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/platform"
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Explore CINTENT™ <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Talk to an Expert
              </Link>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {lifecycleStages.map((s, i) => (
                <span key={s.stage} className="flex items-center gap-3">
                  <span className="group relative inline-flex cursor-help items-center">
                    <span
                      className={
                        i === lifecycleStages.length - 1
                          ? "border-b border-dotted border-electric-soft/50 text-electric-soft"
                          : "border-b border-dotted border-white/20 hover:text-foreground"
                      }
                    >
                      {s.stage}
                    </span>
                    <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-lg border border-white/10 bg-[#0a0a12] p-3 text-left normal-case tracking-normal text-muted-foreground opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100">
                      {s.detail}
                    </span>
                  </span>
                  {i < lifecycleStages.length - 1 && <span className="text-electric">→</span>}
                </span>
              ))}
            </div>
            <Link
              to="/architecture"
              className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs normal-case tracking-normal text-electric-soft hover:underline"
            >
              See how the loop actually runs <ArrowRight className="h-3 w-3" />
            </Link>
          </Reveal>
          <Reveal delay={380}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6">
              {[
                { k: `${products.length}`, v: "Products" },
                { k: "1", v: "Cognitive Core" },
                { k: `${ecosystemApiCount.toLocaleString()}+`, v: "APIs" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl font-black text-gradient-electric">
                    {s.k}
                  </div>
                  <div className="mt-0.5 kicker text-[0.6rem]">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={440}>
        <div className="relative border-t border-white/10 py-6">
          <LogoMarquee paused={motionPaused} />
        </div>
      </Reveal>
    </section>
  );
}

function Stats() {
  const stats = [
    { k: `${products.length}`, v: "Flagship Products" },
    { k: "12", v: "Application Domains" },
    { k: "1", v: "Shared Cognitive Core" },
    { k: `${ecosystemApiCount.toLocaleString()}+`, v: "APIs across the ecosystem" },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="glass grid grid-cols-2 gap-6 rounded-2xl p-6 md:grid-cols-4 md:p-10">
        {stats.map((s, i) => (
          <Reveal key={s.v} delay={i * 80}>
            <div>
              <div className="font-display text-3xl font-black text-gradient-electric md:text-4xl">
                {s.k}
              </div>
              <div className="mt-2 kicker">{s.v}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ComparisonTable() {
  type ComparisonValue = boolean | "partial";
  const rows: Array<[string, ComparisonValue, ComparisonValue, ComparisonValue]> = [
    ["Generates content", true, true, true],
    ["Understands intent", false, "partial", true],
    ["Persistent memory across products", false, false, true],
    ["Explainable reasoning trace", false, "partial", true],
    ["Governance & audit built-in", false, false, true],
    ["Decides + acts under uncertainty", false, "partial", true],
  ];
  const cols = ["Generative AI", "Agentic AI", "CINTENT™"];

  const Cell = ({ v }: { v: boolean | "partial" }) =>
    v === true ? (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--electric)_25%,transparent)]">
        <Check className="h-3.5 w-3.5 text-electric-soft" />
      </span>
    ) : v === "partial" ? (
      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-gold-soft">
        Partial
      </span>
    ) : (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5">
        <X className="h-3.5 w-3.5 text-muted-foreground" />
      </span>
    );

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="kicker">Why CINTENT</div>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Not another chatbot. A <span className="text-gradient-gold">decisioning</span> layer.
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <div className="glass mt-10 overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-6 py-4 kicker">Capability</th>
                  {cols.map((c, i) => (
                    <th
                      key={c}
                      className={`px-6 py-4 font-display text-base font-semibold ${i === 2 ? "text-gradient-electric" : ""}`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx} className="border-b border-white/5 last:border-0">
                    <td className="px-6 py-4 text-foreground">{r[0] as string}</td>
                    <td className="px-6 py-4">
                      <Cell v={r[1]} />
                    </td>
                    <td className="px-6 py-4">
                      <Cell v={r[2]} />
                    </td>
                    <td className="px-6 py-4 bg-[color-mix(in_oklab,var(--electric)_6%,transparent)]">
                      <Cell v={r[3]} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ApplicationsGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="kicker">Applications</div>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              One core. <span className="text-gradient-electric">Twelve domains.</span>
            </h2>
          </div>
          <Link
            to="/applications"
            className="inline-flex items-center gap-1.5 text-sm text-electric-soft hover:underline"
          >
            View all domains <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {industries.map((ind, i) => {
          const Ic = getLucideIcon(ind.icon);
          return (
            <Reveal key={ind.name} delay={i * 40}>
              <div className="glass glass-hover h-full rounded-xl p-5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/5">
                  <Ic className="h-5 w-5 text-electric-soft" />
                </div>
                <div className="mt-4 font-display text-base font-semibold">{ind.name}</div>
                <div className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {ind.description}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    {
      icon: Rocket,
      title: "Deployment Proof",
      desc: "Domain pilots across legal intelligence, travel, and aerial autonomy are actively shaping how the architecture evolves under real operating requirements.",
      detail:
        "Pilot maturity and scope for each domain are published on the applications pages and updated as programs progress.",
    },
    {
      icon: ShieldCheck,
      title: "Founder & Advisor Depth",
      desc: "Leadership includes cognitive architecture research and deep-tech operators.",
      detail:
        "Verified team profiles, credentials, and advisor bios are published on the About page as each is approved.",
    },
    {
      icon: BrainCircuit,
      title: "One Shared Core",
      desc: "The same platform extends across legal intelligence, knowledge systems, wellbeing, mobility, robotics, and aerial autonomy.",
      detail:
        "Capabilities developed for one domain are designed to transfer to others — the platform is intended to get stronger as new domains contribute patterns.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="kicker">Why us</div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          A platform company <span className="text-gradient-aurora">and</span> a research lab.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          The platform is developed alongside active domain pilots and a shared architecture
          intended to work across multiple application domains.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 100}>
            <div className="glass glass-hover h-full rounded-2xl p-6">
              <it.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-display text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">{it.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ApiSample() {
  const steps = [
    {
      n: "1",
      title: "Choose a Scenario",
      desc: "Legal analysis, travel planning, healthcare workflow, or custom scenario.",
    },
    {
      n: "2",
      title: "Provide Structured Input",
      desc: "Contract text, case details, patient data — CINTENT integrates multi-source inputs automatically.",
    },
    {
      n: "3",
      title: "Get Structured Decision",
      desc: "Risk assessments, scenario rankings, recommended actions — ready to integrate with your systems.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="mb-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="glass h-full rounded-2xl p-5">
              <span className="font-display text-2xl font-black text-gradient-electric">{s.n}</span>
              <h3 className="mt-2 font-display text-base font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="kicker">Developer Surface</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Get a decision in <span className="text-gradient-electric">5 minutes</span>.
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            CINTENT is API-first. Send an intent, receive a governed, explainable decision. No
            wrappers around a chat model — a real reasoning pipeline behind every call.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest">
            {["/intent", "/context", "/memory", "/reason", "/orchestrate", "/govern"].map((e) => (
              <span
                key={e}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-electric-soft"
              >
                {e}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              Get API access <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/platform"
              className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              Read the docs
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass overflow-hidden rounded-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-electric/80" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                POST cintent.ai/v1/reason
              </span>
              <Terminal className="ml-auto h-4 w-4 text-muted-foreground" />
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
              {`{
  "intent": "Should we approve this claim?",
  "context": {
    "policy_id": "HP-2340",
    "history": ["diabetes", "prior_claim_2023"],
    "evidence": ["scan_9421.pdf", "note_112.txt"]
  },
  "governance": { "trace": true, "explain": true }
}

→ 200 OK
{
  "decision": "conditional_approve",
  "confidence": 0.87,
  "reasoning_trace": [
    { "step": "extract_evidence", "source": "scan_9421.pdf" },
    { "step": "policy_match",   "rule":   "HP-2340 §4.2"   },
    { "step": "risk_synthesis", "score":  0.13             }
  ],
  "audit_id": "aud_01HXY…"
}`}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RealDecisionExample() {
  const risks = [
    { label: "Volume Commitment (500 units/month)", level: "MEDIUM", ok: false },
    { label: "Termination Clause (30-day)", level: "LOW", ok: true },
    { label: "Enforceability (Delaware Law)", level: "Favorable", ok: true },
  ];
  const safeguards = [
    {
      title: "Add capacity verification clause",
      desc: "Validate supplier can meet 500 units/month consistently.",
    },
    {
      title: "Set quarterly review checkpoints",
      desc: "Monitor volume trends, adjust if capacity issues arise.",
    },
    {
      title: "Include price adjustment mechanism",
      desc: "Protect against cost inflation beyond 18 months.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="kicker">From Responses to Real Decisions</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Illustrative example: <span className="text-gradient-electric">legal contract</span> risk
          assessment.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          A representative supply-agreement scenario with multiple risk factors and a
          time-sensitive decision. Same input, two very different styles of output.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="glass flex h-full flex-col rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="font-display text-lg font-semibold">Generative AI</span>
              <span className="ml-auto kicker text-[0.6rem]">Text Output</span>
            </div>
            <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
              "This contract contains standard supply agreement terms. The 30-day termination clause
              is reasonable and provides flexibility. Volume commitments of 500 units/month are
              typical for this industry. You should review the dispute history to ensure similar
              claims are resolved. Delaware jurisdiction is generally favorable for commercial
              contracts."
            </p>
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <span className="text-muted-foreground">
                <span className="text-foreground">Problem:</span> a human must interpret vague
                language, weigh risks manually, and decide. Decision quality depends on reader
                expertise. Delayed 3–5 days, with real risk of human error.
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass glass-hover flex h-full flex-col rounded-2xl border border-electric/20 p-6">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-electric-soft" />
              <span className="font-display text-lg font-semibold">CINTENT™</span>
              <span className="ml-auto kicker text-[0.6rem]">Structured Decision</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-md bg-[color-mix(in_oklab,var(--electric)_25%,transparent)] px-3 py-1.5 text-sm font-semibold text-electric-soft">
                SIGN WITH CONDITIONS
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Illustrative output · execution ready
              </span>
            </div>

            <div className="mt-5 space-y-2">
              {risks.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm"
                >
                  <span className="text-muted-foreground">{r.label}</span>
                  <span
                    className={`font-mono text-xs ${r.ok ? "text-electric-soft" : "text-gold-soft"}`}
                  >
                    {r.level} {r.ok ? "✓" : "⚠️"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="kicker text-[0.6rem]">Execute with these safeguards</div>
              <div className="mt-3 space-y-3">
                {safeguards.map((s, i) => (
                  <div key={s.title} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric-soft" />
                    <div>
                      <div className="font-medium">
                        {i + 1}. {s.title}
                      </div>
                      <div className="text-muted-foreground">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl border border-electric/20 bg-[color-mix(in_oklab,var(--electric)_8%,transparent)] p-4 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-electric-soft" />
              <span className="text-muted-foreground">
                <span className="text-foreground">Outcome:</span> legal team reviews the decision,
                sees safeguards, approves or refines with clarity. Contract executed same day.
                Consistent risk evaluation.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Architecture() {
  const layers = [
    {
      icon: Eye,
      title: "Perception Layer",
      desc: "Normalizes signals from sensors, interfaces, text, image, and telemetry streams.",
    },
    {
      icon: BrainCircuit,
      title: "Cognitive Layer",
      desc: "Builds internal context, semantic state, and task-specific reasoning traces.",
    },
    {
      icon: GitBranch,
      title: "Decision Layer",
      desc: "Arbitrates goals, constraints, confidence, and control policies.",
    },
    {
      icon: Zap,
      title: "Action Layer",
      desc: "Executes workflows, commands, or physical actions with monitored feedback.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="kicker">CINTENT Architecture</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          A layered architecture for{" "}
          <span className="text-gradient-aurora">cognitive intelligence</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          CINTENT binds perception, cognition, decision, and action through a shared memory spine so
          the system can accumulate context, select policies, and adapt over time.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {layers.map((l, i) => (
          <Reveal key={l.title} delay={i * 100}>
            <div className="glass glass-hover relative h-full rounded-2xl p-6">
              <span className="absolute right-5 top-5 font-mono text-xs text-muted-foreground">
                0{i + 1}
              </span>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-electric)]">
                <l.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{l.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={400}>
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Shared memory turns isolated inference into a continuous cognitive system.
        </p>
        <p className="mt-4 text-center">
          <Link
            to="/architecture"
            className="inline-flex items-center gap-1.5 text-sm text-electric-soft hover:underline"
          >
            See the full architecture deep dive <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      </Reveal>
    </section>
  );
}

function ExecutionGap() {
  const rows = [
    {
      badFrom: "Generative AI",
      bad: "Isolated Responses",
      badDesc:
        "Each prompt gets a fresh response with no memory of prior context or execution outcome.",
      icon: RotateCcw,
      good: "Persistent State",
      goodDesc:
        "Cognitive memory maintains actors, relationships, constraints, and decision history. Each new decision builds on operational continuity.",
    },
    {
      badFrom: "Agentic AI",
      bad: "Tool Execution Blindness",
      badDesc:
        "Agents execute actions but often don't understand the broader context or whether the action made sense given constraints.",
      icon: Eye,
      good: "Constraint-First Reasoning",
      goodDesc:
        "Decisions are evaluated against business rules, safety policies, and operational boundaries before execution.",
    },
    {
      badFrom: "Both Fall Short On",
      bad: "Provenance & Audit",
      badDesc:
        "When things go wrong, you can't explain why the system made that decision or what data it was working with.",
      icon: FileSearch,
      good: "Full Decision Traceability",
      goodDesc:
        "Every decision is logged with inputs, reasoning chain, constraints applied, confidence levels, and execution outcome.",
    },
    {
      badFrom: "Traditional Limitation",
      bad: "Cloud Dependency",
      badDesc:
        "Real-time performance and privacy suffer when every decision requires a round trip to the cloud.",
      icon: CloudOff,
      good: "Edge Autonomy",
      goodDesc:
        "Critical decision loops run locally. Cloud integration is available but not required — low latency, privacy preserved.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="kicker">How We Fill the AI Execution Gap</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          From isolated responses to{" "}
          <span className="text-gradient-gold">continuous cognitive systems</span>.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Generative AI and agentic systems excel at single tasks. Real-world operations demand
          persistent state, contextual reasoning, and decisions that hold up under scrutiny.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {rows.map((r, i) => (
          <Reveal key={r.bad} delay={i * 100}>
            <div className="glass h-full rounded-2xl p-6">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    {r.badFrom}
                  </span>
                  <br />
                  <span className="text-foreground font-medium">{r.bad}:</span> {r.badDesc}
                </span>
              </div>
              <div className="my-4 h-px bg-white/10" />
              <div className="flex items-start gap-2 text-sm">
                <r.icon className="mt-0.5 h-4 w-4 shrink-0 text-electric-soft" />
                <span className="text-muted-foreground">
                  <span className="text-foreground font-medium">{r.good}:</span> {r.goodDesc}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AskCogniCallout() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-4 md:px-8">
      <Reveal>
        <div className="glass glass-hover flex flex-col items-start gap-5 rounded-2xl p-6 sm:flex-row sm:items-center md:p-8">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--gradient-electric)]">
            <MessageSquareText className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="kicker">Ask COGNI · Interactive Playground</div>
            <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Experience CINTENT's cognitive architecture firsthand — submit real scenarios and
              watch intent recognition, contextual reasoning, and decision synthesis happen in real
              time.
            </p>
          </div>
          <a
            href="https://cognivantalabs.com/askcogni/index.html"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-electric inline-flex shrink-0 items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
          >
            Try the Platform <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function FeaturedProducts({ featured }: { featured: typeof products }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="kicker">The Ecosystem</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Reasoning-first <span className="text-gradient-gold">products</span>.
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-electric-soft hover:underline"
          >
            See all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-8">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
          <div className="aurora-blob left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-[var(--electric)]" />
          <div className="aurora-blob left-[20%] bottom-0 h-40 w-40 bg-[var(--violet)]" />
          <div className="aurora-blob right-[15%] bottom-0 h-40 w-40 bg-[var(--gold)]" />
          <div className="relative">
            <div className="kicker">Build the future with us</div>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-5xl">
              The future won't be generated. <br className="hidden sm:block" />
              <span className="text-gradient-aurora">It will be understood.</span>
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="btn-electric rounded-md px-5 py-3 text-sm font-semibold"
              >
                Partner with us
              </Link>
              <Link
                to="/contact"
                className="btn-ghost-glow rounded-md px-5 py-3 text-sm font-semibold"
              >
                Invest in us
              </Link>
              <Link
                to="/contact"
                className="btn-ghost-glow rounded-md px-5 py-3 text-sm font-semibold"
              >
                Build with us
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
