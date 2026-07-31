import { execFileSync } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const distRoot = path.join(root, "dist", "client");
const production = process.argv.includes("--production");
const productionBase = process.env.SECURITY_AUDIT_BASE_URL ?? "https://cognivantalabs.com";
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

async function readText(filePath) {
  const contents = await readFile(filePath);
  if (contents.includes(0)) return null;
  return contents.toString("utf8");
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

const requiredHeaders = [
  "strict-transport-security",
  "content-security-policy",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
  "cache-control",
];

async function auditArtifact() {
  let files;
  try {
    files = await walk(distRoot);
  } catch {
    fail("dist/client is missing; run npm run build first");
    return;
  }

  const forbiddenNames =
    /(^|\/)(?:\.env(?:\.[^/]+)?|\.git|package(?:-lock)?\.json|README(?:\.md)?|vite\.config\.[^/]+|tsconfig\.[^/]+|.*\.(?:bak|backup|old|orig|save|sql|log|zip|tar|gz|pem|key|p12|pfx|map))$/i;
  for (const file of files) {
    const name = relative(file);
    if (forbiddenNames.test(name)) fail(`forbidden deployment artifact: ${name}`);
    const text = await readText(file);
    if (text === null) continue;
    if (text.includes("sourceMappingURL=")) fail(`source map reference in ${name}`);
    if (/blogger\.com\/blog\/post\/edit/i.test(text)) fail(`Blogger administration URL in ${name}`);
    if (
      /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+|[/?#])/i.test(text) &&
      /\.(?:html|css)$/i.test(name)
    ) {
      fail(`local development URL in rendered configuration: ${name}`);
    }
    if (
      /\b(?:BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,})\b/.test(
        text,
      )
    ) {
      fail(`high-confidence secret pattern in ${name}`);
    }
    if (/[A-Z]:\\\\Users\\\\|[A-Z]:\\\\Documents\\\\/i.test(text)) {
      fail(`local filesystem path in ${name}`);
    }
  }

  for (const required of ["index.html", "robots.txt", "sitemap.xml", ".htaccess", "_headers"]) {
    try {
      await stat(path.join(distRoot, required));
    } catch {
      fail(`required artifact missing: ${required}`);
    }
  }

  const htaccess = await readText(path.join(distRoot, ".htaccess"));
  if (!htaccess?.includes("Content-Security-Policy")) fail("deployed .htaccess has no CSP");
  if (!htaccess?.includes("_headers")) fail("deployed .htaccess does not block _headers");
  if (!htaccess?.includes("Options -Indexes")) fail("deployed .htaccess does not disable indexes");
}

function sourceFiles() {
  return execFileSync("git", ["ls-files", "-z"], { cwd: root })
    .toString("utf8")
    .split("\0")
    .filter(Boolean)
    .filter((file) => !file.startsWith("node_modules/") && !file.startsWith("dist/"));
}

async function auditSource() {
  const suspicious = [];
  const highConfidenceSecret =
    /BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9]{20,}/;
  for (const file of sourceFiles()) {
    const fullPath = path.join(root, file);
    const text = await readText(fullPath);
    if (text === null) continue;
    for (const [index, line] of text.split(/\r?\n/).entries()) {
      if (highConfidenceSecret.test(line)) suspicious.push(`${file}:${index + 1}`);
    }
  }
  if (suspicious.length) fail(`high-confidence source secret pattern: ${suspicious.join(", ")}`);

  const htaccess = await readText(path.join(root, "public", ".htaccess"));
  if (!htaccess?.includes("Content-Security-Policy")) fail("source .htaccess has no CSP");
  if (!htaccess?.includes("Cross-Origin-Opener-Policy")) fail("source .htaccess has no COOP");
  if (!htaccess?.includes("RewriteRule (^|/)(?!\\.well-known"))
    fail("source .htaccess does not protect dotfiles");
}

async function getSitemapPaths() {
  const sitemap = await readFile(path.join(root, "public", "sitemap.xml"), "utf8");
  return [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((match) => match[1]);
}

async function fetchManual(url) {
  return fetch(url, { redirect: "manual" });
}

async function auditProduction() {
  const routes = await getSitemapPaths();
  for (const route of routes) {
    const response = await fetch(new URL(route, productionBase), { redirect: "follow" });
    if (!response.ok) fail(`sitemap route ${route} returned ${response.status}`);
    if (response.headers.get("content-type")?.includes("text/html")) {
      for (const header of requiredHeaders) {
        if (!response.headers.get(header)) fail(`${route} missing ${header}`);
      }
    }
  }

  for (const pathName of [
    "/.git/HEAD",
    "/.env",
    "/.env.production",
    "/package.json",
    "/package-lock.json",
    "/README.md",
    "/vite.config.ts",
    "/src/",
    "/reports/",
    "/assets/index.js.map",
    "/backup.zip",
    "/database.sql",
    "/error.log",
    "/access.log",
    "/.htaccess",
    "/_headers",
  ]) {
    const response = await fetchManual(new URL(pathName, productionBase));
    if (![403, 404].includes(response.status)) fail(`${pathName} returned ${response.status}`);
    const body = await response.text();
    if (/Index of \/|Directory Listing/i.test(body)) fail(`directory listing at ${pathName}`);
  }

  const notFound = await fetchManual(new URL("/security-audit-invalid-route", productionBase));
  if (notFound.status !== 404) fail(`unknown route returned ${notFound.status}`);

  for (const url of [
    "http://cognivantalabs.com/",
    "http://www.cognivantalabs.com/",
    "https://www.cognivantalabs.com/",
  ]) {
    const response = await fetchManual(url);
    const location = response.headers.get("location") ?? "";
    const hostingerTlsHop =
      url === "http://www.cognivantalabs.com/" &&
      response.status === 301 &&
      location.startsWith("https://www.cognivantalabs.com/");
    if (hostingerTlsHop) {
      const canonicalResponse = await fetchManual(location);
      const canonicalLocation = canonicalResponse.headers.get("location") ?? "";
      if (
        ![301, 308].includes(canonicalResponse.status) ||
        !canonicalLocation.startsWith("https://cognivantalabs.com/")
      ) {
        fail(`hostname normalization failed after Hostinger TLS hop for ${url}`);
      }
    } else if (
      ![301, 308].includes(response.status) ||
      !location.startsWith("https://cognivantalabs.com/")
    ) {
      fail(`hostname normalization failed for ${url}: ${response.status} ${location}`);
    }
  }

  const rootResponse = await fetch(new URL("/", productionBase), { redirect: "follow" });
  const allowOrigin = rootResponse.headers.get("access-control-allow-origin");
  const allowCredentials = rootResponse.headers.get("access-control-allow-credentials");
  if (allowOrigin === "*" && allowCredentials?.toLowerCase() === "true") {
    fail("credentialed wildcard CORS on production response");
  }
  const csp = rootResponse.headers.get("content-security-policy") ?? "";
  for (const directive of ["base-uri 'self'", "object-src 'none'", "frame-ancestors 'none'"]) {
    if (!csp.includes(directive)) fail(`production CSP missing ${directive}`);
  }
  if (csp.includes("unsafe-eval")) fail("production CSP allows unsafe-eval");
}

await auditSource();
await auditArtifact();
if (production) await auditProduction();

console.log(
  `Security audit mode: ${production ? `production (${productionBase})` : "local artifact"}`,
);
console.log(`Security audit failures: ${failures.length}`);
for (const failure of failures) console.error(`FAIL ${failure}`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
if (!failures.length) console.log("Security audit passed.");
process.exitCode = failures.length ? 1 : 0;
