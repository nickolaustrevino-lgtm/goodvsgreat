/* PricingSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Cards: dark surface, featured card has Electric Blue border
   Label: IBM Plex Mono
   Ghost number: 06 */

import { useEffect, useRef } from "react";

const TIERS = [
  {
    name: "Diagnostic",
    price: "$2,500",
    period: "one-time",
    desc: "A two-week audit of your current media decision system.",
    body: "I review your channel mix, measurement stack, attribution logic, and budget allocation approach. You get a written report with observations, recommendations, and a prioritized fix list.",
    bestFor: '"We think something\'s off, but we can\'t pinpoint it."',
    featured: false,
  },
  {
    name: "Strategy + Build",
    price: "$7,500",
    period: "per month · 3-month minimum",
    desc: "Everything in the Diagnostic, plus I help build the solution.",
    body: "That can include measurement design, MMM and incrementality frameworks, budget governance logic, AI workflow integration, and ongoing strategic oversight. I join team calls, pressure-test assumptions, and help own the investment narrative to leadership.",
    bestFor: '"We need someone to own the strategic decision layer."',
    featured: true,
    badge: "Most Popular",
  },
  {
    name: "Full Engagement",
    price: "$15,000",
    period: "per month · 6-month minimum",
    desc: "Embedded strategic leadership.",
    body: "I operate as a fractional VP-level media and measurement partner — helping govern cross-channel investment, mentor the team, improve executive reporting, manage vendor logic, and build the infrastructure needed to improve ROI at the system level.",
    bestFor: '"We need senior media decision leadership, but not a full-time hire yet."',
    featured: false,
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".gvg-fadeup").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        backgroundColor: "oklch(16% 0.005 285)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">06</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <span className="gvg-section-label">Three Ways to Work Together</span>
          <span className="gvg-divider" />
          <h2
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "0.75rem",
            }}
          >
            The work is the same at the core.
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "500px",
            }}
          >
            Helping your team make better media decisions. The difference is depth.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {TIERS.map((tier, i) => (
            <div
              key={i}
              className="gvg-fadeup"
              style={{
                transitionDelay: `${i * 100}ms`,
                backgroundColor: "#252530",
                border: tier.featured
                  ? "1px solid #2979FF"
                  : "1px solid rgba(255,255,255,0.09)",
                borderTop: tier.featured
                  ? "2px solid #2979FF"
                  : "2px solid rgba(255,255,255,0.12)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
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

              <div style={{ marginBottom: "1.25rem" }}>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
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

              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  fontWeight: 500,
                }}
              >
                {tier.desc}
              </p>

              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                {tier.body}
              </p>

              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.09)",
                  paddingTop: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.25)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Best For
                </div>
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.55)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {tier.bestFor}
                </p>
              </div>

              <a
                href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
                target="_blank"
                rel="noopener noreferrer"
                className={tier.featured ? "gvg-btn-primary" : "gvg-btn-secondary"}
                style={{ width: "100%", textAlign: "center", textDecoration: "none", display: "block" }}
              >
                Book a Diagnostic Call →
              </a>
            </div>
          ))}
        </div>

        <div
          className="gvg-fadeup"
          style={{ marginTop: "3rem", textAlign: "center" }}
        >
          <a
            href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
            target="_blank"
            rel="noopener noreferrer"
            className="gvg-btn-secondary"
            style={{ fontSize: "0.875rem", textDecoration: "none", display: "inline-block" }}
          >
            Book a free 30-minute diagnostic call
          </a>
        </div>
      </div>
    </section>
  );
}
