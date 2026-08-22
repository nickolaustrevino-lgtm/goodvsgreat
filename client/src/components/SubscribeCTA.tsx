/* =====================================================
   SubscribeCTA - editorial email capture for blog posts
   ===================================================== */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.11)";
const DIM = "rgba(255,255,255,0.62)";

interface SubscribeCTAProps {
  source?: string;
}

export default function SubscribeCTA({ source = "blog" }: SubscribeCTAProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setAlreadySubscribed(data.alreadySubscribed);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    subscribe.mutate({
      email: email.trim(),
      name: name.trim() || undefined,
      source,
      baseUrl: window.location.origin,
    });
  };

  const inputStyle: React.CSSProperties = {
    minHeight: "52px",
    background: "rgba(6,13,30,0.48)",
    border: `1px solid ${BORDER}`,
    borderRadius: "9px",
    padding: "0 1rem",
    fontFamily: SANS,
    fontSize: "0.95rem",
    color: "#fff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <section
      aria-label="Subscribe to the Media Decision Letter"
      className="article-subscribe"
      style={{
        marginTop: "5.5rem",
        padding: "clamp(1.65rem, 4vw, 2.6rem)",
        border: `1px solid ${BORDER}`,
        borderRadius: "16px",
        background: "radial-gradient(circle at 90% 0%, rgba(41,121,255,0.16), transparent 38%), linear-gradient(135deg, rgba(41,121,255,0.10), rgba(255,255,255,0.025))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "96px", height: "3px", background: `linear-gradient(90deg, ${BLUE}, #8C6CFF)` }} />

      {submitted ? (
        <div style={{ textAlign: "center", padding: "1.25rem 0" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.13em", color: "#9BBEFF", marginBottom: "0.9rem" }}>
            {alreadySubscribed ? "Already subscribed" : "✓ You are subscribed"}
          </div>
          <p style={{ fontFamily: SANS, fontSize: "1.05rem", color: "#fff", lineHeight: 1.65, margin: 0 }}>
            {alreadySubscribed ? "You are already on the list. We will be in touch." : "You are in. Expect practical notes on media effectiveness, measurement systems, AI, and growth."}
          </p>
        </div>
      ) : (
        <>
          <div style={{ maxWidth: "540px", marginBottom: "1.8rem" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.13em", color: "#9BBEFF", display: "block", marginBottom: "0.75rem" }}>
              The Media Decision Letter
            </span>
            <h3 style={{ fontFamily: SANS, fontSize: "clamp(1.35rem, 3vw, 1.7rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, margin: "0 0 0.7rem" }}>
              Get the next strategic note in your inbox.
            </h3>
            <p style={{ fontFamily: SANS, fontSize: "1rem", color: DIM, lineHeight: 1.65, margin: 0 }}>
              Clear thinking on measurement, attribution, AI, and the systems behind sustainable growth. No noise. No cadence pressure.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.7fr) minmax(0, 1fr) auto", gap: "0.75rem", alignItems: "end" }}>
            <label style={{ minWidth: 0 }}>
              <span style={{ display: "block", marginBottom: "0.45rem", fontFamily: MONO, fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>First name</span>
              <input type="text" placeholder="Optional" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            </label>
            <label style={{ minWidth: 0 }}>
              <span style={{ display: "block", marginBottom: "0.45rem", fontFamily: MONO, fontSize: "0.6rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Email address</span>
              <input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            </label>
            <button
              type="submit"
              disabled={subscribe.isPending || !email.trim()}
              style={{ minHeight: "52px", padding: "0 1.35rem", background: subscribe.isPending || !email.trim() ? "rgba(41,121,255,0.42)" : BLUE, color: "#fff", border: "none", borderRadius: "9px", fontFamily: MONO, fontSize: "0.66rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", cursor: subscribe.isPending || !email.trim() ? "not-allowed" : "pointer", boxShadow: "0 10px 26px rgba(41,121,255,0.18)", whiteSpace: "nowrap" }}
            >
              {subscribe.isPending ? "Subscribing…" : "Subscribe →"}
            </button>
          </form>
          {subscribe.isError && <p style={{ fontFamily: SANS, fontSize: "0.84rem", color: "#ff8181", margin: "0.9rem 0 0" }}>Something went wrong. Please try again.</p>}
          <p style={{ fontFamily: SANS, fontSize: "0.76rem", color: "rgba(255,255,255,0.38)", margin: "1rem 0 0" }}>No spam. Unsubscribe any time.</p>
        </>
      )}

      <style>{`@media (max-width: 680px) { .article-subscribe form { grid-template-columns: 1fr !important; } .article-subscribe button { width: 100%; } }`}</style>
    </section>
  );
}
