import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Compass,
  FileText,
  Layers,
  Loader2,
  Mail,
  Send,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { TeamCard } from "@/components/site/TeamCard";
import { publishedTeam } from "@/data/team";
import { useLeadForm } from "@/lib/useLeadForm";

export const Route = createFileRoute("/investors")({
  head: () => ({
    meta: [
      { title: "Investor Relations — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Investment thesis, market opportunity, leadership, and how to request Cognivanta Labs / CINTENT investor materials.",
      },
      { property: "og:title", content: "Investor Relations — Cognivanta Labs" },
      {
        property: "og:description",
        content: "CINTENT's moat, roadmap, leadership, and a controlled path to request materials.",
      },
    ],
    links: [{ rel: "canonical", href: "/investors" }],
  }),
  component: InvestorsPage,
});

const leadership = publishedTeam.filter((member) => member.group === "leadership");

function InvestorsPage() {
  return (
    <div className="relative">
      <Hero />
      <Thesis />
      <Moat />
      <Traction />
      <Roadmap />
      <Leadership />
      <RequestMaterials />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)]" />
      <div className="aurora-blob right-[10%] top-[15%] h-72 w-72 bg-[var(--gold)]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-14 md:px-8 md:pt-28">
        <Reveal>
          <div className="kicker">Investor Relations</div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Backing the shift from <span className="text-gradient-aurora">responses</span> to real{" "}
            <span className="text-gradient-electric">decisions</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
            Cognivanta Labs builds CINTENT™, a governed cognitive intelligence platform. This page
            summarizes our thesis, moat, roadmap, and leadership, and gives you a controlled way to
            request deeper materials.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-muted-foreground">
            Figures on this page are limited to what's currently verified. Market sizing, funding
            status, and financial projections are shared directly with qualified investors under a
            request — see{" "}
            <a href="#request-materials" className="text-electric-soft hover:underline">
              Request materials
            </a>
            .
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Thesis() {
  const points = [
    {
      icon: Compass,
      title: "The problem",
      desc: "Generative and agentic AI are good at producing responses and executing tools, but most enterprise decisions still need someone to interpret intent, weigh constraints, and take accountability. That gap is manual, slow, and inconsistent.",
    },
    {
      icon: Layers,
      title: "The approach",
      desc: "CINTENT is built around an intent-first cognitive lifecycle — understanding what's actually being asked, holding context and memory, reasoning against constraints, and producing a decision with a traceable rationale — rather than a single-turn generative response.",
    },
    {
      icon: TrendingUp,
      title: "Why now",
      desc: "Enterprises adopting AI are running into the same wall: outputs that look confident but aren't governed, explainable, or auditable. Regulated and high-stakes domains in particular need a decision layer, not just a chat layer.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">Investment thesis</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Why we're building this.
        </h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <div className="glass h-full rounded-2xl p-6">
              <p.icon className="h-6 w-6 text-electric-soft" />
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Moat() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">CINTENT moat</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          One core, built to transfer across domains.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          CINTENT's reasoning, memory, and governance layers are shared infrastructure — not a
          separate model per product. Capability work in one domain (legal reasoning, for example)
          is designed to carry over to others (travel planning, aerial autonomy), rather than
          starting from zero each time. Detailed architecture and technical differentiation are
          covered on the{" "}
          <a href="/platform" className="text-electric-soft hover:underline">
            platform page
          </a>{" "}
          and shared in full under a materials request below.
        </p>
      </Reveal>
    </section>
  );
}

function Traction() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">Traction</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Where the pilots stand today.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Domain pilots are underway across legal intelligence, travel, and aerial autonomy. We're
          deliberately not publishing specific outcome numbers (accuracy, time saved, adoption)
          until they're validated and entered into our public claims register — see{" "}
          <a href="/pilots" className="text-electric-soft hover:underline">
            pilot status
          </a>{" "}
          for the current, qualitative state of each program.
        </p>
      </Reveal>
    </section>
  );
}

function Roadmap() {
  const phases = [
    {
      label: "Now",
      title: "Platform foundation and governed public launch",
      desc: "Evidence-governed public site, shared lead/CRM backend, core CINTENT lifecycle and architecture content.",
    },
    {
      label: "Next",
      title: "Domain pilot maturity and authority content",
      desc: "Validated pilot outcomes published as evidence clears review; research hub and technical authority content.",
    },
    {
      label: "Later",
      title: "Unified CINTENT.tech platform experience",
      desc: "Masked API/dashboard routing, developer console, and expanded vertical solution pages.",
    },
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">Directional roadmap</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Now, next, later — not fixed dates.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          This is a directional sequence, not a committed schedule. We don't publish certification
          or compliance dates we haven't secured.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {phases.map((p) => (
          <div key={p.label} className="glass h-full rounded-2xl p-6">
            <div className="kicker text-electric-soft">{p.label}</div>
            <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">Leadership</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Who's building this.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Full team, advisors, and credentials are on the{" "}
          <a href="/about" className="text-electric-soft hover:underline">
            About page
          </a>
          .
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {leadership.map((member, i) => (
          <Reveal key={member.id} delay={i * 60}>
            <TeamCard member={member} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function RequestMaterials() {
  const { status, error, ticketId, routed, submit } = useLeadForm("investor");
  const [consent, setConsent] = useState(false);
  const [ndaAck, setNdaAck] = useState(false);
  const submitting = status === "submitting";
  const showForm = status !== "success" && status !== "duplicate";

  return (
    <section id="request-materials" className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="glass grid gap-8 rounded-3xl p-6 md:p-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="kicker">Request materials</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Talk to us about investing.
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Tell us who you are and what you'd like to see — deck, financial model, or a direct
              conversation. This isn't a data room and checking the box below isn't a signed NDA;
              we'll follow up on next steps, including any NDA, directly.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-electric-soft" /> hello@cognivanta.com
            </div>
            <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-electric-soft" /> No cap table or financials are
              posted publicly on this page.
            </div>
          </div>

          <div>
            {showForm ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  void submit({
                    name: String(data.get("name") ?? ""),
                    email: String(data.get("email") ?? ""),
                    organization: String(data.get("organization") ?? ""),
                    interest: String(data.get("interest") ?? ""),
                    message: `${ndaAck ? "[Willing to sign NDA] " : ""}${String(data.get("message") ?? "")}`,
                    consent,
                    honeypot: String(data.get("company_website") ?? ""),
                  });
                }}
                className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" required className="input" placeholder="Your full name" />
                  <input
                    name="email"
                    required
                    type="email"
                    className="input"
                    placeholder="you@fund.com"
                  />
                </div>
                <input
                  name="organization"
                  className="input"
                  placeholder="Fund / firm"
                />
                <select name="interest" className="input" defaultValue="materials">
                  <option value="materials">Request the investor deck</option>
                  <option value="financials">Request financial model</option>
                  <option value="call">Schedule a conversation</option>
                </select>
                <textarea
                  name="message"
                  rows={4}
                  className="input resize-none"
                  placeholder="Anything specific you'd like covered."
                />

                <div className="hidden" aria-hidden="true">
                  <input name="company_website" tabIndex={-1} autoComplete="off" className="input" />
                </div>

                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={ndaAck}
                    onChange={(e) => setNdaAck(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>I'd be willing to sign an NDA for deeper materials (not a signature).</span>
                </label>
                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>I agree to be contacted about this request.</span>
                </label>

                {status === "error" && error && (
                  <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-electric inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      Sending <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Request materials <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-electric-soft">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-display text-lg font-semibold">
                    {status === "duplicate" ? "Already on file" : "Request received"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {status === "duplicate"
                    ? "We already have this request — no need to resend."
                    : routed
                      ? "Your request has been routed to the team."
                      : "Your request has been recorded. Lead routing is still being connected — for anything time-sensitive, email hello@cognivanta.com directly."}
                </p>
                {ticketId && ticketId !== "n/a" && (
                  <p className="font-mono text-xs text-muted-foreground/70">
                    Reference: {ticketId}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          <span>
            Prefer email? Reach investor relations directly at hello@cognivanta.com.{" "}
            <a href="/contact" className="text-electric-soft hover:underline">
              General contact <ArrowRight className="inline h-3 w-3" />
            </a>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
