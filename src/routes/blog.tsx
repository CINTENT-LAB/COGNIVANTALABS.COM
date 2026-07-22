import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Filter, PenSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contentTypeLabel,
  featuredPublications,
  getRelatedPublications,
  publicationCategories,
  publicationSources,
  publishedPublications,
  type PublicationRecord,
} from "@/data/publications";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog and publications - Cognivanta Labs" },
      {
        name: "description",
        content:
          "Public articles, research, and visual publications on cognitive architecture, CINTENT, and the Cognivanta product ecosystem, drawn from one owner-approved publication catalogue.",
      },
      { property: "og:title", content: "Blog and publications - Cognivanta Labs" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const ALL_VALUE = "all";

function publicationSchema(publication: PublicationRecord) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": publication.contentType === "research-paper" ? "ScholarlyArticle" : "Article",
    headline: publication.title,
    description: publication.summary,
    url: publication.canonicalUrl,
    author: { "@type": "Organization", name: publication.author },
    publisher: { "@type": "Organization", name: publication.publisher },
  };
  if (publication.publishedAt) schema.datePublished = publication.publishedAt;
  if (publication.updatedAt) schema.dateModified = publication.updatedAt;
  if (publication.image) schema.image = publication.image;
  return schema;
}

function dateLabel(publication: PublicationRecord) {
  if (!publication.publishedAt) return "Date not independently verified";
  return new Date(publication.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PublicationCard({ publication }: { publication: PublicationRecord }) {
  const related = getRelatedPublications(publication);
  return (
    <>
      <a
        href={publication.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read "${publication.title}" at ${publication.publisher} (opens in new tab)`}
        className="group glass flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-electric/30"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-security">{publication.publisher}</span>
            <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-muted-foreground">
              {contentTypeLabel(publication.contentType)}
            </span>
            {publication.featured && (
              <span className="rounded-full border border-electric/40 bg-electric/10 px-3 py-1.5 text-xs font-medium text-electric-soft">
                Featured
              </span>
            )}
          </div>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 text-electric-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold leading-tight text-foreground">
          {publication.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {publication.summary}
        </p>
        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{publication.author}</span>
          <span aria-hidden="true">/</span>
          <span>{dateLabel(publication)}</span>
        </div>
        {related.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-xs">
            <span className="text-muted-foreground">Related:</span>
            {related.map((relatedPublication) => (
              <span
                key={relatedPublication.id}
                className="rounded-full border border-white/10 px-2.5 py-1 text-muted-foreground"
              >
                {relatedPublication.title}
              </span>
            ))}
          </div>
        )}
        <div className="mt-6 border-t border-white/10 pt-4 text-xs font-medium text-electric-soft">
          Read at {publication.publisher} <span aria-hidden="true">-</span> opens in new tab
        </div>
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationSchema(publication)) }}
      />
    </>
  );
}

function FilterFields({
  query,
  setQuery,
  category,
  setCategory,
  source,
  setSource,
  idPrefix,
}: {
  query: string;
  setQuery: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  source: string;
  setSource: (value: string) => void;
  idPrefix: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor={`${idPrefix}-search`}
          className="mb-1.5 block text-xs text-muted-foreground"
        >
          Search publications
        </label>
        <Input
          id={`${idPrefix}-search`}
          type="search"
          maxLength={200}
          placeholder="Search by title, author, or tag"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor={`${idPrefix}-category`}
          className="mb-1.5 block text-xs text-muted-foreground"
        >
          Category
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id={`${idPrefix}-category`}>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All categories</SelectItem>
            {publicationCategories.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <label
          htmlFor={`${idPrefix}-source`}
          className="mb-1.5 block text-xs text-muted-foreground"
        >
          Source
        </label>
        <Select value={source} onValueChange={setSource}>
          <SelectTrigger id={`${idPrefix}-source`}>
            <SelectValue placeholder="All sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>All sources</SelectItem>
            {publicationSources.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_VALUE);
  const [source, setSource] = useState(ALL_VALUE);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const { filtered, hasError } = useMemo(() => {
    try {
      const normalizedQuery = query.trim().toLowerCase();
      const result = publishedPublications.filter((publication) => {
        const searchText =
          `${publication.title} ${publication.summary} ${publication.author} ${publication.tags.join(" ")}`.toLowerCase();
        const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery);
        const matchesCategory =
          category === ALL_VALUE || publication.categories.includes(category as never);
        const matchesSource = source === ALL_VALUE || publication.publisher === source;
        return matchesQuery && matchesCategory && matchesSource;
      });
      return { filtered: result, hasError: false };
    } catch {
      return { filtered: publishedPublications, hasError: true };
    }
  }, [query, category, source]);

  const filtersActive = query.trim() !== "" || category !== ALL_VALUE || source !== ALL_VALUE;

  function clearFilters() {
    setQuery("");
    setCategory(ALL_VALUE);
    setSource(ALL_VALUE);
  }

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
              ecosystem, drawn from one governed, owner-approved catalogue. Each item opens at its
              original publisher.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="badge-security">
                <BookOpen className="h-3.5 w-3.5" /> {publishedPublications.length} public
                publications
              </span>
              <span>External sources are clearly marked.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {featuredPublications.length > 0 && (
        <section
          className="relative mx-auto max-w-7xl px-5 md:px-8"
          aria-labelledby="blog-featured-title"
        >
          <Reveal>
            <div className="kicker">Featured</div>
            <h2 id="blog-featured-title" className="mt-2 font-display text-2xl font-bold">
              Where to start
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredPublications.map((publication, index) => (
              <Reveal key={publication.id} delay={Math.min(index * 0.03, 0.24)}>
                <PublicationCard publication={publication} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section
        className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 md:px-8"
        aria-labelledby="blog-list-title"
      >
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="kicker">Browse the catalogue</div>
              <h2 id="blog-list-title" className="mt-2 font-display text-2xl font-bold">
                Public writing and research
              </h2>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-fit gap-2 md:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filters
            </Button>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-6 hidden gap-4 md:grid md:grid-cols-[2fr_1fr_1fr_auto] md:items-end">
            <FilterFields
              idPrefix="blog-desktop"
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              source={source}
              setSource={setSource}
            />
            <Button type="button" variant="ghost" onClick={clearFilters} disabled={!filtersActive}>
              Clear filters
            </Button>
          </div>
        </Reveal>

        <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter publications</DialogTitle>
              <DialogDescription>
                Search and narrow the catalogue by category or source.
              </DialogDescription>
            </DialogHeader>
            <FilterFields
              idPrefix="blog-mobile"
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              source={source}
              setSource={setSource}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={clearFilters}
                disabled={!filtersActive}
              >
                Clear filters
              </Button>
              <Button type="button" onClick={() => setDrawerOpen(false)}>
                Done
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <p className="mt-4 text-sm text-muted-foreground" role="status" aria-live="polite">
          {isHydrated
            ? filtered.length === publishedPublications.length
              ? `Showing all ${publishedPublications.length} approved publication(s).`
              : `${filtered.length} of ${publishedPublications.length} publication(s) match the current filters.`
            : `Showing all ${publishedPublications.length} approved publication(s).`}
        </p>
        {isHydrated === false ? null : !isOnline ? (
          <Alert className="mt-4">
            <AlertTitle>You appear to be offline</AlertTitle>
            <AlertDescription>
              This page is prebuilt and already loaded in your browser, so every publication below
              remains available. Search and filters continue to work without a connection; only the
              external Read links require one.
            </AlertDescription>
          </Alert>
        ) : null}
        {hasError && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Filters could not be applied</AlertTitle>
            <AlertDescription>
              Something went wrong while filtering this catalogue. The full, unfiltered publication
              list is shown below.
            </AlertDescription>
          </Alert>
        )}

        {filtered.length === 0 ? (
          <Alert className="mt-8">
            <AlertTitle>No publications match your filters</AlertTitle>
            <AlertDescription>
              Try a different search term, or clear the category and source filters to see the full
              catalogue.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((publication, index) => (
              <Reveal key={publication.id} delay={Math.min(index * 0.03, 0.24)}>
                <PublicationCard publication={publication} />
              </Reveal>
            ))}
          </div>
        )}

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
