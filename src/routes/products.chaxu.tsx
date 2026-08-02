import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "chaxu")!;
const content = productContent["chaxu"];

export const Route = createFileRoute("/products/chaxu")({
  head: () => ({}),
  component: () => <ProductPageLayout product={product} content={content} />,
});
