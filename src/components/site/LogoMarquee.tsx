import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { getLucideIcon } from "@/lib/lucideIcon";

interface MarqueeItem {
  name: string;
  logo?: string;
  icon?: string;
  to: string;
  external: boolean;
}

function targetFor(id: string): { to: string; external: boolean } {
  if (id === "cintent") return { to: "/platform", external: false };
  const p = products.find((x) => x.id === id);
  if (p?.href && p.external) return { to: p.href, external: true };
  return { to: p?.href ?? `/products/${id}`, external: false };
}

// Real logos where we have them; icon+name chips for products whose logo
// files haven't been supplied yet (CHAXU, IKSHANA — don't have real logo
// assets on file). BYOBOT isn't its own product entry — it's the
// marketplace domain mentioned inside IKSHANA's listing — so it links out
// to byobot.store directly.
const items: MarqueeItem[] = [
  { name: "CINTENT™", logo: "/logos/cintent-icon.png", ...targetFor("cintent") },
  {
    name: "Shunya AI™",
    logo: products.find((p) => p.id === "shunyai")?.logo,
    ...targetFor("shunyai"),
  },
  { name: "BlissTrail™", logo: "/logos/blisstrail-logo.png", ...targetFor("blisstrail") },
  {
    name: "NyayNetra™",
    logo: products.find((p) => p.id === "nyaynetra")?.logo,
    ...targetFor("nyaynetra"),
  },
  { name: "CWOS™", logo: products.find((p) => p.id === "cwos")?.logo, ...targetFor("cwos") },
  { name: "CHAXU™", icon: "Plane", ...targetFor("chaxu") },
  { name: "IKSHANA™", icon: "Store", ...targetFor("ikshana") },
  { name: "BYOBOT", icon: "Bot", to: "https://byobot.store", external: true },
  { name: "Cognitive Cobots", icon: "Bot", ...targetFor("cobots") },
  { name: "AWCS", icon: "Accessibility", ...targetFor("awcs") },
  { name: "Externovate", icon: "Users", ...targetFor("externovate") },
];

function Chip({ item }: { item: MarqueeItem }) {
  const Icon = item.icon ? getLucideIcon(item.icon) : null;
  const content = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/95">
        {item.logo ? (
          <img src={item.logo} alt="" className="h-full w-full object-contain p-1.5" />
        ) : Icon ? (
          <Icon className="h-6 w-6 text-background" />
        ) : null}
      </span>
      <span className="whitespace-nowrap text-base font-semibold text-muted-foreground group-hover:text-foreground">
        {item.name}
      </span>
    </>
  );
  const className =
    "group mx-4 flex shrink-0 items-center gap-3.5 rounded-full border border-white/10 bg-white/5 px-6 py-4 backdrop-blur transition-colors hover:border-electric/40 hover:bg-white/10";

  return item.external ? (
    <a href={item.to} target="_blank" rel="noreferrer noopener" className={className}>
      {content}
    </a>
  ) : (
    <Link to={item.to} className={className}>
      {content}
    </Link>
  );
}

/**
 * Auto-scrolling logo strip. Driven by requestAnimationFrame (not a CSS
 * `animation`) so it keeps moving regardless of the user's OS/browser
 * "reduce motion" setting, which forces all CSS animation/transition
 * durations to ~0 — that setting is the most likely reason a pure-CSS
 * marquee would appear frozen. Pauses on hover, and permanently once the
 * `paused` prop flips true (page scroll or nav-menu use).
 */
export function LogoMarquee({ paused }: { paused: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let frame: number;
    let last = performance.now();
    const speed = 40; // px/sec

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const track = trackRef.current;
      if (track && !paused && !hovering) {
        const halfWidth = track.scrollWidth / 2;
        offsetRef.current -= speed * dt;
        if (halfWidth > 0 && Math.abs(offsetRef.current) >= halfWidth) {
          offsetRef.current += halfWidth;
        }
        track.style.transform = `translateX(${offsetRef.current}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, hovering]);

  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[...items, ...items].map((item, i) => (
          <Chip key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
