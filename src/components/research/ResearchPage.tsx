import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import {
  researchAreas,
  researchCapabilities,
  researchCintentCapabilities,
  researchDomains,
  researchEvaluationDimensions,
  researchFaqs,
  researchPipeline,
  researchPrinciples,
} from "@/data/research";

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="kicker flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_12px_var(--electric)]" />
      <span className="text-muted-foreground">
        {index} <span className="text-electric-soft">{children}</span>
      </span>
    </div>
  );
}

const RESEARCH_HUB_URL = "https://research-hub.cognivantalabs.com";

function ResearchPage() {
  const [activeArea, setActiveArea] = useState<(typeof researchAreas)[number]["id"] | "">(
    researchAreas[0].id,
  );

  return (
    <div data-research-page className="relative overflow-hidden">
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden grid-bg">
        <div className="aurora-blob left-[8%] top-[12%] h-72 w-72 bg-violet" aria-hidden="true" />
        <div
          className="aurora-blob right-[8%] top-[16%] h-80 w-80 bg-electric"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-24 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:pt-28">
          <Reveal>
            <SectionLabel index="01 /" children="Applied research - deep technology - CINTENT" />
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-light leading-[0.94] tracking-tight sm:text-6xl lg:text-7xl">
              Research that moves intelligence from models to real-world systems.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Cognivanta Labs works at the intersection of cognitive intelligence, enterprise
              systems, autonomous technologies, and human-machine collaboration. We study systems
              that understand context, reason responsibly, and remain accountable to people and
              organisations.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#areas"
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Explore research areas <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/platform"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                See the cognitive layer <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={RESEARCH_HUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Be Researcher with COGLABS <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#collaborate"
                className="rounded-md px-3 py-3 text-sm font-semibold text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                Collaborate with us
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <ArrowDown className="h-4 w-4 text-electric" /> Explore the research programme
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className="card-premium relative overflow-hidden rounded-3xl p-3">
              <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
              <img
                src="/hero/hero-why-different-2.png"
                alt="Abstract CINTENT research graphic representing cognitive systems, secure infrastructure, and domain intelligence"
                className="relative aspect-[4/3] w-full rounded-2xl object-cover"
                loading="eager"
                decoding="async"
              />
              <figcaption className="relative flex items-center justify-between px-2 pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>Applied cognition</span>
                <span className="text-electric-soft">Research to field</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section id="purpose" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <SectionLabel index="02 /" children="Our research purpose" />
            <h2 className="mt-6 max-w-xl font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-5xl">
              Building intelligence that can operate responsibly.
            </h2>
            <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
              AI has advanced rapidly in language, perception, and pattern recognition. Yet
              enterprise and autonomous systems still struggle with continuity, operational context,
              governed decision-making, explainability, and accountable execution.
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              The objective is not to imitate human cognition literally. It is to create
              computational systems that operate with greater awareness, continuity, discipline, and
              accountability.
            </p>
          </Reveal>
          <div>
            <Reveal delay={100}>
              <p className="kicker mb-5 text-muted-foreground">Capabilities under investigation</p>
            </Reveal>
            <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2">
              {researchCapabilities.map((capability, index) => (
                <Reveal key={capability} delay={index * 25}>
                  <div className="group relative h-full border-b border-r border-border p-5 transition-colors hover:bg-white/[0.03]">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 font-display text-base text-foreground/90">{capability}</p>
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-electric transition-all duration-500 group-hover:w-full" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="philosophy"
        className="relative border-y border-border bg-surface/30 px-5 py-24 md:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel index="03 /" children="Research philosophy" />
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-5xl">
              From isolated intelligence to cognitive systems.
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Six principles guide research into systems that think before they act.
            </p>
          </Reveal>
          <div className="mt-12 divide-y divide-border border-b border-t border-border">
            {researchPrinciples.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 35}>
                <article className="grid gap-5 py-9 transition-colors hover:bg-white/[0.02] md:grid-cols-[9rem_1fr] md:gap-8">
                  <span className="font-mono text-6xl font-light text-foreground/10 md:text-7xl">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-light sm:text-3xl">
                      {principle.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                      {principle.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <SectionLabel index="04 /" children="Research areas" />
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-5xl">
            Nine intersecting fields of study.
          </h2>
        </Reveal>
        <div className="mt-12 divide-y divide-border border-b border-t border-border">
          {researchAreas.map((area, index) => {
            const open = activeArea === area.id;
            return (
              <div key={area.id} className={open ? "bg-white/[0.025]" : ""}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActiveArea(open ? "" : area.id)}
                  className="focus-ring flex w-full items-center gap-5 py-7 text-left"
                >
                  <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-2xl font-light tracking-tight sm:text-3xl ${open ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {area.title}
                  </span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground">
                    {open ? (
                      <ChevronDown className="h-4 w-4 rotate-180" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>
                {open && (
                  <div className="grid gap-8 pb-8 pl-12 lg:grid-cols-[0.75fr_1.25fr] lg:pl-16">
                    <p className="max-w-xl leading-relaxed text-muted-foreground">{area.intro}</p>
                    <div className="flex flex-wrap content-start gap-2">
                      {area.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-gold/60 hover:text-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="domains"
        className="relative border-y border-border bg-surface/20 px-5 py-24 md:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionLabel index="05 /" children="Domain research programmes" />
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-5xl">
              Platform research, applied.
            </h2>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Cognivanta Labs applies platform research through focused domain programmes, testing
              cognitive capability against the constraints of real operational environments.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {researchDomains.map((domain, index) => (
              <Reveal key={domain.title} delay={index * 45}>
                <article className="group relative h-[22rem] overflow-hidden rounded-2xl border border-border">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover grayscale opacity-45 transition duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-65"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end p-6">
                    <span className="kicker text-electric-soft">Domain programme</span>
                    <h3 className="mt-3 font-display text-2xl font-light">{domain.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {domain.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <SectionLabel index="06 /" children="From research to platform" />
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-5xl">
            Research becomes reusable capability.
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Findings do not remain isolated in papers or demonstrations. Each research question
            travels a deliberate path so a discovery in one domain strengthens the shared platform
            for every future application.
          </p>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {researchPipeline.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-lg border border-border bg-background px-4 py-3 font-mono text-[10px] text-muted-foreground transition-colors hover:border-electric/60 hover:text-foreground">
                <span className="mr-2 text-electric">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </span>
              {index < researchPipeline.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <p className="kicker text-muted-foreground">Research through CINTENT</p>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              CINTENT provides the architecture through which Cognivanta Labs turns research into
              reusable enterprise capability exposed as engines, services, and governed workflows.
            </p>
            <Link
              to="/platform"
              className="btn-ghost-glow mt-7 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              Explore CINTENT <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 border-l border-t border-border md:grid-cols-3">
            {researchCintentCapabilities.map((capability, index) => (
              <Reveal key={capability} delay={index * 25}>
                <div className="h-full border-b border-r border-border p-4 transition-colors hover:bg-white/[0.03]">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    C{String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm text-foreground/80">{capability}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="evaluation"
        className="relative border-y border-border bg-surface/25 px-5 py-24 md:px-8 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <SectionLabel index="07 /" children="Evaluation dimensions" />
            <h2 className="mt-6 max-w-xl font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-5xl">
              What we look for beyond a good demo.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              These are evaluation questions, not published performance claims. The right measure
              depends on the domain, risk, and operating environment.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {researchEvaluationDimensions.map((dimension, index) => (
              <Reveal key={dimension.title} delay={index * 50}>
                <article className="card-premium flex h-full gap-4 rounded-2xl p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-electric">
                    <CheckCircle2 className="h-4 w-4 text-background" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">{dimension.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {dimension.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="responsible" className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <SectionLabel index="08 /" children="Responsible research" />
            <h2 className="mt-6 max-w-xl font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-5xl">
              Governed by design.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Every programme considers a shared set of responsibilities. Research involving
              healthcare, finance, legal decisions, autonomous operations, or sensitive data
              requires domain-specific review before real-world deployment.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Human oversight",
              "Privacy",
              "Security",
              "Data minimisation",
              "Explainability",
              "Fairness",
              "Misuse prevention",
              "Risk classification",
              "Domain regulation",
              "Reproducibility",
              "Auditability",
              "Intellectual property boundaries",
            ].map((item, index) => (
              <Reveal key={item} delay={index * 25}>
                <div className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm text-foreground/80 transition-colors hover:border-gold/50">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-gold" />
                  {item}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faqs"
        className="relative border-y border-border bg-surface/25 px-5 py-24 md:px-8 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <SectionLabel index="09 /" children="Research FAQs" />
            <h2 className="mt-6 max-w-xl font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>
          <div className="divide-y divide-border border-b border-t border-border">
            {researchFaqs.map(([question, answer], index) => (
              <Reveal key={question} delay={index * 35}>
                <details className="group py-5">
                  <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-5 font-display text-lg text-foreground/90 [&::-webkit-details-marker]:hidden">
                    {question}
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="max-w-2xl pt-4 leading-relaxed text-muted-foreground">{answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="collaborate"
        className="relative mx-auto max-w-4xl px-5 py-28 text-center md:px-8 lg:py-40"
      >
        <Reveal>
          <div className="mx-auto mb-8 grid h-14 w-14 place-items-center rounded-full bg-gradient-electric shadow-glow-electric">
            <span className="font-display text-xl font-black text-background">C</span>
          </div>
          <SectionLabel index="10 /" children="Research collaboration" />
          <h2 className="mt-6 font-display text-4xl font-light leading-[0.96] tracking-tight sm:text-6xl">
            Research with purpose. Engineer for impact.
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Bring a hard problem, not just a model. Tell us what the system must understand, what it
            must never do, and what evidence a person needs before acting.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              Contact the research team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products"
              className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              Browse applications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default ResearchPage;
