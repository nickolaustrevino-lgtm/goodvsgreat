/* HeroSection — Good vs. Great Brand Guidelines Applied
   Background: Off White (#F5F5F5)
   Display heading: Space Mono 700
   Sub-label: IBM Plex Sans italic, Body Large
   Body: IBM Plex Sans 400, 18px
   Stats: Space Mono 700 numbers, IBM Plex Mono captions
   CTAs: Electric Blue (#2979FF) primary, outlined secondary */

import { useEffect, useState } from "react";

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let rafId: number;
    const timer = setTimeout(() => {
      let startTime: number | null = null;
      const raf = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }, 200);
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId); };
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
      style={{
        backgroundColor: "#F5F5F5",
        paddingTop: "calc(64px + 5rem)",
        paddingBottom: "5rem",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "760px" }}>

          {/* Caption label — IBM Plex Mono */}
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.75rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#2979FF",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Growth Decision Partner
          </span>

          {/* Display heading — Space Mono 700 */}
          <h1
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#2D2D2D",
              marginBottom: "1.5rem",
            }}
          >
            Better growth starts with better media decisions.
          </h1>

          {/* Sub-label — IBM Plex Sans italic */}
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1.125rem",
              fontStyle: "italic",
              color: "#2D2D2D",
              marginBottom: "1.5rem",
              lineHeight: 1.6,
            }}
          >
            Your media is running. But is it working?
          </p>

          {/* Portrait + body copy */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "flex-start",
              marginBottom: "2.5rem",
            }}
          >
            <img
              src={PORTRAIT_URL}
              alt="Nickolaus Trevino"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
                border: "2px solid rgba(45,45,45,0.12)",
              }}
            />
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "1.125rem",
                color: "#2D2D2D",
                lineHeight: 1.7,
              }}
            >
              I help companies spending $1M+ on paid media figure out what's actually driving revenue — and fix what isn't. Not with more dashboards. With the measurement, incrementality, and decision logic that tells you where your next dollar should go and why.
            </p>
          </div>

          {/* Stats — Space Mono numbers, IBM Plex Mono labels */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid rgba(45,45,45,0.12)",
            }}
          >
            {[
              { value: years, suffix: "", label: "Years", prefix: "" },
              { value: media, suffix: "M+", label: "Media Managed", prefix: "$" },
              { value: channels, suffix: "", label: "Channels", prefix: "" },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#2D2D2D",
                    lineHeight: 1,
                    marginBottom: "0.35rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.7rem",
                    color: "rgba(45,45,45,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("booking")}
              className="gvg-btn-primary"
            >
              Book a free 30-min diagnostic
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="gvg-btn-secondary-dark"
            >
              See how I work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
