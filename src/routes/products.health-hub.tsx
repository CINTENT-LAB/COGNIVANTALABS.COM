import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";
import { getProductDescription } from "@/data/productDisplay";

const product = products.find((p) => p.id === "health-hub")!;
const content = productContent["health-hub"];

export const Route = createFileRoute("/products/health-hub")({
  head: () => ({
    meta: [
      { title: `${product.name} — Cognivanta Labs` },
      { name: "description", content: getProductDescription(product) },
      { property: "og:title", content: `${product.name} — Cognivanta Labs` },
      { property: "og:description", content: getProductDescription(product) },
    ],
    links: [{ rel: "canonical", href: "/products/health-hub" }],
  }),
  component: () => <ProductPageLayout product={product} content={content} />,
});
