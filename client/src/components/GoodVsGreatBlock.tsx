/* GoodVsGreatBlock — GvG Brand Guidelines v2
   THE signature brand moment.
   True two-column comparison table.
   Left = "Good" (muted, quieter, what happened)
   Right = "Great" (Electric Blue accent, emphasized, what to do next)
   Background: --gvg-navy (#1A1A2E)
   Ghost number: 04 */

import { useEffect, useRef } from "react";
import GoodVsGreatDashboard from "./GoodVsGreatDashboard";

const GVG_LOGO = "/manus-storage/gvg-logo_7908b53b.png";

const COMPARISONS = [
  {
    good: "Good media reports performance.",
    great: "Great media changes decisions.",
  },
  {
    good: "Good attribution tracks the last click.",
    great: "Great measurement proves incremental value.",
  },
  {
    good: "Good agencies optimize their channel.",
    great: "Great strategy governs the whole system.",
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
        backgroundColor: "#141A33",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">04</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>

        {/* Section header */}
        <div className="gvg-fadeup" style={{ marginBottom: "4rem" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.16em", color: "#2F6FFF", opacity: 0.8, marginBottom: "16px" }}>
            THE DISTINCTION IN PRACTICE
          </p>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Same campaign. Two truths.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
              maxWidth: "600px",
              margin: 0,
            }}
          >
            What last-click reports vs. what actually drove revenue.
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
                    fontFamily: "'Inter', sans-serif",
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
                    fontFamily: "'Inter', sans-serif",
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

        {/* Good vs Great Dashboard — brand signature visual */}
        <div className="gvg-fadeup" style={{ marginTop: "4rem", marginBottom: "1rem" }}>
          <GoodVsGreatDashboard />
        </div>

        {/* Ghost CTA */}
        <div className="gvg-fadeup" style={{ marginTop: "48px" }}>
          <a
            href="#proof"
            onClick={(e) => { e.preventDefault(); document.getElementById("proof")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "52px",
              padding: "0 24px",
              background: "transparent",
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "border-color 240ms ease, background 240ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.32)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.16)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            See real client outcomes →
          </a>
        </div>
      </div>
    </section>
  );
}
