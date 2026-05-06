import { useEffect, useRef } from "react";

/**
 * useFadeUp - attaches IntersectionObserver to a ref and adds .visible class
 * when the element enters the viewport.
 *
 * The animation system works as follows:
 * 1. By default, .gvg-fadeup elements are fully visible (opacity:1, translateY:0)
 * 2. On mount, we add 'gvg-anim-ready' to <body> which hides unobserved elements
 * 3. The IntersectionObserver adds .visible when elements enter the viewport
 * 4. A short fallback timeout (800ms) force-shows any remaining hidden elements
 *    to prevent blank sections in preview/programmatic-scroll environments
 */

let bodyAnimReady = false;

export function useFadeUp<T extends HTMLElement = HTMLDivElement>(threshold = 0.05) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Add the animation opt-in class to body (idempotent)
    if (!bodyAnimReady) {
      bodyAnimReady = true;
      // Small delay so initial above-fold content is already visible
      requestAnimationFrame(() => {
        document.body.classList.add("gvg-anim-ready");
      });
    }

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
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const targets = getTargets();
    targets.forEach((t) => observer.observe(t));

    // Fallback: after 800ms, force-show any remaining hidden elements
    // This prevents blank sections in preview/programmatic-scroll environments
    const fallback = setTimeout(() => {
      getTargets().forEach((t) => {
        if (!t.classList.contains("visible")) {
          t.classList.add("visible");
        }
      });
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return ref;
}
