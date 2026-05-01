/* BookingSection — Good vs. Great Brand Guidelines Applied
   Background: Charcoal Dark (#2D2D2D) — dark section
   H2: Space Mono 700, 36px — white
   Body: IBM Plex Sans 400, 16px — white/muted
   Caption: IBM Plex Mono, Electric Blue
   Form inputs: dark bg, white text, Electric Blue focus border
   CTA: Electric Blue primary button */
import { useState } from "react";

const spendOptions = [
  "Under $1M annually",
  "$1M – $5M annually",
  "$5M – $20M annually",
  "$20M – $50M annually",
  "$50M+ annually",
];

const challengeOptions = [
  "Measurement & Attribution",
  "Budget Allocation",
  "Channel Strategy",
  "Executive Reporting",
  "AI Workflow Integration",
  "Other",
];

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    spend: "",
    challenge: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="booking"
      style={{
        backgroundColor: "#2D2D2D",
        padding: "5rem 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* Left — copy */}
          <div>
            <span className="gvg-caption gvg-section-label">
              Book a Free 30-Minute Diagnostic
            </span>
            <h2 className="gvg-h2" style={{ color: "#FFFFFF", marginBottom: "1.5rem" }}>
              If you've read this far, we should probably talk.
            </h2>
            <p className="gvg-body" style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1rem" }}>
              I take on a small number of engagements at a time. If your media spend is $1M+ annually and you're not fully confident it's working as hard as it should, book 30 minutes and I'll give you a straight answer.
            </p>
            <p
              className="gvg-caption"
              style={{
                color: "rgba(255,255,255,0.35)",
                fontStyle: "italic",
                marginBottom: "2.5rem",
                letterSpacing: "0.04em",
              }}
            >
              No pitch. No deck. Just a straight answer.
            </p>

            {/* Steps */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <span
                className="gvg-caption"
                style={{ color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em" }}
              >
                What Happens Next
              </span>
              {[
                "Fill in the form — your answers help me prepare",
                "Copy your summary and paste it into the booking notes",
                "Pick a time on my calendar",
                "30 minutes, no sales pitch — just a straight diagnosis",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#2979FF",
                      flexShrink: 0,
                      paddingTop: "0.1rem",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <p className="gvg-body" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div
                style={{
                  backgroundColor: "#1C1C1E",
                  borderTop: "3px solid #2979FF",
                  padding: "3rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "#2979FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "1.2rem",
                    color: "#FFFFFF",
                  }}
                >
                  ✓
                </div>
                <h3 className="gvg-h3" style={{ color: "#FFFFFF", marginBottom: "1rem" }}>
                  Got it. Talk soon.
                </h3>
                <p className="gvg-body" style={{ color: "rgba(255,255,255,0.55)" }}>
                  I'll review your details and follow up to confirm a time. Expect a response within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              >
                {/* Name */}
                <div>
                  <label
                    className="gvg-caption"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="gvg-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Organization */}
                <div>
                  <label
                    className="gvg-caption"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Company name"
                    className="gvg-input"
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  />
                </div>

                {/* Annual spend */}
                <div>
                  <label
                    className="gvg-caption"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Annual Media Spend
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      required
                      className="gvg-select"
                      value={formData.spend}
                      onChange={(e) => setFormData({ ...formData, spend: e.target.value })}
                    >
                      <option value="" disabled>Select range</option>
                      {spendOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(255,255,255,0.4)",
                        pointerEvents: "none",
                        fontSize: "0.75rem",
                      }}
                    >
                      ▾
                    </span>
                  </div>
                </div>

                {/* Primary challenge */}
                <div>
                  <label
                    className="gvg-caption"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Primary Challenge
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      required
                      className="gvg-select"
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    >
                      <option value="" disabled>Select area</option>
                      {challengeOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(255,255,255,0.4)",
                        pointerEvents: "none",
                        fontSize: "0.75rem",
                      }}
                    >
                      ▾
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label
                    className="gvg-caption"
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Anything else I should know?{" "}
                    <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Brief context on your situation..."
                    className="gvg-input"
                    style={{ resize: "vertical" }}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="gvg-btn-primary"
                  style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                >
                  Submit & Book a Time →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
