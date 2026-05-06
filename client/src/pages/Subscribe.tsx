/* =====================================================
   PUBLIC - Subscribe Landing Page  /subscribe
   GvG Design System v4 · Dark Editorial Intelligence
   ===================================================== */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const GREEN = "#4ADE80";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";
const BG = "oklch(16% 0.005 285)";

type State = "idle" | "loading" | "success" | "error";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const subscribeMutation = trpc.subscribers.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        setState("success");
      } else {
        setState("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    },
    onError: (err) => {
      setState("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    setErrorMsg("");
    subscribeMutation.mutate({ email: email.trim(), name: name.trim() || undefined, source: "subscribe-page" });
  };

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", fontFamily: SANS, display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>
          Good vs. Great
        </Link>
        <span style={{ color: BORDER }}>|</span>
        <Link href="/blog" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>
          Blog
        </Link>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "480px", width: "100%" }}>

          {state !== "success" && (
            <>
              {/* Eyebrow */}
              <p style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.14em", color: BLUE, marginBottom: "1.25rem", opacity: 0.85 }}>
                The Newsletter
              </p>

              {/* Heading */}
              <h1 style={{ fontFamily: SANS, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1rem" }}>
                Media systems. Attribution strategy. Growth decisions.
              </h1>

              {/* Subhead */}
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2.5rem" }}>
                Writing for founders and CMOs who want clarity on what their media is actually doing - not just what the dashboards say.
                No cadence promises. Only when there's something worth saying.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={state === "loading"}
                  style={{
                    width: "100%",
                    height: "52px",
                    padding: "0 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${BORDER}`,
                    borderRadius: "8px",
                    color: "#fff",
                    fontFamily: SANS,
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(41,121,255,0.5)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER; }}
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={state === "loading"}
                  style={{
                    width: "100%",
                    height: "52px",
                    padding: "0 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${BORDER}`,
                    borderRadius: "8px",
                    color: "#fff",
                    fontFamily: SANS,
                    fontSize: "15px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(41,121,255,0.5)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = BORDER; }}
                />
                <button
                  type="submit"
                  disabled={state === "loading" || !email.trim()}
                  style={{
                    height: "52px",
                    background: state === "loading" ? "rgba(41,121,255,0.6)" : BLUE,
                    color: "#fff",
                    fontFamily: MONO,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    border: "none",
                    borderRadius: "8px",
                    cursor: state === "loading" ? "not-allowed" : "pointer",
                    transition: "background 0.2s, opacity 0.2s",
                    opacity: !email.trim() ? 0.5 : 1,
                  }}
                >
                  {state === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {/* Error */}
              {state === "error" && (
                <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#F87171", marginTop: "12px", lineHeight: 1.5 }}>
                  {errorMsg}
                </p>
              )}

              {/* Fine print */}
              <p style={{ fontFamily: MONO, fontSize: "0.6rem", color: DIM, marginTop: "1.25rem", lineHeight: 1.6, letterSpacing: "0.04em" }}>
                No spam. Unsubscribe any time. Your email is never shared.
              </p>
            </>
          )}

          {state === "success" && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: "rgba(74,222,128,0.12)", border: `1px solid rgba(74,222,128,0.3)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem", fontSize: "1.5rem",
              }}>
                ✓
              </div>
              <h1 style={{ fontFamily: MONO, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: GREEN, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Check your inbox.
              </h1>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: "2.5rem" }}>
                A confirmation email is on its way to <strong style={{ color: "#fff" }}>{email}</strong>.
                Click the link inside to confirm your spot on the list.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  href="/blog"
                  style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", background: BLUE, color: "#fff", padding: "0.65rem 1.5rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}
                >
                  Read the blog -&gt;
                </Link>
                <Link
                  href="/"
                  style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, border: `1px solid ${BORDER}`, padding: "0.65rem 1.5rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}
                >
                  Back to home
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
