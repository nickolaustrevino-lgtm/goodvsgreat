/* BookingSection — GvG Dark Editorial Intelligence
   Deep Navy background. Multi-step form with Electric Blue accents. */
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
      className="relative overflow-hidden"
      style={{ backgroundColor: "#111120", padding: "6rem 0" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663601301359/Zm5tL57jf4wPW4KuoqDKLS/gvg-pattern-bg-RzjKmotHrcSGXqvDyqJ5bf.webp)`,
          backgroundSize: "400px 400px",
          opacity: 0.3,
        }}
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(17,17,32,0.95) 0%, rgba(17,17,32,0.85) 100%)" }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <div className="fade-up mb-5">
              <span className="section-label">Book a Free 30-Minute Diagnostic</span>
            </div>
            <h2 className="fade-up delay-100 section-heading mb-6">
              If you've read this far,<br />
              we should probably talk.
            </h2>
            <p className="fade-up delay-200" style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              marginBottom: "2.5rem",
            }}>
              I take on a small number of engagements at a time. If your media spend is $1M+ annually and you're not fully confident it's working as hard as it should, book 30 minutes and I'll give you a straight answer.
            </p>

            <p className="fade-up delay-200" style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "3rem",
              fontStyle: "italic",
            }}>
              No pitch. No deck. Just a straight answer.
            </p>

            {/* Steps */}
            <div className="fade-up delay-300 flex flex-col gap-5">
              {[
                "Fill in the form — your answers help me prepare",
                "Copy your summary and paste it into the booking notes",
                "Pick a time on my calendar",
                "30 minutes, no sales pitch — just a straight diagnosis",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#2979FF",
                    minWidth: "1.5rem",
                    paddingTop: "0.1rem",
                  }}>
                    0{i + 1}
                  </span>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.6)",
                  }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="fade-up delay-200">
            {submitted ? (
              <div style={{
                backgroundColor: "rgba(41,121,255,0.08)",
                border: "1px solid rgba(41,121,255,0.3)",
                padding: "3rem",
                textAlign: "center",
              }}>
                <div style={{
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
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "1rem",
                }}>
                  Got it. Talk soon.
                </h3>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                }}>
                  I'll review your details and follow up to confirm a time. Expect a response within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Name */}
                <div>
                  <label style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}>
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
                  <label style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}>
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
                  <label style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}>
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
                    <span style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(255,255,255,0.4)",
                      pointerEvents: "none",
                      fontSize: "0.75rem",
                    }}>
                      ▾
                    </span>
                  </div>
                </div>

                {/* Primary challenge */}
                <div>
                  <label style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}>
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
                    <span style={{
                      position: "absolute",
                      right: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "rgba(255,255,255,0.4)",
                      pointerEvents: "none",
                      fontSize: "0.75rem",
                    }}>
                      ▾
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <label style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}>
                    Anything else I should know? <span style={{ color: "rgba(255,255,255,0.2)" }}>(optional)</span>
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

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
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
