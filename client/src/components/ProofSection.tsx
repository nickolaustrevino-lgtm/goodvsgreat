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
    desc: "When Epic Games launched Fab Marketplace into a category with a 12-year incumbent, the challenge wasn't awareness — it was building a measurement system that tied investment to revenue quality, respected creator data, and held up under scrutiny from finance and leadership. I led strategy, built the measurement foundation from the ground up, and ran paid media across 10 simultaneous global markets.",
    tags: ["Epic Games", "Measurement Infrastructure", "Incrementality", "Global Scale", "Privacy-First"],
    href: "https://nickolaustrevino-lgtm.github.io/fab-marketplace-case-study/",
  },
  {
    label: "Case Study",
    title: "Walmart × Gaming Culture: A Discord-First Community Activation",
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
        backgroundColor: "oklch(16% 0.005 285)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-matrix parallax background */}
      <DotMatrixCanvas opacity={0.5} parallaxFactor={0.25} />

      <span className="gvg-ghost-number">05</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <span className="gvg-section-label">Proof, Not Performance Theater</span>
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
            The kind of thinking{" "}
            <span style={{ color: "#2979FF" }}>I bring into the room.</span>
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            I'm not interested in a bloated portfolio. I'd rather show you decision frameworks, working tools, and strategic systems that tie media to business outcomes.
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
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#2979FF",
                  marginBottom: "1rem",
                  display: "block",
                }}
              >
                {cs.label}
              </span>
              <h3
                style={{
                  fontFamily: "'Space Mono', monospace",
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
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
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
