import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

const product = products.find((p) => p.id === "askcogni")!;
const content = productContent.askcogni;

export const Route = createFileRoute("/products/askcogni")({
  head: () => ({}),
  component: () => <ProductPageLayout product={product} content={content} />,
});
