/* BookingSection - GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Form: dark surface, Electric Blue focus borders
   CTA: Electric Blue primary button
   Ghost number: 10 */

import { useEffect, useRef, useState } from "react";
import DotMatrixCanvas from "./DotMatrixCanvas";
import { trackEvent, sha256 } from "../lib/pixel";

const SPEND_OPTIONS = [
  "Under $1M annually",
  "$1M - $5M annually",
  "$5M - $20M annually",
  "$20M - $50M annually",
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

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    org: "",
    spend: "",
    challenge: "",
    details: "",
  });

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

  const BOOKING_CALENDAR_URL = "https://calendar.app.google/b3ctixpS5tVRxYVJ9";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Hash identity fields client-side before sending to server (Meta spec: SHA-256, lowercase, trimmed)
    const [hashedEmail, hashedFirstName, hashedLastName] = await Promise.all([
      form.email    ? sha256(form.email)     : Promise.resolve(undefined),
      form.firstName ? sha256(form.firstName) : Promise.resolve(undefined),
      form.lastName  ? sha256(form.lastName)  : Promise.resolve(undefined),
    ]);

    // Fire Meta Pixel Lead event + server-side CAPI with hashed identity
    trackEvent(
      "Lead",
      { content_name: "Booking Form Submission" },
      {
        hashedEmail:     hashedEmail     ?? undefined,
        hashedFirstName: hashedFirstName ?? undefined,
        hashedLastName:  hashedLastName  ?? undefined,
      }
    );

    // After form submission, open the calendar in a new tab so user can pick a time
    setTimeout(() => {
      window.open(BOOKING_CALENDAR_URL, "_blank", "noopener,noreferrer");
    }, 800);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#1A1A2E",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "0.875rem 1rem",
    fontFamily: "'Inter', sans-serif",
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

  const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#2979FF";
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
  };

  return (
    <section
      id="booking"
      ref={ref}
      style={{
        backgroundColor: "#141A33",
        padding: "clamp(5rem, 10vw, 10rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot-matrix parallax background */}
      <DotMatrixCanvas opacity={0.3} parallaxFactor={0.2} />

      <span className="gvg-ghost-number">10</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div
          className="booking-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "clamp(2.5rem, 5vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* Left: copy */}
          <div className="gvg-fadeup">
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.16em", color: "#2F6FFF", opacity: 0.8, marginBottom: "16px" }}>
              BOOK A CALL
            </p>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(28px, 3.5vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Book a free{" "}
              <span style={{ color: "#2979FF" }}>30-minute diagnostic call.</span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.65,
                marginBottom: "40px",
              }}
            >
              I take on a small number of engagements at a time. If your media spend is $1M+ annually and you're not fully confident it's working as hard as it should, book 30 minutes and I'll give you a straight answer.
            </p>

            {/* 4-step process */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
              {[
                { step: "01", label: "Fill in the form", desc: "Your answers help me prepare a relevant diagnosis before we talk." },
                { step: "02", label: "I review your setup", desc: "I'll look at your current measurement stack and spend allocation." },
                { step: "03", label: "30-minute call", desc: "No sales pitch - just a straight read on what's working and what isn't." },
                { step: "04", label: "You leave with clarity", desc: "At minimum, one actionable observation you can act on immediately." },
              ].map((s, idx) => (
                <div key={idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "#2F6FFF", fontWeight: 600, flexShrink: 0, paddingTop: "2px", minWidth: "24px" }}>{s.step}</span>
                  <div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 600, color: "rgba(255,255,255,0.9)", margin: "0 0 4px" }}>{s.label}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="gvg-fadeup" style={{ transitionDelay: "120ms" }}>
            {submitted ? (
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
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "1.2rem",
                    color: "#FFFFFF",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
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
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.65,
                  }}
                >
                  I'll review your details and follow up to confirm a time. Expect a response within 24 hours.
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
                {/* First name + Last name side by side */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      style={inputStyle}
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      style={inputStyle}
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  </div>
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
                    onFocus={focusOn}
                    onBlur={focusOff}
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
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </div>

                {/* Annual spend */}
                <div>
                  <label style={labelStyle}>Annual Media Spend</label>
                  <select
                    required
                    value={form.spend}
                    onChange={(e) => setForm({ ...form, spend: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  >
                    <option value="" disabled style={{ backgroundColor: "#1A1A2E" }}>Select range</option>
                    {SPEND_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: "#1A1A2E" }}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Primary challenge */}
                <div>
                  <label style={labelStyle}>Primary Challenge</label>
                  <select
                    required
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  >
                    <option value="" disabled style={{ backgroundColor: "#1A1A2E" }}>Select area</option>
                    {CHALLENGE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: "#1A1A2E" }}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Optional details */}
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
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </div>

                <button
                  type="submit"
                  className="gvg-btn-primary"
                  style={{ width: "100%", marginTop: "0.5rem", justifyContent: "center" }}
                >
                  Submit & Book a Time →
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
                  I'll respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .booking-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .booking-name-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
