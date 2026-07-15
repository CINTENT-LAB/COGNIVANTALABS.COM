import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { productContent } from "@/data/productContent";
import { ProductPageLayout } from "@/components/site/ProductPageLayout";

// Fallback route for any product that doesn't have its own dedicated
// src/routes/products.<id>.tsx file yet (e.g. CINTENT, which lives at
// /platform instead). Every other product — Shunya AI, BlissTrail, NyayNetra,
// CHAXU, Health Hub, CWOS, IKSHANA, Cognitive Cobots, AWCS, Externovate,
// COGNI Doc — has its own standalone route file, which TanStack Router
// matches before falling back to this $slug catch-all.
export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const product = products.find((p) => p.id === params.slug);
    const title = product
      ? `${product.name} — Cognivanta Labs`
      : "Product not found — Cognivanta Labs";
    const description =
      product?.description ?? "This product isn't part of the Cognivanta ecosystem yet.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = products.find((p) => p.id === slug);

  if (!product) {
    return (
      <div className="relative mx-auto max-w-2xl px-5 py-32 text-center md:px-8">
        <div className="kicker">Not Found</div>
        <h1 className="mt-4 font-display text-3xl font-bold">We couldn't find that product.</h1>
        <p className="mt-3 text-muted-foreground">It may have moved, or the link is out of date.</p>
        <div className="mt-8">
          <Link
            to="/products"
            className="btn-electric inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductPageLayout product={product} content={productContent[product.id]} />;
}
