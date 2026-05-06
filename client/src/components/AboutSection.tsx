/* AboutSection - GvG Brand Guidelines v2
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
        padding: "clamp(5rem, 10vw, 7.5rem) 0",
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
            gridTemplateColumns: "clamp(200px, 22vw, 280px) 1fr",
            gap: "clamp(2rem, 5vw, 5rem)",
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
                  fontFamily: "'Inter', sans-serif",
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
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.16em", color: "#2F6FFF", opacity: 0.8, marginBottom: "16px" }}>
              FOUNDER STORY
            </p>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                color: "#FFFFFF",
                marginBottom: "32px",
              }}
            >
              I'm Nickolaus Trevino.
            </h2>

            {/* 3-para bio */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>
                For 12 years, I've built the decision infrastructure behind media investment for companies that had plenty of dashboards but no clarity. Epic Games. Microsoft. Warner Bros. Walmart. Amazon. Mid-market brands scaling past their first agency. The pattern is always the same: channels are live, spend is moving, but no one can explain what's actually working or why.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>
                My background sits at the intersection of paid media strategy, measurement architecture, and AI-augmented workflow design. I've governed over $100M in media across gaming, retail, entertainment, healthcare, and tech - and the thing I keep seeing is that the gap between good teams and great ones is never the budget. It's the operating logic underneath it.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>
                Good vs. Great is the practice I built around that insight. I work with a small number of clients at a time, embedded at the strategic layer - designing the measurement frameworks, budget governance systems, and capital allocation logic that make media investment defensible to a CFO and legible to a team.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote style={{
              margin: "0 0 32px",
              padding: "20px 24px",
              borderLeft: "3px solid #2F6FFF",
              background: "rgba(47,111,255,0.06)",
              borderRadius: "0 8px 8px 0",
            }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
                “The gap between good teams and great ones is never the budget. It’s the operating logic underneath it.”
              </p>
            </blockquote>

            {/* LinkedIn recommendations */}
            <div style={{ marginBottom: "32px" }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", marginBottom: "16px" }}>What clients say</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  {
                    quote: "Nickolaus consistently operated as a true strategic business partner rather than a traditional media vendor. He took the time to deeply understand each brand's commercial objectives, customer dynamics, and operational realities, ensuring that strategy and execution were aligned to real business needs. His recommendations were grounded in business results, not simply vanity metrics.",
                    name: "Brad Jashinsky",
                    title: "Gartner Analyst - Retail, Travel & Loyalty Marketing",
                    context: "Client at Razer & John's Incredible Pizza",
                  },
                  {
                    quote: "Nick operates as a true strategic partner - focused on business objectives, not just media metrics. He connects marketing efforts directly to growth goals and consistently delivers thoughtful, outcome-driven strategies. He is also incredibly reliable when managing sensitive or high-stakes campaigns, bringing steady judgment and proactive communication when it matters most. Nick was a trusted advisor and a valued extension of my team.",
                    name: "Beth R. Grossfeld",
                    title: "Brand Positioning & Growth Marketing",
                    context: "Client",
                  },
                ].map((rec, i) => (
                  <div key={i} style={{ padding: "20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: "0 0 12px", fontStyle: "italic" }}>"{rec.quote}"</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{rec.name}</span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>{rec.title} · {rec.context}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/nickolaustrevino/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                height: "48px",
                padding: "0 24px",
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "border-color 240ms ease, color 240ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              Connect on LinkedIn →
            </a>
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
