import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "cogni-doc")!;
const content = productContent["cogni-doc"];

export const Route = createFileRoute("/products/cogni-doc")({
  head: () => ({}),
  component: () => <ProductPageLayout product={product} content={content} />,
});
