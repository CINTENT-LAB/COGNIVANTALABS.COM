import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Handshake, UserCog, Mail, UserCircle2, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/cognites")({
  head: ({ matches }) => ({
    meta: [
      { title: "Cognites — Cognivanta Labs" },
      {
        name: "description",
        content: "Cognites — sign-in hub for Cognivanta Labs partners, customers, and employees.",
      },
      { property: "og:title", content: "Cognites — Cognivanta Labs" },
    ],
    links:
      matches.at(-1)?.pathname === "/cognites" || matches.at(-1)?.pathname === "/cognites/"
        ? [{ rel: "canonical", href: "/cognites" }]
        : [],
  }),
  component: CognitesPage,
});

const HOSTINGER_WEBMAIL = "https://webmail.hostinger.com";

function CognitesPage() {
  const { pathname } = useLocation();

  return pathname === "/cognites" || pathname === "/cognites/" ? <CognitesHubPage /> : <Outlet />;
}

function CognitesHubPage() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="aurora-blob left-[15%] top-[10%] h-64 w-64 bg-[var(--violet)]" />
        <div className="relative mx-auto max-w-3xl px-5 pt-24 pb-14 text-center md:px-8 md:pt-32">
          <Reveal>
            <div className="kicker justify-center">Cognites</div>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl">
              One door in, for everyone at Cognivanta.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Partners and customers sign in on one shared page. Employees get their mail and their
              MyCogni space.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-5 pb-20 md:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <Link to="/cognites/login" className="glass glass-hover block h-full rounded-2xl p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-electric)]">
                <Handshake className="h-5 w-5" />
              </span>
              <div className="mt-5 font-display text-lg font-bold">
                Partner &amp; Customer Login
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Shared sign-in for ecosystem partners and platform customers — application access,
                account details, and support in one place.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-electric-soft">
                Sign in <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <div className="glass h-full rounded-2xl p-7">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--gradient-gold)]">
                <UserCog className="h-5 w-5" />
              </span>
              <div className="mt-5 font-display text-lg font-bold">Employee Login</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Cognivanta Labs employees — access your company mail and your MyCogni personal
                space.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={HOSTINGER_WEBMAIL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium transition-colors hover:border-electric/40 hover:text-electric-soft"
                >
                  <Mail className="h-4 w-4" /> Open company email (Hostinger)
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5" />
                </a>
                <Link
                  to="/cognites/mycogni"
                  className="btn-electric inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
                >
                  <UserCircle2 className="h-4 w-4" /> Go to MyCogni
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Sign-in on this site is a design preview — accounts aren't connected to a live directory
          yet.
        </p>
      </section>
    </div>
  );
}
