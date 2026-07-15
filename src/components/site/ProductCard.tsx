import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Network, Globe } from "lucide-react";
import * as Icons from "lucide-react";
import type { Product } from "@/data/products";
import { getProductDescription, getProductDraftNote } from "@/data/productDisplay";
import { getLucideIcon } from "@/lib/lucideIcon";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const accentClasses: Record<Product["accent"], string> = {
  electric: "from-[color-mix(in_oklab,var(--electric)_40%,transparent)] to-transparent",
  violet: "from-[color-mix(in_oklab,var(--violet)_45%,transparent)] to-transparent",
  gold: "from-[color-mix(in_oklab,var(--gold)_35%,transparent)] to-transparent",
};

const badgeAccent: Record<Product["accent"], string> = {
  electric: "border-[color-mix(in_oklab,var(--electric)_50%,transparent)] text-electric-soft",
  violet:
    "border-[color-mix(in_oklab,var(--violet)_55%,transparent)] text-[color-mix(in_oklab,var(--violet)_20%,white)]",
  gold: "border-[color-mix(in_oklab,var(--gold)_55%,transparent)] text-gold-soft",
};

const iconRing: Record<Product["accent"], string> = {
  electric: "bg-[var(--gradient-electric)] shadow-[var(--shadow-glow-electric)]",
  violet: "bg-[var(--gradient-violet)] shadow-[var(--shadow-glow-violet)]",
  gold: "bg-[var(--gradient-gold)] shadow-[var(--shadow-glow-gold)]",
};

export function ProductCard({ product }: { product: Product }) {
  const Icon = getLucideIcon(product.icon);
  const hasLink = Boolean(product.href);
  const description = getProductDescription(product);
  const draftNote = getProductDraftNote(product);

  const inner = (
    <div
      id={product.id}
      className="glass glass-hover relative flex h-full flex-col overflow-hidden rounded-2xl p-6 scroll-mt-24"
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br opacity-60 blur-3xl ${accentClasses[product.accent]}`}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl ${product.logo ? "bg-white/95 p-2" : iconRing[product.accent]}`}
        >
          {product.logo ? (
            <img
              src={product.logo}
              alt={`${product.name} logo`}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          ) : (
            <>
              <div className="absolute inset-[3px] rounded-lg bg-background/70" />
              <Icon className="relative h-5 w-5 text-foreground" />
            </>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest ${badgeAccent[product.accent]}`}
        >
          {product.statusLabel}
        </span>
      </div>

      <div className="relative mt-5">
        <div className="kicker">{product.tagline}</div>
        <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        {(product.apiCount || product.liveUrl) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.apiCount && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-electric-soft">
                <Network className="h-3 w-3" />
                {product.apiCount.toLocaleString()}+ APIs
              </div>
            )}
            {product.liveUrl &&
              (hasLink ? (
                // Card is already a link/anchor (e.g. CINTENT → /platform) — avoid nesting an <a> inside it.
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <Globe className="h-3 w-3" />
                  {hostnameOf(product.liveUrl)}
                </span>
              ) : (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-electric-soft hover:border-electric/40"
                >
                  <Globe className="h-3 w-3" />
                  {hostnameOf(product.liveUrl)}
                </a>
              ))}
          </div>
        )}
        {draftNote && (
          <p className="mt-3 rounded-md border border-dashed border-white/15 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {draftNote}
          </p>
        )}
      </div>

      {hasLink && (
        <div className="relative mt-6 flex items-center gap-1.5 text-sm font-medium text-electric-soft">
          {product.cta ?? "Learn more"}
          {product.external ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </div>
      )}
    </div>
  );

  if (!hasLink) return inner;
  if (product.external) {
    return (
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block h-full"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link to={product.href!} className="group block h-full">
      {inner}
    </Link>
  );
}
