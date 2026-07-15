import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { products } from "@/data/products";

export const Route = createFileRoute("/products")({
  head: ({ matches }) => ({
    meta: [
      { title: "Products — Cognivanta Labs" },
      {
        name: "description",
        content:
          "The Cognivanta ecosystem: CINTENT™, Shunya AI™, NyayNetra™, CHAXU™, BlissTrail™, IKSHANA™, CWOS™, Health Hub, AskCOGNI, Cognitive Cobots, AWCS, Externovate.",
      },
      { property: "og:title", content: "Products — Cognivanta Labs" },
      {
        property: "og:description",
        content: "One shared cognitive core, many reasoning-first products across domains.",
      },
    ],
    links:
      matches.at(-1)?.pathname === "/products" || matches.at(-1)?.pathname === "/products/"
        ? [{ rel: "canonical", href: "/products" }]
        : [],
  }),
  component: ProductsRoute,
});

function ProductsRoute() {
  const { pathname } = useLocation();

  return pathname === "/products" || pathname === "/products/" ? <ProductsPage /> : <Outlet />;
}

function ProductsPage() {
  const rest = products.filter((p) => p.id !== "cintent");

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[10%] top-[10%] h-72 w-72 bg-[var(--violet)]" />
        <div className="aurora-blob right-[10%] top-[20%] h-64 w-64 bg-[var(--electric)]" />
        <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-10 md:px-8 md:pt-28">
          <Reveal>
            <div className="kicker">The Ecosystem</div>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              One shared cognitive core.{" "}
              <span className="text-gradient-aurora">A multi-domain ecosystem.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-muted-foreground md:text-lg">
              Every product below runs on CINTENT™ — the same intent, context, memory, reasoning,
              orchestration and governance layer. New products join the ecosystem continuously.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 pt-10 md:px-8">
        <Reveal>
          <Link
            to="/platform"
            className="glass glass-hover flex flex-col items-start justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/95 p-2">
                <img
                  src="/logos/cintent-icon.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <div className="kicker">The Shared Core</div>
                <div className="mt-1 font-display text-lg font-bold">
                  CINTENT™ lives on the Platform page, not here.
                </div>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-electric-soft">
              Explore the platform <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-14 md:px-8">
        <Reveal>
          <div className="mb-6">
            <div className="kicker">Flagship Products</div>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Reasoning-first across domains
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 40}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 md:p-14">
            <div className="aurora-blob right-0 top-0 h-64 w-64 bg-[var(--electric)]" />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="kicker">Have a use case?</div>
                <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  Propose a pilot, or build on CINTENT™.
                </h3>
              </div>
              <Link
                to="/contact"
                className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
