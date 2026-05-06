/* ProblemSection - GvG Brand Guidelines v2
   Background: --gvg-navy (#1A1A2E)
   Ghost number: 02
   Headline: Space Mono 700
   Body: IBM Plex Sans 400
   Cards: dark surface, Electric Blue top border */

import { useFadeUp } from "@/hooks/useFadeUp";

const PROBLEMS = [
  {
    label: "Vanity Metrics",
    text: "Your CPM can be good while your strategy is broken. Platform dashboards report what happened, not what it means.",
  },
  {
    label: "Fragmented Channels",
    text: "You have a Meta person, a Google person, a programmatic person - each optimizing their own lane, each reporting their own wins.",
  },
  {
    label: "Unclear Attribution",
    text: "Last-click attribution is attribution theater. It rewards the last touchpoint, not the one that actually drove the decision.",
  },
  {
    label: "Leadership Pressure",
    text: "Your CFO wants one number. Your CEO wants a story. Your dashboards give you neither - and the ask doesn't stop.",
  },
];

export default function ProblemSection() {
  const ref = useFadeUp<HTMLElement>(0.08);

  return (
    <section
      id="problem"
      ref={ref}
      style={{
        backgroundColor: "#141A33",
        padding: "clamp(5rem, 10vw, 10rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">02</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ maxWidth: "680px", marginBottom: "3.5rem" }}>
          <span className="gvg-section-label">The Problem I Solve</span>
          <span className="gvg-divider" />
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              marginBottom: "1.25rem",
            }}
          >
            Good metrics.{" "}
            <span style={{ color: "#2979FF" }}>Bad decisions.</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.65,
            }}
          >
            Most companies don't have a channel problem. They have a decision problem. Nobody fully owns the answer to the question leadership actually cares about:{" "}
            <em style={{ color: "rgba(255,255,255,0.8)" }}>"Is this spend creating real business value?"</em>
          </p>
        </div>

        {/* Problem cards - strict 2×2 grid */}
        <div
          className="gvg-grid-2col"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "1.25rem",
          }}
        >
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              className="gvg-fadeup"
              style={{
                transitionDelay: `${i * 80}ms`,
                background: "#0A1226",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "32px",
                transition: "transform 240ms cubic-bezier(0.2,0,0,1), border-color 240ms ease, box-shadow 240ms ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = "rgba(120,160,255,0.16)";
                el.style.boxShadow = "0 24px 48px rgba(0,0,0,0.32)";
                el.style.background = "#1B2240";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
                el.style.background = "#0A1226";
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#2979FF",
                  marginBottom: "0.75rem",
                }}
              >
                {p.label}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div
          className="gvg-fadeup"
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.09)",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <img
            src="/manus-storage/gvg-logo_7908b53b.png"
            alt=""
            aria-hidden="true"
            style={{ width: "22px", height: "22px", objectFit: "contain", opacity: 0.45, borderRadius: "4px", flexShrink: 0 }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
              fontStyle: "italic",
              maxWidth: "600px",
            }}
          >
            Not attribution theater. Not platform spin.{" "}
            <span style={{ color: "#FFFFFF" }}>Better decision logic.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
