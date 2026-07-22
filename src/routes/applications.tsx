import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  Building2,
  ShieldCheck,
  Landmark,
  Scale,
  Radio,
  ArrowRight,
  Eye,
  Compass as PlanIcon,
  Zap,
  Plane,
  Accessibility,
  Bot as CobotIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { productContent } from "@/data/productContent";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Application domains for Cognivanta Labs: autonomous systems, enterprise intelligence, cybersecurity, finance, legal intelligence, and smart infrastructure.",
      },
      { property: "og:title", content: "Applications — Cognivanta Labs" },
      {
        property: "og:description",
        content: "Cognitive AI applied where context, memory, and control matter.",
      },
    ],
    links: [{ rel: "canonical", href: "/applications" }],
  }),
  component: ApplicationsPage,
});

const statChips = [
  { label: "Surface", value: "Physical and digital environments" },
  { label: "Mode", value: "Assistive and autonomous" },
  { label: "Requirement", value: "Context continuity" },
];

const domains = [
  {
    num: "01",
    icon: Bot,
    title: "Autonomous Systems",
    desc: "Robotics, drones, mobility, and industrial equipment need local perception, bounded autonomy, and clear escalation paths when the environment changes faster than cloud loops can react.",
  },
  {
    num: "02",
    icon: Building2,
    title: "Enterprise Intelligence",
    desc: "High-context operations require systems that maintain institutional memory, connect fragmented data, and produce decision support that remains traceable over time.",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Cybersecurity",
    desc: "Threat detection improves when event streams, historical state, and adaptive hypotheses are held together by a cognitive memory layer rather than a stateless rules engine.",
  },
  {
    num: "04",
    icon: Landmark,
    title: "Finance",
    desc: "Financial intelligence demands synthesis across documents, signals, policy boundaries, and temporal context to support risk-aware analysis and decision workflows.",
  },
  {
    num: "05",
    icon: Scale,
    title: "Legal Intelligence",
    desc: "Legal systems benefit from structured context memory, evidentiary reasoning, and the ability to preserve procedural state across long chains of work.",
  },
  {
    num: "06",
    icon: Radio,
    title: "Smart Infrastructure",
    desc: "Distributed infrastructure can be monitored and coordinated through edge cognition, anomaly interpretation, and human-in-the-loop governance surfaces.",
  },
];

const autonomySteps = [
  { icon: Eye, title: "Sense", desc: "Fuse environment signals and state changes in real time." },
  {
    icon: PlanIcon,
    title: "Plan",
    desc: "Evaluate goals, hazards, human guidance, and policy limits.",
  },
  {
    icon: Zap,
    title: "Act",
    desc: "Dispatch actions with verification, logging, and recovery paths.",
  },
];

// CR-6 priority-domain deep dives. Sourced directly from the vetted, evidence-
// governed copy in src/data/productContent.ts (see docs/CLAIMS_REGISTER.md,
// "CR-6 dynamic vertical solutions experience") — no new numbers or outcome
// claims are introduced here. Limited to the three domains marked "deployment"
// tier on /pilots (the most mature pilots today), not all applications.
const priorityDomains = [
  {
    id: "chaxu",
    icon: Plane,
    name: "Aerial autonomy — CHAXU",
    productHref: "/products/chaxu",
    problem:
      "Drone and UAV operators can fly capable hardware but struggle to turn it into a coordinated, governable operation — mission context, sensor fusion, fleet tasking, and audit trails are usually bolted together across disconnected tools.",
    intervention:
      productContent.chaxu?.overview ??
      "CHAXU connects aircraft, sensors, docking infrastructure, mission command, telemetry, replay, and CINTENT reasoning into one hardware-agnostic operational layer.",
    integration:
      "Hardware-agnostic integration across aircraft, flight-control, sensor, and telemetry interfaces, plus a secure API surface for mission, launch, status, cognition, and replay workflows — built for OEM and system-integrator hardware, not one vendor stack.",
    governance:
      "Every mission action — telemetry, cognition, policy events, and operator decisions — is reconstructable through replay, so teams can review what happened and why after the fact.",
    deploymentModel:
      "Deployment pilot: mission software, fleet orchestration, and edge/cloud coordination running against real aircraft and dock hardware today, ahead of the research- and enterprise-tier pilots on the roadmap.",
  },
  {
    id: "cobots",
    icon: CobotIcon,
    name: "Robotics — Cognitive Cobots",
    productHref: "/products/cobots",
    problem:
      "Collaborative robots deployed alongside people typically execute isolated commands — they don't retain task context across a sequence, and their safety behavior doesn't adapt as the shared workspace changes.",
    intervention:
      productContent.cobots?.overview ??
      "Cognitive Cobots combine situational awareness, task memory, and adaptive assistance for human-alongside industrial and service settings.",
    integration:
      "Reasons through the same CINTENT core as every other Cognivanta pilot, so task memory, planning, and safety constraints stay consistent with the rest of the platform rather than being a one-off robotics stack.",
    governance:
      "Plans and adapts within explicit, human-safe constraint boundaries designed for people working directly alongside the machine — the cobot adapts to the human, not the other way around.",
    deploymentModel:
      productContent.cobots?.closingNote ??
      "Currently in Research → Pilot stage — an embodied-robotics pilot testing how CINTENT's memory and constraint reasoning hold up outside pure software domains.",
  },
  {
    id: "awcs",
    icon: Accessibility,
    name: "Assistive mobility — AWCS",
    productHref: "/products/awcs",
    problem:
      "Assistive mobility systems have to operate in real, imperfect indoor and mixed-pedestrian environments — doorways, ramps, crowds — without ever taking final control away from the rider.",
    intervention:
      productContent.awcs?.overview ??
      "The Autonomous Wheelchair (AWCS) is an assistive mobility system focused on safe navigation, human override, and intelligent context awareness under constrained, real-world conditions.",
    integration:
      "An 8-layer architecture running user experience, intent understanding, perception, the CINTENT cognitive core, orchestration, ecosystem integration, data/knowledge, and observability as distinct, auditable layers rather than one opaque control loop.",
    governance:
      "Observability and governance is a dedicated architecture layer: explainability, audit logs, monitoring, safety compliance, security, privacy, and ethical oversight are preserved end to end, and the rider retains override at every point.",
    deploymentModel:
      productContent.awcs?.closingNote ??
      "Currently in pilot — an assistive-autonomy program testing CINTENT's constraint reasoning where safety and human dignity are the primary design constraints.",
  },
];

const domainExamples = [
  {
    title: "Legal intelligence",
    desc: "Emphasizes structured evidence context, retrieval accuracy, and procedural reasoning.",
  },
  {
    title: "Cybersecurity",
    desc: "Emphasizes streaming event interpretation, adaptive hypothesis testing, and rapid response loops.",
  },
  {
    title: "Embodied systems",
    desc: "Emphasizes local control, human safety boundaries, and memory-aware planning under uncertainty.",
  },
];

function ApplicationsPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--gold)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--electric)]" />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-10 md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker">Applications</div>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Cognitive AI applied where{" "}
              <span className="text-gradient-aurora">context, memory, and control</span> matter.
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Cognivanta focuses on domains where isolated inference is insufficient. The platform
              is shaped for systems that must reason over changing state, regulatory boundaries, and
              live operational constraints.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {statChips.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"
                >
                  <span className="text-electric-soft">{s.label}</span> {s.value}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-10 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="aurora-blob right-0 top-0 h-56 w-56 bg-[var(--violet)]" />
            <div className="relative">
              <div className="kicker">Ecosystem Map</div>
              <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
                How Cognivanta systems connect through one cognitive core.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                The application surface is not a collection of isolated products. Each system
                extends a shared cognitive platform, allowing research, deployment patterns, and
                operational memory to reinforce one another.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-display text-base font-bold">Shared platform logic</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    CINTENT anchors knowledge systems, legal intelligence, wellbeing applications,
                    and embodied autonomy under one operating architecture.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-display text-base font-bold">Domain transfer</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    What is learned in one environment feeds architecture decisions in the others,
                    creating compounding technical leverage.
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <Link
                  to="/platform"
                  className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Explore the CINTENT architecture <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((d, i) => (
            <Reveal key={d.title} delay={i * 40}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5">
                    <d.icon className="h-5 w-5 text-electric-soft" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{d.num}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">Priority Domains, In Depth</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Where CINTENT is furthest along today.
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
            Most application domains are still research-stage. These three are the ones with the
            most deployment-pilot mileage today — aerial autonomy, robotics, and assistive
            mobility — so they're worth a closer look before you scope a proof of concept.
          </p>
        </Reveal>

        <div className="mt-8 space-y-6">
          {priorityDomains.map((d, i) => (
            <Reveal key={d.id} delay={i * 60}>
              <div className="glass overflow-hidden rounded-3xl p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-electric)]">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold">{d.name}</h3>
                  <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Deployment pilot
                  </span>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-electric-soft">
                      Problem
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{d.problem}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-electric-soft">
                      Intervention
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{d.intervention}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-electric-soft">
                      Integration architecture
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{d.integration}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest text-electric-soft">
                      Governance
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{d.governance}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Deployment model
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{d.deploymentModel}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    to={d.productHref}
                    className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold"
                  >
                    Product detail
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold"
                  >
                    Book a proof-of-concept workshop <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="glass mt-6 rounded-2xl p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              On value and ROI
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We don't publish a savings calculator or a "% reduction" figure for these pilots yet.
              We don't have enough real, measured pilot outcomes across enough deployments to
              calibrate one honestly, and a calculator built on assumptions would just be a
              guess wearing a UI. A proof-of-concept workshop is the fastest way to get a
              value estimate specific to your operating environment — not a generic one.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-5xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">Autonomy Example</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Control logic for systems operating in the world.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            In physical systems, reasoning must remain connected to sensing, actuation, and fallback
            control. Cognitive AI provides the missing layer between perception and safe execution.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {autonomySteps.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="glass h-full rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-electric)]">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="mt-4 font-display text-base font-bold">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="glass mt-6 rounded-2xl p-6 text-center">
            <p className="text-sm italic text-muted-foreground">
              Autonomous control requires cognition that is accountable to both the environment and
              human oversight. See the full architecture on the{" "}
              <Link to="/platform" className="text-electric-soft not-italic hover:underline">
                platform page
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">Examples</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Domain examples mapped to platform primitives.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            Different applications stress different aspects of the platform. What remains consistent
            is the need for memory-backed reasoning, configurable control policies, and deployment
            flexibility.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {domainExamples.map((e, i) => (
            <Reveal key={e.title} delay={i * 80}>
              <div className="glass h-full rounded-2xl p-6">
                <div className="font-display text-base font-bold">{e.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
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
                <div className="kicker">Have a domain in mind?</div>
                <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  See it running as a pilot, or bring your own use case.
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
