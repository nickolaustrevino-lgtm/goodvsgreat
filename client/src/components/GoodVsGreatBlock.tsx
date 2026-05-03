/* GoodVsGreatBlock — GvG Brand Guidelines v2
   THE signature brand moment.
   True two-column comparison table.
   Left = "Good" (muted, quieter, what happened)
   Right = "Great" (Electric Blue accent, emphasized, what to do next)
   Background: --gvg-navy (#1A1A2E)
   Ghost number: 04 */

import { useEffect, useRef } from "react";

const GVG_LOGO = "/manus-storage/gvg-logo_7908b53b.png";

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
      { threshold: 0.06, rootMargin: "0px 0px -60px 0px" }
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
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">04</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>

        {/* Section header */}
        <div className="gvg-fadeup" style={{ marginBottom: "4rem" }}>
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
              marginBottom: "0.875rem",
            }}
          >
            The difference between{" "}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>good</span>{" "}
            and{" "}
            <span style={{ color: "#2979FF" }}>great.</span>
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: 0,
            }}
          >
            Good is table stakes. Great is a competitive advantage.
          </p>
        </div>

        {/* Table wrapper */}
        <div
          className="gvg-fadeup"
          style={{ transitionDelay: "80ms" }}
        >
          {/* Column header row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              marginBottom: "0",
            }}
          >
            {/* Good header */}
            <div
              style={{
                padding: "1rem 2rem",
                backgroundColor: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.25)",
                  fontWeight: 400,
                }}
              >
                Good
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.15)",
                  letterSpacing: "0.05em",
                }}
              >
                — reports what happened
              </span>
            </div>

            {/* Great header */}
            <div
              style={{
                padding: "1rem 2rem",
                backgroundColor: "rgba(41,121,255,0.06)",
                borderBottom: "2px solid #2979FF",
                borderLeft: "1px solid rgba(41,121,255,0.2)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <img
                src={GVG_LOGO}
                alt=""
                aria-hidden="true"
                style={{ width: "20px", height: "20px", objectFit: "contain", opacity: 0.9, borderRadius: "4px", flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "#2979FF",
                  fontWeight: 700,
                }}
              >
                Great
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  color: "rgba(41,121,255,0.55)",
                  letterSpacing: "0.05em",
                }}
              >
                — tells you what to do next
              </span>
            </div>
          </div>

          {/* Comparison rows */}
          {COMPARISONS.map((row, i) => (
            <div
              key={i}
              className="gvg-fadeup"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                transitionDelay: `${(i + 2) * 70}ms`,
                borderBottom: i < COMPARISONS.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
              }}
            >
              {/* Good cell */}
              <div
                style={{
                  padding: "2rem 2rem",
                  backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.32)",
                    lineHeight: 1.65,
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  {row.good}
                </p>
              </div>

              {/* Great cell */}
              <div
                style={{
                  padding: "2rem 2rem",
                  backgroundColor: i % 2 === 0
                    ? "rgba(41,121,255,0.05)"
                    : "rgba(41,121,255,0.03)",
                  borderLeft: "2px solid rgba(41,121,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.65,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {row.great}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          className="gvg-fadeup"
          style={{
            marginTop: "3.5rem",
            transitionDelay: `${(COMPARISONS.length + 3) * 70}ms`,
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <img
            src={GVG_LOGO}
            alt=""
            aria-hidden="true"
            style={{ width: "24px", height: "24px", objectFit: "contain", opacity: 0.6, borderRadius: "5px", flexShrink: 0 }}
          />
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Good media looks busy.{" "}
            <span style={{ color: "#2979FF" }}>Great media makes decisions.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
