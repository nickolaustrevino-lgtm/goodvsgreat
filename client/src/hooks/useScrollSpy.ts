/**
 * useScrollSpy - GvG Brand Design
 * Tracks which section ID is currently in the viewport and returns it as `activeId`.
 * Uses IntersectionObserver with a top-biased rootMargin so the active section
 * switches as soon as its heading crosses the navbar (~64px from the top).
 */

import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (ids.length === 0) return;

    // We use a scroll listener + getBoundingClientRect for reliable ordering.
    // IntersectionObserver alone can fire in unexpected order during fast scrolls.
    const onScroll = () => {
      // Find the last section whose top is at or above the offset threshold
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset + 10) {
          current = id;
        }
      }
      setActiveId(current);
    };

    // Run once on mount to set initial state
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return activeId;
}
