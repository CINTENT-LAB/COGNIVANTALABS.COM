const nodes = [
  { label: "CHAXU", angle: 0 },
  { label: "NyayNetra", angle: 45 },
  { label: "Shunya AI", angle: 90 },
  { label: "BlissTrail", angle: 135 },
  { label: "CWOS", angle: 180 },
  { label: "Health Hub", angle: 225 },
  { label: "IKSHANA", angle: 270 },
  { label: "Cobots", angle: 315 },
];

// CINTENT's own internal components — orbit the core on an inner ring,
// counter-rotating against the outer product ring for visual depth.
const coreComponents = [
  { label: "Interaction", angle: 0 },
  { label: "Semantic State", angle: 60 },
  { label: "Reasoning", angle: 120 },
  { label: "Orchestration", angle: 180 },
  { label: "Execution", angle: 240 },
  { label: "Governance", angle: 300 },
];

export function OrbitDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Ambient blobs */}
      <div className="aurora-blob left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-[var(--electric)]" />
      <div className="aurora-blob left-[20%] top-[70%] h-40 w-40 bg-[var(--violet)]" />
      <div className="aurora-blob right-[10%] top-[15%] h-32 w-32 bg-[var(--gold)]" />

      {/* Concentric rings */}
      <div className="absolute inset-0 animate-spin-slower">
        <div className="absolute inset-[6%] rounded-full border border-white/10" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-white/15" />
      </div>
      <div className="absolute inset-[30%] animate-spin-slow rounded-full border border-white/10" />

      {/* Inner ring: CINTENT's own components, counter-rotating against the outer product ring */}
      <div className="absolute inset-0 animate-spin-slower">
        {coreComponents.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const r = 20; // % from center — sits on the inset-[30%] ring
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          return (
            <div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Reverses the exact same animation as its parent (same name+duration,
                  opposite direction) so the label's rotation always cancels the
                  orbit's rotation and the text stays upright and level. */}
              <div style={{ animation: "spin-slower 70s linear infinite reverse" }}>
                <div className="rounded-full bg-[var(--gradient-violet)] px-2 py-1 text-[8px] font-mono uppercase tracking-widest text-white shadow-[var(--shadow-glow-violet)]">
                  {n.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Satellite nodes */}
      <div className="absolute inset-0 animate-spin-slow">
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const r = 46; // % from center
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          return (
            <div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Same trick: reverse the parent's exact animation so the label
                  itself never visibly rotates, regardless of orbital position. */}
              <div style={{ animation: "spin-slow 40s linear infinite reverse" }}>
                <div className="glass rounded-full px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest">
                  {n.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid h-32 w-32 place-items-center rounded-full bg-[var(--gradient-electric)] animate-pulse-glow">
          <div className="absolute inset-1 rounded-full bg-background/80 backdrop-blur" />
          <div className="relative flex flex-col items-center gap-1 text-center">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95">
              <img src="/logos/cintent-icon.png" alt="CINTENT" className="h-6 w-6 object-contain" />
            </span>
            <div className="font-display text-sm font-bold">CINTENT™</div>
            <div className="kicker text-[0.5rem]">Cognitive Core</div>
          </div>
        </div>
      </div>
    </div>
  );
}
