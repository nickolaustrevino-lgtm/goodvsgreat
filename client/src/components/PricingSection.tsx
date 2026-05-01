/* PricingSection — Good vs. Great Brand Guidelines Applied
   Background: Off White (#F5F5F5) — light section
   H2: Space Mono 700, 36px — charcoal
   H3: IBM Plex Sans 600, 24px — card plan names
   Price: Space Mono 700, large — charcoal
   Body: IBM Plex Sans 400, 16px
   Caption: IBM Plex Mono
   Featured card: Electric Blue top border, slightly elevated
   CTA: Electric Blue primary button */

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
      style={{
        backgroundColor: "#F5F5F5",
        padding: "5rem 0",
      }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "3rem", maxWidth: "560px" }}>
          <span className="gvg-caption gvg-section-label">
            Three Ways to Work Together
          </span>
          <h2 className="gvg-h2" style={{ color: "#2D2D2D", marginBottom: "1rem" }}>
            The work is the same at the core.
          </h2>
          <p className="gvg-body" style={{ color: "rgba(45,45,45,0.7)" }}>
            Helping your team make better media decisions. The difference is depth.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              style={{
                backgroundColor: plan.featured ? "#FFFFFF" : "#EBEBEB",
                borderTop: plan.featured ? "3px solid #2979FF" : "3px solid transparent",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: plan.featured ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
                position: "relative",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              {/* Badge */}
              {plan.badge && (
                <div style={{ marginBottom: "1rem" }}>
                  <span
                    className="gvg-caption"
                    style={{
                      backgroundColor: "#2979FF",
                      color: "#FFFFFF",
                      padding: "0.2rem 0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan name — IBM Plex Mono caption */}
              <span
                className="gvg-caption"
                style={{
                  color: plan.featured ? "#2979FF" : "rgba(45,45,45,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "0.75rem",
                  display: "block",
                  marginTop: plan.badge ? "0" : "0",
                }}
              >
                {plan.name}
              </span>

              {/* Price — Space Mono 700 */}
              <div style={{ marginBottom: "0.35rem" }}>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "#2D2D2D",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
              </div>

              {/* Period — IBM Plex Mono caption */}
              <span
                className="gvg-caption"
                style={{
                  color: "rgba(45,45,45,0.45)",
                  marginBottom: "1.5rem",
                  display: "block",
                }}
              >
                {plan.period}
              </span>

              {/* Divider */}
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgba(45,45,45,0.12)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Description — IBM Plex Sans 600 */}
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#2D2D2D",
                  marginBottom: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {plan.description}
              </p>

              {/* Detail — IBM Plex Sans 400, 16px */}
              <p
                className="gvg-body"
                style={{
                  color: "rgba(45,45,45,0.7)",
                  marginBottom: "1.5rem",
                  flexGrow: 1,
                }}
              >
                {plan.detail}
              </p>

              {/* Best For */}
              <div style={{ marginBottom: "2rem" }}>
                <span
                  className="gvg-caption"
                  style={{
                    color: "rgba(45,45,45,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Best For
                </span>
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    color: "rgba(45,45,45,0.75)",
                    lineHeight: 1.5,
                  }}
                >
                  {plan.bestFor}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollTo("booking")}
                className={plan.featured ? "gvg-btn-primary" : "gvg-btn-secondary-dark"}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Book a Diagnostic Call →
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => scrollTo("booking")}
            className="gvg-btn-primary"
          >
            Book a free 30-minute diagnostic call
          </button>
        </div>
      </div>
    </section>
  );
}
