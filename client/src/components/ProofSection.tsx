/* ProofSection — GvG Dark Editorial Intelligence
   Off-white section. Case study cards with Electric Blue accents. */

const caseStudies = [
  {
    label: "Case Study",
    title: "Fab Marketplace: Privacy-First Measurement at Global Scale",
    body: "When Epic Games launched Fab Marketplace into a category with a 12-year incumbent, the challenge wasn't awareness — it was building a measurement system that tied investment to revenue quality, respected creator data, and held up under scrutiny from finance and leadership. I led strategy, built the measurement foundation from the ground up, and ran paid media across 10 simultaneous global markets.",
    tags: ["Epic Games", "Measurement Infrastructure", "Incrementality", "Global Scale", "Privacy-First"],
  },
  {
    label: "Case Study",
    title: "Walmart × Gaming Culture: A Discord-First Community Activation",
    body: "A full case study on how a major retailer approached community infrastructure, cultural relevance, and performance through a nontraditional activation model.",
    tags: ["Retail", "Community", "Brand Strategy", "Discord"],
  },
];

export default function ProofSection() {
  return (
    <section
      id="proof"
      className="section-light relative overflow-hidden"
      style={{ padding: "6rem 0" }}
    >
      {/* Ghost ordinal */}
      <div
        className="absolute top-0 right-8 pointer-events-none select-none"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(8rem,18vw,16rem)",
          fontWeight: 700,
          color: "rgba(41,121,255,0.04)",
          lineHeight: 1,
          top: "-2rem",
        }}
      >
        03
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <div className="fade-up mb-5">
            <span className="section-label">Proof, Not Performance Theater</span>
          </div>
          <h2 className="fade-up delay-100" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            color: "#1A1A2E",
          }}>
            The kind of thinking<br />I bring into the room.
          </h2>
          <p className="fade-up delay-200 mt-5" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#2D2D2D",
          }}>
            I'm not interested in a bloated portfolio. I'd rather show you decision frameworks, working tools, and strategic systems that tie media to business outcomes.
          </p>
        </div>

        {/* Case study cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className={`fade-up delay-${(i + 1) * 100}`}
              style={{
                backgroundColor: "#FFFFFF",
                padding: "2.5rem",
                borderTop: "3px solid #2979FF",
                boxShadow: "0 2px 20px rgba(26,26,46,0.06)",
                transition: "box-shadow 0.25s ease, transform 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = "0 8px 40px rgba(41,121,255,0.12)";
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = "0 2px 20px rgba(26,26,46,0.06)";
                el.style.transform = "translateY(0)";
              }}
            >
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#2979FF",
                marginBottom: "1rem",
              }}>
                {cs.label}
              </p>

              <h3 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#1A1A2E",
                lineHeight: 1.35,
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
              }}>
                {cs.title}
              </h3>

              <div style={{ width: "2rem", height: "2px", backgroundColor: "#2979FF", marginBottom: "1rem" }} />

              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "#2D2D2D",
                marginBottom: "1.5rem",
              }}>
                {cs.body}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {cs.tags.map((tag, j) => (
                  <span key={j} style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(26,26,46,0.55)",
                    background: "rgba(26,26,46,0.05)",
                    border: "1px solid rgba(26,26,46,0.12)",
                    padding: "0.2rem 0.55rem",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color: "#2979FF",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "gap 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.7rem"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.4rem"; }}
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
