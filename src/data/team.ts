export type TeamGroup = "leadership" | "advisor";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  group: TeamGroup;
  bio: string;
  photo?: string;
}

export const team: TeamMember[] = [
  {
    id: "rajesh",
    name: "Rajesh",
    role: "Founder, CTO & CEO",
    group: "leadership",
    bio: "IIT Bombay alumnus with 34+ years leading AI, IoT and telecom globally, including 14 years as Regional Head (Digital & IoT) – EMEA at Tech Mahindra. Founded Cognivanta Labs in 2023 to build CINTENT — a deterministic, explainable cognitive engine with no generative LLM, running under 500ms at under $0.0001 per query. Built BlissTrail as CINTENT's first proof of concept.",
    photo: "/team/rajesh.png",
  },
  {
    id: "kunal",
    name: "Kunal Bindal",
    role: "Director of Business & Partner Development",
    group: "leadership",
    bio: "18+ years in international business development and technology transfer across Asia, Europe and the US, with a track record building partnerships for Marubeni, Toyota, SK Group and Mitsubishi. Leads CINTENT's enterprise pilots, partner negotiations and channel ecosystem.",
    photo: "/team/kunal.png",
  },
  {
    id: "rashi",
    name: "Rashi",
    role: "Business & Strategic Initiatives",
    group: "leadership",
    bio: "Shapes CINTENT's go-to-market strategy and partnership roadmap, translating the platform's deterministic reasoning into clear value for enterprise customers across travel, legal and supply chain. Drives licensing strategy, pilot identification and cross-functional execution.",
    photo: "/team/rashi.png",
  },
  {
    id: "srinivas",
    name: "Srinivas",
    role: "VP of Engineering / Head of Full Stack",
    group: "leadership",
    bio: "20-year engineering leader who architected IssueBook, a global fixed-income issuance system at IHS Markit, and built Kafka/Storm pipelines processing millions of daily trades at Deutsche Bank. Leads engineering to turn BlissTrail, NyayNetra and other prototypes into a multi-tenant cognitive platform.",
    photo: "/team/srinivas.png",
  },
  {
    id: "rupam",
    name: "Rupam Arora",
    role: "Delivery & Operations",
    group: "leadership",
    bio: "Program Director with 15+ years leading large-scale digital transformation, AI strategy and PMO governance across Fortune 500 organizations, including CareFirst BlueCross BlueShield, T. Rowe Price, Cigna, PNC and Bank of America. PMP, PMI-CPMAI and SAFe SPC certified; leads delivery and operations at Cognivanta Labs.",
    photo: "/team/rupam.png",
  },
  {
    id: "lakshith",
    name: "Lakshith",
    role: "Technical Owner, CINTENT Core Cognitive Components",
    group: "leadership",
    bio: "Architects CINTENT's agent orchestration, episodic memory retrieval and frontend integration. Built ProApp, an AI-powered social accountability platform, and a real-time university seat-availability tracker; AWS Cloud Practitioner certified, proficient in Python, Java and React Native.",
    photo: "/team/lakshith.png",
  },
  {
    id: "oscar",
    name: "Oscar Dieguez Manzano",
    role: "Microsoft Technologist",
    group: "leadership",
    bio: "Madrid-based senior technology architect with 20+ years in enterprise integration, AI and cloud platforms across Santander UK, Vodafone Spain, IFRC and Accenture. Brings deep Azure, Power Platform and Generative AI expertise to CINTENT's architecture.",
    photo: "/team/oscar.png",
  },
  {
    id: "amit",
    name: "Amit Mishra",
    role: "Strategic Finance Advisor",
    group: "advisor",
    bio: "Founder of Dazeinfo, an AI-powered market intelligence platform, and Venture Partner at 3to1 Capital backing early-stage startups. Advises CINTENT on fund-raising, financial modeling, valuation and investor readiness.",
    photo: "/team/amit.png",
  },
  {
    id: "dr-sridhar",
    name: "Dr. Sridhar Raghavan",
    role: "Visionary Head & Senior Advisor, CINTENT",
    group: "advisor",
    bio: "Senior Director of Product Management at Salesforce AI Research, with prior leadership roles at Nokia, Nortel and Nuance Communications spanning speech recognition, NLP and generative AI. Ph.D. from Georgia State University, Master's from IIT Bombay; guides CINTENT's strategic vision.",
    photo: "/team/dr-sridhar.png",
  },
  {
    id: "dr-asoke",
    name: "Dr. Asoke Talukedar",
    role: "Technical Advisor & Tech Strategy Head, CINTENT",
    group: "advisor",
    bio: "30+ year deep-tech veteran with senior technology roles at Microsoft, Oracle, HP and Digital, and former DaimlerChrysler Chair Professor at IIIT-Bangalore. Co-founded Cellnext and InterpretOmics; leads CINTENT's technical strategy and architecture roadmap.",
    photo: "/team/dr-asoke.png",
  },
];
