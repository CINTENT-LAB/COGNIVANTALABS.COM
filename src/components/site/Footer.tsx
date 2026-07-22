import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cloud,
  Facebook,
  FileCheck2,
  Linkedin,
  Loader2,
  Lock,
  Send,
  ShieldCheck,
  Twitter,
} from "lucide-react";
import { useLeadForm } from "@/lib/useLeadForm";

const trustBadges = [
  { icon: ShieldCheck, label: "Constraint-evaluated decisions" },
  { icon: Lock, label: "Scoped, rotatable API keys" },
  { icon: FileCheck2, label: "Full audit trail on every call" },
  { icon: Cloud, label: "Cloud or on-prem deployment" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cognivanta-labs-42757b400/",
    Icon: Linkedin,
  },
  { label: "X (Twitter)", href: "https://x.com/cognivantalabs", Icon: Twitter },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61586747050803",
    Icon: Facebook,
  },
];

type FooterLink = {
  label: string;
  to: string;
  external?: boolean;
};

// CR-13 — every link below resolves to a real route, anchor, or verified
// external destination (checked 22 Jul 2026). Items without a real
// destination yet (Status, a standalone Partners/Customers hub) are
// deliberately left out rather than shipped as dead links. Careers (CR-9),
// Roadmap (CR-8), and Architecture (CR-12) added once those pages existed.
const footerColumns: Array<{ title: string; links: FooterLink[] }> = [
  {
    title: "Platform",
    links: [
      { label: "CINTENT platform", to: "/platform" },
      { label: "Architecture", to: "/architecture" },
      { label: "Solutions", to: "/applications" },
      { label: "Pilots", to: "/pilots" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Developer overview", to: "/developers" },
      { label: "Deployment playbook", to: "/developers#deployment-playbook" },
      { label: "API access", to: "/developers#api-key" },
      { label: "Ask COGNI", to: "/products/askcogni" },
      { label: "Research", to: "/research" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "All products", to: "/products" },
      { label: "CHAXU", to: "/products/chaxu" },
      { label: "Health Hub", to: "/products/health-hub" },
      { label: "IKSHANA", to: "/products/ikshana" },
      { label: "Cognitive Cobots", to: "/products/cobots" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Roadmap", to: "/roadmap" },
      { label: "Careers", to: "/careers" },
      { label: "Investor Relations", to: "/investors" },
      { label: "Media & Press", to: "/media" },
      { label: "Cognites", to: "/cognites" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
      { label: "Research Hub", to: "https://research-hub.cognivantalabs.com", external: true },
    ],
  },
  {
    title: "Legal & trust",
    links: [
      { label: "Security & governance", to: "/developers#security-governance" },
      { label: "Privacy Policy (draft)", to: "/privacy" },
      { label: "Terms of Service (draft)", to: "/terms" },
      { label: "Support", to: "/contact" },
    ],
  },
];

function FooterNavLink({ link }: { link: FooterLink }) {
  const className =
    "focus-ring inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground";

  if (link.external) {
    return (
      <a href={link.to} target="_blank" rel="noreferrer noopener" className={className}>
        {link.label}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">Opens in new tab</span>
      </a>
    );
  }

  return (
    <Link to={link.to} className={className}>
      {link.label}
    </Link>
  );
}

function NewsletterForm() {
  const { status, error, ticketId, submit } = useLeadForm("newsletter");
  const [consent, setConsent] = useState(false);
  const submitting = status === "submitting";
  const showForm = status !== "success" && status !== "duplicate";

  return (
    <div className="glass mb-10 flex flex-col gap-5 rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div>
        <div className="kicker">Stay in the loop</div>
        <h3 className="mt-2 font-display text-xl font-bold">
          Platform and research updates, occasionally.
        </h3>
        <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
          No spam — just meaningful releases, research notes, and pilot milestones.
        </p>
      </div>

      {showForm ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            void submit({
              name: String(data.get("email") ?? "").split("@")[0] || "Subscriber",
              email: String(data.get("email") ?? ""),
              consent,
              honeypot: String(data.get("company_website") ?? ""),
            });
          }}
          className="flex w-full max-w-md shrink-0 flex-col gap-2"
        >
          <div className="hidden" aria-hidden="true">
            <input name="company_website" tabIndex={-1} autoComplete="off" className="input" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="input flex-1"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-electric inline-flex shrink-0 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Subscribe <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5"
            />
            <span>I'd like to receive occasional email updates.</span>
          </label>
        </form>
      ) : (
        <div className="flex w-full max-w-md shrink-0 items-center gap-2 text-sm text-electric-soft">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>
            {status === "duplicate" ? "Already subscribed." : "Subscribed."}
            {ticketId && ticketId !== "n/a" ? ` Reference: ${ticketId}` : ""}
          </span>
        </div>
      )}

      {status === "error" && error && (
        <div className="flex w-full max-w-md items-start gap-2 text-xs text-destructive">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="glass mb-10 flex flex-col gap-6 rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <div className="kicker">Ready when you are</div>
            <h2 className="mt-3 max-w-xl font-display text-2xl font-bold sm:text-3xl">
              Bring a governed decision to life.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Start with the workflow, define the review boundary, and choose the right path into
              the CINTENT ecosystem — wherever in the world you're building from.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              to="/developers"
              className="btn-electric inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
            >
              Get API access <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/pilots"
              className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
            >
              Propose a pilot
            </Link>
            <Link
              to="/contact"
              className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
            >
              Partner with us
            </Link>
          </div>
        </div>

        <NewsletterForm />

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="/logos/cognivanta-logo-white.png"
                alt="Cognivanta Labs"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              CINTENT™, built by Cognivanta Labs, is a governed cognitive intelligence platform —
              engineered in India, deployed globally.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${label} (opens in new tab)`}
                  title={`${label} (opens in new tab)`}
                  className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-electric/40 hover:text-electric-soft"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <div className="kicker mb-4">{column.title}</div>
              <ul className="space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-border pt-8">
          {trustBadges.map((badge) => (
            <span key={badge.label} className="badge-security">
              <badge.icon className="h-3.5 w-3.5" /> {badge.label}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {new Date().getFullYear()} Cognivanta Labs Pvt. Ltd. All rights reserved.</span>
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex h-2.5 w-3.5 shrink-0 flex-col overflow-hidden rounded-[1px]">
                <span className="h-1/3 bg-[#FF9933]" />
                <span className="h-1/3 bg-white" />
                <span className="h-1/3 bg-[#138808]" />
              </span>
              Engineered in India
            </span>
          </div>
          <div className="kicker">Intent → Context → Reason → Decide → Act → Learn</div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[11px] text-muted-foreground">
          <span>Cognivanta Labs Pvt. Ltd.</span>
          <span>CIN: U86900UP2025PTC236604</span>
          <span>GSTIN: 09AANCC2670G1ZH</span>
          <span>Operating globally · registered office address pending publication</span>
        </div>
      </div>
    </footer>
  );
}
