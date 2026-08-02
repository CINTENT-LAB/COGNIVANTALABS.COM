import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const root = process.cwd();
const siteOrigin = "https://cognivantalabs.com";
const clientDir = path.join(root, "dist", "client");
const metadata = JSON.parse(
  fs.readFileSync(path.join(root, "src", "data", "seo-metadata.json"), "utf8"),
);
const sitemap = fs.readFileSync(path.join(root, "public", "sitemap.xml"), "utf8");
const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
const utilityRoutes = ["/cognites/login", "/cognites/mycogni"];

function htmlPath(route) {
  return route === "/"
    ? path.join(clientDir, "index.html")
    : path.join(clientDir, route.slice(1), "index.html");
}

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1] ?? null;
}

function metaValues(html, name, property = "name") {
  return tags(html, "meta")
    .filter((tag) => attribute(tag, property)?.toLowerCase() === name)
    .map((tag) => decodeHtml(attribute(tag, "content") ?? ""));
}

function linkValues(html, rel) {
  return tags(html, "link")
    .filter((tag) => attribute(tag, "rel")?.toLowerCase() === rel)
    .map((tag) => attribute(tag, "href"));
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function titleValues(html) {
  return [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map((match) =>
    decodeHtml(match[1].trim()),
  );
}

function h1Values(html) {
  return [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) =>
    decodeHtml(
      match[1]
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    ),
  );
}

function assertRouteMetadata(route) {
  const file = htmlPath(route);
  assert.ok(fs.existsSync(file), `${route} must have generated HTML`);
  const html = fs.readFileSync(file, "utf8");
  const expected = metadata[route];
  assert.ok(expected, `${route} must exist in the central metadata map`);

  const titles = titleValues(html);
  const descriptions = metaValues(html, "description");
  const canonical = linkValues(html, "canonical");
  const ogTitles = metaValues(html, "og:title", "property");
  const ogDescriptions = metaValues(html, "og:description", "property");
  const ogUrls = metaValues(html, "og:url", "property");
  const twitterTitles = metaValues(html, "twitter:title");
  const twitterDescriptions = metaValues(html, "twitter:description");
  const h1s = h1Values(html);

  assert.equal(titles.length, 1, `${route} must have exactly one title`);
  assert.equal(descriptions.length, 1, `${route} must have exactly one description`);
  assert.equal(canonical.length, 1, `${route} must have exactly one canonical`);
  assert.equal(ogTitles.length, 1, `${route} must have exactly one og:title`);
  assert.equal(ogDescriptions.length, 1, `${route} must have exactly one og:description`);
  assert.equal(ogUrls.length, 1, `${route} must have exactly one og:url`);
  assert.equal(twitterTitles.length, 1, `${route} must have exactly one twitter:title`);
  assert.equal(twitterDescriptions.length, 1, `${route} must have exactly one twitter:description`);
  assert.equal(h1s.length, 1, `${route} must have exactly one H1`);

  const expectedCanonical = `${siteOrigin}${route === "/" ? "/" : route}`;
  assert.equal(titles[0], expected.title, `${route} title must match the approved map`);
  assert.equal(
    decodeHtml(descriptions[0]),
    expected.description,
    `${route} description must match the approved map`,
  );
  assert.equal(canonical[0], expectedCanonical, `${route} canonical must be self-referencing`);
  assert.equal(ogTitles[0], expected.title, `${route} og:title must match title`);
  assert.equal(
    decodeHtml(ogDescriptions[0]),
    expected.description,
    `${route} og:description must match description`,
  );
  assert.equal(ogUrls[0], expectedCanonical, `${route} og:url must match canonical`);
  assert.equal(twitterTitles[0], expected.title, `${route} twitter:title must match title`);
  assert.equal(
    decodeHtml(twitterDescriptions[0]),
    expected.description,
    `${route} twitter:description must match description`,
  );
  if (!expected.robots) {
    assert.equal(
      metaValues(html, "robots")[0]?.toLowerCase().includes("noindex") ?? false,
      false,
      `${route} must remain indexable`,
    );
  } else {
    assert.match(metaValues(html, "robots")[0] ?? "", /noindex/i, `${route} must remain noindex`);
  }
}

test("central metadata map covers every sitemap route", () => {
  assert.equal(new Set(sitemapRoutes).size, sitemapRoutes.length, "sitemap routes must be unique");
  for (const route of sitemapRoutes) assert.ok(metadata[route], `${route} is missing from the map`);
  for (const route of Object.keys(metadata)) {
    if (!utilityRoutes.includes(route))
      assert.ok(sitemapRoutes.includes(route), `${route} is not in sitemap`);
  }
});

test("approved titles and descriptions are unique", () => {
  const indexable = sitemapRoutes.map((route) => metadata[route]);
  assert.equal(
    new Set(indexable.map((entry) => entry.title)).size,
    indexable.length,
    "indexable titles must be unique",
  );
  assert.equal(
    new Set(indexable.map((entry) => entry.description)).size,
    indexable.length,
    "indexable descriptions must be unique",
  );
});

test("every sitemap route has complete metadata parity", () => {
  assert.ok(fs.existsSync(clientDir), "run npm run build before metadata tests");
  for (const route of sitemapRoutes) assertRouteMetadata(route);
});

test("utility routes remain noindex and outside the sitemap", () => {
  for (const route of utilityRoutes) {
    assert.equal(sitemapRoutes.includes(route), false, `${route} must not be in the sitemap`);
    const html = fs.readFileSync(htmlPath(route), "utf8");
    assert.equal(metaValues(html, "robots").length, 1, `${route} must have one robots tag`);
    assert.match(metaValues(html, "robots")[0], /noindex/i, `${route} must remain noindex`);
    assertRouteMetadata(route);
  }
});
