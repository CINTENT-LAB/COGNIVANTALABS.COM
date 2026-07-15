import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { Reveal } from "@/components/site/Reveal";

const MYCOGNI_URL = "https://hcm.cognivantalabs.com/app/mycogni";

export const Route = createFileRoute("/cognites/mycogni")({
  head: () => ({
    meta: [
      { title: "MyCogni — Cognivanta Labs" },
      {
        name: "description",
        content: "Open the MyCogni workspace in Cognivanta Labs HCM.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/cognites/mycogni" }],
  }),
  component: MyCogniHandoff,
});

function MyCogniHandoff() {
  useEffect(() => {
    if (window.location.href !== MYCOGNI_URL) {
      window.location.replace(MYCOGNI_URL);
    }
  }, []);

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <Link
          to="/cognites"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Cognites
        </Link>

        <div className="glass mt-8 rounded-2xl p-7 md:p-10">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--gradient-violet)]">
            <UserCircle2 className="h-7 w-7" />
          </span>
          <div className="kicker mt-6">MyCogni</div>
          <h1 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-4xl">
            Opening your Cognivanta workspace.
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            MyCogni is hosted in the Cognivanta Labs HCM application. You are being securely
            redirected to the live workspace now.
          </p>
          <a
            href={MYCOGNI_URL}
            className="btn-electric mt-8 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold"
          >
            Open MyCogni <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            If the redirect does not start, use the button above.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
