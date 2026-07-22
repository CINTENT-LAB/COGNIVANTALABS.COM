import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy (Draft) — Cognivanta Labs" },
      {
        name: "description",
        content: "Draft privacy policy for Cognivanta Labs, pending legal review.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Overview",
    body: "This page describes, at a structural level, the kinds of information Cognivanta Labs collects through this website and how it's intended to be used. It is a working outline, not a finalized legal policy.",
  },
  {
    title: "Information we collect",
    body: "Information submitted through forms on this site (name, email, organization, and the content of your message) via our shared lead-capture backend, and standard technical information collected by any web server (such as IP address and browser information) for security and reliability purposes.",
  },
  {
    title: "How we use information",
    body: "To respond to inquiries submitted through contact, demo, investor, media, partner, research, and API-access forms, and to route those requests to the right team internally.",
  },
  {
    title: "Data sharing",
    body: "We do not sell personal information. Submissions may be routed to an internal notification/CRM system once configured; the specific providers and retention periods used will be documented here once finalized.",
  },
  {
    title: "Data security",
    body: "Form submissions are validated and rate-limited server-side. Specific security certifications or audit claims will only be published here once evidenced and approved — see our public claims register.",
  },
  {
    title: "Your rights",
    body: "Depending on your jurisdiction, you may have rights to access, correct, or request deletion of information you've submitted. Until this policy is finalized, please use the contact form to make such a request directly.",
  },
  {
    title: "Cookies",
    body: "This site's current analytics and cookie posture is being finalized as part of CR-11 (consent-aware analytics). No tracking is enabled ahead of a documented consent mechanism.",
  },
  {
    title: "Children's privacy",
    body: "This site is not directed at children and we do not knowingly collect information from children.",
  },
  {
    title: "Changes to this policy",
    body: "This draft will be replaced with a reviewed, versioned policy before this notice is removed.",
  },
];

function PrivacyPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm text-gold-soft">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Draft — not yet reviewed by legal counsel. Do not rely on this page as a final privacy
            policy. Questions in the meantime:{" "}
            <Link to="/contact" className="underline">
              contact us
            </Link>
            .
          </span>
        </div>

        <h1 className="mt-8 font-display text-3xl font-black tracking-tight sm:text-4xl">
          Privacy Policy <span className="text-muted-foreground">(Draft)</span>
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
