import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Database,
  Eye,
  GitBranch,
  HeartPulse,
  Landmark,
  MessageCircle,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { CognitiveLoopDiagram } from "@/components/site/CognitiveLoopDiagram";

const capabilities = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "Intent Understanding",
    description:
      "Read the underlying goal - not the surface request. CINTENT resolves ambiguous asks into precise, evaluated intents.",
  },
  {
    icon: Activity,
    number: "02",
    title: "Contextual Reasoning",
    description:
      "Reason across user, business, environmental and historical context before proposing a path forward.",
  },
  {
    icon: Database,
    number: "03",
    title: "Cognitive Memory",
    description:
      "Durable episodic + semantic memory keeps prior decisions, constraints and outcomes available across sessions.",
  },
  {
    icon: Scale,
    number: "04",
    title: "Constraint Evaluation",
    description:
      "Every candidate path is scored against policy, regulation, risk tolerance and operational constraints.",
  },
  {
    icon: ShieldCheck,
    number: "05",
    title: "Governance",
    description:
      "Human approvals, audit trails, and hard policy boundaries. Nothing acts without an explicit sign-off surface.",
  },
  {
    icon: Sparkles,
    number: "06",
    title: "Decision Intelligence",
    description:
      "Structured decisions with confidence, risk, evaluated constraints and clear action steps - ready to execute.",
  },
] as const;

const loopSteps = [
  {
    icon: MessageCircle,
    number: "01",
    title: "Ask",
    description: "Text, voice, documents, sensors, workflow events converge as intent signals.",
  },
  {
    icon: Eye,
    number: "02",
    title: "Understand",
    description: "Semantic parsing resolves objective, user, business and environmental context.",
  },
  {
    icon: GitBranch,
    number: "03",
    title: "Reason",
    description: "Candidate paths are generated across policy, memory and constraint boundaries.",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Decide",
    description: "One governed path becomes a structured decision - confidence, risk, actions.",
  },
  {
    icon: Zap,
    number: "05",
    title: "Act",
    description: "Decision executes through enterprise systems with human approval where required.",
  },
  {
    icon: RefreshCw,
    number: "06",
    title: "Learn",
    description: "Outcomes return as feedback into cognitive memory, closing the loop.",
  },
] as const;

const applications = [
  {
    icon: HeartPulse,
    category: "Healthcare",
    title: "Clinical pathway decisioning",
    description: "Governed triage, prior-auth and treatment routing with clinician approval.",
  },
  {
    icon: Landmark,
    category: "Financial Services",
    title: "Cognitive underwriting & risk",
    description: "Constraint-aware credit, claims and market decisions with audit trails.",
  },
  {
    icon: Zap,
    category: "Autonomous Systems",
    title: "Mission-safe path selection",
    description: "Reason over policy, geo-fencing and mission constraints before dispatch.",
  },
  {
    icon: BrainCircuit,
    category: "Robotics / Cobotics",
    title: "Human-in-the-loop autonomy",
    description: "Task-level decisions with safety envelopes and operator approvals.",
  },
  {
    icon: Building2,
    category: "Smart Infrastructure",
    title: "Grid, mobility, and city ops",
    description: "Balanced decisions across load, environment and regulatory constraints.",
  },
  {
    icon: ShieldCheck,
    category: "Government / Regulated",
    title: "Auditable decision surfaces",
    description: "Every recommendation is traceable, evaluated and human-approvable.",
  },
] as const;

export function EmergentCognitiveSections() {
  return (
    <>
      <EmergentHeroSection />
      <CapabilitiesSection />
      <CognitiveLoopSection />
      <ApplicationsSection />
    </>
  );
}

function EmergentHeroSection() {
  const trustBadges = [
    { icon: ShieldCheck, label: "Governance-first" },
    { icon: Users, label: "Human-in-the-loop" },
    { icon: Building2, label: "Enterprise-ready" },
  ];

  return (
    <section
      aria-labelledby="emergent-hero-heading"
      className="relative overflow-hidden"
      data-source="emergent-enterprise-ai-hero"
    >
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="aurora-blob left-[8%] top-[12%] h-72 w-72 bg-[var(--electric)]"
        aria-hidden="true"
      />
      <div
        className="aurora-blob right-[10%] top-[24%] h-64 w-64 bg-[var(--violet)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-14">
        <Reveal className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-electric" aria-hidden="true" />
            CINTENT™ · Cognitive AI Platform
          </span>
          <h2
            id="emergent-hero-heading"
            className="relative mt-6 inline-block font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
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
          </h2>
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
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Decide</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-electric-soft">Act</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="btn-electric inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
            >
              Ask for Demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
            {trustBadges.map((badge) => (
              <span key={badge.label} className="badge-security">
                <badge.icon className="h-3.5 w-3.5" aria-hidden="true" /> {badge.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-6">
          <CognitiveLoopDiagram />
        </Reveal>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section
      aria-labelledby="emergent-capabilities-heading"
      className="relative mx-auto max-w-7xl border-t border-white/10 px-5 py-20 md:px-8 md:py-28"
      data-source="emergent-enterprise-ai-hero"
    >
      <Reveal>
        <div className="kicker">Six capabilities · one cognitive core</div>
        <h2
          id="emergent-capabilities-heading"
          className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          The cognitive layer between <span className="text-gradient-electric">intent</span> and
          action.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          CINTENT is not a chatbot and not RPA. It is the reasoning surface where enterprise
          constraints, human judgment, and structured decisions meet.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Reveal key={capability.title} delay={index * 60}>
            <article className="glass glass-hover h-full rounded-xl p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-electric/10 text-electric-soft">
                  <capability.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="kicker text-[0.6rem]">{capability.number}</span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{capability.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {capability.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CognitiveLoopSection() {
  return (
    <section
      aria-labelledby="emergent-loop-heading"
      className="relative border-y border-white/10"
      data-source="emergent-enterprise-ai-hero"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <div className="kicker">The cognitive loop</div>
          <h2
            id="emergent-loop-heading"
            className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Six moves. One governed decision.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {loopSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 60}>
              <article className="relative border-l border-electric/30 pl-5">
                <div className="flex items-center gap-3">
                  <step.icon className="h-4 w-4 text-electric-soft" aria-hidden="true" />
                  <span className="kicker text-[0.6rem]">Step {step.number}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationsSection() {
  return (
    <section
      aria-labelledby="emergent-applications-heading"
      className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"
      data-source="emergent-enterprise-ai-hero"
    >
      <Reveal>
        <div className="kicker">Where CINTENT ships</div>
        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="emergent-applications-heading"
            className="max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Built for consequential decisions.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            CINTENT is deployed where the cost of an ungoverned answer is measured in lives,
            capital, or regulatory exposure - not clicks.
          </p>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((application, index) => (
          <Reveal key={application.category} delay={index * 60}>
            <article className="glass glass-hover h-full rounded-xl p-5">
              <div className="flex items-center gap-3">
                <application.icon className="h-4 w-4 text-electric-soft" aria-hidden="true" />
                <span className="kicker text-[0.6rem]">{application.category}</span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{application.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {application.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
