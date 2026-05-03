/* ProblemSection — GvG Brand Guidelines v2
   Background: --gvg-navy (#1A1A2E)
   Ghost number: 02
   Headline: Space Mono 700
   Body: IBM Plex Sans 400
   Cards: dark surface, Electric Blue top border */

import { useEffect, useRef } from "react";

const PROBLEMS = [
  {
    label: "Vanity Metrics",
    text: "Your CPM can be good while your strategy is broken. Platform dashboards report what happened, not what it means.",
  },
  {
    label: "Fragmented Channels",
    text: "You have a Meta person, a Google person, a programmatic person — each optimizing their own lane, each reporting their own wins.",
  },
  {
    label: "Unclear Attribution",
    text: "Last-click attribution is attribution theater. It rewards the last touchpoint, not the one that actually drove the decision.",
  },
  {
    label: "Wasted Spend",
    text: "Without incrementality testing and budget governance, you are scaling what looks good in reports — not what is actually working.",
  },
];

export default function ProblemSection() {
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
      id="problem"
      ref={ref}
      style={{
        backgroundColor: "#1A1A2E",
        padding: "7rem 0",
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
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "1.25rem",
            }}
          >
            Good metrics.{" "}
            <span style={{ color: "#2979FF" }}>Bad decisions.</span>
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
            }}
          >
            Most companies don't have a channel problem. They have a decision problem. Nobody fully owns the answer to the question leadership actually cares about:{" "}
            <em style={{ color: "rgba(255,255,255,0.8)" }}>"Is this spend creating real business value?"</em>
          </p>
        </div>

        {/* Problem cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              className="gvg-fadeup gvg-card"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#2979FF",
                  marginBottom: "0.75rem",
                }}
              >
                {p.label}
              </div>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
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
              fontFamily: "'Space Mono', monospace",
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
