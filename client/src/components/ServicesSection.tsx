/* ServicesSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Decision Layer diagram: 3-tier stacked HTML/CSS, Electric Blue borders + arrows
   Cards: dark surface, Electric Blue top border accent
   Numbers: IBM Plex Mono, Electric Blue
   Ghost number: 03 */

import { useEffect, useRef } from "react";

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

const SERVICES = [
  {
    num: "01",
    title: "Measurement Infrastructure",
    desc: "I build the systems that make paid media easier to trust: MMM, incrementality testing, brand lift frameworks, and decision-ready measurement models that go beyond last-click reporting.",
  },
  {
    num: "02",
    title: "Cross-Channel Budget Strategy",
    desc: "I help govern investment across the full system. Where should the next dollar go? What is overstated? What should be reallocated? Where are you hitting diminishing returns? That's the layer most teams are missing.",
  },
  {
    num: "03",
    title: "AI-Native Decision Tools",
    desc: "I build tools clients actually use — calculators, planning systems, market intelligence workflows, and decision-support dashboards. Not AI theater. Working infrastructure that helps teams make faster, better calls.",
  },
];

const DIAGRAM_TIERS = [
  {
    label: "Tier 1",
    title: "MEASUREMENT INFRASTRUCTURE",
    desc: "Clean data, attribution models, and incrementality frameworks that can actually be trusted.",
    arrow: "feeds",
  },
  {
    label: "Tier 2",
    title: "CROSS-CHANNEL BUDGET STRATEGY",
    desc: "Investment allocation logic that spans channels, accounts for diminishing returns, and governs spend.",
    arrow: "governs",
  },
  {
    label: "Tier 3",
    title: "AI-NATIVE DECISION TOOLS",
    desc: "Calculators, planning systems, and dashboards that turn data into a decision your leadership can act on.",
    arrow: "enables",
  },
];

export default function ServicesSection() {
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
      id="services"
      ref={ref}
      style={{
        backgroundColor: "oklch(16% 0.005 285)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">03</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>

        {/* Section heading with founder avatar */}
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <span className="gvg-section-label">What I Actually Help Clients Do</span>
          <span className="gvg-divider" />
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <img
              src={PORTRAIT_URL}
              alt="Nickolaus Trevino"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
                border: "1.5px solid rgba(41,121,255,0.4)",
                flexShrink: 0,
              }}
            />
            <h2
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Three capabilities.{" "}
              <span style={{ color: "#2979FF" }}>One outcome.</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "560px",
              marginTop: "0.75rem",
            }}
          >
            Most teams already have reporting. Very few have real decision confidence.
          </p>
        </div>

        {/* ── Decision Layer Diagram ── */}
        <div
          className="gvg-fadeup"
          style={{
            marginBottom: "4rem",
            maxWidth: "640px",
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            The Decision Layer — Framework
          </p>

          {DIAGRAM_TIERS.map((tier, i) => (
            <div key={i}>
              {/* Tier box */}
              <div
                style={{
                  border: "1px solid rgba(41,121,255,0.45)",
                  backgroundColor: "rgba(41,121,255,0.05)",
                  padding: "1.25rem 1.5rem",
                  position: "relative",
                }}
              >
                {/* Tier label */}
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#2979FF",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.35rem",
                  }}
                >
                  {tier.label}
                </span>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "0.04em",
                    margin: "0 0 0.4rem 0",
                  }}
                >
                  {tier.title}
                </p>
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.8125rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {tier.desc}
                </p>
              </div>

              {/* Arrow connector */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "0.4rem 0",
                  gap: "2px",
                }}
              >
                <div style={{ width: "1px", height: "12px", backgroundColor: "#2979FF", opacity: 0.6 }} />
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: "#2979FF",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.7,
                  }}
                >
                  ↓ {tier.arrow} ↓
                </span>
                <div style={{ width: "1px", height: "12px", backgroundColor: "#2979FF", opacity: 0.6 }} />
              </div>
            </div>
          ))}

          {/* Outcome box */}
          <div
            style={{
              border: "1.5px solid #2979FF",
              backgroundColor: "rgba(41,121,255,0.12)",
              padding: "1.25rem 1.5rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.35rem",
              }}
            >
              Outcome
            </span>
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.9375rem",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              Decisions Leadership Can Trust
            </p>
          </div>
        </div>

        {/* ── Capability cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="gvg-fadeup gvg-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  color: "#2979FF",
                  letterSpacing: "0.1em",
                  marginBottom: "1rem",
                }}
              >
                {s.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.875rem",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className="gvg-fadeup"
          style={{
            marginTop: "3rem",
            padding: "1.75rem 2rem",
            borderLeft: "2px solid #2979FF",
            backgroundColor: "rgba(41,121,255,0.05)",
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            If the measurement model is weak, the budget logic is weak. If the budget logic is weak,{" "}
            <span style={{ color: "#FFFFFF" }}>optimization just makes the wrong system run faster.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
