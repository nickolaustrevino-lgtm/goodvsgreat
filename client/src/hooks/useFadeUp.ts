import { useEffect, useRef } from "react";

/**
 * useFadeUp — attaches IntersectionObserver to a ref and adds .visible class
 * when the element enters the viewport, triggering the .gvg-fadeup CSS animation.
 *
 * Uses rootMargin: "0px 0px -60px 0px" so elements animate in slightly before
 * they reach the bottom of the viewport, giving a smooth reveal effect.
 * A 2s fallback timeout ensures content is always visible even if the observer
 * fails (e.g., in preview environments or reduced-motion contexts).
 */
export function useFadeUp<T extends HTMLElement = HTMLDivElement>(threshold = 0.05) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Collect all .gvg-fadeup elements inside this section
    const getTargets = () => [el, ...Array.from(el.querySelectorAll(".gvg-fadeup"))];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const targets = getTargets();
    targets.forEach((t) => observer.observe(t));

    // Fallback: after 2.5s, force-show any remaining hidden elements
    const fallback = setTimeout(() => {
      getTargets().forEach((t) => {
        if (!t.classList.contains("visible")) {
          t.classList.add("visible");
        }
      });
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return ref;
}
