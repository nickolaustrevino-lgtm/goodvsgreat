/* ProblemSection — Good vs. Great Brand Guidelines Applied
   Background: Charcoal Dark (#2D2D2D) — dark section
   H2: Space Mono 700, 36px
   Body: IBM Plex Sans 400, 16px — white on dark
   Caption label: IBM Plex Mono, Electric Blue
   Quote: IBM Plex Sans italic, bordered left with Electric Blue */

export default function ProblemSection() {
  return (
    <section
      id="problem"
      style={{
        backgroundColor: "#2D2D2D",
        padding: "5rem 0",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "800px" }}>

          {/* Caption label */}
          <span className="gvg-caption gvg-section-label">
            The Problem I Solve
          </span>

          {/* H2 — Space Mono 700, 36px */}
          <h2
            className="gvg-h2"
            style={{
              color: "#FFFFFF",
              marginBottom: "2rem",
            }}
          >
            Most companies don't have a channel problem.{" "}
            They have a decision problem.
          </h2>

          {/* Body — IBM Plex Sans 400, 16px */}
          <p
            className="gvg-body"
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: "1.5rem" }}
          >
            They have a Meta person, a Google person, a programmatic person — each optimizing their own lane, each reporting on their own metrics, and nobody fully owning the answer to the question leadership actually cares about:
          </p>

          {/* Pull quote — IBM Plex Sans italic, Electric Blue left border */}
          <blockquote
            style={{
              borderLeft: "3px solid #2979FF",
              paddingLeft: "1.5rem",
              margin: "2rem 0",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1.125rem",
              fontStyle: "italic",
              color: "#FFFFFF",
              lineHeight: 1.5,
            }}
          >
            "Is this spend creating real business value?"
          </blockquote>

          <p
            className="gvg-body"
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: "1.5rem" }}
          >
            That's where I come in.
          </p>

          <p
            className="gvg-body"
            style={{ color: "rgba(255,255,255,0.75)", marginBottom: "1.5rem" }}
          >
            I operate as the strategic layer above the channel specialists. I build the measurement and operating infrastructure that connects media investment to commercial outcomes, so leadership can make better decisions about what to scale, what to cut, and what to trust.
          </p>

          {/* Closing line — IBM Plex Mono caption */}
          <p
            className="gvg-caption"
            style={{
              color: "rgba(255,255,255,0.45)",
              fontStyle: "italic",
              letterSpacing: "0.04em",
            }}
          >
            Not attribution theater. Not platform spin. Better decision logic.
          </p>
        </div>
      </div>
    </section>
  );
}
