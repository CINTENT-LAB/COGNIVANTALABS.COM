import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "cobots")!;
const content = productContent["cobots"];

export const Route = createFileRoute("/products/cobots")({
  head: () => ({}),
  component: () => <ProductPageLayout product={product} content={content} />,
});
