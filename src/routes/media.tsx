import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { TeamCard } from "@/components/site/TeamCard";
import { publishedTeam } from "@/data/team";
import { useLeadForm } from "@/lib/useLeadForm";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Media & Press — Cognivanta Labs" },
      {
        name: "description",
        content:
          "Fact sheets, approved logos, executive profiles, and a media contact for Cognivanta Labs and CINTENT™ coverage.",
      },
      { property: "og:title", content: "Media & Press — Cognivanta Labs" },
      {
        property: "og:description",
        content: "Approved assets and a direct line to the team for press and media requests.",
      },
    ],
    links: [{ rel: "canonical", href: "/media" }],
  }),
  component: MediaPage,
});

const leadership = publishedTeam.filter((member) => member.group === "leadership").slice(0, 3);

const assets = [
  {
    label: "Cognivanta Labs logo (white, PNG)",
    href: "/logos/cognivanta-logo-white.png",
    note: "For use on dark backgrounds.",
  },
  {
    label: "CINTENT icon (PNG)",
    href: "/logos/cintent-icon.png",
    note: "Product mark, square format.",
  },
  {
    label: "Cognivanta Labs favicon (PNG)",
    href: "/logos/cognivanta-favicon.png",
    note: "Small-format brand mark.",
  },
];

const factSheet = [
  { label: "Legal name", value: "Cognivanta Labs Pvt. Ltd." },
  { label: "CIN", value: "U86900UP2025PTC236604" },
  { label: "GSTIN", value: "09AANCC2670G1ZH" },
  { label: "Headquarters", value: "India · Global" },
  { label: "Product", value: "CINTENT™ — a governed cognitive intelligence platform" },
];

function MediaPage() {
  return (
    <div className="relative">
      <Hero />
      <FactSheet />
      <Assets />
      <ExecProfiles />
      <MediaContact />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--violet)]" />
      <div className="aurora-blob right-[10%] top-[15%] h-72 w-72 bg-[var(--electric)]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-14 md:px-8 md:pt-28">
        <Reveal>
          <div className="kicker">Media & Press</div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Reporting on <span className="text-gradient-aurora">Cognivanta Labs</span>?
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
            Approved facts, logos, and executive profiles for coverage of Cognivanta Labs and
            CINTENT™. A downloadable press-kit bundle is planned; until then, the individual assets
            below are ready to use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FactSheet() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">Fact sheet</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          The basics, verified.
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <div className="glass mt-8 overflow-hidden rounded-2xl">
          <dl className="divide-y divide-white/10">
            {factSheet.map((row) => (
              <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[220px_1fr]">
                <dt className="kicker text-[0.65rem]">{row.label}</dt>
                <dd className="text-sm text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-4 max-w-2xl text-xs text-muted-foreground">
          Every figure here is tracked in our internal claims register before publication. Product
          performance figures, customer counts, and pilot outcomes aren't included here yet because
          they haven't cleared that evidence review — ask media@ for the current verified status of
          any specific claim.
        </p>
      </Reveal>
    </section>
  );
}

function Assets() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">Logos & marks</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Approved assets.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Please don't recolor, distort, or add effects to these marks. Additional formats
          (dark/light SVG variants, screenshots, architecture diagrams) are being prepared — request
          them directly if you need one now.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <div key={asset.href} className="glass flex h-full flex-col rounded-2xl p-6">
            <div className="grid h-20 place-items-center rounded-xl bg-white/5">
              <img src={asset.href} alt="" className="max-h-14 max-w-[80%] object-contain" />
            </div>
            <div className="mt-4 flex-1">
              <div className="text-sm font-medium">{asset.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{asset.note}</div>
            </div>
            <a
              href={asset.href}
              download
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium transition-colors hover:bg-white/10"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExecProfiles() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Reveal>
        <div className="kicker">Executive profiles</div>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Who to quote.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Full leadership and advisor bios are on the{" "}
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

function MediaContact() {
  const { status, error, ticketId, routed, submit } = useLeadForm("press");
  const [consent, setConsent] = useState(false);
  const submitting = status === "submitting";
  const showForm = status !== "success" && status !== "duplicate";

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
      <Reveal>
        <div className="glass grid gap-8 rounded-3xl p-6 md:p-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="kicker">Media contact</div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Get in touch.
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              For interviews, quotes, briefings, or additional assets, reach out directly or use the
              form.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-electric-soft" /> hello@cognivanta.com
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
                    interest: "press",
                    message: String(data.get("message") ?? ""),
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
                    placeholder="you@publication.com"
                  />
                </div>
                <input
                  name="organization"
                  className="input"
                  placeholder="Publication / outlet"
                />
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="input resize-none"
                  placeholder="What are you working on and what do you need?"
                />

                <div className="hidden" aria-hidden="true">
                  <input name="company_website" tabIndex={-1} autoComplete="off" className="input" />
                </div>

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
                      Send to media contact <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-2 text-electric-soft">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-display text-lg font-semibold">
                    {status === "duplicate" ? "Already received" : "Request received"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {status === "duplicate"
                    ? "Looks like this was already sent — we have it on file."
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
          <span>General inquiries go through /contact — this form is for press only.</span>
        </div>
      </Reveal>
    </section>
  );
}
