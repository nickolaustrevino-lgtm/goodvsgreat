/* AboutSection — GvG Brand Guidelines v2
   Background: --gvg-navy
   Portrait: real photo, sharp corners, Electric Blue corner accent
   H2: Space Mono 700
   Body: IBM Plex Sans 400
   Ghost number: 09 */

import { useEffect, useRef } from "react";

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

export default function AboutSection() {
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
      id="about"
      ref={ref}
      style={{
        backgroundColor: "#1A1A2E",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">09</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Portrait column */}
          <div className="gvg-fadeup">
            <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
              <img
                src={PORTRAIT_URL}
                alt="Nickolaus Trevino"
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: "grayscale(10%)",
                }}
              />
              {/* Corner accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  right: "-8px",
                  width: "40px",
                  height: "40px",
                  borderRight: "2px solid #2979FF",
                  borderBottom: "2px solid #2979FF",
                  pointerEvents: "none",
                }}
              />
            </div>
            <div style={{ marginTop: "1.25rem" }}>
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "0.25rem",
                }}
              >
                Nickolaus Trevino
              </div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#2979FF",
                }}
              >
                Founder, Good vs. Great
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className="gvg-fadeup" style={{ transitionDelay: "120ms" }}>
            <span className="gvg-section-label">About</span>
            <span className="gvg-divider" />
            <h2
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                marginBottom: "1.75rem",
              }}
            >
              I'm Nickolaus Trevino.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                "I've spent 12 years building media systems for companies that needed more than performance reports — they needed better decision infrastructure. I've worked with Epic Games, Microsoft, Warner Bros., Walmart, Amazon, and a range of mid-market companies navigating the same challenge: they have channels, agencies, and dashboards, but they don't have clarity.",
                "My background is in paid media strategy, measurement architecture, and AI-augmented workflow design. I've managed over $100M in media across gaming, retail, healthcare, and tech — and I've seen what separates the teams that scale well from the ones that just scale.",
                "Good vs. Great is the practice I built to close that gap. I work with a small number of clients at a time, embedded at the strategic layer, helping them build the measurement, budget governance, and decision logic that makes media investment easier to trust.",
                "I'm based in Austin, TX. I write about media, measurement, and the changing operating model of marketing on LinkedIn.",
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "1rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.09)",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gvg-btn-secondary"
                style={{ textDecoration: "none" }}
              >
                LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
