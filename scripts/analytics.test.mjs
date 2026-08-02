import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const containerId = "GTM-W2SGX7Z8";
const ga4MeasurementId = "G-CB7M3C0J0Y";
const clarityProjectId = "xw2pj86era";

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    if (statSync(fullPath).isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

const rootRoute = readFileSync(join(root, "src", "routes", "__root.tsx"), "utf8");
const gtmComponent = readFileSync(
  join(root, "src", "components", "site", "GoogleTagManager.tsx"),
  "utf8",
);
const gtmConfig = readFileSync(join(root, "src", "lib", "google-tag-manager.ts"), "utf8");
const analyticsHelper = readFileSync(join(root, "src", "lib", "analytics.ts"), "utf8");
const headers = readFileSync(join(root, "public", "_headers"), "utf8");
const htaccess = readFileSync(join(root, "public", ".htaccess"), "utf8");
const websiteSource = walk(join(root, "src"))
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

test("GTM is owned by the shared root shell", () => {
  assert.match(
    rootRoute,
    /scripts:\s*shouldLoadGoogleTagManager\(pathname\)[\s\S]*googleTagManagerHeadScript/,
  );
  assert.equal((rootRoute.match(/GoogleTagManagerNoscript/g) ?? []).length, 2);
  assert.match(gtmConfig, new RegExp(containerId));
  assert.match(gtmConfig, /window,document,'script','dataLayer'/);
  assert.match(gtmComponent, /GOOGLE_TAG_MANAGER_ID/);
  assert.doesNotMatch(rootRoute, /gtag\.js/);
});

test("GTM is excluded from noindex utility routes", () => {
  assert.match(gtmConfig, /\/cognites\/login/);
  assert.match(gtmConfig, /\/cognites\/mycogni/);
  assert.match(rootRoute, /shouldLoadGoogleTagManager\(pathname\)/);
});

test("GA4 and Clarity are not directly installed in website source", () => {
  assert.doesNotMatch(websiteSource, new RegExp(ga4MeasurementId));
  assert.doesNotMatch(websiteSource, new RegExp(clarityProjectId));
  assert.doesNotMatch(websiteSource, /gtag\.js/);
  assert.doesNotMatch(websiteSource, /clarity\.ms\/tag/);
});

test("production security policies allow only the required analytics origins", () => {
  for (const policy of [headers, htaccess]) {
    assert.match(policy, /script-src[^\n]*https:\/\/www\.googletagmanager\.com/);
    assert.match(policy, /script-src[^\n]*https:\/\/www\.clarity\.ms/);
    assert.match(policy, /script-src[^\n]*https:\/\/scripts\.clarity\.ms/);
    assert.match(policy, /connect-src[^\n]*https:\/\/www\.google-analytics\.com/);
    assert.match(policy, /connect-src[^\n]*https:\/\/region1\.google-analytics\.com/);
    assert.match(policy, /connect-src[^\n]*https:\/\/c\.clarity\.ms/);
    assert.match(policy, /img-src[^\n]*https:\/\/www\.google-analytics\.com/);
    assert.match(policy, /img-src[^\n]*https:\/\/www\.clarity\.ms/);
    assert.match(policy, /frame-src https:\/\/www\.googletagmanager\.com/);
    assert.doesNotMatch(policy, /script-src[^\n]*\*\s/);
  }
});

test("sensitive input surfaces carry Clarity masking", () => {
  const sensitiveFiles = [
    "src/routes/contact.tsx",
    "src/routes/careers.tsx",
    "src/routes/investors.tsx",
    "src/routes/media.tsx",
    "src/routes/pricing.tsx",
    "src/routes/cognites.login.tsx",
    "src/components/site/Footer.tsx",
    "src/components/site/CogniLauncher.tsx",
  ];

  for (const file of sensitiveFiles) {
    const source = readFileSync(join(root, file), "utf8");
    assert.match(source, /data-clarity-mask="true"/, `${file} has no masking attribute`);
  }

  assert.doesNotMatch(
    readFileSync(join(root, "src/routes/index.tsx"), "utf8"),
    /data-clarity-mask/,
  );
  assert.doesNotMatch(
    readFileSync(join(root, "src/components/research/ResearchPage.tsx"), "utf8"),
    /data-clarity-mask/,
  );
});

test("analytics helper allow-lists non-identifying event parameters", () => {
  assert.match(analyticsHelper, /allowedParamKeys/);
  assert.match(analyticsHelper, /dataLayer\.push\(\{ event/);
  assert.doesNotMatch(
    analyticsHelper,
    /["'](?:name|email|phone|message|password|token|medical|legal)["']\s*:/i,
  );
});

test("generated public HTML contains one head bootstrap and one noscript iframe", () => {
  const clientPath = join(root, "dist", "client");
  assert.ok(
    existsSync(join(clientPath, "index.html")),
    "run npm run build before npm run test:analytics",
  );
  const htmlFiles = walk(clientPath).filter((file) => file.endsWith(".html"));

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const relative = file.slice(clientPath.length + 1).replaceAll("\\", "/");
    if (relative === "404.html") continue;
    const utilityRoute = ["cognites/login/index.html", "cognites/mycogni/index.html"].includes(
      relative,
    );

    assert.doesNotMatch(html, new RegExp(ga4MeasurementId));
    assert.doesNotMatch(html, new RegExp(clarityProjectId));
    assert.doesNotMatch(html, /gtag\.js|clarity\.ms\/tag/);

    if (utilityRoute) {
      assert.doesNotMatch(html, new RegExp(containerId));
      continue;
    }

    assert.equal((html.match(new RegExp(containerId, "g")) ?? []).length, 2, relative);
    const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? "";
    const body = html.match(/<body[\s\S]*?<\/body>/i)?.[0] ?? "";
    assert.equal((head.match(/gtm\.start/g) ?? []).length, 1, relative);
    assert.equal(
      (
        body.match(
          new RegExp(`https://www\\.googletagmanager\\.com/ns\\.html\\?id=${containerId}`, "g"),
        ) ?? []
      ).length,
      1,
      relative,
    );
    assert.match(html, /<meta[^>]+name="description"/i);
    assert.match(html, /<link[^>]+rel="canonical"/i);
  }
});
