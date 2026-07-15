export type ProductStatus = "core" | "production" | "pilot" | "live" | "draft";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  statusLabel: string;
  accent: "electric" | "violet" | "gold";
  icon: string; // lucide icon name, used as a fallback when no `logo` is set
  href?: string;
  external?: boolean;
  cta?: string;
  draftNote?: string;
  /** Confirmed count of APIs the product exposes/integrates, shown as a stat badge on its card. */
  apiCount?: number;
  /** Confirmed live product domain, shown as a secondary link on the card regardless of `href`. */
  liveUrl?: string;
  /** Real logo image URL pulled from the product's own live site. Renders instead of `icon` when set. */
  logo?: string;
  /** Additional confirmed application destinations shown as external CTAs on the product page. */
  applicationLinks?: ReadonlyArray<{ label: string; url: string }>;
}

/**
 * Confirmed API counts across the ecosystem (per Ron, Jul 2026):
 * Health Hub 4,500 · CHAXU (drones) 513 · ShunyAI 250 · ~2,500 more spread
 * across the rest of the CINTENT-connected apps. Used for the homepage
 * "APIs across the ecosystem" stat — update this if the breakdown changes.
 */
export const ecosystemApiCount = 4500 + 550 + 250 + 2500; // = 7,800+

export const products: Product[] = [
  {
    id: "cintent",
    name: "CINTENT™",
    tagline: "Sovereign Cognitive Core",
    description:
      "The Cognitive Intent Platform — an API-first cognitive operating system fusing intent, context, memory, reasoning, orchestration and governance into a single shared layer that powers every product in the ecosystem.",
    status: "core",
    statusLabel: "Shared Core · MVP Complete",
    accent: "electric",
    icon: "BrainCircuit",
    href: "/platform",
    cta: "Explore the platform",
    liveUrl: "https://cintent.tech",
    logo: "/logos/cintent-icon.png",
  },
  {
    id: "shunyai",
    name: "Shunya AI™",
    tagline: "Multilingual Speech Intelligence",
    description:
      "Real-time cognitive speech translation, transcription and transformation across 42 Indian languages — built for calls, conferencing, courtrooms, healthcare and broadcast, with over 95% contextual accuracy. Backed by 250+ APIs.",
    status: "live",
    statusLabel: "Live Platform",
    accent: "violet",
    icon: "Languages",
    apiCount: 250,
    liveUrl: "https://shunya-ai.space",
    logo: "https://shunya-ai.space/logo.webp",
    href: "/products/shunyai",
  },
  {
    id: "nyaynetra",
    name: "NyayNetra™",
    tagline: "Legal AI",
    description:
      "AI-driven legal assistance covering FIR interpretation, case search, legal draft generation and case insights — built to make justice faster and more accessible for citizens and legal professionals.",
    status: "pilot",
    statusLabel: "In Development",
    accent: "gold",
    icon: "Scale",
    liveUrl: "https://nyaynetra.space",
    logo: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/mk3JQ4Zk2vtxe077/logo-2-2-m7Vbe9yyVqSl4JbG.png",
    href: "/products/nyaynetra",
  },
  {
    id: "chaxu",
    name: "CHAXU™",
    tagline: "Drone & Robotics",
    description:
      "Flagship autonomous aerial intelligence for drone and UAV OEMs: mission command, sensor fusion, edge AI, fleet coordination, replay, and governed operational APIs powered by CINTENT.",
    status: "production",
    statusLabel: "Production-ready · Autonomy Stack",
    accent: "electric",
    icon: "Plane",
    apiCount: 513,
    liveUrl: "https://chaxu.co.in/",
    applicationLinks: [{ label: "CHAXU API Platform", url: "https://api.chaxu.co.in/" }],
    logo: "/products/chaxu-logo.png",
    href: "/products/chaxu",
  },
  {
    id: "blisstrail",
    name: "BlissTrail™",
    tagline: "Travel AI",
    description:
      "AI-powered trip planning that scores destinations with a TDIS (Book / Wait / Avoid) signal from real-time cost, weather, crowd and safety data across 500+ destinations, plus group planning and a 6-layer CINTENT reasoning engine.",
    status: "live",
    statusLabel: "Live Platform",
    accent: "violet",
    icon: "Compass",
    liveUrl: "https://blisstrail.space",
    logo: "/logos/blisstrail-logo.png",
    href: "/products/blisstrail",
  },
  {
    id: "ikshana",
    name: "IKSHANA™",
    tagline: "Autonomous Systems Marketplace & Design",
    description:
      "A governed marketplace and product-design ecosystem for drones, UAVs, robots and cobots — connecting OEMs, vendors, service partners and buyers through compliance-first procurement (DGCA/FAA/EASA/NDAA), vendor trust, and an engineering workspace for designing and simulating autonomous products. Part of the CHAXU stack; also reachable at byobot.store.",
    status: "pilot",
    statusLabel: "Early Access · Waitlist",
    accent: "gold",
    icon: "Store",
    liveUrl: "https://ikshana.chaxu.co.in",
    applicationLinks: [
      { label: "IKSHANA", url: "https://ikshana.chaxu.co.in/" },
      { label: "Marketplace", url: "https://ikshana.chaxu.co.in/marketplace" },
      { label: "BYOBOT Design Studio", url: "https://byobot.store/" },
    ],
    href: "/products/ikshana",
  },
  {
    id: "cwos",
    name: "CWOS™",
    tagline: "CINTENT Wealth OS",
    description:
      "India's first AI-native investment intelligence platform: cognitive research automation, quant signal generation, portfolio optimization and explainable, human-governed recommendations for retail investors, advisors, PMS/AIF managers, family offices and institutions.",
    status: "pilot",
    statusLabel: "Demo & Pilot Phase",
    accent: "electric",
    icon: "Wallet",
    liveUrl: "https://cwos.cognivantalabs.com",
    logo: "https://cwos.cognivantalabs.com/branding/cwos-logo.png",
    href: "/products/cwos",
  },
  {
    id: "health-hub",
    name: "Health Hub",
    tagline: "4500+ APIs",
    description:
      "Healthcare intelligence platform integrating 4500+ healthcare APIs for clinical decision support, patient data integration and care-pathway optimization.",
    status: "draft",
    statusLabel: "Draft",
    accent: "violet",
    icon: "HeartPulse",
    apiCount: 4500,
    liveUrl: "https://healthhub.cognivantalabs.com",
    draftNote:
      "API count and domain confirmed (4500+) — the domain isn't live yet, so the functional description above still needs sign-off.",
    href: "/products/health-hub",
  },
  {
    id: "askcogni",
    name: "AskCOGNI",
    tagline: "Interactive Playground",
    description:
      "An interactive knowledge playground and assistant for exploring CINTENT's reasoning live — see intent, context and decisions unfold end-to-end.",
    status: "draft",
    statusLabel: "Provider-neutral Preview Only",
    accent: "electric",
    icon: "MessageSquareCode",
    href: "/products/askcogni",
    liveUrl: "https://cognivantalabs.com/askcogni/index.html",
    cta: "Open preview",
  },
  {
    id: "cogni-doc",
    name: "COGNI Doc",
    tagline: "Document Intelligence",
    description:
      "CINTENT-powered document reasoning — contract analysis, risk extraction and structured, explainable summaries for legal, compliance and enterprise document workflows.",
    status: "draft",
    statusLabel: "Draft",
    accent: "gold",
    icon: "FileSearch",
    draftNote:
      "Added per Ron's note — description is a best guess from the CINTENT contract-analysis demo; please confirm scope, domain and status.",
    href: "/products/cogni-doc",
  },
  {
    id: "cobots",
    name: "Cognitive Cobots",
    tagline: "Embodied Robotics",
    description:
      "Collaborative machines combining situational awareness, task memory and adaptive assistance for human-alongside industrial and service settings.",
    status: "pilot",
    statusLabel: "Research → Pilot",
    accent: "violet",
    icon: "Bot",
    href: "/products/cobots",
  },
  {
    id: "awcs",
    name: "Autonomous Wheelchair (AWCS)",
    tagline: "Assistive Mobility",
    description:
      "Assistive mobility with safe navigation, human override and intelligent context under constrained, real-world conditions.",
    status: "pilot",
    statusLabel: "Pilot",
    accent: "gold",
    icon: "Accessibility",
    href: "/products/awcs",
  },
  {
    id: "externovate",
    name: "Externovate",
    tagline: "Global Internships & Research",
    description:
      "A global talent platform connecting students, researchers, universities and enterprises across 15+ countries — AI-matched (via CINTENT™) internships and research placements, from discovery to a verified Digital Career Passport™.",
    status: "live",
    statusLabel: "Live Platform",
    accent: "electric",
    icon: "Users",
    liveUrl: "https://externovate.org",
    logo: "/products/externovate-logo.png",
    href: "/products/externovate",
    cta: "Visit Platform",
  },
];
