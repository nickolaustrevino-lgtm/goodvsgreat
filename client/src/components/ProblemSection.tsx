/* ProblemSection — GvG Dark Editorial Intelligence
   Off-white alternating section. Left-heavy editorial layout.
   Large pull quote in Space Mono. Ghost ordinal watermark. */

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="section-light relative overflow-hidden"
      style={{ padding: "6rem 0" }}
    >
      {/* Ghost ordinal */}
      <div className="absolute top-0 right-8 ghost-ordinal" style={{ color: "rgba(41,121,255,0.04)", fontSize: "clamp(8rem,18vw,16rem)" }}>
        01
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div>
            <div className="fade-up mb-6">
              <span className="section-label">The Problem I Solve</span>
            </div>
            <h2 className="fade-up delay-100 mb-8" style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "#1A1A2E",
            }}>
              Most companies don't have a channel problem.{" "}
              <span style={{ color: "#2979FF" }}>They have a decision problem.</span>
            </h2>

            <p className="fade-up delay-200 mb-6" style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#2D2D2D",
            }}>
              They have a Meta person, a Google person, a programmatic person — each optimizing their own lane, each reporting on their own metrics, and nobody fully owning the answer to the question leadership actually cares about:
            </p>

            {/* Pull quote */}
            <blockquote className="fade-up delay-300 my-8" style={{
              borderLeft: "3px solid #2979FF",
              paddingLeft: "1.5rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "1.05rem",
              fontStyle: "italic",
              color: "#1A1A2E",
              lineHeight: 1.5,
            }}>
              "Is this spend creating real business value?"
            </blockquote>

            <p className="fade-up delay-300" style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#2D2D2D",
            }}>
              That's where I come in. I operate as the strategic layer above the channel specialists. I build the measurement and operating infrastructure that connects media investment to commercial outcomes, so leadership can make better decisions about what to scale, what to cut, and what to trust.
            </p>
          </div>

          {/* Right column */}
          <div className="fade-up delay-200">
            <div style={{
              background: "#1A1A2E",
              padding: "2.5rem",
              borderLeft: "3px solid #2979FF",
            }}>
              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#2979FF",
                marginBottom: "1.5rem",
              }}>
                The Strategic Layer
              </p>

              {[
                { good: "Good reporting.", great: "Great decision logic." },
                { good: "Good channel coverage.", great: "Great budget governance." },
                { good: "Good attribution.", great: "Great incrementality." },
                { good: "Good dashboards.", great: "Great confidence." },
              ].map((row, i) => (
                <div key={i} className="mb-5 pb-5" style={{
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                }}>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: "0.25rem",
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255,255,255,0.2)",
                  }}>
                    {row.good}
                  </p>
                  <p style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}>
                    {row.great}
                  </p>
                </div>
              ))}

              <p style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.35)",
                marginTop: "1.5rem",
                fontStyle: "italic",
              }}>
                Not attribution theater. Not platform spin.<br />
                Better decision logic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
