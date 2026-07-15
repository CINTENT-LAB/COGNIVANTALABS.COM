import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "askcogni")!;
const content = productContent.askcogni;

export const Route = createFileRoute("/products/askcogni")({
  head: () => ({
    meta: [
      { title: `${product.name} — Cognivanta Labs` },
      { name: "description", content: content.overview },
      { property: "og:title", content: `${product.name} — Cognivanta Labs` },
      { property: "og:description", content: content.overview },
    ],
    links: [{ rel: "canonical", href: "/products/askcogni" }],
  }),
  component: () => <ProductPageLayout product={product} content={content} />,
});
