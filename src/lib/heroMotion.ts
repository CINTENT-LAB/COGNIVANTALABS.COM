// Tiny event bus so the homepage's logo marquee can stop scrolling the moment
// the user interacts with the nav menu — even though Header and the homepage
// are separate components with no shared parent state.
const EVENT = "cognivanta:pause-motion";

export function pauseMotion() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

export function onPauseMotion(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}
