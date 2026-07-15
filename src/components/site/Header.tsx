import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { products } from "@/data/products";
import { pauseMotion } from "@/lib/heroMotion";
import { getLucideIcon } from "@/lib/lucideIcon";

const COGNIVANTA_LOGO = "/logos/cognivanta-logo-white.png";

const navLinks = [
  { to: "/platform", label: "Platform" },
  { to: "/applications", label: "Applications" },
  { to: "/pilots", label: "Pilots" },
  { to: "/developers", label: "Developers" },
  { to: "/research", label: "Research" },
] as const;

const aboutLinks = [
  { to: "/about", label: "About" },
  { to: "/cognites", label: "Cognites" },
  { to: "/blog", label: "Blog" },
] as const;

const resourceLinks = [
  { to: "/developers", label: "Developers", detail: "API contracts and release controls" },
  { to: "/research", label: "Research", detail: "Questions, methods, and evidence" },
  { to: "/blog", label: "Blog", detail: "Stories from the cognitive ecosystem" },
  { to: "/platform", label: "Platform guide", detail: "CINTENT architecture and capabilities" },
] as const;

function productTarget(p: (typeof products)[number]): { to: string; external: boolean } {
  if (p.href && p.external) return { to: p.href, external: true };
  return { to: p.href ?? `/products/${p.id}`, external: false };
}

// Every registered product has a destination in the Products submenu.
// CINTENT resolves to the Platform page through its registry entry.
const menuProducts = products;

type SearchItem = {
  label: string;
  detail: string;
  to: string;
  external?: boolean;
};

const searchItems: SearchItem[] = [
  ...navLinks.map((link) => ({ label: link.label, detail: "Cognivanta Labs", to: link.to })),
  ...aboutLinks.map((link) => ({ label: link.label, detail: "Company", to: link.to })),
  ...resourceLinks.map((link) => ({ label: link.label, detail: link.detail, to: link.to })),
  ...menuProducts.map((product) => {
    const target = productTarget(product);
    return {
      label: product.name,
      detail: product.tagline,
      to: target.to,
      external: target.external,
    };
  }),
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredSearchItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return searchItems.slice(0, 8);
    return searchItems
      .filter((item) => `${item.label} ${item.detail}`.toLowerCase().includes(query))
      .slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src={COGNIVANTA_LOGO} alt="Cognivanta Labs" className="h-8 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link
            to="/platform"
            activeProps={{ className: "text-foreground bg-white/5" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5"
          >
            Platform
          </Link>

          {/* Products — hover, focus, and keyboard (Escape) accessible dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setProductsOpen(true);
              pauseMotion();
            }}
            onMouseLeave={() => setProductsOpen(false)}
            onFocus={() => {
              setProductsOpen(true);
              pauseMotion();
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setProductsOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setProductsOpen(false);
            }}
          >
            <Link
              to="/products"
              activeProps={{ className: "text-foreground bg-white/5" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5"
              aria-expanded={productsOpen}
              aria-haspopup="menu"
              onClick={() => setProductsOpen(false)}
            >
              Products
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${productsOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {productsOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2">
                <div className="glass grid max-h-[70vh] grid-cols-2 gap-1 overflow-y-auto rounded-2xl p-3 shadow-[var(--shadow-glow-electric)]">
                  {menuProducts.map((p) => {
                    const Icon = getLucideIcon(p.icon);
                    const { to, external } = productTarget(p);
                    const content = (
                      <>
                        <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-white/95">
                          {p.logo ? (
                            <img src={p.logo} alt="" className="h-full w-full object-contain p-1" />
                          ) : (
                            <Icon className="h-4 w-4 text-background" />
                          )}
                        </span>
                        <span>
                          <span className="block text-sm font-medium">{p.name}</span>
                          <span className="block text-xs text-muted-foreground">{p.tagline}</span>
                        </span>
                      </>
                    );
                    return external ? (
                      <a
                        key={p.id}
                        href={to}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="focus-ring flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
                        onClick={() => setProductsOpen(false)}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        key={p.id}
                        to={to}
                        className="focus-ring flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-white/5"
                        onClick={() => setProductsOpen(false)}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground bg-white/5" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="focus-ring rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5"
            >
              {n.label}
            </Link>
          ))}

          {/* About — hover, focus, and keyboard (Escape) accessible dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setResourcesOpen(true);
              pauseMotion();
            }}
            onMouseLeave={() => setResourcesOpen(false)}
            onFocus={() => {
              setResourcesOpen(true);
              pauseMotion();
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                setResourcesOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setResourcesOpen(false);
            }}
          >
            <button
              type="button"
              className="focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              aria-expanded={resourcesOpen}
              aria-haspopup="menu"
              onClick={() => setResourcesOpen((value) => !value)}
            >
              Resources
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {resourcesOpen && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2">
                <div className="glass flex flex-col gap-0.5 rounded-2xl p-2 shadow-[var(--shadow-glow-electric)]">
                  {resourceLinks.map((resource) => (
                    <Link
                      key={resource.to}
                      to={resource.to}
                      className="focus-ring rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                      onClick={() => setResourcesOpen(false)}
                    >
                      <span className="block text-sm text-foreground">{resource.label}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {resource.detail}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => {
              setAboutOpen(true);
              pauseMotion();
            }}
            onMouseLeave={() => setAboutOpen(false)}
            onFocus={() => {
              setAboutOpen(true);
              pauseMotion();
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setAboutOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setAboutOpen(false);
            }}
          >
            <Link
              to="/about"
              activeProps={{ className: "text-foreground bg-white/5" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="focus-ring inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5"
              aria-expanded={aboutOpen}
              aria-haspopup="menu"
              onClick={() => setAboutOpen(false)}
            >
              About
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${aboutOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {aboutOpen && (
              <div className="absolute left-1/2 top-full w-48 -translate-x-1/2 pt-2">
                <div className="glass flex flex-col gap-0.5 rounded-2xl p-2 shadow-[var(--shadow-glow-electric)]">
                  {aboutLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="focus-ring rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                      onClick={() => setAboutOpen(false)}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            activeProps={{ className: "text-foreground bg-white/5" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            className="focus-ring grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Search Cognivanta Labs"
            aria-expanded={searchOpen}
            aria-controls="site-search-dialog"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/pricing"
            activeProps={{ className: "text-foreground bg-white/5" }}
            inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
            className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5"
          >
            Pricing
          </Link>
          <Link to="/developers" className="btn-electric rounded-md px-4 py-2 text-sm font-medium">
            Get API Access
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="focus-ring grid h-10 w-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Search Cognivanta Labs"
            aria-expanded={searchOpen}
            aria-controls="site-search-dialog"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              pauseMotion();
            }}
            className="focus-ring grid h-10 w-10 place-items-center rounded-md btn-ghost-glow"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div
          id="site-search-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Search Cognivanta Labs"
          className="fixed inset-x-0 top-[4.5rem] z-50 border-y border-white/10 bg-background/95 shadow-[var(--shadow-glow-electric)] backdrop-blur-xl"
        >
          <div className="mx-auto max-w-3xl px-5 py-5 md:px-8">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4">
              <Search className="h-4 w-4 shrink-0 text-electric-soft" aria-hidden="true" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search platform, products, research..."
                aria-label="Search platform, products, and resources"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={closeSearch}
                className="focus-ring grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3" role="listbox" aria-label="Search results">
              {filteredSearchItems.length > 0 ? (
                <div className="grid gap-1 sm:grid-cols-2">
                  {filteredSearchItems.map((item) => {
                    const content = (
                      <>
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-foreground">
                            {item.label}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {item.detail}
                          </span>
                        </span>
                        {item.external ? (
                          <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                        ) : null}
                      </>
                    );
                    return item.external ? (
                      <a
                        key={`${item.label}-${item.to}`}
                        href={item.to}
                        target="_blank"
                        rel="noreferrer noopener"
                        role="option"
                        className="focus-ring flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                        onClick={closeSearch}
                      >
                        {content}
                        <span className="sr-only">Opens in new tab</span>
                      </a>
                    ) : (
                      <Link
                        key={`${item.label}-${item.to}`}
                        to={item.to}
                        role="option"
                        className="focus-ring flex min-w-0 items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                        onClick={closeSearch}
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="px-3 py-4 text-sm text-muted-foreground">
                  No matching destination found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            <Link
              to="/platform"
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-foreground bg-white/5" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-md px-3 py-3 text-sm"
            >
              Platform
            </Link>

            <div className="rounded-md">
              <button
                onClick={() => {
                  setMobileProductsOpen((v) => !v);
                  pauseMotion();
                }}
                className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm text-muted-foreground"
                aria-expanded={mobileProductsOpen}
              >
                Products
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileProductsOpen && (
                <div className="ml-2 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                  <Link
                    to="/products"
                    onClick={() => {
                      setOpen(false);
                      setMobileProductsOpen(false);
                    }}
                    className="rounded-md px-3 py-2 text-sm text-electric-soft"
                  >
                    See all products
                  </Link>
                  {menuProducts.map((p) => {
                    const { to, external } = productTarget(p);
                    return external ? (
                      <a
                        key={p.id}
                        href={to}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={() => {
                          setOpen(false);
                          setMobileProductsOpen(false);
                        }}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground"
                      >
                        {p.name}
                      </a>
                    ) : (
                      <Link
                        key={p.id}
                        to={to}
                        onClick={() => {
                          setOpen(false);
                          setMobileProductsOpen(false);
                        }}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground"
                      >
                        {p.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-foreground bg-white/5" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-md px-3 py-3 text-sm"
              >
                {n.label}
              </Link>
            ))}

            <div className="rounded-md">
              <button
                onClick={() => {
                  setMobileResourcesOpen((v) => !v);
                  pauseMotion();
                }}
                className="focus-ring flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm text-muted-foreground"
                aria-expanded={mobileResourcesOpen}
              >
                Resources
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileResourcesOpen && (
                <div className="ml-2 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                  {resourceLinks.map((resource) => (
                    <Link
                      key={resource.to}
                      to={resource.to}
                      onClick={() => {
                        setOpen(false);
                        setMobileResourcesOpen(false);
                      }}
                      className="focus-ring rounded-md px-3 py-2 text-sm text-muted-foreground"
                    >
                      {resource.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-md">
              <button
                onClick={() => {
                  setMobileAboutOpen((v) => !v);
                  pauseMotion();
                }}
                className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm text-muted-foreground"
                aria-expanded={mobileAboutOpen}
              >
                About
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileAboutOpen && (
                <div className="ml-2 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                  {aboutLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => {
                        setOpen(false);
                        setMobileAboutOpen(false);
                      }}
                      className="rounded-md px-3 py-2 text-sm text-muted-foreground"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-foreground bg-white/5" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-md px-3 py-3 text-sm"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              activeProps={{ className: "text-foreground bg-white/5" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-md px-3 py-3 text-sm"
            >
              Contact
            </Link>
            <Link
              to="/developers"
              onClick={() => setOpen(false)}
              className="btn-electric mt-2 rounded-md px-4 py-3 text-center text-sm font-medium"
            >
              Get API Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
