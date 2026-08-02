import { createFileRoute } from "@tanstack/react-router";
import ResearchPage from "@/components/research/ResearchPage";

export const Route = createFileRoute("/research")({
  head: () => ({}),
  component: ResearchRoutePage,
});

function ResearchRoutePage() {
  return <ResearchPage />;
}
