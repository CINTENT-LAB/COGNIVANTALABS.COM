import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Globe, Network, ArrowLeft, Check } from "lucide-react";
import * as Icons from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { products, type Product } from "@/data/products";
import type { ProductContent } from "@/data/productContent";
import { getProductDescription, getProductDraftNote } from "@/data/productDisplay";
import { getLucideIcon } from "@/lib/lucideIcon";

function hostnameOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const badgeAccent: Record<string, string> = {
  electric: "border-[color-mix(in_oklab,var(--electric)_50%,transparent)] text-electric-soft",
  violet:
    "border-[color-mix(in_oklab,var(--violet)_55%,transparent)] text-[color-mix(in_oklab,var(--violet)_20%,white)]",
  gold: "border-[color-mix(in_oklab,var(--gold)_55%,transparent)] text-gold-soft",
};

const iconRing: Record<string, string> = {
  electric: "bg-[var(--gradient-electric)] shadow-[var(--shadow-glow-electric)]",
  violet: "bg-[var(--gradient-violet)] shadow-[var(--shadow-glow-violet)]",
  gold: "bg-[var(--gradient-gold)] shadow-[var(--shadow-glow-gold)]",
};

/**
 * Shared visual layout for every dedicated product page (src/routes/products.<id>.tsx).
 * Each product gets its own route file — this component just keeps the hero,
 * rich-content sections, and ecosystem banner consistent across all of them
 * instead of duplicating ~350 lines of markup per file.
 */
export function ProductPageLayout({
  product,
  content,
}: {
  product: Product;
  content?: ProductContent;
}) {
  const Icon = getLucideIcon(product.icon);
  const otherProducts = products
    .filter((p) => p.id !== product.id && p.id !== "cintent")
    .slice(0, 4);
  const applicationLinks = product.applicationLinks ?? [];
  const description = getProductDescription(product);
  const draftNote = getProductDraftNote(product);

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--electric)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--violet)]" />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-12 md:px-8 md:pt-28">
          <Reveal>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All products
            </Link>
            <div className="mt-6 flex items-start gap-5">
              <div
                className={`grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl ${product.logo ? "bg-white/95 p-3" : iconRing[product.accent]}`}
              >
                {product.logo ? (
                  <img
                    src={product.logo}
                    alt={`${product.name} logo`}
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <Icon className="h-7 w-7 text-foreground" />
                )}
              </div>
              <div>
                <div className="kicker">{product.tagline}</div>
                <h1 className="mt-1 font-display text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                  {product.name}
                </h1>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest ${badgeAccent[product.accent]}`}
              >
                {product.statusLabel}
              </span>
              {product.apiCount && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-electric-soft">
                  <Network className="h-3.5 w-3.5" />
                  {product.apiCount.toLocaleString()}+ APIs
                </span>
              )}
              {product.liveUrl && (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-electric-soft hover:border-electric/40"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {hostnameOf(product.liveUrl)}
                </a>
              )}
            </div>

            {draftNote && (
              <p className="mt-5 max-w-xl rounded-md border border-dashed border-white/15 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {draftNote}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {product.liveUrl && (
                <a
                  href={product.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
                >
                  Visit {product.name.replace(/™$/, "")} <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
              {applicationLinks
                .filter((application) =>
                  product.liveUrl
                    ? application.url.replace(/\/+$/, "") !== product.liveUrl.replace(/\/+$/, "")
                    : true,
                )
                .map((application) => (
                  <a
                    key={application.url}
                    href={application.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
                  >
                    {application.label} <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              <Link
                to="/contact"
                className="btn-ghost-glow inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {content && (
        <section className="relative mx-auto max-w-5xl px-5 py-6 md:px-8">
          <Reveal>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {content.overview}
            </p>
          </Reveal>

          {content.heroImage && (
            <Reveal delay={80}>
              <div className="glass mt-8 overflow-hidden rounded-3xl">
                <img
                  src={content.heroImage}
                  alt={`${product.name} visual`}
                  className="max-h-[420px] w-full object-contain bg-white/[0.02] p-4"
                  loading="lazy"
                />
              </div>
            </Reveal>
          )}

          {content.gallery && content.gallery.length > 0 && (
            <Reveal delay={80}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.gallery.map((src) => (
                  <div key={src} className="glass overflow-hidden rounded-2xl">
                    <img
                      src={src}
                      alt={`${product.name} visual`}
                      className="h-64 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {content.stats && (
            <Reveal delay={120}>
              <div className="glass mt-8 grid grid-cols-2 gap-6 rounded-2xl p-6 sm:grid-cols-4 md:p-8">
                {content.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-black text-gradient-electric md:text-3xl">
                      {s.value}
                    </div>
                    <div className="mt-1.5 kicker">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {content.features && (
            <div className="mt-14">
              <Reveal>
                <div className="kicker">Capabilities</div>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  What {product.name.replace(/™$/, "")} actually does.
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {content.features.map((f, i) => {
                  const FIcon = getLucideIcon(f.icon);
                  return (
                    <Reveal key={f.title} delay={i * 60}>
                      <div className="glass glass-hover h-full rounded-2xl p-6">
                        <span
                          className={`grid h-11 w-11 place-items-center rounded-xl ${iconRing[product.accent]}`}
                        >
                          <FIcon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          )}

          {content.steps && (
            <div className="mt-14">
              <Reveal>
                <div className="kicker">How it works</div>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  From input to output.
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {content.steps.map((s, i) => (
                  <Reveal key={s.n} delay={i * 60}>
                    <div className="glass h-full rounded-2xl p-6">
                      <span className="font-display text-2xl font-black text-gradient-electric">
                        {s.n}
                      </span>
                      <h3 className="mt-2 font-display text-base font-semibold">{s.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {content.architecture && (
            <div className="mt-14">
              <Reveal>
                <div className="kicker">Architecture</div>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  The layers underneath.
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.architecture.map((a, i) => (
                  <Reveal key={a.title} delay={i * 60}>
                    <div className="glass h-full rounded-2xl p-6">
                      <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                      <h3 className="mt-2 font-display text-base font-semibold">{a.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{a.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {content.groups && (
            <div className="mt-14 space-y-8">
              {content.groups.map((g, gi) => (
                <Reveal key={g.title} delay={gi * 80}>
                  <div className="kicker">{g.title}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-muted-foreground"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {content.pricing && (
            <div className="mt-14">
              <Reveal>
                <div className="kicker">Pricing</div>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  Plans built for every stage.
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {content.pricing.map((tier, i) => (
                  <Reveal key={tier.name} delay={i * 60}>
                    <div
                      className={`glass h-full rounded-2xl p-6 ${tier.highlight ? "border border-electric/40" : ""}`}
                    >
                      {tier.highlight && (
                        <div className="kicker text-electric-soft">Most Popular</div>
                      )}
                      <h3 className="mt-1 font-display text-base font-semibold">{tier.name}</h3>
                      <div className="mt-2 font-display text-xl font-bold">{tier.price}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{tier.audience}</p>
                      <ul className="mt-4 space-y-2">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric-soft" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {content.testimonials && (
            <div className="mt-14">
              <Reveal>
                <div className="kicker">What people say</div>
              </Reveal>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.testimonials.map((t, i) => (
                  <Reveal key={t.author} delay={i * 80}>
                    <div className="glass h-full rounded-2xl p-6">
                      <p className="text-sm italic leading-relaxed text-muted-foreground">
                        "{t.quote}"
                      </p>
                      <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-electric-soft">
                        {t.author}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {content.faqs && (
            <div className="mt-14">
              <Reveal>
                <div className="kicker">FAQ</div>
              </Reveal>
              <div className="mt-6 space-y-4">
                {content.faqs.map((f, i) => (
                  <Reveal key={f.q} delay={i * 60}>
                    <div className="glass rounded-2xl p-6">
                      <div className="font-display text-sm font-semibold">{f.q}</div>
                      <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {content.closingNote && (
            <Reveal delay={100}>
              <p className="mt-14 max-w-2xl border-t border-white/10 pt-6 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-muted-foreground">
                {content.closingNote}
              </p>
            </Reveal>
          )}
        </section>
      )}

      <section className="relative mx-auto max-w-5xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="aurora-blob right-0 top-0 h-56 w-56 bg-[var(--electric)]" />
            <div className="relative">
              <div className="kicker">Part of the CINTENT™ ecosystem</div>
              <h2 className="mt-3 max-w-xl font-display text-2xl font-bold sm:text-3xl">
                Every product here runs on the same shared cognitive core.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                Intent, context, memory, reasoning, orchestration and governance — unified, so{" "}
                {product.name.replace(/™$/, "")} reasons the same way every other product does.
              </p>
              <div className="mt-6">
                <Link
                  to="/platform"
                  className="inline-flex items-center gap-1.5 text-sm text-electric-soft hover:underline"
                >
                  Explore CINTENT™ <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-5xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="kicker">More from the ecosystem</div>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Other products you might explore.
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherProducts.map((p, i) => {
            const OIcon = getLucideIcon(p.icon);
            const to =
              p.id === "cintent"
                ? "/platform"
                : p.href && !p.external
                  ? p.href
                  : `/products/${p.id}`;
            return (
              <Reveal key={p.id} delay={i * 60}>
                <Link to={to} className="glass glass-hover block h-full rounded-2xl p-5">
                  <div
                    className={`grid h-10 w-10 place-items-center overflow-hidden rounded-lg ${p.logo ? "bg-white/95 p-2" : iconRing[p.accent]}`}
                  >
                    {p.logo ? (
                      <img src={p.logo} alt="" className="h-full w-full object-contain" />
                    ) : (
                      <OIcon className="h-4 w-4 text-foreground" />
                    )}
                  </div>
                  <div className="mt-4 font-display text-base font-semibold">{p.name}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{p.tagline}</div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
