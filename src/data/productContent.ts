// Rich, per-product one-pager content — sourced from each product's own live
// site (shunya-ai.space, blisstrail.space, nyaynetra.space, cwos.cognivantalabs.com,
// ikshana.chaxu.co.in, externovate.org) plus Cognivanta Labs' own application
// pages and pilot briefs. Feeds the extended sections rendered on
// src/routes/products.$slug.tsx, on top of the base Product record in
// src/data/products.ts. Not every product fills every field — sections are
// only rendered when present.

export interface ProductFeature {
  icon: string; // lucide icon name
  title: string;
  desc: string;
}

export interface ProductStep {
  n: string;
  title: string;
  desc: string;
}

export interface ProductStat {
  value: string;
  label: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface ProductTestimonial {
  quote: string;
  author: string;
}

export interface ProductPricingTier {
  name: string;
  price: string;
  audience: string;
  features: string[];
  highlight?: boolean;
}

export interface ProductGroup {
  title: string;
  items: string[];
}

export interface ProductLayer {
  title: string;
  desc: string;
}

export interface ProductContent {
  overview: string;
  heroImage?: string;
  stats?: ProductStat[];
  features?: ProductFeature[];
  steps?: ProductStep[];
  groups?: ProductGroup[];
  architecture?: ProductLayer[];
  testimonials?: ProductTestimonial[];
  pricing?: ProductPricingTier[];
  faqs?: ProductFaq[];
  gallery?: string[];
  closingNote?: string;
}

export const productContent: Record<string, ProductContent> = {
  shunyai: {
    overview:
      "Shunya AI is a cognitive AI-based multilingual speech transformer and transcriber built for real-time speech-to-speech, speech-to-text, and translation across India's linguistic complexity. It understands speech as communication, not as isolated words — engineered for the reality of Indian conversation: code-mixing, regional accents, and fast transitions between languages.",
    heroImage: "https://shunya-ai.space/language-bridge.png",
    stats: [{ value: "42", label: "Indian Languages (target)" }],
    features: [
      {
        icon: "Mic",
        title: "Real-time speech transformation",
        desc: "Live speech transformation instead of delayed translation pipelines — usable inside an active conversation, not after it ends.",
      },
      {
        icon: "Radio",
        title: "Native to live communication",
        desc: "Works across audio calls, video calls, meetings, conferencing, broadcast workflows and media processing where low latency is essential.",
      },
      {
        icon: "Languages",
        title: "Handles Indian language complexity",
        desc: "Processes dialects, accents, code-mixing, multilingual switching, and region-specific speech behaviors common across India.",
      },
      {
        icon: "BrainCircuit",
        title: "Cognitive understanding over word mapping",
        desc: "CINTENT detects intent and preserves context instead of stopping at sentence-level translation.",
      },
    ],
    steps: [
      {
        n: "1",
        title: "Input",
        desc: "Live stream or batch audio capture from calls, meetings, broadcast workflows, or media files.",
      },
      {
        n: "2",
        title: "Processing",
        desc: "Speech-to-text and translation convert spoken language into structured multilingual content in real time.",
      },
      {
        n: "3",
        title: "CINTENT",
        desc: "Cognitive intent and context alignment refine raw translation into meaning-preserving, enterprise-ready output.",
      },
      {
        n: "4",
        title: "Output",
        desc: "Text, subtitled video, or synthesized voice is returned for direct use inside communication workflows.",
      },
    ],
    groups: [
      {
        title: "Launching with 6 languages, scaling to 42",
        items: [
          "English",
          "Hindi",
          "Gujarati",
          "Marathi",
          "Tamil",
          "Telugu",
          "Kannada",
          "Malayalam",
          "Bengali",
          "Punjabi",
          "Urdu",
          "Assamese",
          "Odia",
          "Code-mixed speech",
        ],
      },
      {
        title: "Built for every voice",
        items: [
          "Call Centers",
          "Audio/Video Conferencing",
          "Medical Transcriptions",
          "Legal Transcriptions",
          "Media & Journalism",
          "Education & E-Learning",
          "Government & Public Services",
        ],
      },
    ],
    architecture: [
      {
        title: "Audio Signal Processing",
        desc: "Noise reduction, acoustic enhancement, voice activity detection, speaker diarization, channel normalization.",
      },
      {
        title: "Shared Multilingual Encoder",
        desc: "Conformer/Transformer-based encoder trained on multilingual acoustic representations, capturing universal speech patterns.",
      },
      {
        title: "Contextual Routing & Adaptive Language Layer",
        desc: "Word/phrase-level language detection, adaptive routing for language transitions, real-time code-mixing handling.",
      },
      {
        title: "Language-Specific Acoustic Heads",
        desc: "Fine-tuned acoustic models per language with phoneme precision and dialect/accent adaptation.",
      },
      {
        title: "Cognitive Intent & Semantic Layer",
        desc: "Intent understanding, contextual reasoning, entity recognition, sentiment and tone, discourse continuity.",
      },
      {
        title: "Output & Intelligence",
        desc: "High-accuracy transcription, translation, insights & analytics, workflow integration.",
      },
    ],
    closingNote:
      "Built natively for Indian languages and accents — not adapted after the fact. Benchmark comparisons against commercial speech systems are being validated and will be published with methodology once evidenced.",
  },

  blisstrail: {
    overview:
      "BlissTrail is an AI-powered travel companion that understands you, anticipates your needs, and crafts every journey to match your preferences, style, and aspirations. It analyzes cost, weather, crowd and safety data across 500+ destinations and returns a TDIS score — a clear BOOK, WAIT, or AVOID signal — instead of another wall of listings.",
    stats: [{ value: "500+", label: "Destinations covered" }],
    features: [
      {
        icon: "IndianRupee",
        title: "Instant cost prediction",
        desc: "Real-time breakdowns for flights, hotels, food and activities before you book — no surprises.",
      },
      {
        icon: "BrainCircuit",
        title: "CINTENT analysis",
        desc: "A 6-layer intelligence engine processes your trip profile in milliseconds across 50+ data points.",
      },
      {
        icon: "Gauge",
        title: "TDIS smart recommendations",
        desc: "BOOK, WAIT, or AVOID signals backed by 5-factor data analysis for any destination.",
      },
      {
        icon: "Mic",
        title: "Voice search (EN & HI)",
        desc: "Search and plan hands-free in English or Hindi — natural language, understood perfectly.",
      },
      {
        icon: "CloudSun",
        title: "Weather intelligence",
        desc: "14-day forecasts with humidity, UV index, and crowd patterns matched to your travel dates.",
      },
      {
        icon: "Bus",
        title: "Transport optimizer",
        desc: "Compare 15+ modes of transport and get optimal routes tailored to budget and timeline.",
      },
    ],
    steps: [
      {
        n: "1",
        title: "Enter your details",
        desc: "Destination, travel dates, group size, and budget — in seconds.",
      },
      {
        n: "2",
        title: "CINTENT analysis",
        desc: "The AI scans 50+ data points: weather, events, prices, crowds, and safety.",
      },
      {
        n: "3",
        title: "Get predictions",
        desc: "Instant cost breakdowns, crowd forecasts, and weather outlooks.",
      },
      {
        n: "4",
        title: "Smart decision",
        desc: "Act on your TDIS score — book confidently, wait for better conditions, or avoid risks.",
      },
    ],
    architecture: [
      {
        title: "Cognitive",
        desc: "Deep learning models trained on 10+ years of global travel data, processing thousands of signals simultaneously.",
      },
      {
        title: "Intelligence",
        desc: "Synthesizes 50+ data streams into clear BOOK / WAIT / AVOID signals you can act on immediately.",
      },
      {
        title: "Network",
        desc: "A connected ecosystem of 1,000+ live data sources, 200+ data providers, and booking platforms.",
      },
      {
        title: "Execution",
        desc: "Sub-second response from query to full prediction on edge architecture.",
      },
      {
        title: "Navigation",
        desc: "15+ transport modes with live re-routing and last-mile connectivity.",
      },
      {
        title: "Technologies",
        desc: "Built on voice, vision, and predictive capabilities, with proprietary TDIS algorithms.",
      },
    ],
    closingNote:
      "Blissful journeys, intelligently yours — built on CINTENT, developed by Cognivanta Labs. Traveler testimonials will be published here once real, permissioned user reviews are collected.",
  },

  nyaynetra: {
    overview:
      "NyayNetra is revolutionizing legal assistance with AI-driven solutions, making justice accessible and efficient for citizens, legal professionals, and institutions — from FIR interpretation to case search, draft generation, and legal insight, all built on the CINTENT cognitive core.",
    heroImage:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1024,h=1024,fit=crop/mk3JQ4Zk2vtxe077/generated/generated-4x56FwVkm8gPcZwW.png",
    features: [
      {
        icon: "Search",
        title: "Case search tools",
        desc: "Quickly find relevant case information and legal precedents with advanced, context-aware search.",
      },
      {
        icon: "FileText",
        title: "Draft generation",
        desc: "Easily create legal documents and drafts tailored to specific needs and requirements.",
      },
      {
        icon: "Lightbulb",
        title: "Legal insights",
        desc: "Insightful legal analysis and guidance to navigate complex legal challenges effectively.",
      },
      {
        icon: "ShieldCheck",
        title: "Lawyer Trust Index",
        desc: "Scoring, review analysis, experience weightage and success patterns for lawyer discovery and recommendation.",
      },
    ],
    architecture: [
      {
        title: "Frontend & multilingual UI",
        desc: "React web app, mobile app, voice interface, and multilingual UI across English, Hindi, Hinglish and more.",
      },
      {
        title: "CINTENT cognitive engine",
        desc: "Intent detection, context mapping, legal ontology graph, multi-agent orchestration, and an explainability engine.",
      },
      {
        title: "Multi-agent system",
        desc: "Dedicated research, compliance, drafting, risk, and evidence agents working the case in parallel.",
      },
      {
        title: "Legal & case services",
        desc: "IPC/BNS mapping, case law search, case tracking, timeline engine, risk scoring, and a recommendation engine for next steps and lawyer suggestions.",
      },
    ],
    closingNote:
      "Intelligent. Trusted. Just. — CINTENT is the cognitive core behind every NyayNetra recommendation. Practitioner testimonials will be published here once permissioned, verifiable reviews are on file.",
  },

  chaxu: {
    overview:
      "CHAXU is Cognivanta's flagship autonomous aerial intelligence platform for drone and UAV OEMs, system integrators, and operators. It connects aircraft, sensors, docking infrastructure, mission command, telemetry, replay, and CINTENT reasoning into one hardware-agnostic operational layer. The result is a path from capable airframe to intelligent, coordinated, and governable aerial system.",
    heroImage: "/products/chaxu-a2.png",
    gallery: [
      "/products/chaxu-a1.png",
      "/products/chaxu-docking-station.png",
      "/products/chaxu-command-overview.png",
      "/products/chaxu-deployment-architecture.png",
    ],
    stats: [
      { value: "513", label: "Cataloged APIs" },
      { value: "5", label: "Aerial configurations" },
      { value: "24/7", label: "Mission operations model" },
      { value: "1", label: "CINTENT intelligence layer" },
    ],
    features: [
      {
        icon: "Network",
        title: "Hardware-agnostic integration",
        desc: "Connect aircraft, sensors, docks, and command systems across vehicle and sensor families without locking the operating model to one OEM stack.",
      },
      {
        icon: "BrainCircuit",
        title: "CINTENT mission intelligence",
        desc: "Unify mission context, sensor fusion, anomaly signals, reasoning overlays, confidence, and recommended response in one cognitive layer.",
      },
      {
        icon: "RadioTower",
        title: "Edge and cloud coordination",
        desc: "Support low-latency edge inference, real-time telemetry, hybrid deployment patterns, and operation when connectivity is constrained.",
      },
      {
        icon: "Waypoints",
        title: "Fleet and swarm orchestration",
        desc: "Coordinate mission tasking, formation logic, adaptive patrol, role assignment, and multi-drone collaboration through governed workflows.",
      },
      {
        icon: "Satellite",
        title: "Persistent operations",
        desc: "Link docking, charging readiness, health signals, return-to-dock continuity, and mission recovery into the operational picture.",
      },
      {
        icon: "History",
        title: "Replay and governance",
        desc: "Reconstruct telemetry, cognition, policy events, and operator actions so teams can review what happened and why.",
      },
    ],
    steps: [
      {
        n: "1",
        title: "Define the mission",
        desc: "Set the operating area, objective, assets, policies, alert thresholds, and human approval boundaries.",
      },
      {
        n: "2",
        title: "Connect the system",
        desc: "Integrate aircraft, flight control, payloads, telemetry, GIS, docks, enterprise systems, and the approved API surface.",
      },
      {
        n: "3",
        title: "Sense and reason",
        desc: "Fuse video, thermal, lidar, radar, RF, environmental, and mission signals into a current operational context.",
      },
      {
        n: "4",
        title: "Coordinate and act",
        desc: "Plan routes, dispatch assets, coordinate fleets, and adapt to alerts with explicit policy and operator controls.",
      },
      {
        n: "5",
        title: "Replay and improve",
        desc: "Review the mission record, validate outcomes, tune models and procedures, and carry evidence into the next mission.",
      },
    ],
    groups: [
      {
        title: "Mission and developer surfaces",
        items: [
          "Mission command and launch workflows",
          "Telemetry, vehicle status, and health signals",
          "Live WebSocket operational state",
          "Fleet, dock, tasking, and policy-aware orchestration",
          "Replay, audit, and incident reconstruction",
          "Secure APIs for OEM and enterprise integrations",
        ],
      },
      {
        title: "Built for autonomous operations",
        items: [
          "Smart city patrol and public infrastructure monitoring",
          "Port and maritime surveillance",
          "Factory and critical infrastructure inspection",
          "Disaster response and search operations",
          "Security, logistics, and remote mission support",
          "Drone OEM white-label and co-developed programs",
        ],
      },
      {
        title: "Technology partner proposition",
        items: [
          "Discovery, solution architecture, and integration planning",
          "Mission software, DCS, fleet management, and AI analytics",
          "Sensor fusion, payload integration, and edge inference",
          "GIS, digital twins, simulation, and hardware-in-the-loop testing",
          "Cybersecurity, secure communications, and governed access",
          "Deployment, training, support, and continuous optimization",
        ],
      },
    ],
    faqs: [
      {
        q: "Is CHAXU tied to one drone manufacturer?",
        a: "The CHAXU platform is designed as a hardware-agnostic intelligence and operations layer. The integration path depends on aircraft, flight-control, sensor, telemetry, and safety interfaces available from the OEM or system integrator.",
      },
      {
        q: "What can developers use the CHAXU APIs for?",
        a: "The API surface is intended for mission, launch, status, telemetry, cognition, replay, orchestration, and integration workflows that help teams build cognitive AI-based drone systems around their own hardware and operating model.",
      },
      {
        q: "Can CHAXU operate with limited connectivity?",
        a: "The architecture supports edge intelligence and hybrid operating patterns so latency-sensitive perception and decision support can remain close to the aircraft, while connected services provide broader coordination, analytics, and replay.",
      },
    ],
    closingNote:
      "CHAXU is the flagship aerial intelligence surface for turning drone and UAV hardware into mission-aware, API-connected, and governable autonomous systems. Open the product site for the mission experience or the API platform for integration paths.",
  },

  "health-hub": {
    overview:
      "Health Hub integrates 4,500+ healthcare APIs into a cognitive hospital AI: unifying EHR, lab results, imaging, medication history and allergy profiles into one decision context, cross-referencing clinical guidelines and hospital resource availability to recommend ranked, explainable care pathways.",
    stats: [{ value: "4,500+", label: "Healthcare APIs (catalog scope)" }],
    features: [
      {
        icon: "HeartPulse",
        title: "Emergency triage support",
        desc: "Rapidly integrates available information and surfaces likely diagnoses and immediate care pathways without slowing workflow.",
      },
      {
        icon: "Pill",
        title: "Drug interaction checking",
        desc: "Checks the patient's specific drug profile and shows interaction risks graded by severity, integrated with hospital formulary.",
      },
      {
        icon: "ShieldAlert",
        title: "Allergy & contraindication validation",
        desc: "Automatically screens recommendations against allergies, contraindications, and genetic factors.",
      },
      {
        icon: "Users",
        title: "Patient-specific pathway adaptation",
        desc: "Customizes evidence-based guidelines to age, comorbidities, organ function, and prior treatment response.",
      },
      {
        icon: "Bed",
        title: "Resource-aware recommendations",
        desc: "Suggests equally effective, currently-available care pathways when beds, staffing, or equipment are constrained.",
      },
      {
        icon: "TrendingUp",
        title: "Outcome tracking & learning",
        desc: "Tracks patient progress and improves recommendations for future, similar patient populations.",
      },
    ],
    steps: [
      {
        n: "1",
        title: "Data integration",
        desc: "Ingest from EHR, lab systems, imaging, and patient history, normalized across formats.",
      },
      {
        n: "2",
        title: "Clinical context assembly",
        desc: "Build the patient's cognitive state: symptoms, comorbidities, current medications, allergies, prior treatments.",
      },
      {
        n: "3",
        title: "Guideline retrieval",
        desc: "Match patient presentation to relevant clinical guidelines and evidence protocols.",
      },
      {
        n: "4",
        title: "Multi-pathway reasoning",
        desc: "Generate multiple evidence-based treatment pathways ranked by clinical appropriateness.",
      },
      {
        n: "5",
        title: "Safety validation",
        desc: "Check drug interactions, allergies, and contraindications against the hospital medication database.",
      },
      {
        n: "6",
        title: "Pathway recommendation",
        desc: "Rank final recommendations by clinical confidence, evidence strength, and resource feasibility.",
      },
    ],
    faqs: [
      {
        q: "Is it approved for clinical use?",
        a: "Health Hub is an MVP in early hospital-pilot planning, not yet in live clinical use, and holds no regulatory clearance today. It is designed to support clinician decision-making, not replace it — every recommendation would be reviewed and authorized by qualified clinical staff, and any clearance status will be published here only once actually obtained.",
      },
      {
        q: "How does it handle HIPAA and patient privacy?",
        a: "The architecture is designed for on-premise or HIPAA-compliant cloud deployment with patient data kept inside the hospital system and full audit logging — but no HIPAA compliance certification or independent audit has been completed yet. Treat this as the design intent, not a compliance claim, until that verification exists.",
      },
      {
        q: "Can it integrate with existing EHR systems?",
        a: "It's being built for HL7/FHIR interfaces to work with major EHR platforms. No production integration with a named EHR vendor has been completed yet, so specific integration timelines aren't published until a real deployment validates them.",
      },
    ],
    closingNote:
      "Domain and functional scope confirmed at 4,500+ APIs — the live healthhub.cintent.tech domain isn't public yet, so treat specifics above as the MVP direction pending final sign-off. Clinician testimonials will be published here once real, permissioned feedback is on file.",
  },

  cwos: {
    overview:
      "CINTENT WealthOS™ (CWOS) is India's first AI-native investment intelligence platform for every investor — replacing manual research with cognitive AI, quant signal generation, and autonomous research automation. Explainable. Governed. Always on.",
    heroImage:
      "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=1400&q=80&auto=format&fit=crop",
    stats: [{ value: "24/7", label: "AI-Powered Monitoring" }],
    features: [
      {
        icon: "Sparkles",
        title: "AI market intelligence",
        desc: "Real-time market understanding using multi-modal AI models, sentiment, and macro indicators.",
      },
      {
        icon: "FlaskConical",
        title: "Autonomous research factory",
        desc: "Generates institutional-grade research reports on any stock, sector, or theme in seconds.",
      },
      {
        icon: "LineChart",
        title: "Quant strategy engine",
        desc: "Discovers, backtests, and ranks quant strategies across market regimes automatically.",
      },
      {
        icon: "Wallet",
        title: "Intelligent portfolio management",
        desc: "Continuously optimizes your portfolio for return, risk, tax, and goals.",
      },
      {
        icon: "Eye",
        title: "Explainable AI decisions",
        desc: "Every recommendation comes with clear reasons, risks, and alternatives — What, Why, Why Not, Risk, Confidence.",
      },
      {
        icon: "ShieldCheck",
        title: "Human-governed AI",
        desc: "Every piece of research passes through analyst review — approval, audit trails, and decision traceability built in.",
      },
    ],
    architecture: [
      {
        title: "Intent Intelligence",
        desc: "Understands what the investor is actually trying to decide.",
      },
      {
        title: "Context Intelligence",
        desc: "Reads market, portfolio and macro context around every question.",
      },
      {
        title: "Knowledge Intelligence",
        desc: "Draws on structured research, fundamentals and market knowledge.",
      },
      {
        title: "Decision Intelligence",
        desc: "Synthesizes signals into a clear, ranked recommendation.",
      },
      {
        title: "Learning Intelligence",
        desc: "Improves continuously from research and portfolio outcomes.",
      },
      {
        title: "Explainable Intelligence",
        desc: "Shows the why behind every decision, not just the what.",
      },
    ],
    groups: [
      {
        title: "Built for every layer of the investment ecosystem",
        items: [
          "Retail Investors",
          "Active Traders",
          "Financial Advisors",
          "Research Analysts",
          "Quant Researchers",
          "Wealth Managers",
          "PMS & AIF Managers",
          "Family Offices",
          "Banks",
          "Institutions",
        ],
      },
      {
        title: "Coverage",
        items: [
          "NSE & BSE Stocks",
          "ETFs",
          "Mutual Funds",
          "Commodities",
          "Crypto",
          "Global Markets",
          "Macro Data",
        ],
      },
    ],
    pricing: [
      {
        name: "CWOS Investor",
        price: "₹9,999/mo + GST",
        audience: "Retail & HNI Investors",
        features: [
          "Portfolio Tracking & Analytics",
          "Live Market Intelligence",
          "Research Reports (read access)",
          "AI Investment Assistant",
          "Watchlists & Alerts",
        ],
      },
      {
        name: "CWOS Professional",
        price: "₹16,999/mo + GST",
        audience: "Active Investors, Advisors & Analysts",
        features: [
          "Everything in Investor",
          "Advanced Research Factory",
          "Portfolio Optimisation Engine",
          "Quant Signals & Factor Models",
          "Priority Support",
        ],
        highlight: true,
      },
      {
        name: "CWOS Elite",
        price: "₹24,999/mo + GST",
        audience: "Wealth Managers, Family Offices & Institutions",
        features: [
          "Everything in Professional",
          "Full Quant Intelligence Workbench",
          "Decision Intelligence Engine",
          "Multi-client Portfolio Management",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom Pricing",
        audience: "Institutions, banks & asset managers",
        features: [
          "On-premise or private cloud deployment",
          "Custom AI model fine-tuning",
          "White-label options",
          "SLA-backed uptime guarantee",
        ],
      },
    ],
    faqs: [
      {
        q: "Is CWOS SEBI-registered investment advice?",
        a: "No — CWOS is a research and analytics platform. All AI recommendations are clearly labeled and governed by human analyst oversight; investment decisions remain the investor's.",
      },
      {
        q: "Where does live market data come from?",
        a: "Finnhub, Alpha Vantage, FRED, CoinGecko, and NSE/BSE direct feeds — every data point is time-stamped and source-labeled.",
      },
    ],
    closingNote:
      "Currently in demonstration and pilot deployment phase — pilot customer, advisor partner, institutional evaluation, and investor demonstration programs are open.",
  },

  ikshana: {
    heroImage: "/products/ikshana-logo.webp",
    overview:
      "IKSHANA is a governance-first marketplace and product-design ecosystem for drones, UAVs, robots, cobots, and autonomous products — connecting OEMs, distributors, service partners, and institutional buyers through compliance-first procurement (DGCA, FAA, EASA, NDAA), vendor trust, and an engineering workspace for designing and simulating autonomous products.",
    features: [
      {
        icon: "ShieldCheck",
        title: "Governance-first marketplace",
        desc: "Procurement workflows built around trust, policy, evidence, fair dealing, and auditability.",
      },
      {
        icon: "Globe2",
        title: "Compliance-ready ecosystem",
        desc: "DGCA, FAA, EASA, NDAA, country guidance, and future rule-mapping foundations.",
      },
      {
        icon: "Wrench",
        title: "Engineering-driven procurement",
        desc: "Catalog discovery connected to design, compatibility, simulation, and technical readiness.",
      },
      {
        icon: "Store",
        title: "Trusted vendor network",
        desc: "Vendor, supplier, and support governance with country intelligence signals.",
      },
      {
        icon: "Layers",
        title: "Future-ready design studio",
        desc: "A prepared path for design studio, simulation, digital twins, and validation workflows.",
      },
      {
        icon: "Bot",
        title: "CHAXU + CINTENT powered",
        desc: "Designed for future CHAXU operations and CINTENT cognitive intelligence integration.",
      },
    ],
    groups: [
      {
        title: "IKSHANA + BYO-BOT",
        items: [
          "IKSHANA marketplace — discover governed products, parts, vendors, and services",
          "BYO-BOT design studio — configure drones, UAV/UAS, robots, and cobots",
          "Move from design intent to compatibility, simulation, and procurement readiness",
        ],
      },
      {
        title: "Built for",
        items: [
          "OEMs & authorized distributors",
          "Service & support partners",
          "Product design companies & system integrators",
          "Bulk sellers & procurement aggregators",
          "Defense & government procurement teams",
        ],
      },
      {
        title: "Guided procurement paths",
        items: [
          "Enterprise — compliance-first operations",
          "Pro Builder — compatibility & design workflows",
          "Hobbyist — curated, compliance-safe discovery",
        ],
      },
    ],
    faqs: [
      {
        q: "What is IKSHANA?",
        a: "A governance-first marketplace and product design ecosystem for drones, UAVs, robots, cobots, autonomous products, parts, software, and the partners around them.",
      },
      {
        q: "Can buyers design their own autonomous product?",
        a: "IKSHANA prepares the path for product design workflows — planning drones, robots, cobots and payload systems together with compatibility checks, simulation, and validation.",
      },
      {
        q: "How does IKSHANA handle product imagery?",
        a: "Only real OEM or authorized-vendor product photographs are published, after evidence review and admin approval — no stock, generated, or placeholder product images.",
      },
    ],
    closingNote:
      "Early access is open around trust first: waitlist capture, compliance education, vendor discovery, and OEM image governance — ahead of the full governed marketplace.",
  },

  cobots: {
    overview:
      "Cognitive Cobots combine situational awareness, task memory, and adaptive assistance for human-alongside industrial and service settings — collaborative machines that plan multi-step task sequences with human-safe constraints and real-time adaptation, all reasoning through the same CINTENT core as every other pilot.",
    features: [
      {
        icon: "Bot",
        title: "Situational awareness",
        desc: "Perceives the shared workspace and the humans in it — not just the task in front of it.",
      },
      {
        icon: "Layers",
        title: "Task memory",
        desc: "Retains context across a multi-step sequence instead of treating each action as an isolated command.",
      },
      {
        icon: "Users",
        title: "Human-safe constraints",
        desc: "Plans and adapts within explicit safety boundaries designed for humans working alongside the machine.",
      },
      {
        icon: "RefreshCw",
        title: "Real-time adaptation",
        desc: "Adjusts task sequences on the fly as the environment, workload, or human collaborator changes.",
      },
    ],
    closingNote:
      "Currently in Research → Pilot stage — an embodied-robotics pilot testing how CINTENT's memory and constraint reasoning hold up outside pure software domains.",
  },

  awcs: {
    stats: [
      { value: "8", label: "Cognitive layers" },
      { value: "6", label: "Core capabilities" },
      { value: "1", label: "Shared CINTENT core" },
    ],
    architecture: [
      {
        title: "User experience",
        desc: "Voice, mobile, touch, gesture, accessibility, feedback and notification surfaces keep the rider and operators in control.",
      },
      {
        title: "Intent understanding",
        desc: "Translates rider goals, travel intent, preferences, accessibility needs and context into an explicit mobility request.",
      },
      {
        title: "Perception and context",
        desc: "Combines obstacle, human, scene, location and situational signals into a live understanding of the environment.",
      },
      {
        title: "CINTENT cognitive core",
        desc: "Applies memory, reasoning, planning, learning, safety and ethics to produce explainable, constrained mobility decisions.",
      },
      {
        title: "Orchestration and execution",
        desc: "Turns approved decisions into task scheduling, route planning, adaptive navigation, real-time control and monitored execution.",
      },
      {
        title: "Ecosystem integration",
        desc: "Connects approved airport, building, healthcare, IoT, emergency, cloud and third-party services through governed interfaces.",
      },
      {
        title: "Data and knowledge",
        desc: "Stores governed knowledge graphs, user profiles, experience memory, context and policy rules to support continuous improvement.",
      },
      {
        title: "Observability and governance",
        desc: "Preserves explainability, audit logs, monitoring, safety compliance, security, privacy and ethical oversight.",
      },
    ],
    heroImage: "/products/awcs-architecture.png",
    overview:
      "The Autonomous Wheelchair (AWCS) is an assistive mobility system focused on safe navigation, human override, and intelligent context awareness under constrained, real-world conditions — mobility that respects the rider's autonomy while reasoning continuously about the space around them.",
    features: [
      {
        icon: "Accessibility",
        title: "Safe navigation",
        desc: "Continuous perception and path-planning tuned for indoor and mixed pedestrian environments.",
      },
      {
        icon: "Hand",
        title: "Human override, always",
        desc: "The rider retains control at every point — autonomy assists, it doesn't replace, the person's decisions.",
      },
      {
        icon: "MapPin",
        title: "Intelligent context",
        desc: "Understands doorways, ramps, crowds, and obstacles as situational context, not just as static geometry.",
      },
      {
        icon: "ShieldCheck",
        title: "Constrained-condition reliability",
        desc: "Designed to hold up under the real, imperfect conditions of everyday mobility — not just a clean test course.",
      },
    ],
    closingNote:
      "Currently in pilot — an assistive-autonomy program testing CINTENT's constraint reasoning where safety and human dignity are the primary design constraints.",
  },

  externovate: {
    heroImage: "/products/externovate-catalogue.png",
    overview:
      "Externovate™ is a global talent and innovation platform connecting students, researchers, universities, enterprises, mentors, and investors through real-world opportunities — internships, research placements, publishing, and career intelligence, matched by CINTENT™ and anchored by a verified Digital Career Passport™.",
    stats: [
      { value: "15+", label: "Countries" },
      { value: "8", label: "Core Modules" },
    ],
    gallery: [
      "/products/externovate-catalogue-alt.png",
      "/products/externovate-catalogue-teasers.png",
      "/products/externovate-internship-program.jpg",
    ],
    features: [
      {
        icon: "Users",
        title: "Student & Career Hub",
        desc: "Profiles, skills, resumes, portfolio and applications in one place.",
      },
      {
        icon: "Building2",
        title: "University Network",
        desc: "University profiles, departments, labs, and collaborations.",
      },
      {
        icon: "Briefcase",
        title: "Enterprise & Internships",
        desc: "Internships, jobs, programs and employer branding for companies hunting future talent.",
      },
      {
        icon: "BookOpen",
        title: "Research & Knowledge",
        desc: "Research papers, whitepapers, and articles, published and discovered in one repository.",
      },
      {
        icon: "Rocket",
        title: "Innovation & Investors",
        desc: "Startups, pitches, funding, incubation and investor discovery for student-led ventures.",
      },
      {
        icon: "Fingerprint",
        title: "Digital Career Passport™",
        desc: "An AI-powered career digital twin — understands education, skills and goals, and recommends opportunities.",
      },
    ],
    architecture: [
      {
        title: "Career Intelligence Engine",
        desc: "AI-driven career insights and guidance drawn from a student's full academic and project history.",
      },
      {
        title: "Matching Engine",
        desc: "Matches students to opportunities — internships, jobs, mentors, and universities.",
      },
      {
        title: "Recommendation Engine",
        desc: "Personalized recommendations across programs, research, and connections.",
      },
      {
        title: "Skill Gap Analysis",
        desc: "Identifies gaps and learning paths against a student's target roles.",
      },
      {
        title: "Digital Twin (Career Twin)",
        desc: "An AI-powered career digital twin that understands education, skills, and goals to guide next steps.",
      },
    ],
    groups: [
      {
        title: "Who it's for",
        items: [
          "Students",
          "Researchers",
          "Universities",
          "Enterprises",
          "Mentors",
          "Investors",
          "Government & Organizations",
        ],
      },
    ],
    closingNote:
      "Learn. Build. Publish. Innovate. — connecting the brightest minds worldwide before graduation, on the same CINTENT™ intelligence layer as the rest of the ecosystem.",
  },

  askcogni: {
    overview:
      "AskCOGNI is a provider-neutral interactive preview for exploring CINTENT's intent, context and decision concepts. The production AI backend is not active in this preview; it is an experience and information surface for reviewing the cognitive workflow.",
    features: [
      {
        icon: "MessageSquareText",
        title: "Scenario exploration",
        desc: "Walk through representative questions and see how an intent-to-decision experience is structured.",
      },
      {
        icon: "BrainCircuit",
        title: "Intent and context framing",
        desc: "Explore how a request can be organized around intent, context, constraints and a governed next step.",
      },
      {
        icon: "ShieldCheck",
        title: "Provider-neutral by design",
        desc: "The preview does not activate or imply a production AI provider, stored user profile, or autonomous action.",
      },
      {
        icon: "Sparkles",
        title: "CINTENT experience layer",
        desc: "Use the preview to understand the platform language before connecting an approved implementation.",
      },
    ],
    steps: [
      { n: "1", title: "Ask", desc: "Enter or select a scenario for the preview experience." },
      {
        n: "2",
        title: "Understand",
        desc: "Review the intent and context framing presented by the interface.",
      },
      {
        n: "3",
        title: "Decide",
        desc: "Inspect the governed decision concept and its constraints.",
      },
      {
        n: "4",
        title: "Review",
        desc: "Use the external preview CTA when the owner-approved experience is available.",
      },
    ],
    closingNote:
      "Provider-neutral preview only. Live AI backend functionality, production credentials and autonomous actions are not active here.",
  },

  "cogni-doc": {
    overview:
      "COGNI Doc is CINTENT-powered document reasoning — contract analysis, risk extraction, and structured, explainable summaries for legal, compliance, and enterprise document workflows. It follows the same decision model CINTENT applies elsewhere: a structured output with confidence, risk, and reasoning, not just a text summary.",
    features: [
      {
        icon: "FileSearch",
        title: "Contract analysis",
        desc: "Reads full contract text and surfaces clauses, obligations, and risk factors, not just keyword matches.",
      },
      {
        icon: "AlertTriangle",
        title: "Risk extraction",
        desc: "Flags risk by category — e.g. volume commitments, termination clauses, enforceability — the same structure CINTENT uses in its legal decisioning demos.",
      },
      {
        icon: "CheckCircle2",
        title: "Structured, explainable summaries",
        desc: "Every summary shows its reasoning — inputs, clauses relied on, and confidence — instead of an opaque paragraph.",
      },
    ],
    closingNote:
      "Added per Ron's note — description is a best guess from the CINTENT contract-analysis demo; scope, domain, and status still need confirmation before this goes further.",
  },
};
