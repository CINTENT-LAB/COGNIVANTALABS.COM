import { createFileRoute } from "@tanstack/react-router";
import ResearchLanding from "@/components/research/ResearchLanding";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research - Cognivanta Labs" },
      {
        name: "description",
        content:
          "Applied research into cognitive intelligence, context, reasoning, governance, autonomy, and human-AI collaboration.",
      },
      { property: "og:title", content: "Research - Cognivanta Labs" },
      {
        property: "og:description",
        content: "Research that turns cognitive AI primitives into useful, governed systems.",
      },
    ],
    links: [{ rel: "canonical", href: "/research" }],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return <ResearchLanding />;
}
