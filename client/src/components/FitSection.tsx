/* FitSection - GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Two columns: Good Fit / Not a Fit
   Checkmarks: Electric Blue / muted
   Ghost number: 08 */

import { useEffect, useRef } from "react";

const GOOD_FIT = [
  "You're spending $1M+ on paid media and questioning whether it's working",
  "You need someone to own the measurement and decision layer - not just report on it",
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
        padding: "7.5rem 0",
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "0.75rem",
            }}
          >
            I work with a small number of clients.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.65,
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
          {/* Good Fit - green tint */}
          <div
            className="gvg-fadeup"
            style={{
              background: "rgba(94,232,181,0.04)",
              border: "1px solid rgba(94,232,181,0.15)",
              borderRadius: "16px",
              padding: "40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5EE8B5", flexShrink: 0 }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#5EE8B5" }}>This is usually a fit if</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {GOOD_FIT.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: "#5EE8B5", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not a Fit - amber tint */}
          <div
            className="gvg-fadeup"
            style={{
              transitionDelay: "100ms",
              background: "rgba(255,171,64,0.04)",
              border: "1px solid rgba(255,171,64,0.15)",
              borderRadius: "16px",
              padding: "40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FFAB40", flexShrink: 0 }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#FFAB40" }}>Probably not the right fit if</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {NOT_FIT.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: "#FFAB40", fontFamily: "'IBM Plex Mono', monospace", fontSize: "14px", lineHeight: 1.6, flexShrink: 0 }}>✕</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
