import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "ikshana")!;
const content = productContent["ikshana"];

export const Route = createFileRoute("/products/ikshana")({
  head: () => ({}),
  component: () => <ProductPageLayout product={product} content={content} />,
});
