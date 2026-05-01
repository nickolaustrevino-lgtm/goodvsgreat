/* ServicesSection — Good vs. Great Brand Guidelines Applied
   Background: Off White (#F5F5F5) — light section
   Section label: IBM Plex Mono caption, Electric Blue
   H2: Space Mono 700, 36px — charcoal
   H3: IBM Plex Sans 600, 24px — card titles
   Body: IBM Plex Sans 400, 16px
   Numbers: Space Mono 700, Electric Blue
   Divider: 3rem wide, Electric Blue */

const services = [
  {
    num: "01",
    title: "Measurement Infrastructure",
    body: "I build the systems that make paid media easier to trust: MMM, incrementality testing, brand lift frameworks, and decision-ready measurement models that go beyond last-click reporting.",
  },
  {
    num: "02",
    title: "Cross-Channel Budget Strategy",
    body: "I help govern investment across the full system. Where should the next dollar go? What is overstated? What should be reallocated? Where are you hitting diminishing returns? That's the layer most teams are missing.",
  },
  {
    num: "03",
    title: "AI-Augmented Workflow Design",
    body: "I build tools clients actually use — calculators, planning systems, market intelligence workflows, and decision-support dashboards. Not AI theater. Working infrastructure that helps teams make faster, better calls.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        backgroundColor: "#F5F5F5",
        padding: "5rem 0",
      }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span className="gvg-caption gvg-section-label">
            What I Actually Help Clients Do
          </span>
          <h2 className="gvg-h2" style={{ color: "#2D2D2D", maxWidth: "560px" }}>
            Three capabilities. One outcome.
          </h2>
        </div>

        {/* Service cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0",
            borderTop: "1px solid rgba(45,45,45,0.12)",
          }}
        >
          {services.map((svc, i) => (
            <div
              key={i}
              style={{
                padding: "2.5rem 2rem 2.5rem 0",
                borderRight: i < services.length - 1 ? "1px solid rgba(45,45,45,0.12)" : "none",
                paddingRight: i < services.length - 1 ? "2rem" : "0",
                paddingLeft: i > 0 ? "2rem" : "0",
              }}
            >
              {/* Number — Space Mono 700, Electric Blue */}
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#2979FF",
                  letterSpacing: "0.1em",
                  marginBottom: "1.25rem",
                }}
              >
                {svc.num}
              </div>

              {/* Title — IBM Plex Sans 600, 24px (H3) */}
              <h3 className="gvg-h3" style={{ color: "#2D2D2D", marginBottom: "0.75rem" }}>
                {svc.title}
              </h3>

              {/* Divider — Electric Blue */}
              <div className="gvg-divider" />

              {/* Body — IBM Plex Sans 400, 16px */}
              <p className="gvg-body" style={{ color: "rgba(45,45,45,0.75)" }}>
                {svc.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note — IBM Plex Mono caption, italic */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(45,45,45,0.12)",
          }}
        >
          <p
            className="gvg-caption"
            style={{
              color: "rgba(45,45,45,0.55)",
              fontStyle: "italic",
              maxWidth: "640px",
              lineHeight: 1.7,
              letterSpacing: "0.04em",
            }}
          >
            Most teams already have reporting. Very few have real decision confidence. If the measurement model is weak, the budget logic is weak. If the budget logic is weak, optimization just makes the wrong system run faster.
          </p>
        </div>
      </div>
    </section>
  );
}
