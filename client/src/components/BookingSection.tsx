/* BookingSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Form: submits to Formspree → nick@goodvsgreat.ai
   CTA: Electric Blue primary button
   Ghost number: 10 */

import { useRef, useState } from "react";

const SPEND_OPTIONS = [
  "Under $1M annually",
  "$1M – $5M annually",
  "$5M – $20M annually",
  "$20M – $50M annually",
  "$50M+ annually",
];

const CHALLENGE_OPTIONS = [
  "Measurement & Attribution",
  "Budget Allocation",
  "Channel Strategy",
  "Executive Reporting",
  "AI Workflow Integration",
  "Other",
];

// Formspree endpoint — uses nick@goodvsgreat.ai as the recipient.
// After first submission, Formspree will send a confirmation email to nick@goodvsgreat.ai
// to activate the form. Replace the endpoint ID below with your own from formspree.io if needed.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwzgvqn";

type Status = "idle" | "loading" | "success" | "error";

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    spend: "",
    challenge: "",
    details: "",
  });

  const BOOKING_URL = "https://calendar.app.google/b3ctixpS5tVRxYVJ9";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organization: form.org,
          annual_media_spend: form.spend,
          primary_challenge: form.challenge,
          additional_details: form.details || "(none)",
          _subject: `New inquiry from ${form.name} — ${form.org}`,
          _replyto: form.email,
        }),
      });

      if (res.ok) {
        setStatus("success");
        // Open the booking calendar in a new tab after successful submission
        setTimeout(() => {
          window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
        }, 1200);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          (data as { error?: string }).error ||
            "Something went wrong. Please try again or email nick@goodvsgreat.ai directly."
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg(
        "Network error. Please check your connection or email nick@goodvsgreat.ai directly."
      );
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#1A1A2E",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "0.875rem 1rem",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "0.9375rem",
    color: "#FFFFFF",
    outline: "none",
    transition: "border-color 0.15s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.4)",
    display: "block",
    marginBottom: "0.5rem",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#2979FF";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
  };

  return (
    <section
      id="booking"
      ref={ref}
      style={{
        backgroundColor: "oklch(16% 0.005 285)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">10</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="booking-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left: copy */}
          <div className="gvg-fadeup">
            <span className="gvg-section-label">Start Here</span>
            <span className="gvg-divider" />
            <h2
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                marginBottom: "1.5rem",
              }}
            >
              Book a free{" "}
              <span style={{ color: "#2979FF" }}>30-minute diagnostic call.</span>
            </h2>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              I take on a small number of engagements at a time. If your media spend is $1M+ annually and you're not fully confident it's working as hard as it should, book 30 minutes and I'll give you a straight answer.
            </p>

            <div
              style={{
                borderLeft: "2px solid #2979FF",
                paddingLeft: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {[
                "Fill in the form — your answers help me prepare",
                "I'll review your current setup before we talk",
                "30 minutes, no sales pitch — just a straight diagnosis",
                "You'll leave with at least one actionable observation",
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#2979FF",
                      flexShrink: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "0.9375rem",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="gvg-fadeup" style={{ transitionDelay: "120ms" }}>
            {status === "success" ? (
              <div
                style={{
                  backgroundColor: "#252530",
                  border: "1px solid rgba(41,121,255,0.3)",
                  borderTop: "2px solid #2979FF",
                  padding: "3rem 2rem",
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
                <h3
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "0.875rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Got it. Talk soon.
                </h3>
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}
                >
                  Your message has been sent to nick@goodvsgreat.ai. Opening the calendar so you can pick a time — or{" "}
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2979FF", textDecoration: "none" }}
                  >
                    click here
                  </a>{" "}
                  if it didn't open automatically.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: "#252530",
                  border: "1px solid rgba(255,255,255,0.09)",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                {/* Name */}
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Organization */}
                <div>
                  <label style={labelStyle}>Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="Company name"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Spend */}
                <div>
                  <label style={labelStyle}>Annual Media Spend</label>
                  <select
                    required
                    value={form.spend}
                    onChange={(e) => setForm({ ...form, spend: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  >
                    <option value="" disabled style={{ backgroundColor: "#1A1A2E" }}>Select range</option>
                    {SPEND_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: "#1A1A2E" }}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Challenge */}
                <div>
                  <label style={labelStyle}>Primary Challenge</label>
                  <select
                    required
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  >
                    <option value="" disabled style={{ backgroundColor: "#1A1A2E" }}>Select area</option>
                    {CHALLENGE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: "#1A1A2E" }}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Details */}
                <div>
                  <label style={labelStyle}>
                    Anything else I should know?{" "}
                    <span style={{ color: "rgba(255,255,255,0.2)", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Brief context on your situation..."
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <p
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: "0.875rem",
                      color: "#ff6b6b",
                      margin: 0,
                      padding: "0.75rem 1rem",
                      backgroundColor: "rgba(255,107,107,0.1)",
                      border: "1px solid rgba(255,107,107,0.3)",
                    }}
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="gvg-btn-primary"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "0.5rem",
                    opacity: status === "loading" ? 0.7 : 1,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                  }}
                >
                  {status === "loading" ? "Sending..." : "Submit & Book a Time →"}
                </button>

                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.25)",
                    textAlign: "center",
                    letterSpacing: "0.06em",
                    margin: 0,
                  }}
                >
                  I'll respond within 24 hours. Your info is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
