import type { Product } from "@/data/products";

const overrides: Partial<Record<Product["id"], { description?: string; draftNote?: string }>> = {
  askcogni: {
    description:
      "An interactive provider-neutral preview for exploring CINTENT's intent, context and decision concepts. The production AI backend is not active in this preview.",
  },
  "health-hub": {
    draftNote:
      "Health Hub is under active development; public scope and availability remain subject to owner review.",
  },
  "cogni-doc": {
    draftNote: "Desktop build in progress; no public application URL is currently available.",
  },
};

export function getProductDescription(product: Product) {
  return overrides[product.id]?.description ?? product.description;
}

export function getProductDraftNote(product: Product) {
  return overrides[product.id]?.draftNote ?? product.draftNote;
}
