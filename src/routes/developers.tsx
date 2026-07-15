import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  Check,
  CheckCircle2,
  Clock3,
  Cloud,
  Code2,
  Copy,
  Database,
  FileCheck2,
  Gauge,
  GitBranch,
  KeyRound,
  Layers3,
  Lock,
  MessageSquareText,
  RefreshCw,
  Scale,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CintentCoreDiagram } from "@/components/site/CintentCoreDiagram";
import { Reveal } from "@/components/site/Reveal";
import { ecosystemApiCount } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: "Developer Platform - Cognivanta Labs" },
      {
        name: "description",
        content:
          "Build governed cognitive applications with CINTENT APIs, reference flows, and production-minded controls.",
      },
      { property: "og:title", content: "Developer Platform - Cognivanta Labs" },
    ],
    links: [{ rel: "canonical", href: "/developers" }],
  }),
  component: DevelopersPage,
});

const apiCategories = [
  {
    icon: MessageSquareText,
    title: "Conversation APIs",
    desc: "Chat, voice, and multimodal interaction endpoints.",
  },
  {
    icon: BookOpen,
    title: "Knowledge APIs",
    desc: "Search, retrieval, documents, and structured insight.",
  },
  {
    icon: BarChart3,
    title: "Analytics APIs",
    desc: "Prediction, classification, and forecasting workflows.",
  },
  {
    icon: Workflow,
    title: "Action APIs",
    desc: "Governed workflow automation and decision execution.",
  },
  {
    icon: Boxes,
    title: "Agent APIs",
    desc: "Tool use and task orchestration with explicit guardrails.",
  },
  {
    icon: KeyRound,
    title: "Management APIs",
    desc: "Users, usage, policies, scopes, and key lifecycle.",
  },
];

const buildSteps = [
  {
    icon: Code2,
    number: "01",
    title: "Discover the contract",
    desc: "Start with the intent, context, policy, and output shape your application needs before choosing an endpoint.",
  },
  {
    icon: Layers3,
    number: "02",
    title: "Compose the loop",
    desc: "Combine retrieval, reasoning, constraints, and human approval into a traceable application flow.",
  },
  {
    icon: Gauge,
    number: "03",
    title: "Operate with evidence",
    desc: "Measure latency, quality, policy outcomes, and failure recovery before expanding access or autonomy.",
  },
];

const architectureSteps = [
  { icon: MessageSquareText, label: "Input", desc: "Text, voice, files, events" },
  { icon: Database, label: "Context", desc: "Knowledge and memory" },
  { icon: Scale, label: "Policy", desc: "Rules, permissions, risk" },
  { icon: FileCheck2, label: "Decision", desc: "Explainable output" },
  { icon: Workflow, label: "Action", desc: "Approved workflow" },
];

const securityPillars = [
  {
    icon: ShieldCheck,
    title: "Constraint-first execution",
    desc: "Evaluate business rules, safety policies, and operational boundaries before an action is released.",
  },
  {
    icon: Lock,
    title: "Scoped, rotatable keys",
    desc: "Separate sandbox and production scopes, with a clear path to rotation and revocation.",
  },
  {
    icon: Activity,
    title: "Traceable requests",
    desc: "Keep request, decision, policy, and outcome evidence together for review and debugging.",
  },
  {
    icon: Cloud,
    title: "Flexible deployment",
    desc: "Design for managed cloud, private cloud, or controlled environments as requirements mature.",
  },
];

const deliveryChannels = [
  "REST APIs",
  "GraphQL",
  "Webhooks",
  "SDKs",
  "Connectors",
  "Event Streams",
];
const cloudTargets = ["AWS", "Azure", "GCP", "On-Prem"];

const deploymentPractices = [
  {
    id: "automate",
    number: "01",
    icon: Workflow,
    title: "Automate wherever possible",
    detail:
      "Use a controlled pipeline to run formatting, tests, builds, security checks, and release steps consistently. GitHub Actions, Jenkins, or GitLab CI/CD are implementation choices for the owning team.",
    evidence: "Pipeline gate",
  },
  {
    id: "test",
    number: "02",
    icon: CheckCircle2,
    title: "Test thoroughly before going live",
    detail:
      "Run unit, integration, API, UI, accessibility, and responsive checks in staging before production approval.",
    evidence: "Quality evidence",
  },
  {
    id: "version-control",
    number: "03",
    icon: GitBranch,
    title: "Use version control",
    detail:
      "Keep every change reviewable in Git with traceable releases, protected branches, and a known rollback point.",
    evidence: "Release history",
  },
  {
    id: "monitor",
    number: "04",
    icon: Activity,
    title: "Monitor after deployment",
    detail:
      "Track uptime, errors, latency, capacity, and user-impacting regressions with alerts that have named owners.",
    evidence: "Operational signal",
  },
  {
    id: "rollback",
    number: "05",
    icon: RefreshCw,
    title: "Implement rollback strategies",
    detail:
      "Keep the previous release recoverable and rehearse the decision, access, and verification steps for reversing a failed change.",
    evidence: "Recovery path",
  },
  {
    id: "configuration",
    number: "06",
    icon: KeyRound,
    title: "Use environment variables",
    detail:
      "Separate environment-specific configuration and secrets from source code. Validate required values at startup and rotate credentials through an approved process.",
    evidence: "Configuration boundary",
  },
  {
    id: "timing",
    number: "07",
    icon: Clock3,
    title: "Deploy during low-traffic hours",
    detail:
      "Choose a release window that limits user impact, includes an on-call owner, and leaves enough time for post-release observation.",
    evidence: "Release window",
  },
  {
    id: "communication",
    number: "08",
    icon: MessageSquareText,
    title: "Communicate with the team",
    detail:
      "Notify relevant owners before and after release, record the change scope, and make escalation routes visible to everyone involved.",
    evidence: "Change notice",
  },
  {
    id: "documentation",
    number: "09",
    icon: BookOpen,
    title: "Keep documentation updated",
    detail:
      "Reconcile runbooks, API contracts, environment notes, support guidance, and known limitations as part of the release definition of done.",
    evidence: "Handover record",
  },
  {
    id: "security",
    number: "10",
    icon: ShieldCheck,
    title: "Security first",
    detail:
      "Keep dependencies current, require HTTPS, apply least-privilege access, protect deployment tooling, and review privacy and security findings before approval.",
    evidence: "Security gate",
  },
] as const;

type DeploymentPractice = (typeof deploymentPractices)[number];

const playbookGroups: Array<{
  id: string;
  label: string;
  description: string;
  items: ReadonlyArray<DeploymentPractice["id"]>;
}> = [
  {
    id: "delivery",
    label: "Build and release",
    description: "Make the change repeatable, reviewable, and testable before it reaches users.",
    items: ["automate", "test", "version-control"],
  },
  {
    id: "operations",
    label: "Operate and recover",
    description: "Make the release observable, reversible, and appropriately timed.",
    items: ["monitor", "rollback", "configuration", "timing"],
  },
  {
    id: "governance",
    label: "Coordinate and protect",
    description: "Keep ownership, documentation, and security decisions explicit.",
    items: ["communication", "documentation", "security"],
  },
];

const usageData = [
  { day: "Mon", calls: 4200 },
  { day: "Tue", calls: 5100 },
  { day: "Wed", calls: 4800 },
  { day: "Thu", calls: 6200 },
  { day: "Fri", calls: 7100 },
  { day: "Sat", calls: 3900 },
  { day: "Sun", calls: 3400 },
];

function maskKey(key: string) {
  return `${key.slice(0, 8)}${"*".repeat(20)}${key.slice(-4)}`;
}

function randomKey(prefix: string) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < 32; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}_${out}`;
}

function ApiKeyPanel() {
  const [env, setEnv] = useState<"sandbox" | "production">("sandbox");
  const [keys, setKeys] = useState({
    sandbox: randomKey("cnv_sk_test"),
    production: randomKey("cnv_sk_live"),
  });
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentKey = keys[env];

  const regenerate = () =>
    setKeys((current) => ({
      ...current,
      [env]: randomKey(env === "sandbox" ? "cnv_sk_test" : "cnv_sk_live"),
    }));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(currentKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard access is optional in preview environments. */
    }
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="kicker">API access preview</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Preview UI - connect this panel to an approved key-issuance service before going live.
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1">
          {(["sandbox", "production"] as const).map((environment) => (
            <button
              key={environment}
              onClick={() => {
                setEnv(environment);
                setRevealed(false);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors ${
                env === environment
                  ? "bg-[var(--gradient-electric)] text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {environment}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-4 font-mono text-sm">
        <span className="min-w-0 flex-1 truncate">
          {revealed ? currentKey : maskKey(currentKey)}
        </span>
        <button
          onClick={() => setRevealed((value) => !value)}
          className="shrink-0 rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
        <button
          onClick={copy}
          className="shrink-0 rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-electric-soft"
          aria-label="Copy preview key"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={regenerate}
          className="shrink-0 rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-electric-soft"
          aria-label="Regenerate preview key"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span className="badge-security">
          {env === "sandbox" ? "Rate limit: 60 req/min" : "Rate limit: 600 req/min"}
        </span>
        <span className="badge-security">Scoped to an account</span>
        <span className="badge-security">Rotatable</span>
      </div>
    </div>
  );
}

function UsageChart() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="kicker">Usage analytics</div>
          <h3 className="mt-1 font-display text-lg font-semibold">API calls, last 7 days</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Sample data
        </span>
      </div>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={usageData} margin={{ left: -20, right: 10, top: 10 }}>
            <defs>
              <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--electric)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--electric)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="oklch(1 0 0 / 6%)" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="oklch(1 0 0 / 40%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="oklch(1 0 0 / 40%)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#0a0f1e",
                border: "1px solid oklch(1 0 0 / 12%)",
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: "#9fb0c9" }}
            />
            <Area
              type="monotone"
              dataKey="calls"
              stroke="var(--electric)"
              strokeWidth={2}
              fill="url(#usageFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DeploymentPlaybook() {
  return (
    <section id="deployment-playbook" className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">Deployment playbook</div>
        <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold sm:text-3xl">
          Ship deliberately. Operate visibly. Recover quickly.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Use this operating checklist as an approval gate for an authorized release. The tools,
          environments, and owners are selected by the delivery team; this preview does not claim
          that every control is active in production.
        </p>
      </Reveal>

      <div className="mt-8">
        <Tabs defaultValue="delivery" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            {playbookGroups.map((group) => (
              <TabsTrigger key={group.id} value={group.id} className="min-h-10 text-xs sm:text-sm">
                {group.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {playbookGroups.map((group) => {
            const practices = deploymentPractices.filter((practice) =>
              group.items.includes(practice.id),
            );
            return (
              <TabsContent key={group.id} value={group.id} className="mt-5">
                <p className="mb-4 max-w-2xl text-sm text-muted-foreground">{group.description}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {practices.map((practice) => (
                    <div key={practice.id} className="card-premium h-full rounded-2xl p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--gradient-electric)]">
                          <practice.icon className="h-5 w-5" />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                          {practice.number}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-base font-semibold">
                        {practice.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {practice.detail}
                      </p>
                      <span className="mt-4 inline-flex rounded-full border border-electric/20 bg-electric/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-electric-soft">
                        {practice.evidence}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

function DevelopersPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--violet)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pt-20 pb-14 md:grid-cols-[1fr_0.9fr] md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker">Developer and API platform</div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              Build applications that move from{" "}
              <span className="text-gradient-aurora">intent to governed action.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              CINTENT exposes {ecosystemApiCount.toLocaleString()}+ API capabilities across the
              ecosystem through a coherent surface for context, reasoning, policy, decisions, and
              approved execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#api-key"
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Explore API access <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/platform"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                See the platform
              </Link>
              <a
                href="#deployment-playbook"
                className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-5 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-electric/40 hover:text-foreground"
              >
                Deployment playbook <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Typed contracts</span>
              <span>Policy-aware</span>
              <span>Human approval ready</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <CintentCoreDiagram />
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal>
          <div className="kicker">A practical developer path</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Start with a decision. Build the evidence around it.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Cognitive applications become easier to operate when the desired outcome, constraints,
            and evidence are explicit from the first prototype.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {buildSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 70}>
              <div className="card-premium h-full rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <step.icon className="h-5 w-5 text-electric-soft" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="kicker">Reference architecture</div>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-bold sm:text-3xl">
              One request. Five deliberate layers.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Keep the application contract legible: collect the signal, establish context, evaluate
              policy, produce a decision, and release only the action that is approved.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/platform"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
              >
                Understand the core <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                Talk through an integration
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="glass rounded-2xl p-5 md:p-7">
              <div className="space-y-3">
                {architectureSteps.map((step, index) => (
                  <div
                    key={step.label}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[var(--gradient-electric)]">
                      <step.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-electric-soft">
                          0{index + 1}
                        </span>
                        <h3 className="font-display text-sm font-semibold">{step.label}</h3>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{step.desc}</p>
                    </div>
                    {index < architectureSteps.length - 1 ? (
                      <ArrowRight className="ml-auto hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
                    ) : (
                      <CheckCircle2 className="ml-auto hidden h-4 w-4 shrink-0 text-electric-soft sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="api-key" className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <ApiKeyPanel />
          </Reveal>
          <Reveal delay={100}>
            <UsageChart />
          </Reveal>
        </div>
      </section>

      <section id="security-governance" className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <Reveal>
          <div className="kicker">Security and governance</div>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Production thinking belongs in the first integration.
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
            These controls are the design targets for an approved deployment, not a claim that this
            preview is issuing live credentials.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 60}>
              <div className="card-premium h-full rounded-2xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-electric)]">
                  <pillar.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pillar.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <Reveal>
          <div className="kicker">API suite</div>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Expose. Integrate. Learn.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apiCategories.map((category, index) => (
            <Reveal key={category.title} delay={index * 50}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <category.icon className="h-5 w-5 text-electric-soft" />
                <h3 className="mt-3 font-display text-base font-semibold">{category.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{category.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="glass mt-6 flex flex-col gap-6 rounded-2xl p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="kicker">Delivery</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {deliveryChannels.map((channel) => (
                  <span
                    key={channel}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {channel}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="kicker">Cloud and on-prem</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {cloudTargets.map((target) => (
                  <span
                    key={target}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    <Cloud className="h-3.5 w-3.5" />
                    {target}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <DeploymentPlaybook />

      <section className="relative mx-auto max-w-4xl px-5 py-16 text-center md:px-8">
        <Reveal>
          <div className="glass rounded-3xl p-10">
            <div className="kicker justify-center">One platform. Every user. Limitless impact.</div>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Ready to build on CINTENT?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Bring a real workflow, define the review boundary, and use the platform conversation
              to shape the right integration path.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Request an integration conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Browse the ecosystem
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
