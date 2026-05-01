/* WritingSection — Good vs. Great Brand Guidelines Applied
   Background: Off White (#F5F5F5) — light section
   H2: Space Mono 700, 36px — charcoal
   H3: IBM Plex Sans 600, 24px — article titles
   Body: IBM Plex Sans 400, 16px
   Caption: IBM Plex Mono, Electric Blue for labels
   Arrow links: Electric Blue */

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
      style={{
        backgroundColor: "#F5F5F5",
        padding: "5rem 0",
      }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "3rem", maxWidth: "640px" }}>
          <span className="gvg-caption gvg-section-label">
            Thinking, Frameworks, and Operating Ideas
          </span>
          <h2 className="gvg-h2" style={{ color: "#2D2D2D", marginBottom: "1.25rem" }}>
            Writing worth reading.
          </h2>
          <p className="gvg-body" style={{ color: "rgba(45,45,45,0.7)" }}>
            I write publicly about measurement, AI, and the changing operating model of marketing — especially where old reporting models stop being useful and modern growth teams need better systems.
          </p>
        </div>

        {/* Article list */}
        <div style={{ borderTop: "1px solid rgba(45,45,45,0.12)" }}>
          {articles.map((article, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid rgba(45,45,45,0.12)",
                padding: "2rem 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "2rem",
                cursor: "pointer",
                transition: "padding-left 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "0.75rem"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "0"; }}
            >
              <div style={{ flex: 1 }}>
                {/* H3 — IBM Plex Sans 600, 24px */}
                <h3
                  className="gvg-h3"
                  style={{ color: "#2D2D2D", marginBottom: "0.5rem" }}
                >
                  {article.title}
                </h3>
                {/* Body */}
                <p className="gvg-body" style={{ color: "rgba(45,45,45,0.65)" }}>
                  {article.body}
                </p>
              </div>
              {/* Arrow — Electric Blue */}
              <span
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "1.25rem",
                  color: "#2979FF",
                  flexShrink: 0,
                  paddingTop: "0.15rem",
                }}
              >
                →
              </span>
            </div>
          ))}
        </div>

        {/* LinkedIn Newsletter CTA */}
        <div
          style={{
            marginTop: "3rem",
            backgroundColor: "#2D2D2D",
            padding: "2.5rem",
          }}
        >
          <span className="gvg-caption gvg-section-label">
            LinkedIn Newsletter
          </span>
          <h3 className="gvg-h3" style={{ color: "#FFFFFF", marginBottom: "1rem" }}>
            Get the newsletter.
          </h3>
          <p
            className="gvg-body"
            style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem", maxWidth: "480px" }}
          >
            I write when there's something worth saying. No pitch sequences. No nurture tracks. One piece when there's something worth reading — delivered directly to your LinkedIn inbox.
          </p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="gvg-btn-primary"
            style={{ display: "inline-flex" }}
          >
            Follow on LinkedIn →
          </a>
          <p
            className="gvg-caption"
            style={{
              color: "rgba(255,255,255,0.3)",
              marginTop: "0.75rem",
              fontStyle: "italic",
            }}
          >
            Opens LinkedIn. One click to follow — no email required.
          </p>
        </div>
      </div>
    </section>
  );
}
