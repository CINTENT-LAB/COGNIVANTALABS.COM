import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Handshake, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/cognites/login")({
  head: () => ({
    meta: [
      { title: "Partner & Customer Login — Cognivanta Labs" },
      { name: "description", content: "Sign in as a Cognivanta Labs partner or customer." },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/cognites/login" }],
  }),
  component: LoginPage,
});

type Role = "partner" | "customer";

function LoginPage() {
  const [role, setRole] = useState<Role>("partner");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative mx-auto max-w-md px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <Link
          to="/cognites"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Cognites
        </Link>

        <div className="glass mt-6 rounded-3xl p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--gradient-electric)]">
            <Handshake className="h-5 w-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Partners and customers share one login.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-1 rounded-lg border border-white/10 bg-white/5 p-1">
            {(["partner", "customer"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`rounded-md py-2 text-sm font-medium capitalize transition-colors ${
                  role === r
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {submitted ? (
            <div className="mt-6 rounded-xl border border-dashed border-white/15 px-4 py-4 text-sm text-muted-foreground">
              This sign-in flow is a design preview — {role} accounts aren't connected to a live
              directory yet. Reach out via{" "}
              <Link to="/contact" className="text-electric-soft hover:underline">
                Contact
              </Link>{" "}
              and we'll get you real access.
            </div>
          ) : (
            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder={role === "partner" ? "you@partner-company.com" : "you@company.com"}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-electric/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-electric/40"
                />
              </div>
              <button
                type="submit"
                className="btn-electric w-full rounded-md py-2.5 text-sm font-semibold"
              >
                Sign in as {role}
              </button>
              <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                <button type="button" className="hover:text-foreground">
                  Forgot password?
                </button>
                <button type="button" className="hover:text-foreground">
                  Register
                </button>
              </div>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
