import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const clientDir = join(root, "dist", "client");
const publicHtaccess = readFileSync(join(root, "public", ".htaccess"), "utf8");
const distHtaccessPath = join(clientDir, ".htaccess");
const distHtaccess = existsSync(distHtaccessPath) ? readFileSync(distHtaccessPath, "utf8") : "";
const sitemap = readFileSync(join(root, "public", "sitemap.xml"), "utf8");
const hostnameNormalization = publicHtaccess.indexOf("RewriteCond %{HTTPS} !=on");

const redirects = [
  {
    source: "/pages/applications.html",
    target: "https://cognivantalabs.com/applications",
  },
  {
    source: "/pages/platform.html",
    target: "https://cognivantalabs.com/platform",
  },
];

function routeHtml(route) {
  return readFileSync(join(clientDir, route.slice(1), "index.html"), "utf8");
}

test("generated Hostinger artifact contains exact legacy redirects before hostname normalization", () => {
  assert.ok(distHtaccess, "run npm run build before legacy redirect tests");

  for (const { source, target } of redirects) {
    const ruleLine = `RewriteRule ^${source.slice(1).replaceAll(".", "\\.")}$ ${target} [R=301,L,NE]`;

    assert.ok(
      publicHtaccess.split(/\r?\n/).includes(ruleLine),
      `${source} is missing from public/.htaccess`,
    );
    assert.ok(
      distHtaccess.split(/\r?\n/).includes(ruleLine),
      `${source} is missing from dist/client/.htaccess`,
    );
    assert.ok(
      publicHtaccess.indexOf(ruleLine) < hostnameNormalization,
      `${source} must be before hostname normalization`,
    );
  }
});

for (const { source, target } of redirects) {
  test(`${source} is excluded from sitemap and its canonical destination is indexable`, () => {
    assert.doesNotMatch(
      sitemap,
      new RegExp(`<loc>[^<]*${source.replaceAll(".", "\\.")}[^<]*</loc>`),
    );
    assert.match(sitemap, new RegExp(`<loc>${target.replaceAll(".", "\\.")}</loc>`));

    const html = routeHtml(new URL(target).pathname);
    assert.match(html, new RegExp(`<link[^>]+rel=["']canonical["'][^>]+href=["']${target}`));
    assert.doesNotMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i);
  });
}
