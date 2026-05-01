/* ServicesSection — GvG Dark Editorial Intelligence
   Deep Navy background. Numbered service cards with ghost ordinals.
   Electric Blue ordinal numbers. IBM Plex Sans body. */

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
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1A1A2E", padding: "6rem 0" }}
    >
      {/* Ghost ordinal */}
      <div
        className="absolute top-0 left-0 ghost-ordinal pointer-events-none select-none"
        style={{ color: "rgba(41,121,255,0.05)", fontSize: "clamp(8rem,18vw,16rem)", top: "-2rem", left: "-2rem" }}
      >
        02
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <div className="fade-up mb-5">
            <span className="section-label">What I Actually Help Clients Do</span>
          </div>
          <h2 className="fade-up delay-100 section-heading">
            Three capabilities.<br />
            One outcome.
          </h2>
          <div className="blue-rule mt-6 fade-up delay-200" />
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {services.map((svc, i) => (
            <div
              key={i}
              className={`fade-up delay-${(i + 1) * 100} card-glow relative`}
              style={{
                backgroundColor: "#1A1A2E",
                padding: "2.5rem 2rem",
                borderTop: "2px solid transparent",
                transition: "border-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTopColor = "#2979FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTopColor = "transparent";
              }}
            >
              {/* Ordinal */}
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#2979FF",
                letterSpacing: "0.15em",
                marginBottom: "1.25rem",
              }}>
                {svc.num}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: "1rem",
              }}>
                {svc.title}
              </h3>

              {/* Rule */}
              <div className="blue-rule mb-4" />

              {/* Body */}
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.6)",
              }}>
                {svc.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="fade-up mt-12 max-w-2xl">
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.8rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.35)",
            fontStyle: "italic",
            borderLeft: "2px solid rgba(41,121,255,0.3)",
            paddingLeft: "1rem",
          }}>
            Most teams already have reporting. Very few have real decision confidence. If the measurement model is weak, the budget logic is weak. If the budget logic is weak, optimization just makes the wrong system run faster.
          </p>
        </div>
      </div>
    </section>
  );
}
