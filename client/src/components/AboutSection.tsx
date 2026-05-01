/* AboutSection — GvG Dark Editorial Intelligence
   Off-white section. Two-column: bio left, portrait right. */

const PORTRAIT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663601301359/Zm5tL57jf4wPW4KuoqDKLS/gvg-about-portrait-ZFdJjaco5KnQLYxWyws6U8.webp";

const credentials = [
  "12 Years Experience",
  "$100M+ Media Managed",
  "Search · Social · Programmatic · CTV",
  "Retail · SaaS · Entertainment · Tech",
  "MMM & Incrementality",
  "AI Workflow Design",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-light relative overflow-hidden"
      style={{ padding: "6rem 0" }}
    >
      {/* Ghost ordinal */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(8rem,18vw,16rem)",
          fontWeight: 700,
          color: "rgba(41,121,255,0.04)",
          lineHeight: 1,
          top: "-2rem",
          left: "-1rem",
        }}
      >
        07
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          {/* Bio — 3 cols */}
          <div className="lg:col-span-3">
            <div className="fade-up mb-5">
              <span className="section-label">Built and Led by Nickolaus Trevino</span>
            </div>
            <h2 className="fade-up delay-100" style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "#1A1A2E",
              marginBottom: "1.5rem",
            }}>
              Nickolaus Trevino
            </h2>

            <p className="fade-up delay-100" style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(26,26,46,0.4)",
              marginBottom: "1.5rem",
            }}>
              New York, NY · Remote
            </p>

            <div style={{ width: "2rem", height: "2px", backgroundColor: "#2979FF", marginBottom: "1.5rem" }} className="fade-up delay-200" />

            <p className="fade-up delay-200" style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#2D2D2D",
              marginBottom: "1.25rem",
            }}>
              Good vs. Great exists because too many companies are deploying serious media budgets without the infrastructure to know whether those budgets are working.
            </p>

            <p className="fade-up delay-300" style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#2D2D2D",
              marginBottom: "1.25rem",
            }}>
              Nickolaus Trevino has managed more than $100M in media budgets across global markets and worked across Search, Social, Programmatic, and CTV in retail, SaaS, entertainment, and technology.
            </p>

            <p className="fade-up delay-300" style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#2D2D2D",
              marginBottom: "2rem",
            }}>
              This isn't about making campaigns look better in reports. It's about helping leadership make better calls with more confidence.
            </p>

            {/* Credentials grid */}
            <div className="fade-up delay-400 grid grid-cols-2 gap-3">
              {credentials.map((cred, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}>
                  <div style={{
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#2979FF",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em",
                    color: "rgba(26,26,46,0.65)",
                  }}>
                    {cred}
                  </span>
                </div>
              ))}
            </div>

            {/* LinkedIn */}
            <div className="fade-up delay-400 mt-8">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#2979FF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  borderBottom: "1px solid rgba(41,121,255,0.3)",
                  paddingBottom: "2px",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2979FF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(41,121,255,0.3)"; }}
              >
                LinkedIn →
              </a>
            </div>
          </div>

          {/* Portrait — 2 cols */}
          <div className="lg:col-span-2 fade-up delay-200">
            <div style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
            }}>
              <img
                src={PORTRAIT_URL}
                alt="Nickolaus Trevino"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  filter: "grayscale(15%)",
                }}
              />
              {/* Blue overlay accent */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(26,26,46,0.6), transparent)",
              }} />
              {/* Name tag */}
              <div style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
              }}>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "0.2rem",
                }}>
                  Nickolaus Trevino
                </p>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}>
                  Growth Decision Partner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
