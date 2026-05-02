/* GoodVsGreatBlock — GvG Brand Guidelines v2
   The core brand device: two-column comparison
   Left = "Good" (muted, what happened)
   Right = "Great" (Electric Blue accent, what to do next)
   Background: --gvg-navy
   Ghost number: 04 */

import { useEffect, useRef } from "react";

const COMPARISONS = [
  {
    good: "Good media reports performance.",
    great: "Great media changes decisions.",
  },
  {
    good: "Good dashboards show what happened.",
    great: "Great systems tell you what to do next.",
  },
  {
    good: "Good attribution tracks the last click.",
    great: "Great measurement proves incremental value.",
  },
  {
    good: "Good agencies optimize their channel.",
    great: "Great strategy governs the whole system.",
  },
  {
    good: "Good reporting looks clean.",
    great: "Great decision logic drives growth.",
  },
];

export default function GoodVsGreatBlock() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".gvg-fadeup").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contrast"
      ref={ref}
      style={{
        backgroundColor: "#1A1A2E",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">04</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <span className="gvg-section-label">The Distinction</span>
          <span className="gvg-divider" />
          <h2
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "0.75rem",
            }}
          >
            The difference between{" "}
            <span style={{ color: "rgba(255,255,255,0.4)" }}>good</span>{" "}
            and{" "}
            <span style={{ color: "#2979FF" }}>great.</span>
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Good is table stakes. Great is a competitive advantage.
          </p>
        </div>

        {/* Column headers */}
        <div
          className="gvg-fadeup"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            marginBottom: "1px",
            backgroundColor: "rgba(255,255,255,0.09)",
          }}
        >
          <div
            style={{
              backgroundColor: "#252530",
              padding: "1rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Good
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.06em",
              }}
            >
              — reports what happened
            </span>
          </div>
          <div
            style={{
              backgroundColor: "#252530",
              padding: "1rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderLeft: "2px solid #2979FF",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#2979FF",
              }}
            >
              Great
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                color: "rgba(41,121,255,0.6)",
                letterSpacing: "0.06em",
              }}
            >
              — tells you what to do next
            </span>
          </div>
        </div>

        {/* Comparison rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            backgroundColor: "rgba(255,255,255,0.09)",
          }}
        >
          {COMPARISONS.map((row, i) => (
            <div
              key={i}
              className="gvg-fadeup"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                backgroundColor: "rgba(255,255,255,0.09)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              {/* Good side */}
              <div
                style={{
                  backgroundColor: "#1e1e2a",
                  padding: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.4)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {row.good}
                </p>
              </div>
              {/* Great side */}
              <div
                style={{
                  backgroundColor: "#1e1e2a",
                  padding: "1.5rem",
                  borderLeft: "2px solid rgba(41,121,255,0.3)",
                }}
              >
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {row.great}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
