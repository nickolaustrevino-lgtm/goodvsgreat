/* ProofSection — Good vs. Great Brand Guidelines Applied
   Background: Charcoal Dark (#2D2D2D) — dark section
   H2: Space Mono 700, 36px — white
   H3: IBM Plex Sans 600, 24px — card titles, white
   Body: IBM Plex Sans 400, 16px — white/muted
   Caption: IBM Plex Mono, Electric Blue
   Tags: IBM Plex Mono, bordered
   Card top border: Electric Blue 3px */

const caseStudies = [
  {
    title: "Fab Marketplace: Privacy-First Measurement at Global Scale",
    body: "When Epic Games launched Fab Marketplace into a category with a 12-year incumbent, the challenge wasn't awareness — it was building a measurement system that tied investment to revenue quality, respected creator data, and held up under scrutiny from finance and leadership. I led strategy, built the measurement foundation from the ground up, and ran paid media across 10 simultaneous global markets.",
    tags: ["Epic Games", "Measurement Infrastructure", "Incrementality", "Global Scale", "Privacy-First"],
  },
  {
    title: "Walmart × Gaming Culture: A Discord-First Community Activation",
    body: "A full case study on how a major retailer approached community infrastructure, cultural relevance, and performance through a nontraditional activation model.",
    tags: ["Retail", "Community", "Brand Strategy", "Discord"],
  },
];

export default function ProofSection() {
  return (
    <section
      id="proof"
      style={{
        backgroundColor: "#2D2D2D",
        padding: "5rem 0",
      }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "3rem", maxWidth: "640px" }}>
          <span className="gvg-caption gvg-section-label">
            Proof, Not Performance Theater
          </span>
          <h2 className="gvg-h2" style={{ color: "#FFFFFF", marginBottom: "1.25rem" }}>
            The kind of thinking I bring into the room.
          </h2>
          <p className="gvg-body" style={{ color: "rgba(255,255,255,0.65)" }}>
            I'm not interested in a bloated portfolio. I'd rather show you decision frameworks, working tools, and strategic systems that tie media to business outcomes.
          </p>
        </div>

        {/* Case study cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#1C1C1E",
                borderTop: "3px solid #2979FF",
                padding: "2.5rem",
                transition: "transform 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              {/* Caption label */}
              <span className="gvg-caption gvg-section-label">Case Study</span>

              {/* H3 — IBM Plex Sans 600, 24px */}
              <h3 className="gvg-h3" style={{ color: "#FFFFFF", marginBottom: "1rem" }}>
                {cs.title}
              </h3>

              {/* Divider */}
              <div className="gvg-divider" />

              {/* Body */}
              <p className="gvg-body" style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem" }}>
                {cs.body}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {cs.tags.map((tag, j) => (
                  <span key={j} className="gvg-tag">{tag}</span>
                ))}
              </div>

              {/* Link — Electric Blue */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "#2979FF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
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
