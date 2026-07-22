import generated from "./publications.generated.json";
import discussionLinksJson from "./publications-discussion-links.generated.json";

// This module is a thin, typed wrapper around the generated, governed
// publication registry. The registry itself is NOT hand-maintained here --
// it is produced by `npm run sync:publications`, which re-reads and
// re-validates the single source of truth in the CINTENT.tech repo
// (packages/content/src/registry/publications.json). See
// scripts/sync-publications.mjs and docs/PUBLICATION_REGISTRY.md.
export type PublicationContentType = "article" | "post" | "research-paper" | "visual-publication";
export type PublicationSource = "LinkedIn" | "Medium" | "SSRN" | "CINTENT Blog" | "Canva";
export type PublicationCategory =
  | "CINTENT Platform"
  | "Intent Intelligence"
  | "Trust and Responsible AI"
  | "Enterprise AI"
  | "Healthcare and MedTech"
  | "Robotics and Autonomous Systems"
  | "Public Sector and Legal"
  | "Quantum and Future Intelligence"
  | "Research Papers"
  | "Visual Publications";
export type PublicationStatus = "Published" | "Draft" | "Pending source";

export interface PublicationRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  contentType: PublicationContentType;
  publisher: PublicationSource;
  author: string;
  sourceUrl: string;
  canonicalUrl: string;
  publishedAt: string | null;
  updatedAt: string | null;
  categories: PublicationCategory[];
  tags: string[];
  featured: boolean;
  external: true;
  publicationStatus: PublicationStatus;
  ownerApproved: boolean;
  image: string | null;
  imageAlt: string;
  relatedPublicationIds: string[];
  evidenceNote?: string;
}

interface GeneratedFile {
  generatedAt: string;
  sourceRepo: string;
  publications: PublicationRecord[];
}

const generatedFile = generated as unknown as GeneratedFile;

export const publicationsGeneratedAt = generatedFile.generatedAt;
export const publications = generatedFile.publications;

export const publishedPublications = publications.filter(
  (publication) =>
    publication.ownerApproved === true && publication.publicationStatus === "Published",
);

export const featuredPublications = publishedPublications.filter(
  (publication) => publication.featured,
);

export const publicationCategories: PublicationCategory[] = [
  "CINTENT Platform",
  "Intent Intelligence",
  "Trust and Responsible AI",
  "Enterprise AI",
  "Healthcare and MedTech",
  "Robotics and Autonomous Systems",
  "Public Sector and Legal",
  "Quantum and Future Intelligence",
  "Research Papers",
  "Visual Publications",
];

export const publicationSources: PublicationSource[] = [
  ...new Set(publishedPublications.map((publication) => publication.publisher)),
].sort() as PublicationSource[];

const byId = new Map(publishedPublications.map((publication) => [publication.id, publication]));

export function getPublicationById(id: string): PublicationRecord | undefined {
  return byId.get(id);
}

export function getRelatedPublications(publication: PublicationRecord): PublicationRecord[] {
  return publication.relatedPublicationIds
    .map((relatedId) => getPublicationById(relatedId))
    .filter((related): related is PublicationRecord => Boolean(related));
}

// CINTENT Blog publications also have a moderated discussion thread on
// cintent.tech. This site does not currently have an equivalent discussion
// feature, but the mapping is carried through so a future "Discuss on
// cintent.tech" link could be added without re-deriving it.
export const discussionUrlByCanonicalUrl: Record<string, string> = discussionLinksJson;

export function contentTypeLabel(contentType: PublicationContentType): string {
  switch (contentType) {
    case "article":
      return "Article";
    case "post":
      return "Post";
    case "research-paper":
      return "Research paper";
    case "visual-publication":
      return "Visual publication";
    default:
      return contentType;
  }
}
