// Governance tests for the generated, synchronized publication registry
// (src/data/publications.generated.json). Run with:
//   node --test scripts/validate-publications.test.mjs
//
// This repo has no test runner configured (no vitest/jest devDependency), so
// this uses Node's built-in test runner and zero new dependencies. It
// mirrors the equivalent tests in the CINTENT.tech repo
// (packages/content/test/publications.test.mjs) so both public catalogues
// are held to the same governance bar.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const generatedPath = resolve(__dirname, "../src/data/publications.generated.json");
const generated = JSON.parse(readFileSync(generatedPath, "utf8"));
const publications = generated.publications;

const byId = new Map(publications.map((publication) => [publication.id, publication]));
const publishedPublications = publications.filter(
  (publication) => publication.ownerApproved === true && publication.publicationStatus === "Published",
);

test("the generated registry file has the expected shape", () => {
  assert.ok(generated.generatedAt, "expected a generatedAt timestamp");
  assert.ok(generated.sourceRepo, "expected a sourceRepo path");
  assert.ok(Array.isArray(publications) && publications.length > 0);
});

test("no duplicate source URLs across the synced registry", () => {
  const urls = publications.map((publication) => publication.sourceUrl);
  assert.equal(new Set(urls).size, urls.length, "duplicate sourceUrl values found");
});

test("no duplicate ids across the synced registry", () => {
  const ids = publications.map((publication) => publication.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate id values found");
});

test("exactly one 'Cognitive AI Platforms' entry exists", () => {
  const matches = publications.filter((publication) =>
    publication.title.startsWith("Cognitive AI Platforms: The Next Frontier"),
  );
  assert.equal(matches.length, 1);
});

test("no political-consulting publication is present", () => {
  const matches = publications.filter((publication) => /political consulting/i.test(publication.title));
  assert.equal(matches.length, 0, "political-consulting publication must not be synced to this site");
});

test("no Blogger administration URLs appear anywhere in the synced registry", () => {
  for (const publication of publications) {
    for (const url of [publication.sourceUrl, publication.canonicalUrl]) {
      assert.ok(
        !/blogger\.com\/blog\/(post|pages)\/(edit|new)/i.test(url),
        `${publication.id} exposes a Blogger administration URL: ${url}`,
      );
    }
  }
});

test("only owner-approved, Published entries are present in the synced registry", () => {
  assert.equal(
    publishedPublications.length,
    publications.length,
    "the synced registry must only ever contain owner-approved, Published entries",
  );
});

test("exactly 4 publications are featured", () => {
  const featured = publications.filter((publication) => publication.featured);
  assert.equal(featured.length, 4);
});

test("related-publication mapping is valid and the criminal-profiling pair is linked", () => {
  for (const publication of publications) {
    for (const relatedId of publication.relatedPublicationIds) {
      assert.ok(byId.has(relatedId), `${publication.id} references missing relatedPublicationId "${relatedId}"`);
    }
  }
  const linkedInProfiling = byId.get("cognitive-ai-criminal-profiling");
  const ssrnProfiling = byId.get("cognitive-ai-criminal-profiling-ssrn");
  assert.ok(linkedInProfiling && ssrnProfiling);
  assert.ok(linkedInProfiling.relatedPublicationIds.includes(ssrnProfiling.id));
  assert.ok(ssrnProfiling.relatedPublicationIds.includes(linkedInProfiling.id));
});

test("the Trust/Faith/Truth article is present and Published", () => {
  const entry = byId.get("cognitive-ai-trust-faith-truth");
  assert.ok(entry, "expected the Trust/Faith/Truth article to be in the synced registry");
  assert.equal(entry.publicationStatus, "Published");
  assert.equal(entry.ownerApproved, true);
});
