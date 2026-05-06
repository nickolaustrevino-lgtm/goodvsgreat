/* PricingSection - GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Cards: dark surface, featured card has Electric Blue border
   Label: IBM Plex Mono
   Ghost number: 06 */

import { useFadeUp } from "@/hooks/useFadeUp";
import { trackEvent } from "../lib/pixel";

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

const TIERS = [
  {
    name: "Diagnostic",
    price: "$2,500",
    period: "one-time",
    desc: "A two-week audit of your current media decision system.",
    body: "I review your channel mix, measurement stack, attribution logic, and budget allocation approach. You get a written report with observations, recommendations, and a prioritized fix list.",
    includes: ["Channel mix audit", "Attribution logic review", "Budget allocation analysis", "Written report + prioritized fix list"],
    excludes: "Ongoing strategy, system builds, or implementation support.",
    bestFor: '"We think something\'s off, but we can\'t pinpoint it."',
    doesNotInclude: "Ongoing strategy, system builds, or implementation support.",
    featured: false,
  },
  {
    name: "The Decision Layer Buildout",
    price: "$7,500",
    period: "per month · 3-month minimum",
    desc: "Everything in the Diagnostic, plus I help build the solution.",
    body: "That can include measurement design, MMM and incrementality frameworks, budget governance logic, AI workflow integration, and ongoing strategic oversight. I join team calls, pressure-test assumptions, and help own the investment narrative to leadership.",
    includes: ["Everything in Diagnostic", "Measurement design + MMM frameworks", "Budget governance logic", "AI workflow integration", "Ongoing strategic oversight", "Team calls + leadership narrative"],
    excludes: "Day-to-day campaign management, media buying, or creative production.",
    bestFor: '"We need someone to own the strategic decision layer."',
    doesNotInclude: "Day-to-day campaign management, media buying, or creative production.",
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Embedded Decision Leadership",
    price: "$15,000",
    period: "per month · 6-month minimum",
    desc: "Embedded strategic leadership.",
    body: "I operate as a fractional VP-level media and measurement partner - helping govern cross-channel investment, mentor the team, improve executive reporting, manage vendor logic, and build the infrastructure needed to improve ROI at the system level.",
    includes: ["Everything in Decision Layer Buildout", "Fractional VP-level leadership", "Cross-channel investment governance", "Team mentorship", "Executive reporting", "Vendor logic management"],
    excludes: "Hands-on campaign execution, creative development, or platform ad management.",
    bestFor: '"We need senior media decision leadership, but not a full-time hire yet."',
    doesNotInclude: "Hands-on campaign execution, creative development, or platform ad management.",
    featured: false,
  },
];

export default function PricingSection() {
  const ref = useFadeUp<HTMLElement>(0.08);

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        backgroundColor: "#141A33",
        padding: "clamp(5rem, 10vw, 10rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">06</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.16em", color: "#2F6FFF", opacity: 0.8, marginBottom: "16px" }}>
            INVESTMENT
          </p>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Three ways to work together.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.6,
              maxWidth: "600px",
            }}
          >
            The work is the same at the core: helping your team make better media decisions. The difference is depth.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "1.5rem",
          }}
        >
          {TIERS.map((tier, i) => (
            <div
              key={i}
              className="gvg-fadeup"
              style={{
                transitionDelay: `${i * 100}ms`,
                backgroundColor: tier.featured ? "#1B2240" : "#141A33",
                border: tier.featured
                  ? "1px solid rgba(47,111,255,0.5)"
                  : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: tier.featured ? "40px" : "32px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transform: tier.featured ? "scale(1.04)" : "scale(1)",
                boxShadow: tier.featured ? "0 0 64px rgba(47,111,255,0.16)" : "none",
                zIndex: tier.featured ? 1 : 0,
              }}
            >
              {tier.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    right: "1.5rem",
                    backgroundColor: "#2979FF",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#FFFFFF",
                    padding: "0.2rem 0.6rem",
                  }}
                >
                  {tier.badge}
                </div>
              )}

              {/* Tier name */}
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: tier.featured ? "#2979FF" : "rgba(255,255,255,0.35)",
                  marginBottom: "1rem",
                }}
              >
                {tier.name}
              </div>

              {/* Price */}
              <div style={{ marginBottom: "1.25rem" }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {tier.price}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.3)",
                    display: "block",
                    marginTop: "0.35rem",
                    letterSpacing: "0.04em",
                  }}
                >
                  {tier.period}
                </span>
              </div>

              {/* Short desc */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  fontWeight: 500,
                }}
              >
                {tier.desc}
              </p>

              {/* Includes bullets */}
              <div style={{ marginBottom: "20px", flex: 1 }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", marginBottom: "10px" }}>Includes</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  {(tier as any).includes.map((item: string, j: number) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                      <span style={{ color: "#5EE8B5", flexShrink: 0, marginTop: "2px" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Excludes */}
              <div style={{ marginBottom: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,80,80,0.5)", marginBottom: "8px" }}>Does not include</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>{(tier as any).excludes}</p>
              </div>

              {/* Best For */}
              <div style={{ marginBottom: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", marginBottom: "6px" }}>Best for</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.55)", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>{tier.bestFor}</p>
              </div>

              {/* CTA - display:inline-flex + justifyContent:center so align-items:center from .gvg-btn-* works */}
              <a
                href="/#booking"
                className={tier.featured ? "gvg-btn-primary" : "gvg-btn-secondary"}
                style={{ width: "100%", textDecoration: "none", display: "inline-flex", justifyContent: "center" }}
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent("Contact", { content_name: `Pricing CTA - ${tier.name}` });
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Book a Diagnostic Call →
              </a>
            </div>
          ))}
        </div>

        {/* Reassurance line */}
        <div className="gvg-fadeup" style={{ marginTop: "48px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 16px" }}>
            Not sure which tier fits? Start with a free 30-minute diagnostic call - no commitment, no pitch.
          </p>
          <a
            href="/#booking"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "48px",
              padding: "0 24px",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "border-color 240ms ease, color 240ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.28)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)";
            }}
            onClick={() => trackEvent("Lead", { content_name: "Pricing - Free Diagnostic Call" })}
          >
            Book a free 30-min diagnostic call →
          </a>
        </div>
      </div>
    </section>
  );
}
