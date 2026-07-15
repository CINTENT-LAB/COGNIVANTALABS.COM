import * as Icons from "lucide-react";

type LucideIconComponent = typeof Icons.Sparkles;

const iconRegistry = Icons as unknown as Record<string, LucideIconComponent | undefined>;

export function getLucideIcon(name: string): LucideIconComponent {
  return iconRegistry[name] ?? Icons.Sparkles;
}
