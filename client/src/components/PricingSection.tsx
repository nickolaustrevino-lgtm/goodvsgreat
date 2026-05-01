/* PricingSection — GvG Dark Editorial Intelligence
   Deep Navy background. Three pricing tiers. Middle card featured with Electric Blue border. */

const plans = [
  {
    name: "Diagnostic",
    price: "$2,500",
    period: "one-time",
    description: "A two-week audit of your current media decision system.",
    detail: "I review your channel mix, measurement stack, attribution logic, and budget allocation approach. You get a written report with observations, recommendations, and a prioritized fix list.",
    bestFor: '"We think something\'s off, but we can\'t pinpoint it."',
    featured: false,
  },
  {
    name: "Strategy + Build",
    price: "$7,500",
    period: "per month · 3-month minimum",
    description: "Everything in the Diagnostic, plus I help build the solution.",
    detail: "That can include measurement design, MMM and incrementality frameworks, budget governance logic, AI workflow integration, and ongoing strategic oversight. I join team calls, pressure-test assumptions, and help own the investment narrative to leadership.",
    bestFor: '"We need someone to own the strategic decision layer."',
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Full Engagement",
    price: "$15,000",
    period: "per month · 6-month minimum",
    description: "Embedded strategic leadership.",
    detail: "I operate as a fractional VP-level media and measurement partner — helping govern cross-channel investment, mentor the team, improve executive reporting, manage vendor logic, and build the infrastructure needed to improve ROI at the system level.",
    bestFor: '"We need senior media decision leadership, but not a full-time hire yet."',
    featured: false,
  },
];

export default function PricingSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#111120", padding: "6rem 0" }}
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
          right: "-1rem",
        }}
      >
        04
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <div className="fade-up mb-5">
            <span className="section-label">Three Ways to Work Together</span>
          </div>
          <h2 className="fade-up delay-100 section-heading">
            The work is the same at the core.
          </h2>
          <p className="fade-up delay-200 mt-4" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
          }}>
            Helping your team make better media decisions. The difference is depth.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`fade-up delay-${(i + 1) * 100} relative flex flex-col`}
              style={{
                backgroundColor: plan.featured ? "#1E1E38" : "#1A1A2E",
                border: plan.featured
                  ? "1px solid rgba(41,121,255,0.5)"
                  : "1px solid rgba(255,255,255,0.07)",
                boxShadow: plan.featured ? "0 0 48px rgba(41,121,255,0.1)" : "none",
                padding: "2.5rem 2rem",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-4px)";
                if (!plan.featured) el.style.boxShadow = "0 8px 32px rgba(41,121,255,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                if (!plan.featured) el.style.boxShadow = "none";
              }}
            >
              {/* Featured badge */}
              {plan.badge && (
                <div style={{
                  position: "absolute",
                  top: "-1px",
                  left: "2rem",
                  backgroundColor: "#2979FF",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  padding: "0.25rem 0.6rem",
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: plan.featured ? "#2979FF" : "rgba(255,255,255,0.4)",
                marginBottom: "1rem",
                marginTop: plan.badge ? "1rem" : "0",
              }}>
                {plan.name}
              </p>

              {/* Price */}
              <div className="mb-1">
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "2.2rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                }}>
                  {plan.price}
                </span>
              </div>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.06em",
                marginBottom: "1.5rem",
              }}>
                {plan.period}
              </p>

              {/* Rule */}
              <div style={{
                width: "100%",
                height: "1px",
                backgroundColor: plan.featured ? "rgba(41,121,255,0.3)" : "rgba(255,255,255,0.07)",
                marginBottom: "1.5rem",
              }} />

              {/* Description */}
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "0.75rem",
                lineHeight: 1.4,
              }}>
                {plan.description}
              </p>

              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)",
                marginBottom: "1.5rem",
                flexGrow: 1,
              }}>
                {plan.detail}
              </p>

              {/* Best for */}
              <div style={{
                borderLeft: "2px solid rgba(41,121,255,0.4)",
                paddingLeft: "0.75rem",
                marginBottom: "2rem",
              }}>
                <p style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  marginBottom: "0.3rem",
                }}>
                  Best For
                </p>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.5,
                }}>
                  {plan.bestFor}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollTo("booking")}
                style={{
                  width: "100%",
                  backgroundColor: plan.featured ? "#2979FF" : "transparent",
                  border: plan.featured ? "none" : "1px solid rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.875rem",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  if (plan.featured) {
                    el.style.backgroundColor = "#5B9BFF";
                  } else {
                    el.style.borderColor = "#2979FF";
                    el.style.color = "#2979FF";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  if (plan.featured) {
                    el.style.backgroundColor = "#2979FF";
                  } else {
                    el.style.borderColor = "rgba(255,255,255,0.2)";
                    el.style.color = "#FFFFFF";
                  }
                }}
              >
                Book a Diagnostic Call →
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="fade-up mt-12 text-center">
          <button
            onClick={() => scrollTo("booking")}
            className="btn-primary"
          >
            Book a Free 30-Minute Diagnostic Call
          </button>
        </div>
      </div>
    </section>
  );
}
