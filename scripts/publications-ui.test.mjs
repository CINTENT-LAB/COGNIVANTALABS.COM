import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const route = readFileSync(resolve(root, "src/routes/blog.tsx"), "utf8");

test("publication cards expose accessible external navigation", () => {
  assert.match(route, /target=\"_blank\"/);
  assert.match(route, /rel=\"noopener noreferrer\"/);
  assert.match(route, /opens in new tab/);
  assert.match(route, /External sources are clearly marked/);
});

test("publication catalogue supports mobile filters and responsive layouts", () => {
  assert.match(route, /md:hidden/);
  assert.match(route, /Dialog/);
  assert.match(route, /md:grid-cols-2/);
  assert.match(route, /xl:grid-cols-3/);
  assert.match(route, /aria-live=\"polite\"/);
});

test("publication catalogue has filter, empty, offline, and schema paths", () => {
  assert.match(route, /setQuery/);
  assert.match(route, /No publications match your filters/);
  assert.match(route, /You appear to be offline/);
  assert.match(route, /ScholarlyArticle/);
  assert.match(route, /application\/ld\+json/);
});
