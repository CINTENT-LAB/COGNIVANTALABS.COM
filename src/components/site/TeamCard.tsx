import { User } from "lucide-react";
import type { TeamMember } from "@/data/team";

function initialsOf(name: string) {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="glass glass-hover relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-[color-mix(in_oklab,var(--electric)_35%,transparent)] to-transparent opacity-60 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-white/95 ring-1 ring-white/10">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="font-display text-lg font-bold text-background">
              {initialsOf(member.name) || <User className="h-6 w-6" />}
            </span>
          )}
        </div>
        <div>
          <div className="font-display text-lg font-bold tracking-tight">{member.name}</div>
          <div className="mt-0.5 kicker">{member.role}</div>
        </div>
      </div>
      <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
    </div>
  );
}
