import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "nyaynetra")!;
const content = productContent["nyaynetra"];

export const Route = createFileRoute("/products/nyaynetra")({
  head: () => ({}),
  component: () => <ProductPageLayout product={product} content={content} />,
});
