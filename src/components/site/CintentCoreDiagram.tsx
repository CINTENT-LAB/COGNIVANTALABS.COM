export function CintentCoreDiagram() {
  return (
    <figure className="card-premium relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-3xl">
      <div className="absolute inset-0 grid-bg opacity-35" aria-hidden="true" />
      <div className="absolute inset-x-7 top-5 z-10 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/70">
        <span>CINTENT cognitive loop</span>
        <span className="text-electric-soft">Live system model</span>
      </div>

      <div className="relative h-full p-4 pt-10 md:p-6 md:pt-11">
        <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-background/75 shadow-[var(--shadow-glass)]">
          <img
            src="/diagrams/cintent-cognitive-loop.svg"
            alt="CINTENT cognitive loop showing perception, understanding, reasoning, decision, action and learning connected in a continuous system"
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <figcaption className="absolute inset-x-7 bottom-4 flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/70">
        <span>Perception</span>
        <span className="text-electric-soft">Reasoning</span>
        <span>Governed action</span>
      </figcaption>
    </figure>
  );
}
