import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const clientDir = path.join(root, "dist", "client");
const reportsDir = path.join(root, "reports");
const siteOrigin = "https://cognivantalabs.com";
const allowedNoindex = new Set(["/cognites/login", "/cognites/mycogni"]);
const legacyPaths = [
  "/shop-left-sidebar.html",
  "/projects.html",
  "/pricing-plan.html",
  "/faq.html",
  "/services.html",
  "/login.html",
  "/contact.html",
  "/index-2.html",
  "/posts-by-author.html",
  "/posts-by-category.html",
  "/posts-by-date.html",
  "/register.html",
  "/shop-grid.html",
  "/product-single.html",
  "/posts-by-tag.html",
  "/wishlist.html",
  "/privacy-policy.html",
  "/blog-single-left-sidebar.html",
  "/about-us.html",
  "/terms-conditions.html",
];
const redirectMap = new Map([
  ["/about-us.html", "/about"],
  ["/contact.html", "/contact"],
  ["/privacy-policy.html", "/privacy"],
  ["/terms-conditions.html", "/terms"],
  ["/pricing-plan.html", "/pricing"],
  ["/posts-by-author.html", "/blog"],
  ["/posts-by-category.html", "/blog"],
  ["/posts-by-date.html", "/blog"],
  ["/posts-by-tag.html", "/blog"],
]);

const read = (file) => fs.readFileSync(file, "utf8");
const normalizePath = (value) => {
  const pathname = value.split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
};
const htmlPathForRoute = (route) =>
  route === "/"
    ? path.join(clientDir, "index.html")
    : path.join(clientDir, route.slice(1), "index.html");

if (!fs.existsSync(clientDir)) {
  console.error("SEO audit requires a production build at dist/client. Run npm run build first.");
  process.exit(1);
}

const sitemapText = read(path.join(root, "public", "sitemap.xml"));
const sitemapRoutes = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const sitemapPaths = sitemapRoutes.map((url) => new URL(url).pathname);
const sitemapErrors = [];
const routeAudit = [];

if (new Set(sitemapRoutes).size !== sitemapRoutes.length)
  sitemapErrors.push("sitemap contains duplicate URLs");
for (const url of sitemapRoutes) {
  const parsed = new URL(url);
  const route = normalizePath(parsed.pathname);
  if (parsed.origin !== siteOrigin) sitemapErrors.push(`sitemap URL has wrong origin: ${url}`);
  if (parsed.search || parsed.hash) sitemapErrors.push(`sitemap URL has query/hash: ${url}`);
  if (/\.html$/i.test(route)) sitemapErrors.push(`sitemap contains legacy HTML route: ${route}`);
  const file = htmlPathForRoute(route);
  const exists = fs.existsSync(file);
  const html = exists ? read(file) : "";
  const canonicalMatches = [...html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)];
  const canonical = canonicalMatches[0]?.[0].match(/href=["']([^"']+)["']/i)?.[1] ?? null;
  const robots =
    html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? null;
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? null;
  const description =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? null;
  const h1 =
    html
      .match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
      .replace(/<[^>]+>/g, "")
      .trim() ?? null;
  const internalLinks = [...html.matchAll(/(?:href|src)=["'](\/[^"]*)["']/gi)].map(
    (match) => match[1],
  );
  if (!exists) sitemapErrors.push(`sitemap route has no prerendered HTML: ${route}`);
  if (canonicalMatches.length !== 1)
    sitemapErrors.push(`${route} has ${canonicalMatches.length} canonical tags`);
  const expectedCanonical = `${siteOrigin}${route === "/" ? "/" : route}`;
  if (canonical !== expectedCanonical)
    sitemapErrors.push(`${route} canonical is ${canonical ?? "missing"}`);
  if (robots?.toLowerCase().includes("noindex"))
    sitemapErrors.push(`${route} is noindex but is in sitemap`);
  routeAudit.push({
    url,
    expectedStatus: 200,
    finalUrl: url,
    title,
    description,
    canonical,
    robots,
    h1,
    contentLength: html.length,
    internalLinkCount: internalLinks.length,
    sitemap: true,
  });
}

const htmlFiles = fs
  .readdirSync(clientDir, { recursive: true })
  .filter((file) => typeof file === "string" && file.endsWith(".html"));
const internalLinkErrors = [];
const noindexRoutes = [];
for (const relativeFile of htmlFiles) {
  const file = path.join(clientDir, relativeFile);
  const html = read(file);
  const route =
    relativeFile === "index.html"
      ? "/"
      : `/${relativeFile.replace(/\\/g, "/").replace(/\/index\.html$/, "")}`;
  const robots =
    html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  if (robots.toLowerCase().includes("noindex")) {
    noindexRoutes.push(route);
    if (!allowedNoindex.has(route) && route !== "/404.html") {
      internalLinkErrors.push(`unexpected noindex route: ${route}`);
    }
  }
  for (const match of html.matchAll(/href=["'](\/[^"]*)["']/gi)) {
    const linked = normalizePath(match[1]);
    if (
      linked.startsWith("/assets/") ||
      linked.startsWith("/hero/") ||
      linked.startsWith("/logos/")
    )
      continue;
    if (linked.startsWith("/products/") && /\.(png|jpe?g|webp|svg)$/i.test(linked)) continue;
    if (legacyPaths.includes(linked))
      internalLinkErrors.push(`${route} links to legacy URL: ${linked}`);
    if (linked.endsWith(".html") && linked !== "/404.html")
      internalLinkErrors.push(`${route} links to HTML URL: ${linked}`);
    if (linked.startsWith("/")) {
      const target = linked === "/" ? path.join(clientDir, "index.html") : htmlPathForRoute(linked);
      const asset = path.join(clientDir, linked.slice(1));
      if (
        !fs.existsSync(target) &&
        !fs.existsSync(asset) &&
        linked !== "/sitemap.xml" &&
        linked !== "/robots.txt" &&
        linked !== "/manifest.webmanifest"
      ) {
        internalLinkErrors.push(`${route} links to missing route: ${linked}`);
      }
    }
  }
}

const htaccess = read(path.join(root, "public", ".htaccess"));
if (/RewriteRule\s+\^\s+index\.html\s+\[L\]/i.test(htaccess))
  sitemapErrors.push(".htaccess still has a universal SPA fallback");
for (const legacy of legacyPaths) {
  if (redirectMap.has(legacy) && !htaccess.includes(legacy.replaceAll(".", "\\.")))
    sitemapErrors.push(`missing legacy redirect: ${legacy}`);
  if (sitemapPaths.includes(legacy)) sitemapErrors.push(`legacy route in sitemap: ${legacy}`);
}
const robotsText = read(path.join(root, "public", "robots.txt"));
if (!robotsText.includes("Sitemap: https://cognivantalabs.com/sitemap.xml"))
  sitemapErrors.push("robots.txt sitemap reference is missing or wrong");

const result = {
  generatedAt: new Date().toISOString(),
  siteOrigin,
  buildDirectory: "dist/client",
  sitemap: { url: `${siteOrigin}/sitemap.xml`, count: sitemapRoutes.length, errors: sitemapErrors },
  noindexRoutes,
  legacyRoutes: legacyPaths.map((source) => ({
    source,
    expectedStatus: redirectMap.has(source) ? 301 : 404,
    destination: redirectMap.get(source) ?? null,
  })),
  routes: routeAudit,
  internalLinkErrors,
  status: sitemapErrors.length === 0 && internalLinkErrors.length === 0 ? "PASS" : "FAIL",
};

if (process.argv.includes("--write-reports")) {
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(
    path.join(reportsDir, "google-indexing-url-audit-2026-07-31.json"),
    `${JSON.stringify(result, null, 2)}\n`,
  );
  const report = `# Google Indexing Remediation Audit — 31 July 2026

## Executive summary

The static production artifact was audited after canonical, sitemap, legacy-route, and Hostinger fallback corrections. The audit covers ${routeAudit.length} sitemap routes and ${htmlFiles.length} prerendered HTML documents.

## Root causes found

- Canonical tags were emitted as relative paths rather than absolute production URLs.
- The sitemap omitted several public prerendered routes.
- Hostinger .htaccess rewrote unknown paths to the homepage, creating soft 404s.
- Privacy and Terms pages were accidentally marked noindex.

## Remediation

- Every indexable route now self-canonicalizes to https://cognivantalabs.com.
- Sitemap entries are absolute, unique, public, prerendered, and free of legacy HTML routes.
- Known equivalent legacy routes use exact server-side 301 redirects; obsolete template routes remain genuine 404s.
- The universal SPA fallback was removed and a branded 404 document is configured.
- Login/MyCogni utility routes remain intentionally noindex; they are excluded from the sitemap.
- Robots continues to allow public crawling and points to the canonical sitemap.

## Legacy route treatment

${legacyPaths.map((source) => `- \`${source}\` → ${redirectMap.has(source) ? `301 \`${redirectMap.get(source)}\`` : "404 (obsolete or no verified equivalent)"}`).join("\n")}

## Validation results

- SEO audit: **${result.status}**
- Sitemap routes: **${sitemapRoutes.length}**
- Prerendered HTML files: **${htmlFiles.length}**
- Intentional noindex routes: **${noindexRoutes.filter((route) => allowedNoindex.has(route)).join(", ") || "none"}**
- Sitemap errors: **${sitemapErrors.length}**
- Internal-link errors: **${internalLinkErrors.length}**

## Production verification status

The pre-change production check showed unknown URLs returning 200 because of the old SPA fallback. Code changes are local until the committed branch is deployed; post-deployment HTTP checks remain required.

## Search Console actions after deployment

1. Submit or refresh https://cognivantalabs.com/sitemap.xml.
2. Inspect representative canonical pages and the corrected legacy equivalents.
3. Validate fixes for noindex and duplicate-canonical issues after Google recrawls.
4. Do not request indexing for obsolete 404 URLs.
5. Request indexing only for strategically important public pages.
6. Re-export the Page Indexing report after validation.
`;
  fs.writeFileSync(path.join(reportsDir, "google-indexing-remediation-2026-07-31.md"), report);
}

if (result.status !== "PASS") {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}
console.log(
  `SEO audit PASS: ${sitemapRoutes.length} sitemap routes, ${htmlFiles.length} HTML files, ${noindexRoutes.length} noindex routes`,
);
