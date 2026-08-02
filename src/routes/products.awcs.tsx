import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "awcs")!;
const content = productContent["awcs"];

export const Route = createFileRoute("/products/awcs")({
  head: () => ({}),
  component: () => <ProductPageLayout product={product} content={content} />,
});
