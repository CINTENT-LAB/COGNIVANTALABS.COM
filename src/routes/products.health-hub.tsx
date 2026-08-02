import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";
import { getProductDescription } from "@/data/productDisplay";

const product = products.find((p) => p.id === "health-hub")!;
const content = productContent["health-hub"];

export const Route = createFileRoute("/products/health-hub")({
  head: () => ({}),
  component: () => <ProductPageLayout product={product} content={content} />,
});
