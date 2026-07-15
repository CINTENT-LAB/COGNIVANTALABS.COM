import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, PenSquare } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { blogEntries } from "@/data/blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog - Cognivanta Labs" },
      {
        name: "description",
        content:
          "Public articles, research, and visual publications on cognitive architecture, CINTENT, and the Cognivanta product ecosystem.",
      },
      { property: "og:title", content: "Blog - Cognivanta Labs" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const categories = ["All", ...Array.from(new Set(blogEntries.map((entry) => entry.category)))];

function externalLabel(format: string) {
  if (format === "Research paper") return "External research paper";
  if (format === "Visual publication") return "External visual publication";
  if (format === "Post") return "External post";
  return "External article";
}

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredEntries = useMemo(
    () =>
      activeCategory === "All"
        ? blogEntries
        : blogEntries.filter((entry) => entry.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[15%] top-[10%] h-64 w-64 bg-[var(--electric)]" />
        <div className="relative mx-auto max-w-4xl px-5 pb-14 pt-24 md:px-8 md:pb-16 md:pt-32">
          <Reveal>
            <div className="kicker">Blog and publications</div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black tracking-tight sm:text-5xl">
              Signals from the team building <span className="text-gradient-electric">CINTENT</span>
              .
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Explore public writing, research, and visual publications across the cognitive
              ecosystem. Each item opens at its original publisher.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="badge-security">
                <BookOpen className="h-3.5 w-3.5" /> {blogEntries.length} public publications
              </span>
              <span>External sources are clearly marked.</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="relative mx-auto max-w-7xl px-5 pb-20 md:px-8"
        aria-labelledby="blog-list-title"
      >
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="kicker">Browse by signal</div>
              <h2 id="blog-list-title" className="mt-2 font-display text-2xl font-bold">
                Public writing and research
              </h2>
            </div>
            <div
              className="flex max-w-full flex-wrap gap-2"
              aria-label="Filter publications by category"
            >
              {categories.map((category) => {
                const selected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveCategory(category)}
                    className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      selected
                        ? "border-electric/50 bg-electric/15 text-electric-soft"
                        : "border-white/10 text-muted-foreground hover:border-electric/30 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredEntries.map((entry, index) => (
            <Reveal key={entry.id} delay={Math.min(index * 0.03, 0.24)}>
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${entry.title} (opens in new tab)`}
                className="group glass flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-electric/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="badge-security">{externalLabel(entry.format)}</span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-electric-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{entry.source}</span>
                  <span aria-hidden="true">/</span>
                  <span>{entry.category}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold leading-tight text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {entry.summary}
                </p>
                <div className="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-electric-soft">
                  Read at {entry.source} <span aria-hidden="true">-</span> opens in new tab
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass mt-14 flex flex-col gap-5 rounded-2xl p-7 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <div className="kicker">Add your perspective</div>
              <h2 className="mt-2 font-display text-xl font-bold">
                Have a considered view to publish?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Use MyCogni to prepare a submission for editorial review. Publication remains
                subject to the existing moderation process.
              </p>
            </div>
            <Link
              to="/cognites/mycogni"
              className="btn-electric inline-flex shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
            >
              <PenSquare className="h-4 w-4" /> Write for review
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
