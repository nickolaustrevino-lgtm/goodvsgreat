/* HeroSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal + scanline overlay
   Headline: Space Mono 700, tight tracking
   Sub: IBM Plex Sans 400 italic
   Body: IBM Plex Sans 400
   Proof bar: single dominant stat line with bold brand names
   Logo grid: 5×2 desktop / 2×5 mobile, monochrome white
   Video placeholder: 16:9, max 640px, centered
   Trust tags: IBM Plex Mono small caps row */

import DotMatrixCanvas from "./DotMatrixCanvas";

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

const CLIENTS = [
  "Epic Games",
  "Microsoft",
  "Warner Bros.",
  "Walmart",
  "Amazon",
  "2K Games",
  "Razer",
  "Turtle Beach",
  "RiverSpring Living",
  "Wonderlic",
];

const TRUST_TAGS = ["12 YEARS", "$100M+ MANAGED", "GAMING", "RETAIL", "TECH", "HEALTHCARE"];

export default function HeroSection() {
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
        paddingTop: "calc(64px + 5rem)",
        paddingBottom: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-matrix parallax background */}
      <DotMatrixCanvas opacity={0.45} parallaxFactor={0.3} />

      {/* Ghost section number */}
      <span className="gvg-ghost-number">01</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>

        {/* ── Top: headline + photo side-by-side on desktop ── */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Left: copy block */}
          <div style={{ flex: "1 1 480px", minWidth: 0 }}>

            {/* Section label */}
            <span className="gvg-section-label">Growth Decision Partner</span>
            <span className="gvg-divider" />

            {/* Display headline — exactly ONE h1 on the page */}
            <h1
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(2.2rem, 5vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                marginBottom: "1.25rem",
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
                marginBottom: "1.5rem",
                maxWidth: "600px",
              }}
            >
              Good vs. Great helps brands turn paid media, analytics, and AI into clearer decisions, stronger systems, and measurable growth.
            </p>

            {/* ── Dominant proof bar ── */}
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.975rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.65,
                marginBottom: "2rem",
                maxWidth: "600px",
                borderLeft: "2px solid #2979FF",
                paddingLeft: "1rem",
              }}
            >
              $100M+ in media managed across{" "}
              <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Epic Games</strong>,{" "}
              <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Microsoft</strong>,{" "}
              <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Warner Bros.</strong>,{" "}
              <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Walmart</strong>, and{" "}
              <strong style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Amazon</strong>.
            </p>

            {/* Body copy */}
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.75,
                marginBottom: "2rem",
                maxWidth: "560px",
              }}
            >
              I help companies spending $1M+ on paid media figure out what's actually driving revenue — and fix what isn't. Not with more dashboards. With the measurement, incrementality, and decision logic that tells you where your next dollar should go and why.
            </p>

            {/* ── Video placeholder ── */}
            <div
              style={{
                maxWidth: "640px",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%", // 16:9
                  backgroundColor: "oklch(20% 0.008 285)",
                  border: "1px solid rgba(41,121,255,0.25)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => {/* video link to be wired */}}
              >
                {/* Placeholder thumbnail grid pattern */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                      linear-gradient(rgba(41,121,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(41,121,255,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Play button overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: "#2979FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 32px rgba(41,121,255,0.5)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.7rem",
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Video coming soon
                  </span>
                </div>
              </div>
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.06em",
                  marginTop: "0.5rem",
                  textAlign: "center",
                }}
              >
                60 seconds — how I think about the decision layer.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
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

          {/* Right: enlarged portrait (desktop) */}
          <div
            style={{
              flexShrink: 0,
              alignSelf: "flex-start",
              marginTop: "5rem",
            }}
          >
            <img
              src={PORTRAIT_URL}
              alt="Nickolaus Trevino"
              style={{
                width: "clamp(160px, 18vw, 260px)",
                height: "clamp(160px, 18vw, 260px)",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                border: "2px solid rgba(41,121,255,0.3)",
              }}
            />
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginTop: "0.5rem",
                textAlign: "center",
              }}
            >
              Nickolaus Trevino
            </p>
          </div>
        </div>

        {/* ── Client logo grid ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "2.5rem",
            marginTop: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Brands I've worked with
          </p>

          {/* 5-col × 2-row desktop / 2-col × 5-row mobile */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0.75rem 1.5rem",
            }}
            className="gvg-logo-grid"
          >
            {CLIENTS.map((name) => (
              <div
                key={name}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  padding: "0.6rem 0.5rem",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textAlign: "center",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                  cursor: "default",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,1)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(41,121,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.4)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {name}
              </div>
            ))}
          </div>

          {/* ── Trust signal tags ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "1.5rem",
              alignItems: "center",
            }}
          >
            {TRUST_TAGS.map((tag, i) => (
              <span key={tag} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {tag}
                </span>
                {i < TRUST_TAGS.length - 1 && (
                  <span style={{ color: "rgba(41,121,255,0.5)", fontSize: "0.5rem" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
