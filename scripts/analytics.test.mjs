import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const rootRoute = readFileSync(join(root, "src", "routes", "__root.tsx"), "utf8");
const gtmComponent = readFileSync(
  join(root, "src", "components", "site", "GoogleTagManager.tsx"),
  "utf8",
);
const gtmConfig = readFileSync(join(root, "src", "lib", "google-tag-manager.ts"), "utf8");
const headers = readFileSync(join(root, "public", "_headers"), "utf8");
const htaccess = readFileSync(join(root, "public", ".htaccess"), "utf8");
const containerId = "GTM-W2SGX7Z8";

test("GTM is owned by the shared root shell", () => {
  assert.match(
    rootRoute,
    /scripts:\s*shouldLoadGoogleTagManager\(pathname\)[\s\S]*googleTagManagerHeadScript/,
  );
  assert.equal((rootRoute.match(/GoogleTagManagerNoscript/g) ?? []).length, 2);
  assert.match(gtmConfig, new RegExp(containerId));
  assert.match(gtmConfig, /window,document,'script','dataLayer'/);
  assert.doesNotMatch(rootRoute, /gtag\.js/);
});

test("GTM is excluded from noindex utility routes", () => {
  assert.match(gtmConfig, /\/cognites\/login/);
  assert.match(gtmConfig, /\/cognites\/mycogni/);
  assert.match(rootRoute, /shouldLoadGoogleTagManager\(pathname\)/);
});

test("production security policies allow only the required GTM origins", () => {
  assert.match(headers, /script-src[^\n]*https:\/\/www\.googletagmanager\.com/);
  assert.match(headers, /frame-src https:\/\/www\.googletagmanager\.com/);
  assert.match(htaccess, /script-src[^\n]*https:\/\/www\.googletagmanager\.com/);
  assert.match(htaccess, /frame-src https:\/\/www\.googletagmanager\.com/);
  assert.doesNotMatch(headers, /script-src[^\n]*\*\s/);
  assert.doesNotMatch(htaccess, /script-src[^\n]*\*\s/);
});

test("generated public HTML contains one head bootstrap and one noscript iframe", () => {
  const indexPath = join(root, "dist", "client", "index.html");
  assert.ok(existsSync(indexPath), "run npm run build before npm run test:analytics");
  const html = readFileSync(indexPath, "utf8");
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";
  const body = html.match(/<body[\s\S]*?<\/body>/i)?.[0] ?? "";
  assert.equal((head.match(new RegExp(containerId, "g")) ?? []).length, 1);
  assert.equal(
    (
      body.match(
        new RegExp(`https://www\\.googletagmanager\\.com/ns\\.html\\?id=${containerId}`, "g"),
      ) ?? []
    ).length,
    1,
  );
  assert.equal((html.match(new RegExp(containerId, "g")) ?? []).length, 2);
  assert.doesNotMatch(html, /gtag\.js/);
});

test("generated noindex utility pages do not load GTM", () => {
  for (const route of ["cognites/login", "cognites/mycogni"]) {
    const routePath = join(root, "dist", "client", route, "index.html");
    assert.ok(existsSync(routePath), `missing generated route: ${route}`);
    const html = readFileSync(routePath, "utf8");
    assert.doesNotMatch(html, new RegExp(containerId));
  }
});
