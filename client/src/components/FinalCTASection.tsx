/* FinalCTASection — GvG Brand Guidelines v2
   Full-bleed dark section with scanline texture
   Headline: "Stop optimizing what looks good. Start building what works."
   CTA: Electric Blue primary button
   Background: --gvg-navy with scanline overlay */

import { useEffect, useRef } from "react";
import DotMatrixCanvas from "./DotMatrixCanvas";

export default function FinalCTASection() {
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
      { threshold: 0.15 }
    );
    el.querySelectorAll(".gvg-fadeup").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="final-cta"
      ref={ref}
      className="gvg-scanline"
      style={{
        backgroundColor: "#1A1A2E",
        padding: "7.5rem 0",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Dot-matrix parallax background */}
      <DotMatrixCanvas opacity={0.55} parallaxFactor={0.4} />

      {/* Ghost number */}
      <span className="gvg-ghost-number" style={{ left: "50%", transform: "translateX(-50%)" }}>11</span>

      {/* Horizontal rule top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(41,121,255,0.4), transparent)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
            <img
              src="/manus-storage/gvg-logo_7908b53b.png"
              alt=""
              aria-hidden="true"
              style={{ width: "36px", height: "36px", objectFit: "contain", opacity: 0.75, borderRadius: "7px" }}
            />
          </div>
          <span className="gvg-section-label" style={{ display: "block", textAlign: "center" }}>
            The Decision
          </span>
          <span className="gvg-divider" style={{ margin: "0 auto 2rem" }} />

          <h2
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
          >
            Stop optimizing what{" "}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>looks good.</span>
            <br />
            Start building what{" "}
            <span style={{ color: "#2979FF" }}>works.</span>
          </h2>

          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1.0625rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
              maxWidth: "55ch",
              margin: "0 auto 2.5rem",
            }}
          >
            Better dashboards do not matter if the decision is still unclear. Let's fix the decision layer.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
              target="_blank"
              rel="noopener noreferrer"
              className="gvg-btn-primary"
              style={{ fontSize: "1rem", padding: "0.9rem 2rem", textDecoration: "none", display: "inline-block" }}
            >
              Book a Diagnostic Call →
            </a>
            <button
              onClick={() => scrollTo("services")}
              className="gvg-btn-secondary"
              style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}
            >
              See what I do
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal rule bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(41,121,255,0.4), transparent)",
        }}
      />
    </section>
  );
}
