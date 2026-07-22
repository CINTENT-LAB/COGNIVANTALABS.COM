import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service (Draft) — Cognivanta Labs" },
      {
        name: "description",
        content: "Draft terms of service for Cognivanta Labs, pending legal review.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Acceptance of terms",
    body: "By using this website or requesting API access, pilots, or other Cognivanta Labs services, you agree to these terms once finalized. This page is a structural draft, not an executed agreement.",
  },
  {
    title: "Use of the site and services",
    body: "This site is provided to describe Cognivanta Labs and CINTENT™, and to route inquiries (demo, pilot, investor, media, partner, developer) to the right team. Automated scraping or abuse of forms is not permitted.",
  },
  {
    title: "Accounts and access",
    body: "Where accounts, API keys, or Cognite logins are introduced, separate terms specific to that access will govern — those are not covered by this general draft.",
  },
  {
    title: "Intellectual property",
    body: "Cognivanta Labs, CINTENT™, and associated marks, logos, and content are owned by Cognivanta Labs Pvt. Ltd. unless otherwise noted. Approved media assets are available on our Media & Press page.",
  },
  {
    title: "Pilots and API access",
    body: "Specific commercial terms for pilots, API usage, and pricing are agreed separately with each customer and are not established by this page. See Pricing for current published rate cards, where available.",
  },
  {
    title: "Disclaimers",
    body: "Information on this site, including product capabilities, roadmap items, and illustrative examples, is provided for informational purposes and is not a guarantee of specific outcomes, accuracy, or availability.",
  },
  {
    title: "Limitation of liability",
    body: "Final limitation-of-liability language will be added once reviewed by counsel. Nothing on this page should be treated as a binding liability limitation in the meantime.",
  },
  {
    title: "Governing law",
    body: "Cognivanta Labs Pvt. Ltd. is incorporated in India. Final governing-law and dispute-resolution terms are pending legal review.",
  },
  {
    title: "Changes to these terms",
    body: "This draft will be replaced with a reviewed, versioned terms of service before this notice is removed.",
  },
];

function TermsPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm text-gold-soft">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Draft — not yet reviewed by legal counsel. Do not rely on this page as final terms.
            Questions in the meantime:{" "}
            <Link to="/contact" className="underline">
              contact us
            </Link>
            .
          </span>
        </div>

        <h1 className="mt-8 font-display text-3xl font-black tracking-tight sm:text-4xl">
          Terms of Service <span className="text-muted-foreground">(Draft)</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: 22 July 2026 · Draft</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
