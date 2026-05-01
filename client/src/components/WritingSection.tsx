/* WritingSection — GvG Dark Editorial Intelligence
   Off-white section. Article cards with Space Mono titles. */

const articles = [
  {
    title: "The Advertiser Has Been Demoted",
    body: "The real job now is systems architecture and signal design. A reframing of what modern marketing leadership actually looks like.",
  },
  {
    title: "From Clicks to Citations",
    body: "A measurement framework for AI search that replaces traffic-volume thinking with a more useful model for visibility and value.",
  },
  {
    title: "Why Modern Marketers Need to Build, Not Just Buy",
    body: "Why strategic leaders increasingly need to ship tools, not just recommendations.",
  },
];

export default function WritingSection() {
  return (
    <section
      id="writing"
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
        05
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-lg">
            <div className="fade-up mb-5">
              <span className="section-label">Thinking, Frameworks, and Operating Ideas</span>
            </div>
            <h2 className="fade-up delay-100" style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "#1A1A2E",
            }}>
              Writing worth reading.
            </h2>
            <p className="fade-up delay-200 mt-4" style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "#2D2D2D",
            }}>
              I write publicly about measurement, AI, and the changing operating model of marketing — especially where old reporting models stop being useful and modern growth teams need better systems.
            </p>
          </div>
        </div>

        {/* Article list */}
        <div className="flex flex-col gap-0">
          {articles.map((article, i) => (
            <div
              key={i}
              className={`fade-up delay-${(i + 1) * 100}`}
              style={{
                borderTop: "1px solid rgba(26,26,46,0.1)",
                padding: "2rem 0",
                display: "flex",
                alignItems: "flex-start",
                gap: "2rem",
                cursor: "pointer",
                transition: "padding-left 0.25s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "1rem"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "0"; }}
            >
              {/* Ordinal */}
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                color: "#2979FF",
                paddingTop: "0.25rem",
                minWidth: "2rem",
              }}>
                0{i + 1}
              </span>

              {/* Content */}
              <div className="flex-1">
                <h3 style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#1A1A2E",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.5rem",
                }}>
                  {article.title}
                </h3>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  color: "rgba(26,26,46,0.6)",
                }}>
                  {article.body}
                </p>
              </div>

              {/* Arrow */}
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "1rem",
                color: "#2979FF",
                paddingTop: "0.1rem",
                transition: "transform 0.2s ease",
              }}>
                →
              </span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(26,26,46,0.1)" }} />
        </div>

        {/* Newsletter CTA */}
        <div className="fade-up mt-14" style={{
          backgroundColor: "#1A1A2E",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#2979FF",
          }}>
            LinkedIn Newsletter
          </p>
          <h3 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.3,
          }}>
            Get the newsletter.
          </h3>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
            maxWidth: "480px",
          }}>
            I write when there's something worth saying. No pitch sequences. No nurture tracks. One piece when there's something worth reading — delivered directly to your LinkedIn inbox.
          </p>
          <div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: "inline-flex" }}
            >
              Follow on LinkedIn →
            </a>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.25)",
              marginTop: "0.75rem",
              letterSpacing: "0.06em",
            }}>
              Opens LinkedIn. One click to follow — no email required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
