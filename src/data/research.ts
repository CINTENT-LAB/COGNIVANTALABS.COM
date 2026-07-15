export const researchCapabilities = [
  "Multimodal perception",
  "Intent understanding",
  "Persistent context",
  "Short and long-term memory",
  "Knowledge representation",
  "Contextual and causal reasoning",
  "Multi-scenario decision evaluation",
  "Policy and permission controls",
  "Human oversight",
  "Safe action execution",
  "Outcome-driven learning",
  "Auditability and lineage",
] as const;

export const researchPrinciples = [
  {
    number: "01",
    title: "Context Before Response",
    body: "A system should understand the operating situation, history, objective, actors, and constraints before producing an answer or taking an action.",
  },
  {
    number: "02",
    title: "Memory Before Repetition",
    body: "Intelligent systems should preserve relevant state and learn from previous interactions instead of treating every event as isolated.",
  },
  {
    number: "03",
    title: "Reasoning Before Execution",
    body: "Actions should follow structured evaluation of evidence, alternatives, policies, risks, and expected outcomes.",
  },
  {
    number: "04",
    title: "Governance Before Autonomy",
    body: "Permissions, safety boundaries, accountability, and human intervention must remain integral to intelligent operation.",
  },
  {
    number: "05",
    title: "Reuse Before Reinvention",
    body: "Foundational cognitive capabilities should be reusable across industries rather than rebuilt separately for every application.",
  },
  {
    number: "06",
    title: "Research Through Application",
    body: "Platform research should be tested through practical domain systems, pilots, simulations, and operational feedback.",
  },
] as const;

export const researchAreas = [
  {
    id: "architecture",
    title: "Cognitive Intelligence Architecture",
    intro:
      "Architectures that connect perception, intent, context, memory, reasoning, decisions, action, and learning into a continuous system.",
    topics: [
      "Persistent cognitive state",
      "Context models",
      "Cognitive control loops",
      "Decision provenance",
      "Model orchestration",
      "Human-in-the-loop systems",
      "Cognitive runtime architectures",
    ],
  },
  {
    id: "intent",
    title: "Intent and Context Understanding",
    intro:
      "How systems interpret explicit instructions, implied goals, environmental conditions, operational history, and organisational constraints.",
    topics: [
      "Explicit and implicit intent",
      "Multimodal intent signals",
      "Context continuity",
      "Situational awareness",
      "Entity and relationship modelling",
      "Organisational context",
      "Human-machine interaction patterns",
    ],
  },
  {
    id: "memory",
    title: "Cognitive Memory and Knowledge",
    intro:
      "Memory systems that support continuity and reasoning beyond document retrieval or prompt history.",
    topics: [
      "Working memory",
      "Episodic memory",
      "Semantic memory",
      "Procedural memory",
      "Organisational memory",
      "Knowledge graphs",
      "Temporal knowledge",
      "Memory relevance and decay",
      "Memory governance",
    ],
  },
  {
    id: "reasoning",
    title: "Reasoning and Decision Intelligence",
    intro:
      "Methods for evaluating complex situations where evidence is incomplete, objectives conflict, and policies constrain actions.",
    topics: [
      "Contextual reasoning",
      "Causal reasoning",
      "Constraint-aware reasoning",
      "Multi-scenario evaluation",
      "Risk-aware decisioning",
      "Confidence calibration",
      "Alternative generation",
      "Trade-off analysis",
      "Decision explanation",
    ],
  },
  {
    id: "multiagent",
    title: "Multi-Agent and Collaborative Intelligence",
    intro: "Specialised capabilities coordinated together rather than one monolithic system.",
    topics: [
      "Role-based cognitive agents",
      "Shared memory",
      "Agent coordination",
      "Task decomposition",
      "Controlled handoffs",
      "Conflict resolution",
      "Decision synthesis",
      "Multi-agent governance",
      "Human-agent collaboration",
    ],
  },
  {
    id: "governed",
    title: "Responsible and Governed AI",
    intro:
      "Governance represented in system architecture and runtime behaviour, not just policy documents.",
    topics: [
      "Policy-aware reasoning",
      "Permission-based action",
      "Human approval",
      "Explainability",
      "Audit and lineage",
      "Intervention and override",
      "Safety thresholds",
      "Accountability models",
      "Responsible learning",
    ],
  },
  {
    id: "simulation",
    title: "Cognitive Simulation and Digital Twins",
    intro:
      "Simulating decisions, workflows, environments, and outcomes before real-world execution.",
    topics: [
      "Scenario simulation",
      "Cognitive digital twins",
      "Policy simulation",
      "Operational modelling",
      "Outcome forecasting",
      "Sensitivity analysis",
      "Mission simulation",
      "Enterprise process simulation",
    ],
  },
  {
    id: "edge",
    title: "Edge and Autonomous Intelligence",
    intro: "Intelligence operating near devices, sensors, machines, and physical environments.",
    topics: [
      "Edge cognition",
      "Local decision loops",
      "Low-latency reasoning",
      "Intermittent-connectivity resilience",
      "Edge-to-cloud coordination",
      "Embedded governance",
      "Autonomous systems safety",
      "Device and mission intelligence",
    ],
  },
  {
    id: "human-ai",
    title: "Human-AI Collaboration",
    intro:
      "AI that augments human judgement without obscuring responsibility or replacing necessary expertise.",
    topics: [
      "Human oversight",
      "Explainable recommendations",
      "Collaborative decision-making",
      "Cognitive assistance",
      "Voice and multimodal interfaces",
      "Adaptive user experiences",
      "Human-controlled autonomy",
      "Trust and interaction design",
    ],
  },
] as const;

export const researchDomains = [
  {
    title: "Healthcare Intelligence",
    body: "Context-aware healthcare systems, clinical information reasoning, consent, patient journeys, governance, medical workflows, and responsible decision support.",
    image:
      "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Aerial Autonomy",
    body: "Drones, UAVs, UAS, mission intelligence, fleet coordination, telemetry reasoning, edge autonomy, simulation, and governed aerial operations.",
    image:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Finance and Wealth Intelligence",
    body: "Explainable financial intelligence, market context, portfolio reasoning, risk interpretation, and governed decision support.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Legal Intelligence",
    body: "Document understanding, legal context, case relationships, regulation analysis, evidence reasoning, and explainable legal assistance.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Robotics and Autonomous Systems",
    body: "Human-machine coordination, task intelligence, sensor fusion, safe action execution, and adaptive physical systems.",
    image:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Enterprise Intelligence",
    body: "Decision workflows, organisational memory, operational context, process intelligence, and governed automation.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
  },
] as const;

export const researchPipeline = [
  "Research question",
  "Architecture",
  "Prototype",
  "Simulation",
  "Domain implementation",
  "Pilot",
  "Reusable CINTENT capability",
  "Enterprise deployment",
] as const;

export const researchCintentCapabilities = [
  "Intent and context engines",
  "Cognitive memory",
  "Knowledge graphs",
  "Reasoning services",
  "Decision intelligence",
  "Governance engines",
  "Multi-agent orchestration",
  "Action services",
  "Learning loops",
  "Simulation",
  "Observability",
  "Audit and lineage",
] as const;

export const researchEvaluationDimensions = [
  {
    title: "Grounding",
    body: "Can the system distinguish supported evidence from an assumption or an unsupported inference?",
  },
  {
    title: "Constraint adherence",
    body: "Does it respect permissions, policies, risk boundaries, and human approval requirements?",
  },
  {
    title: "Decision traceability",
    body: "Can a reviewer understand the context, alternatives, decision, and action path?",
  },
  {
    title: "Recovery quality",
    body: "When context is incomplete or a tool fails, does the system pause, recover, or ask for help appropriately?",
  },
] as const;

export const researchFaqs = [
  [
    "What kind of research does Cognivanta Labs conduct?",
    "Cognivanta Labs conducts applied research in cognitive intelligence, enterprise AI, decision systems, memory, reasoning, governance, autonomous systems, and human-AI collaboration.",
  ],
  [
    "Is Cognivanta Labs a university research organisation?",
    "No. Cognivanta Labs is a deep-technology company that combines applied research, platform engineering, domain development, and enterprise implementation.",
  ],
  [
    "How is research connected to CINTENT?",
    "CINTENT is the platform through which research outcomes are converted into reusable cognitive capabilities, APIs, workflows, runtime services, and domain intelligence.",
  ],
  [
    "Does Cognivanta Labs publish research?",
    "Research output may include papers, technical notes, architecture reports, white papers, conference material, and domain studies. Publication status is stated for every item.",
  ],
  [
    "Can universities collaborate with Cognivanta Labs?",
    "Yes. Collaboration may include joint research, internships, platform experimentation, publications, domain studies, and technology-transfer programmes.",
  ],
  [
    "Can enterprises propose research problems?",
    "Yes. Enterprises can propose domain problems, pilot opportunities, operational simulations, and collaborative research programmes.",
  ],
  [
    "How are research risks governed?",
    "Research is expected to follow security, privacy, human-oversight, explainability, and domain-governance requirements before real-world implementation.",
  ],
] as const;
