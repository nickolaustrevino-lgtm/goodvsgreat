/* FitSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Two columns: Good Fit / Not a Fit
   Checkmarks: Electric Blue / muted
   Ghost number: 08 */

import { useEffect, useRef } from "react";

const GOOD_FIT = [
  "You're spending $1M+ on paid media and questioning whether it's working",
  "You need someone to own the measurement and decision layer — not just report on it",
  "You're scaling fast and want to build the right infrastructure before you waste more",
  "You want a strategic partner who can work with your existing team, not replace them",
  "You need to improve how media performance is communicated to leadership",
];

const NOT_FIT = [
  "You need someone to manage day-to-day campaign execution",
  "You're looking for a traditional media agency with account managers and creative teams",
  "You want someone to run your social media or content calendar",
  "You're not ready to question your current attribution model or measurement approach",
];

export default function FitSection() {
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

  return (
    <section
      id="fit"
      ref={ref}
      style={{
        backgroundColor: "oklch(16% 0.005 285)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">08</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <span className="gvg-section-label">For Teams Spending Real Money</span>
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
            I work with a small number of clients.
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "540px",
            }}
          >
            That's intentional. Here's how to know if we're a good match.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Good Fit */}
          <div
            className="gvg-fadeup gvg-card"
            style={{ borderTopColor: "#2979FF" }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#2979FF",
                marginBottom: "1.5rem",
              }}
            >
              This Is Usually a Fit If
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {GOOD_FIT.map((item, i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      color: "#2979FF",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "0.9375rem",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not a Fit */}
          <div
            className="gvg-fadeup gvg-card"
            style={{ transitionDelay: "100ms", borderTopColor: "rgba(255,255,255,0.12)" }}
          >
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "1.5rem",
              }}
            >
              Probably Not the Right Fit If
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {NOT_FIT.map((item, i) => (
                <li
                  key={i}
                  style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.2)",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "0.9375rem",
                      color: "rgba(255,255,255,0.35)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
