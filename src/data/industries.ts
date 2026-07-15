export interface Industry {
  name: string;
  icon: string;
  description: string;
}

export const industries: Industry[] = [
  {
    name: "Healthcare",
    icon: "HeartPulse",
    description: "Clinical decision support and care-pathway reasoning across 4500+ APIs.",
  },
  {
    name: "Robotics",
    icon: "Bot",
    description: "Situationally-aware autonomy for industrial and service robots.",
  },
  {
    name: "Cobots",
    icon: "Hand",
    description: "Human-alongside collaborative machines with task memory.",
  },
  {
    name: "Drones",
    icon: "Plane",
    description: "Mission-aware flight planning, sensor fusion and dynamic replanning.",
  },
  {
    name: "Autonomous Systems",
    icon: "Cpu",
    description: "Perception → decision → action loops for real-world autonomy.",
  },
  {
    name: "Mobility",
    icon: "Car",
    description: "Assistive and autonomous mobility under constrained conditions.",
  },
  {
    name: "Legal AI",
    icon: "Scale",
    description: "Evidentiary navigation and procedural reasoning for legal work.",
  },
  {
    name: "Multilingual Systems",
    icon: "Languages",
    description: "Cognitive understanding across languages and scripts.",
  },
  {
    name: "Travel AI",
    icon: "Compass",
    description: "Adaptive, reflective travel and wellbeing intelligence.",
  },
  {
    name: "Enterprise Intelligence",
    icon: "Building2",
    description: "Decision intelligence and governance for enterprise workflows.",
  },
  {
    name: "BFSI / Finance",
    icon: "Landmark",
    description: "Explainable reasoning for risk, compliance and advisory.",
  },
  {
    name: "Cybersecurity",
    icon: "ShieldCheck",
    description: "Intent-aware detection and response across evolving threats.",
  },
];
