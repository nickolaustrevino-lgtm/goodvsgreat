/* Section 03 - The Decision Layer (Solution Frame)
   Horizontal flow diagram: 4 tiles + animated arrow connectors
   Surface: surface-0 (#0A1226) */

import { useEffect, useRef, useState } from "react";

const SURFACE_0 = "#0A1226";
const SURFACE_1 = "#141A33";
const BORDER_HAIRLINE = "rgba(255,255,255,0.06)";
const BORDER_STRONG = "rgba(120,160,255,0.16)";
const COBALT = "#2F6FFF";
const SIGNAL_GREEN = "#5EE8B5";
const MONO = "'IBM Plex Mono', 'Fira Code', monospace";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const TEXT_SECONDARY = "rgba(255,255,255,0.8)";
const TEXT_MUTED = "rgba(255,255,255,0.5)";

const TIERS = [
  {
    number: "TIER 01",
    title: "Measurement Infrastructure",
    desc: "MMM, incrementality, and brand-lift logic that go beyond last-click reporting.",
    isOutcome: false,
  },
  {
    number: "TIER 02",
    title: "Cross-Channel Budget Strategy",
    desc: "Where the next dollar goes, what is overstated, where you hit diminishing returns.",
    isOutcome: false,
  },
  {
    number: "TIER 03",
    title: "AI-Native Decision Tools",
    desc: "Calculators, planning systems, and dashboards your team will actually use.",
    isOutcome: false,
  },
  {
    number: "OUTCOME",
    title: "Decisions Leadership Can Trust",
    desc: "One defensible answer to: is this spend creating real business value?",
    isOutcome: true,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [arrowsDrawn, setArrowsDrawn] = useState([false, false, false]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          // Stagger arrow draw-ins after tiles fade in
          setTimeout(() => setArrowsDrawn([true, false, false]), 600);
          setTimeout(() => setArrowsDrawn([true, true, false]), 760);
          setTimeout(() => setArrowsDrawn([true, true, true]), 920);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        backgroundColor: SURFACE_0,
        padding: "clamp(5rem, 10vw, 10rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40px",
          left: "clamp(16px, 4vw, 64px)",
          fontFamily: SANS,
          fontSize: "240px",
          fontWeight: 200,
          lineHeight: 1,
          WebkitTextStroke: "1px rgba(255,255,255,0.05)",
          color: "transparent",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        03
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 64px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div
          style={{
            maxWidth: "720px",
            marginBottom: "64px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 480ms cubic-bezier(0.16,1,0.3,1), transform 480ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: COBALT,
              opacity: 0.8,
              marginBottom: "16px",
            }}
          >
            THE FRAMEWORK
          </p>
          <h2
            style={{
              fontFamily: SANS,
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            The Decision Layer.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: "18px", color: TEXT_SECONDARY, lineHeight: 1.6, maxWidth: "600px" }}>
            The operating model that sits between your media stack and your CFO.
          </p>
        </div>

        {/* Horizontal flow diagram */}
        <div
          style={{
          display: "flex",
          alignItems: "stretch",
          gap: "0",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          paddingBottom: "8px",
          scrollSnapType: "x mandatory",
          }}
        >
          {TIERS.map((tier, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: tier.isOutcome ? "1.2" : "1", minWidth: "clamp(160px, 40vw, 220px)", scrollSnapAlign: "start" }}>
              {/* Tier tile */}
              <div
                style={{
                  flex: 1,
                  background: SURFACE_1,
                  border: tier.isOutcome ? `1px solid rgba(47,111,255,0.4)` : `1px solid ${BORDER_HAIRLINE}`,
                  borderRadius: "16px",
                  padding: "28px 24px",
                  transform: visible ? (tier.isOutcome ? "scale(1.04)" : "translateY(0)") : "translateY(20px)",
                  opacity: visible ? 1 : 0,
                  transition: `opacity 480ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms, transform 480ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                  boxShadow: tier.isOutcome ? "0 0 48px rgba(47,111,255,0.16)" : "none",
                  position: "relative",
                }}
              >
                {/* Eyebrow number */}
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: "10px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: tier.isOutcome ? SIGNAL_GREEN : COBALT,
                    marginBottom: "12px",
                  }}
                >
                  {tier.number}
                </p>
                {/* Title */}
                <h3
                  style={{
                    fontFamily: SANS,
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                    marginBottom: "10px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tier.title}
                </h3>
                {/* Description */}
                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: "14px",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {tier.desc}
                </p>
              </div>

              {/* Arrow connector (not after last tile) */}
              {i < TIERS.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    height: "2px",
                  }}
                >
                  {/* Line */}
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      height: "1px",
                      width: arrowsDrawn[i] ? "100%" : "0%",
                      background: `linear-gradient(90deg, ${COBALT}, #9C7CFF)`,
                      transition: "width 160ms cubic-bezier(0.2,0,0,1)",
                      transform: "translateY(-50%)",
                    }}
                  />
                  {/* Arrowhead */}
                  <div
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 0,
                      height: 0,
                      borderTop: "5px solid transparent",
                      borderBottom: "5px solid transparent",
                      borderLeft: `6px solid ${arrowsDrawn[i] ? "#9C7CFF" : "transparent"}`,
                      transition: "border-left-color 80ms ease 160ms",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical fallback label */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: "10px",
            color: TEXT_MUTED,
            textAlign: "center",
            marginTop: "8px",
            display: "none",
          }}
          className="decision-layer-scroll-hint"
        >
          ← scroll to see full framework →
        </p>

        {/* Pull quote */}
        <div
          style={{
            marginTop: "64px",
            paddingLeft: "24px",
            borderLeft: `2px solid ${COBALT}`,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 480ms cubic-bezier(0.16,1,0.3,1) 500ms, transform 480ms cubic-bezier(0.16,1,0.3,1) 500ms",
          }}
        >
          <p
            style={{
              fontFamily: SANS,
              fontSize: "18px",
              fontStyle: "italic",
              color: TEXT_SECONDARY,
              lineHeight: 1.6,
              maxWidth: "800px",
              margin: 0,
            }}
          >
            "If the measurement model is weak, the budget logic is weak. If the budget logic is weak, optimization just makes the wrong system run faster."
          </p>
        </div>

        {/* Tertiary text link */}
        <div style={{ marginTop: "32px", opacity: visible ? 1 : 0, transition: "opacity 480ms ease 600ms" }}>
          <a
            href="#proof"
            onClick={(e) => { e.preventDefault(); document.getElementById("proof")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontFamily: SANS,
              fontSize: "15px",
              color: TEXT_MUTED,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              transition: "color 120ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = TEXT_MUTED; }}
          >
            See it applied below{" "}
            <span style={{ display: "inline-block", transition: "transform 120ms ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.transform = "translateX(4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.transform = "translateX(0)"; }}
            >↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
