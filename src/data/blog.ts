export type BlogEntry = {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: string;
  format: "Article" | "Post" | "Research paper" | "Visual publication";
  href: string;
  external: true;
};

// Public publications are catalogued here so the Blog page has one source of truth
// for titles, labels, summaries, and external destinations.
export const blogEntries: BlogEntry[] = [
  {
    id: "quantum-cognition",
    title: "Beyond Deep Learning: The Coming Fusion of Quantum Computing and Cognitive AI",
    summary:
      "An exploration of how quantum computing and cognitive AI could reshape problem-solving across science, medicine, and industry.",
    source: "LinkedIn",
    category: "Research",
    format: "Article",
    href: "https://www.linkedin.com/posts/parmarr_quantum-computing-with-cognition-activity-7421264880093126656-Pw3q",
    external: true,
  },
  {
    id: "cognitive-platforms-frontier",
    title: "Cognitive AI Platforms: The Next Frontier in Artificial Intelligence",
    summary:
      "A public CINTENT article on cognitive AI platforms and the next frontier in artificial intelligence.",
    source: "CINTENT Blog",
    category: "Platform",
    format: "Article",
    href: "https://cintent.blogspot.com/2026/07/cognitive-ai-platforms-next-frontier-in.html",
    external: true,
  },
  {
    id: "trust-ethics-machines",
    title: "How Cognitive AI Builds Trust and Ethics in Machines",
    summary:
      "A perspective on how context, emotion, and intent can support trust, awareness, and ethical autonomy in intelligent systems.",
    source: "LinkedIn",
    category: "Trust and safety",
    format: "Post",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7393643910230663168/",
    external: true,
  },
  {
    id: "precision-oncology",
    title: "CINTENT: AI for Cancer Care Optimization",
    summary:
      "A precision oncology perspective on treatment pathways, clinical decision support, and personalized therapy planning.",
    source: "LinkedIn",
    category: "Healthcare",
    format: "Post",
    href: "https://www.linkedin.com/posts/cognivanta-labs_cintent-ai-for-smarter-oncology-treatment-activity-7346553324071997441-Sn6-",
    external: true,
  },
  {
    id: "smart-manufacturing",
    title: "Cognitive AI in Autonomous Robots and Cobots for Smart Manufacturing",
    summary:
      "How perception, reasoning, adaptation, and edge intelligence can support safer collaboration between people, robots, and cobots.",
    source: "LinkedIn",
    category: "Robotics",
    format: "Article",
    href: "https://www.linkedin.com/pulse/cognitive-ai-smart-manufacturing-rajesh-parmar-mkffc",
    external: true,
  },
  {
    id: "criminal-profiling",
    title: "Cognitive AI for Automated Criminal Profiling",
    summary:
      "A public-sector perspective on using cognitive AI to support investigative workflows and structured decision-making.",
    source: "LinkedIn",
    category: "Public sector",
    format: "Post",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7336744850379128834/",
    external: true,
  },
  {
    id: "cognitive-ai-medtech",
    title: "Cognitive AI in MedTech",
    summary:
      "Owner-supplied Medium article on cognitive AI in medical technology; build-time preview metadata was unavailable.",
    source: "Medium",
    category: "Healthcare",
    format: "Article",
    href: "https://medium.com/@arinvyas/cognitive-ai-in-medtech-fcc9eea37940",
    external: true,
  },
  {
    id: "human-centric-cognitive-ai",
    title: "The Rise of Cognitive AI in a Human-Centric World",
    summary: "A look at the human-centric future of neuro-symbolic AI and cognitive computing.",
    source: "LinkedIn",
    category: "Research",
    format: "Article",
    href: "https://www.linkedin.com/pulse/rise-cognitive-ai-human-centric-world-cognivanta-labs-h0kfc",
    external: true,
  },
  {
    id: "ssrn-criminal-profiling",
    title:
      "Cognitive AI for Automated Criminal Profiling, FIR Summarization and Investigation Dashboards",
    summary:
      "Research on cognitive AI for criminal profiling, FIR summarization, and investigation dashboards.",
    source: "SSRN",
    category: "Research",
    format: "Research paper",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5284319",
    external: true,
  },
  {
    id: "from-generative-to-cognitive",
    title: "From Generative AI to Cognitive AI",
    summary: "A public CINTENT article tracing the shift from generative AI toward cognitive AI.",
    source: "CINTENT Blog",
    category: "Platform",
    format: "Article",
    href: "https://cintent.blogspot.com/2026/07/from-generative-ai-to-cognitive-ai.html",
    external: true,
  },
  {
    id: "cognivanta-visual-publication",
    title: "Cognivanta Labs Visual Publication",
    summary: "Owner-supplied Canva publication for the Cognivanta Labs content catalogue.",
    source: "Canva",
    category: "Visual publication",
    format: "Visual publication",
    href: "https://www.canva.com/design/DAFwdzRyKcI/J0GMkEf_DKFUSPrXe52F2w/view",
    external: true,
  },
  {
    id: "political-consulting-related",
    title: "Political Consulting, A New Avenue @LARGE!",
    summary:
      "External LinkedIn publication supplied by the owner and included as a related publication, not a Cognivanta Labs article.",
    source: "LinkedIn",
    category: "Related publication",
    format: "Post",
    href: "https://www.linkedin.com/posts/all-large_political-consulting-a-new-avenue-large-activity-7104478448454152192-KJjE",
    external: true,
  },
];
