import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "ikshana")!;
const content = productContent["ikshana"];

export const Route = createFileRoute("/products/ikshana")({
  head: () => ({
    meta: [
      { title: `${product.name} — Cognivanta Labs` },
      { name: "description", content: product.description },
      { property: "og:title", content: `${product.name} — Cognivanta Labs` },
      { property: "og:description", content: product.description },
    ],
    links: [{ rel: "canonical", href: "/products/ikshana" }],
  }),
  component: () => <ProductPageLayout product={product} content={content} />,
});
