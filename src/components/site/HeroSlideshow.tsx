import { useEffect, useMemo, useRef, useState } from "react";

interface Slide {
  name: string;
  src: string;
}

const posterSlide: Slide = {
  name: "Cognivanta Labs",
  src: "/hero/hero-poster-clean.png",
};

const SLIDE_INTERVAL_MS = 2000;

const otherSlides: Slide[] = [
  { name: "The Future We're Building", src: "/hero/hero-rocket.png" },
  { name: "Why We Are Different", src: "/hero/hero-why-different-2.png" },
  { name: "Vision & Mission", src: "/hero/hero-vision-mission.png" },
  { name: "Cobots & Drones", src: "/hero/hero-cobots-drones.png" },
  { name: "BYO-BOT / UAVs", src: "/hero/hero-byobot-uavs.jpg" },
  { name: "BlissTrail", src: "/hero/blisstrail-lifestyle.jpg" },
  { name: "Shunya AI", src: "/hero/shunyaai-people.jpg" },
];

export function HeroSlideshow({ paused }: { paused: boolean }) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const slides = useMemo(() => [posterSlide, ...otherSlides], []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !isVisible || reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [isVisible, paused, reducedMotion, slides.length]);

  useEffect(() => {
    const nextImage = new Image();
    nextImage.decoding = "async";
    nextImage.src = slides[(index + 1) % slides.length].src;
  }, [index, slides]);

  const renderedSlides = slides.filter((_, slideIndex) => {
    const nextIndex = (index + 1) % slides.length;
    return slideIndex === index || slideIndex === nextIndex;
  });

  return (
    <div ref={stageRef} className="absolute inset-0 overflow-hidden bg-background">
      {renderedSlides.map((slide) => {
        const slideIndex = slides.indexOf(slide);
        return (
          <div
            key={slide.name}
            className={`absolute inset-0 transition-opacity ${
              reducedMotion ? "duration-0" : "duration-700 ease-out"
            } ${slideIndex === index ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.src}
              alt=""
              aria-hidden="true"
              className="h-full w-full select-none object-cover object-center"
              draggable={false}
              decoding="async"
              loading={slideIndex === index ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}
