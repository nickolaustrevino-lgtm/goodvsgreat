/* FitSection — Good vs. Great Brand Guidelines Applied
   Background: Charcoal Dark (#2D2D2D) — dark section
   H2: Space Mono 700, 36px — white
   Body: IBM Plex Sans 400, 16px — white/muted
   Caption: IBM Plex Mono, Electric Blue
   Checkmarks: Electric Blue #2979FF
   Dashes: muted white */

const fitItems = [
  "You're spending at least $1M annually on paid media",
  "You suspect some channels are being over-credited",
  "You need better logic for budget allocation",
  "You want stronger answers for the CFO, CEO, or board",
  "You need strategic clarity before scaling further",
];

const noFitItems = [
  "You want low-cost execution",
  "You want channel management in isolation",
  "You want more reporting without better decisions",
];

export default function FitSection() {
  return (
    <section
      id="fit"
      style={{
        backgroundColor: "#2D2D2D",
        padding: "5rem 0",
      }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ marginBottom: "3rem", maxWidth: "640px" }}>
          <span className="gvg-caption gvg-section-label">
            For Teams Spending Real Money and Asking Harder Questions
          </span>
          <h2 className="gvg-h2" style={{ color: "#FFFFFF", marginBottom: "1.25rem" }}>
            Is this a fit?
          </h2>
          <p className="gvg-body" style={{ color: "rgba(255,255,255,0.65)" }}>
            Good vs Great is built for companies that already have campaigns running, agencies in place, dashboards everywhere, and still don't feel fully confident in what's actually driving growth.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Good fit */}
          <div
            style={{
              backgroundColor: "#1C1C1E",
              borderTop: "3px solid #2979FF",
              padding: "2.5rem",
            }}
          >
            <span
              className="gvg-caption"
              style={{
                color: "#2979FF",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              This Is Usually a Fit If
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {fitItems.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "1rem",
                      color: "#2979FF",
                      flexShrink: 0,
                      marginTop: "0.05rem",
                    }}
                  >
                    ✓
                  </span>
                  <p className="gvg-body" style={{ color: "rgba(255,255,255,0.75)" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Not a fit */}
          <div
            style={{
              backgroundColor: "#1C1C1E",
              borderTop: "3px solid rgba(255,255,255,0.1)",
              padding: "2.5rem",
            }}
          >
            <span
              className="gvg-caption"
              style={{
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              Probably Not the Right Fit If
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {noFitItems.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "1rem",
                      color: "rgba(255,255,255,0.25)",
                      flexShrink: 0,
                      marginTop: "0.05rem",
                    }}
                  >
                    —
                  </span>
                  <p className="gvg-body" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
