/* HeroSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal + scanline overlay
   Headline: Space Mono 700, tight tracking
   Sub: IBM Plex Sans 400 italic
   Body: IBM Plex Sans 400
   Stats: Space Mono numbers with blue glow, IBM Plex Mono labels
   CTAs: Electric Blue primary, ghost secondary */

import { useEffect, useState } from "react";
import DotMatrixCanvas from "./DotMatrixCanvas";

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(target); // Start at final value immediately
  useEffect(() => {
    // Reset to 0 then animate up
    setCount(0);
    let rafId: number;
    let startTime: number | null = null;
    const raf = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(raf);
      else setCount(target); // Ensure final value is exact
    };
    rafId = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration]);
  return count;
}

export default function HeroSection() {
  const years = useCountUp(12, 1200);
  const media = useCountUp(100, 1600);
  const channels = useCountUp(4, 800);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="gvg-scanline"
      style={{
        backgroundColor: "oklch(16% 0.005 285)",
        paddingTop: "calc(64px + 6rem)",
        paddingBottom: "6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-matrix parallax background */}
      <DotMatrixCanvas opacity={0.45} parallaxFactor={0.3} />

      {/* Ghost section number */}
      <span className="gvg-ghost-number">01</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "780px" }}>

          {/* Section label */}
          <span className="gvg-section-label">Growth Decision Partner</span>
          <span className="gvg-divider" />

          {/* Display headline */}
          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
          >
            Good media looks busy.{" "}
            <span style={{ color: "#2979FF" }}>Great media</span> makes decisions.
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              marginBottom: "2rem",
              maxWidth: "620px",
            }}
          >
            Good vs. Great helps brands turn paid media, analytics, and AI into clearer decisions, stronger systems, and measurable growth.
          </p>

          {/* Portrait + body copy */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "flex-start",
              marginBottom: "2.5rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <img
              src={PORTRAIT_URL}
              alt="Nickolaus Trevino"
              style={{
                width: "144px",
                height: "144px",
                objectFit: "cover",
                objectPosition: "center top",
                flexShrink: 0,
              }}
            />
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75 }}>
              <p style={{ marginBottom: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
                You're spending $1M+ on paid media. You can't prove what's working.
              </p>
              <p style={{ marginBottom: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
                I'm the decision layer between your dashboards and your CFO. Measurement infrastructure, incrementality, and budget logic that turns $100M+ in media spend into defensible growth, not attribution theater.
              </p>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
                Trusted by Epic Games, Microsoft, Warner Bros., Walmart, Amazon.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            {[
              { value: years, suffix: "", label: "Years Experience", prefix: "" },
              { value: media, suffix: "M+", label: "Media Managed", prefix: "$" },
              { value: channels, suffix: "", label: "Channels", prefix: "" },
            ].map((stat, i) => (
              <div key={i} className="gvg-stat-glow">
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "2.25rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
              target="_blank"
              rel="noopener noreferrer"
              className="gvg-btn-primary"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Get better media decisions
            </a>
            <button
              onClick={() => scrollTo("services")}
              className="gvg-btn-secondary"
            >
              See how it works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
