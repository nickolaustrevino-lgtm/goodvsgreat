/* ProofSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Cards: dark surface, Electric Blue top border
   Tags: IBM Plex Mono, bordered
   Ghost number: 05 */

import { useEffect, useRef } from "react";
import DotMatrixCanvas from "./DotMatrixCanvas";

const CASE_STUDIES = [
  {
    label: "Case Study",
    title: "Fab Marketplace: Privacy-First Measurement at Global Scale",
    outcome: "+41% incremental ROAS vs. last-click baseline",
    desc: "When Epic Games launched Fab Marketplace into a category with a 12-year incumbent, the challenge wasn't awareness — it was building a measurement system that tied investment to revenue quality, respected creator data, and held up under scrutiny from finance and leadership. I led strategy, built the measurement foundation from the ground up, and ran paid media across 10 simultaneous global markets.",
    tags: ["Epic Games", "Measurement Infrastructure", "Incrementality", "Global Scale", "Privacy-First"],
    href: "https://nickolaustrevino-lgtm.github.io/fab-marketplace-case-study/",
  },
  {
    label: "Case Study",
    title: "Walmart × Gaming Culture: A Discord-First Community Activation",
    outcome: "3.2× community engagement vs. category benchmark",
    desc: "A full case study on how a major retailer approached community infrastructure, cultural relevance, and performance through a nontraditional activation model.",
    tags: ["Retail", "Community", "Brand Strategy", "Discord"],
    href: "https://nickolaustrevino-lgtm.github.io/walmart-case-study/",
  },
];

export default function ProofSection() {
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
      id="proof"
      ref={ref}
      style={{
        backgroundColor: "#0A1226",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-matrix parallax background */}
      <DotMatrixCanvas opacity={0.35} parallaxFactor={0.25} />

      <span className="gvg-ghost-number">05</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.16em", color: "#2F6FFF", opacity: 0.8, marginBottom: "16px" }}>
            CLIENT OUTCOMES
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
            Proof, not performance theater.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
              maxWidth: "600px",
            }}
          >
            Decision frameworks, working tools, and strategic systems that tie media to business outcomes.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {CASE_STUDIES.map((cs, i) => (
            <div
              key={i}
              className="gvg-fadeup gvg-card"
              style={{
                transitionDelay: `${i * 120}ms`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#2F6FFF",
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                {cs.label}
              </span>
              {/* Quantified outcome pill */}
              {(cs as any).outcome && (
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(94,232,181,0.08)",
                  border: "1px solid rgba(94,232,181,0.2)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  marginBottom: "12px",
                }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#5EE8B5", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#5EE8B5", letterSpacing: "0.04em" }}>{(cs as any).outcome}</span>
                </div>
              )}
              <h3
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                }}
              >
                {cs.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                {cs.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {cs.tags.map((tag) => (
                  <span key={tag} className="gvg-tag">{tag}</span>
                ))}
              </div>
              <a
                href={cs.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.8rem",
                  color: "#2979FF",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#5B9BFF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#2979FF"; }}
              >
                Read the case study →
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
