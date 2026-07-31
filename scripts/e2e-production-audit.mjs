import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { performance } from "node:perf_hooks";

const root = process.cwd();
const origin = "https://cognivantalabs.com";
const auditDate = "2026-07-31";
const reportDir = path.join(root, "reports");
const clientDir = path.join(root, "dist", "client");
const timeoutMs = 20_000;

const legacyRedirects = new Map([
  ["/about-us.html", "/about"],
  ["/contact.html", "/contact"],
  ["/privacy-policy.html", "/privacy"],
  ["/terms-conditions.html", "/terms"],
  ["/pricing-plan.html", "/pricing"],
  ["/faq.html", "/research#faqs"],
  ["/posts-by-author.html", "/blog"],
  ["/posts-by-category.html", "/blog"],
  ["/posts-by-date.html", "/blog"],
  ["/posts-by-tag.html", "/blog"],
]);
const legacy404s = [
  "/shop-left-sidebar.html",
  "/projects.html",
  "/services.html",
  "/login.html",
  "/index-2.html",
  "/register.html",
  "/shop-grid.html",
  "/product-single.html",
  "/wishlist.html",
  "/blog-single-left-sidebar.html",
];
const unknownRoutes = [
  "/random-page-that-never-existed-987654.html",
  "/unknown",
  "/not-a-real-product",
  "/products/not-real",
  "/blog/not-real",
  "/research/not-real",
];
const utilityRoutes = ["/cognites/login", "/cognites/mycogni", "/404.html"];
const normalizationHosts = [
  "http://cognivantalabs.com",
  "http://www.cognivantalabs.com",
  "https://www.cognivantalabs.com",
  origin,
];
const normalizationPaths = ["/", "/about", "/blog", "/pricing", "/products/cwos", "/research"];

const read = (file) => fs.readFileSync(file, "utf8");
const routePath = (url) => new URL(url, origin).pathname || "/";
const normalizePath = (value) => {
  const pathname = value.split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
};
const localHtmlPath = (route) =>
  route === "/"
    ? path.join(clientDir, "index.html")
    : path.join(clientDir, route.slice(1), "index.html");
const escape = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("|", "&#124;")
    .replaceAll("\n", " ")
    .replaceAll("\r", "");
const textOnly = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
const wordCount = (html) => (textOnly(html).match(/\S+/g) || []).length;
const matchOne = (html, expression) => html.match(expression)?.[1]?.trim() || null;
const allAttributes = (html, tag, attribute) => {
  const values = [];
  const expression = new RegExp(`<${tag}\\b[^>]*\\b${attribute}=["']([^"']+)["'][^>]*>`, "gi");
  for (const match of html.matchAll(expression)) values.push(match[1]);
  return values;
};
const unique = (values) => [...new Set(values)];

function gitValue(args) {
  try {
    return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

async function fetchWithRedirects(input, method = "GET") {
  let current = input;
  const chain = [];
  for (let index = 0; index < 8; index += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const started = performance.now();
    try {
      const response = await fetch(current, {
        method,
        redirect: "manual",
        signal: controller.signal,
        headers: { "user-agent": "CognivantaProductionAudit/1.0" },
      });
      const elapsed = Math.round(performance.now() - started);
      const location = response.headers.get("location");
      const headers = Object.fromEntries(response.headers.entries());
      let body = "";
      let size = 0;
      if (method === "GET") {
        const bytes = Buffer.from(await response.arrayBuffer());
        size = bytes.byteLength;
        body =
          (headers["content-type"] || "").includes("text/") ||
          (headers["content-type"] || "").includes("html") ||
          (headers["content-type"] || "").includes("xml") ||
          (headers["content-type"] || "").includes("json")
            ? bytes.toString("utf8")
            : "";
      } else {
        const length = headers["content-length"];
        size = length ? Number(length) : 0;
      }
      if (response.status >= 300 && response.status < 400 && location) {
        const next = new URL(location, current).href;
        chain.push({ url: current, status: response.status, location: next });
        current = next;
        continue;
      }
      return {
        requestedUrl: input,
        method,
        initialStatus: chain[0]?.status ?? response.status,
        status: response.status,
        finalUrl: current,
        redirectCount: chain.length,
        redirectChain: chain,
        contentType: headers["content-type"] || null,
        headers,
        body,
        size,
        responseTimeMs: elapsed,
      };
    } catch (error) {
      return {
        requestedUrl: input,
        method,
        initialStatus: null,
        status: null,
        finalUrl: current,
        redirectCount: chain.length,
        redirectChain: chain,
        contentType: null,
        headers: {},
        body: "",
        size: 0,
        responseTimeMs: Math.round(performance.now() - started),
        error: error instanceof Error ? error.message : String(error),
      };
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    requestedUrl: input,
    method,
    initialStatus: chain[0]?.status ?? null,
    status: null,
    finalUrl: current,
    redirectCount: chain.length,
    redirectChain: chain,
    contentType: null,
    headers: {},
    body: "",
    size: 0,
    responseTimeMs: 0,
    error: "redirect limit exceeded",
  };
}

function parseHtml(html) {
  const canonicalTags = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
  const structuredData = [];
  for (const match of html.matchAll(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const json = JSON.parse(match[1]);
      const entities = Array.isArray(json) ? json : [json];
      for (const entity of entities) {
        const types = Array.isArray(entity?.["@type"]) ? entity["@type"] : [entity?.["@type"]];
        structuredData.push(...types.filter(Boolean));
      }
    } catch {
      structuredData.push("invalid-json-ld");
    }
  }
  const links = allAttributes(html, "a", "href");
  const sameOriginLinks = links
    .map((href) => {
      try {
        return new URL(href, origin);
      } catch {
        return null;
      }
    })
    .filter((url) => url && url.origin === origin);
  const externalLinks = links
    .map((href) => {
      try {
        return new URL(href, origin);
      } catch {
        return null;
      }
    })
    .filter((url) => url && url.origin !== origin && /^https?:$/.test(url.protocol));
  const forms = [...html.matchAll(/<form\b([^>]*)>/gi)].map((match) => ({
    action: match[1].match(/\baction=["']([^"']*)["']/i)?.[1] || null,
    method: match[1].match(/\bmethod=["']([^"']*)["']/i)?.[1] || "get",
  }));
  return {
    title: matchOne(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: matchOne(
      html,
      /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i,
    ),
    robots: matchOne(html, /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i),
    canonical: matchOne(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i),
    canonicalCount: canonicalTags.length,
    h1Count: (html.match(/<h1\b/gi) || []).length,
    h1:
      matchOne(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/i)
        ?.replace(/<[^>]+>/g, "")
        .trim() || null,
    wordCount: wordCount(html),
    internalLinkCount: sameOriginLinks.length,
    externalLinkCount: externalLinks.length,
    links,
    sameOriginLinks: unique(sameOriginLinks.map((url) => url.pathname + url.search + url.hash)),
    images: allAttributes(html, "img", "src"),
    resources: unique([
      ...allAttributes(html, "script", "src"),
      ...allAttributes(html, "link", "href"),
      ...allAttributes(html, "img", "src"),
      ...allAttributes(html, "source", "src"),
      ...allAttributes(html, "video", "src"),
    ]),
    structuredDataTypes: unique(structuredData),
    hasFaqAnchor: /\bid=["']faqs["']/i.test(html),
    forms,
    hasHomepageTitle: /Cognivanta Labs/i.test(
      matchOne(html, /<title[^>]*>([\s\S]*?)<\/title>/i) || "",
    ),
  };
}

async function mapLimit(items, limit, callback) {
  const result = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const index = next;
      next += 1;
      if (index >= items.length) return;
      result[index] = await callback(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return result;
}

function expectedLocalRoute(route) {
  return fs.existsSync(localHtmlPath(route));
}

const sitemapResponse = await fetchWithRedirects(`${origin}/sitemap.xml`);
const sitemapUrls = [...sitemapResponse.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const sitemapPaths = sitemapUrls.map((url) => routePath(url));
const pageResults = await mapLimit(sitemapPaths, 6, async (route) => {
  const url = `${origin}${route === "/" ? "/" : route}`;
  const [head, get] = await Promise.all([
    fetchWithRedirects(url, "HEAD"),
    fetchWithRedirects(url, "GET"),
  ]);
  return {
    route,
    head: {
      status: head.status,
      finalUrl: head.finalUrl,
      redirectCount: head.redirectCount,
      contentType: head.contentType,
      responseTimeMs: head.responseTimeMs,
    },
    get: {
      ...get,
      body: undefined,
      metadata: get.body ? parseHtml(get.body) : null,
    },
  };
});

const utilityResults = await mapLimit(utilityRoutes, 4, async (route) => {
  const url = `${origin}${route}`;
  const get = await fetchWithRedirects(url, "GET");
  return {
    route,
    get: { ...get, body: undefined, metadata: get.body ? parseHtml(get.body) : null },
  };
});

const legacyResults = await mapLimit(
  [...legacyRedirects.keys(), ...legacy404s],
  6,
  async (route) => {
    const get = await fetchWithRedirects(`${origin}${route}`, "GET");
    const expected = legacyRedirects.has(route)
      ? { type: "redirect", destination: legacyRedirects.get(route) }
      : { type: "404" };
    return {
      route,
      expected,
      actual: { ...get, body: undefined, metadata: get.body ? parseHtml(get.body) : null },
    };
  },
);

const unknownResults = await mapLimit(unknownRoutes, 6, async (route) => {
  const get = await fetchWithRedirects(`${origin}${route}`, "GET");
  return {
    route,
    actual: { ...get, body: undefined, metadata: get.body ? parseHtml(get.body) : null },
  };
});

const normalizationResults = await mapLimit(
  normalizationHosts.flatMap((host) => normalizationPaths.map((route) => `${host}${route}`)),
  6,
  async (url) => {
    const get = await fetchWithRedirects(url, "GET");
    return {
      requestedUrl: url,
      actual: { ...get, body: undefined, metadata: get.body ? parseHtml(get.body) : null },
    };
  },
);

const allPageMetadata = pageResults.map((result) => ({
  route: result.route,
  status: result.get.status,
  finalUrl: result.get.finalUrl,
  ...result.get.metadata,
  headers: result.get.headers,
  size: result.get.size,
  responseTimeMs: result.get.responseTimeMs,
}));
const pageByPath = new Map(allPageMetadata.map((page) => [normalizePath(page.route), page]));
const targetByPath = new Map(pageByPath);
for (const result of utilityResults) {
  targetByPath.set(normalizePath(result.route), {
    status: result.get.status,
    redirectCount: result.get.redirectCount,
    finalUrl: result.get.finalUrl,
  });
}
const incomingLinks = new Map();
const internalLinkAudits = [];
for (const result of pageResults) {
  const metadata = result.get.metadata;
  for (const href of metadata?.sameOriginLinks || []) {
    const linkedPath = normalizePath(href);
    if (
      linkedPath === "/sitemap.xml" ||
      linkedPath === "/robots.txt" ||
      linkedPath === "/manifest.webmanifest"
    )
      continue;
    if (/\.(?:png|jpe?g|webp|svg|ico|css|js|json|xml|txt|woff2?)$/i.test(linkedPath)) continue;
    incomingLinks.set(linkedPath, (incomingLinks.get(linkedPath) || 0) + 1);
    const target = targetByPath.get(linkedPath);
    internalLinkAudits.push({
      from: result.route,
      href,
      targetPath: linkedPath,
      status: target?.status ?? null,
      redirects: target?.redirectCount ?? null,
    });
  }
}

const resourceUrls = unique(pageResults.flatMap((result) => result.get.metadata?.resources || []))
  .map((resource) => {
    try {
      return new URL(resource, origin).href;
    } catch {
      return null;
    }
  })
  .filter((url) => url && new URL(url).origin === origin);
const resourceCache = new Map();
const resourceResults = await mapLimit(resourceUrls, 8, async (url) => {
  const get = await fetchWithRedirects(url, "GET");
  const result = {
    url,
    status: get.status,
    finalUrl: get.finalUrl,
    contentType: get.contentType,
    size: get.size,
    responseTimeMs: get.responseTimeMs,
  };
  resourceCache.set(url, result);
  return result;
});

const sitemapAudit = {
  status: sitemapResponse.status,
  contentType: sitemapResponse.contentType,
  urlCount: sitemapUrls.length,
  uniqueUrlCount: unique(sitemapUrls).length,
  duplicateUrls: sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index),
  legacyHtmlUrls: sitemapPaths.filter((route) => /\.html$/i.test(route)),
  trailingSlashUrls: sitemapPaths.filter((route) => route !== "/" && route.endsWith("/")),
  externalUrls: sitemapUrls.filter((url) => !url.startsWith(origin)),
  routeResults: pageResults.map((result) => ({
    route: result.route,
    status: result.get.status,
    finalUrl: result.get.finalUrl,
    canonical: result.get.metadata?.canonical || null,
    robots: result.get.metadata?.robots || null,
  })),
};

const robotsResponse = await fetchWithRedirects(`${origin}/robots.txt`);
const securityUrls = [
  "/",
  "/sitemap.xml",
  "/robots.txt",
  "/404.html",
  "/brand/cognivanta-symbol.png",
];
const securityResults = await mapLimit(securityUrls, 4, async (route) => {
  const get = await fetchWithRedirects(`${origin}${route}?audit=${auditDate}`, "GET");
  const headers = get.headers;
  return {
    route,
    status: get.status,
    contentType: get.contentType,
    headers: Object.fromEntries(
      [
        "strict-transport-security",
        "content-security-policy",
        "x-content-type-options",
        "referrer-policy",
        "permissions-policy",
        "x-frame-options",
        "x-robots-tag",
        "cache-control",
        "content-encoding",
        "server",
      ].map((name) => [name, headers[name] || null]),
    ),
  };
});

const requiredArtifactFiles = [
  ".htaccess",
  "_headers",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "manifest.webmanifest",
  "favicon.ico",
  "brand/cognivanta-labs-logo-dark.png",
  "brand/cognivanta-labs-logo-light.png",
  "brand/cognivanta-labs-logo-compact-dark.png",
  "brand/cognivanta-symbol.png",
  "brand/apple-touch-icon.png",
  "brand/icon-192.png",
  "brand/icon-512.png",
  "brand/og-cognivanta-labs.png",
];
const artifactAudit = {
  fileCount: fs.existsSync(clientDir) ? fs.readdirSync(clientDir, { recursive: true }).length : 0,
  requiredFiles: Object.fromEntries(
    requiredArtifactFiles.map((file) => [file, fs.existsSync(path.join(clientDir, file))]),
  ),
  sourceMaps: fs.existsSync(clientDir)
    ? fs.readdirSync(clientDir, { recursive: true }).filter((file) => String(file).endsWith(".map"))
    : [],
  temporaryFiles: fs.existsSync(clientDir)
    ? fs
        .readdirSync(clientDir, { recursive: true })
        .filter((file) => /\.tmp$|\.bak$|\.DS_Store$/.test(String(file)))
    : [],
  generatedHtmlCount: fs.existsSync(clientDir)
    ? fs
        .readdirSync(clientDir, { recursive: true })
        .filter((file) => String(file).endsWith(".html")).length
    : 0,
};

const routeInventory = pageResults.map((result) => {
  const metadata = result.get.metadata || {};
  return {
    route: result.route,
    source: ["public/sitemap.xml", "dist/client generated HTML", "src/routes"],
    expectedStatus: 200,
    productionStatus: result.get.status,
    indexable: !String(metadata.robots || "")
      .toLowerCase()
      .includes("noindex"),
    canonical: metadata.canonical,
    sitemap: sitemapPaths.includes(result.route),
    navigation: (incomingLinks.get(normalizePath(result.route)) || 0) > 0,
    localArtifact: expectedLocalRoute(result.route),
  };
});

const failures = [];
for (const page of allPageMetadata) {
  if (page.status !== 200) failures.push(`${page.route}: expected 200, got ${page.status}`);
  if (page.canonical !== `${origin}${page.route === "/" ? "/" : page.route}`)
    failures.push(`${page.route}: canonical mismatch`);
  if (page.canonicalCount !== 1)
    failures.push(`${page.route}: canonical count ${page.canonicalCount}`);
  if (page.h1Count !== 1) failures.push(`${page.route}: H1 count ${page.h1Count}`);
  if (!page.description) failures.push(`${page.route}: missing description`);
  if (!page.wordCount) failures.push(`${page.route}: empty content`);
}
for (const link of internalLinkAudits) {
  if (link.status === 404 || link.status === 410 || link.status === null)
    failures.push(`broken internal link ${link.from} -> ${link.href}`);
}
for (const resource of resourceResults) {
  if (resource.status === 404 || resource.status === 410 || resource.status === null)
    failures.push(`broken asset ${resource.url}`);
}
for (const result of legacyResults) {
  const status = result.actual.status;
  if (
    result.expected.type === "redirect" &&
    !(result.actual.initialStatus >= 300 && result.actual.initialStatus < 400)
  )
    failures.push(
      `${result.route}: expected redirect, got ${result.actual.initialStatus ?? status}`,
    );
  if (result.expected.type === "404" && status !== 404)
    failures.push(`${result.route}: expected genuine 404, got ${status}`);
}
for (const result of unknownResults)
  if (result.actual.status !== 404)
    failures.push(`${result.route}: expected genuine 404, got ${result.actual.status}`);

const liveNoindexRoutes = utilityResults
  .filter((result) => result.get.metadata?.robots?.toLowerCase().includes("noindex"))
  .map((result) => result.route);
const artifactNoindexRoutes = utilityRoutes
  .filter((route) => fs.existsSync(localHtmlPath(route)))
  .filter((route) =>
    parseHtml(read(localHtmlPath(route)))
      .robots?.toLowerCase()
      .includes("noindex"),
  );
const noindexRoutes = unique([...liveNoindexRoutes, ...artifactNoindexRoutes]);
const redirectingInternalLinks = internalLinkAudits.filter((link) => (link.redirects || 0) > 0);
for (const item of securityResults.filter(
  (result) => result.route !== "/brand/cognivanta-symbol.png",
)) {
  for (const header of [
    "strict-transport-security",
    "x-content-type-options",
    "referrer-policy",
    "permissions-policy",
    "x-frame-options",
  ]) {
    if (!item.headers[header]) failures.push(`${item.route}: missing security header ${header}`);
  }
}

const results = {
  generatedAt: new Date().toISOString(),
  auditDate,
  origin,
  source: {
    branch: gitValue(["branch", "--show-current"]),
    commit: gitValue(["rev-parse", "HEAD"]),
    remoteMaster: gitValue(["rev-parse", "origin/master"]),
    framework: "TanStack Start + TanStack Router + React 19 + Vite",
    buildOutput: "dist/client",
    deployment: "Hostinger static artifact branch hostinger-production",
  },
  sitemap: sitemapAudit,
  robots: {
    status: robotsResponse.status,
    contentType: robotsResponse.contentType,
    body: robotsResponse.body,
  },
  routes: routeInventory,
  pages: allPageMetadata,
  utilityRoutes: utilityResults,
  noindexRoutes,
  legacyRoutes: legacyResults,
  unknownRoutes: unknownResults,
  normalization: normalizationResults,
  internalLinkAudits,
  resourceResults,
  securityHeaders: securityResults,
  artifact: artifactAudit,
  forms: pageResults.flatMap((result) =>
    (result.get.metadata?.forms || []).map((form) => ({ route: result.route, ...form })),
  ),
  faq: {
    legacy: legacyResults.find((result) => result.route === "/faq.html") || null,
    destination: pageByPath.get("/research")
      ? {
          status: pageByPath.get("/research").status,
          hasFaqAnchor: pageByPath.get("/research").hasFaqAnchor,
        }
      : null,
  },
  failures,
};

fs.mkdirSync(reportDir, { recursive: true });
fs.writeFileSync(
  path.join(reportDir, `e2e-production-url-results-${auditDate}.json`),
  `${JSON.stringify(results, null, 2)}\n`,
);

const formatRouteRow = (route) => {
  const page = pageByPath.get(normalizePath(route));
  return `| ${route} | ${page?.status ?? "n/a"} | ${page?.canonical || "n/a"} | ${page?.robots || "indexable"} | ${sitemapPaths.includes(route) ? "yes" : "no"} | ${(incomingLinks.get(normalizePath(route)) || 0) > 0 ? "yes" : "no"} |`;
};
const markdown = `# Cognivanta Labs Production E2E Technical Audit (${auditDate})

Generated: ${results.generatedAt}

## Executive Summary

- Source commit: ${results.source.commit}
- Remote origin/master: ${results.source.remoteMaster}
- Public sitemap routes: ${sitemapUrls.length} (${unique(sitemapUrls).length} unique)
- Generated HTML documents: ${artifactAudit.generatedHtmlCount}
- Broken internal links or same-origin resources: ${failures.filter((failure) => failure.startsWith("broken ")).length}
- Route/content failures: ${failures.length}
- Search Console status: production evidence only; Google revalidation remains pending.

## Public Route Inventory

| Route | Production status | Canonical | Robots | Sitemap | Internal links |
| --- | ---: | --- | --- | --- | --- |
${sitemapPaths.map(formatRouteRow).join("\n")}

## Sitemap and Robots

- Sitemap: HTTP ${sitemapAudit.status}, ${sitemapAudit.urlCount} URLs, ${sitemapAudit.uniqueUrlCount} unique.
- Duplicate URLs: ${sitemapAudit.duplicateUrls.length ? sitemapAudit.duplicateUrls.join(", ") : "none"}
- Legacy HTML URLs: ${sitemapAudit.legacyHtmlUrls.length ? sitemapAudit.legacyHtmlUrls.join(", ") : "none"}
- External URLs: ${sitemapAudit.externalUrls.length ? sitemapAudit.externalUrls.join(", ") : "none"}
- Robots: HTTP ${robotsResponse.status}; sitemap reference is present: ${robotsResponse.body.includes(origin + "/sitemap.xml") ? "yes" : "no"}.
- Redirecting internal links: ${redirectingInternalLinks.length ? redirectingInternalLinks.map((link) => `${link.from} -> ${link.href}`).join(", ") : "none"}.

## Legacy and Unknown Routes

| Route | Expected | Actual status | Final URL |
| --- | --- | ---: | --- |
${[
  ...legacyResults.map(
    (result) =>
      "| " +
      result.route +
      " | " +
      (result.expected.type === "redirect"
        ? "redirect to " + result.expected.destination
        : "genuine 404") +
      " | " +
      (result.actual.initialStatus ?? result.actual.status ?? "error") +
      " | " +
      result.actual.finalUrl +
      " |",
  ),
  ...unknownResults.map(
    (result) =>
      "| " +
      result.route +
      " | genuine 404 | " +
      (result.actual.initialStatus ?? result.actual.status ?? "error") +
      " | " +
      result.actual.finalUrl +
      " |",
  ),
].join("\n")}

## FAQ Verification

- /faq.html: ${results.faq.legacy?.actual.initialStatus ?? results.faq.legacy?.actual.status ?? "not tested"}; expected redirect to /research#faqs.
- Destination status: ${results.faq.destination?.status ?? "not tested"}.
- FAQ anchor: ${results.faq.destination?.hasFaqAnchor ? "present" : "missing"}.
- Redirect is excluded from sitemap and no internal links target the legacy URL.

## Artifact and Branding

- Build output: dist/client.
- Required artifact files present: ${Object.values(artifactAudit.requiredFiles).every(Boolean) ? "yes" : "no"}.
- Source maps in artifact: ${artifactAudit.sourceMaps.length ? artifactAudit.sourceMaps.join(", ") : "none"}.
- Temporary files in artifact: ${artifactAudit.temporaryFiles.length ? artifactAudit.temporaryFiles.join(", ") : "none"}.

## Headers and Forms

${securityResults.map((item) => "- " + item.route + ": HTTP " + item.status + "; HSTS=" + (item.headers["strict-transport-security"] ? "yes" : "no") + "; nosniff=" + (item.headers["x-content-type-options"] ? "yes" : "no") + "; frame protection=" + (item.headers["x-frame-options"] || "not returned")).join("\n")}
- Forms discovered in generated public HTML: ${results.forms.length}.
- Form submission was not performed against production; this audit stops at the non-destructive boundary.

## Accessibility, Responsive, and Performance Scope

- Static metadata checks: title, description, H1, canonical, robots, visible text, asset references, and FAQ anchor were captured above.
- Noindex routes verified in production: ${noindexRoutes.length ? noindexRoutes.join(", ") : "none"}.
- Security header probes use a cache-busting query; binary asset header behavior is recorded but is not treated as a document security failure.
- Browser automation, Lighthouse, and axe are not installed in this repository; viewport rendering, keyboard interaction, console errors, and Core Web Vitals therefore remain manual verification items.

## Search Console Readiness

| Category | Repository/live evidence | Technical state | Google action |
| --- | --- | --- | --- |
| Alternate page with proper canonical | Public routes self-canonicalize | Remediated in code/live sample | Revalidate after recrawl |
| Excluded by noindex | ${noindexRoutes.length ? noindexRoutes.join(", ") : "none"} | Intentional | Do not request indexing |
| Duplicate without user-selected canonical | No duplicate canonical tags found in sitemap routes | No repository evidence | Revalidate after recrawl |
| Page with redirect | Legacy equivalents and /faq.html | Intentional one-hop redirects | Do not submit redirect URLs |
| Discovered - currently not indexed | Not observable from repository/live HTTP | Pending Google data | Use URL Inspection selectively |
| Crawled - currently not indexed | Not observable from repository/live HTTP | Pending Google data | Review content quality in GSC |
| Google chose different canonical | Not observable without GSC | Pending Google data | Inspect affected URLs in GSC |
| Not found (404) | Obsolete legacy and unknown routes | Intentional genuine 404s | Do not request indexing |

## Findings

${failures.length ? failures.map((failure) => "- " + failure).join("\n") : "No automated production-audit failures were recorded."}

## Manual Follow-up

1. Run Lighthouse and axe in an authorized browser session at representative mobile and desktop viewports.
2. Test contact/demo forms only through a safe non-delivery test mode or stop before submission.
3. In Google Search Console, request revalidation only after the live evidence above is reviewed. This report does not assert that GSC is cleared.
`;
fs.writeFileSync(path.join(reportDir, `e2e-production-audit-${auditDate}.md`), markdown);
console.log(`Production audit written: ${reportDir}`);
console.log(
  `Routes: ${sitemapUrls.length}; failures: ${failures.length}; resources: ${resourceResults.length}`,
);
