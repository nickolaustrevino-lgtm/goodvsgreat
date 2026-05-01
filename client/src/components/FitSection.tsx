/* FitSection — GvG Dark Editorial Intelligence
   Deep Navy background. Two-column fit/no-fit checklist. */

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
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1A1A2E", padding: "6rem 0" }}
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
        06
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-14 max-w-xl">
          <div className="fade-up mb-5">
            <span className="section-label">For Teams Spending Real Money and Asking Harder Questions</span>
          </div>
          <h2 className="fade-up delay-100 section-heading">
            Is this a fit?
          </h2>
          <p className="fade-up delay-200 mt-4" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.55)",
          }}>
            Good vs. Great is built for companies that already have campaigns running, agencies in place, dashboards everywhere, and still don't feel fully confident in what's actually driving growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Good fit */}
          <div className="fade-up delay-100" style={{
            backgroundColor: "rgba(41,121,255,0.05)",
            border: "1px solid rgba(41,121,255,0.2)",
            padding: "2.5rem",
          }}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#2979FF",
              marginBottom: "1.5rem",
            }}>
              This Is Usually a Fit If
            </p>
            <div className="flex flex-col gap-4">
              {fitItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.8rem",
                    color: "#2979FF",
                    marginTop: "0.1rem",
                    flexShrink: 0,
                  }}>
                    ✓
                  </span>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.75)",
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Not a fit */}
          <div className="fade-up delay-200" style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "2.5rem",
          }}>
            <p style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "1.5rem",
            }}>
              Probably Not the Right Fit If
            </p>
            <div className="flex flex-col gap-4">
              {noFitItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.25)",
                    marginTop: "0.1rem",
                    flexShrink: 0,
                  }}>
                    —
                  </span>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.35)",
                  }}>
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
