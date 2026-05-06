/* =====================================================
   SubscribeCTA - email capture block for blog posts
   GvG Design System v4 · Dark Editorial Intelligence
   ===================================================== */
import { useState } from "react";
import { trpc } from "@/lib/trpc";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.45)";

interface SubscribeCTAProps {
  /** Pass the post slug so the source field records where the subscriber came from */
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
    subscribe.mutate({ email: email.trim(), name: name.trim() || undefined, source });
  };

  return (
    <div
      style={{
        marginTop: "4rem",
        padding: "2.5rem",
        border: `1px solid ${BORDER}`,
        borderRadius: "12px",
        background: "rgba(41,121,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${BLUE}, transparent)`,
        }}
      />

      {submitted ? (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: BLUE,
              marginBottom: "0.75rem",
            }}
          >
            {alreadySubscribed ? "Already subscribed" : "✓ Subscribed"}
          </div>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: "#fff", lineHeight: 1.6, margin: 0 }}>
            {alreadySubscribed
              ? "You're already on the list. We'll be in touch."
              : "You're in. Expect frameworks, case studies, and perspectives on what separates good media from great media."}
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div style={{ marginBottom: "1.75rem" }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: BLUE,
                display: "block",
                marginBottom: "0.6rem",
              }}
            >
              Good vs. Great · Writing
            </span>
            <h3
              style={{
                fontFamily: MONO,
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.25,
                margin: "0 0 0.6rem",
              }}
            >
              Get the next piece in your inbox.
            </h3>
            <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: DIM, lineHeight: 1.65, margin: 0 }}>
              Frameworks and case studies on measurement, attribution, and AI-era media strategy - no noise, no cadence pressure.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              type="text"
              placeholder="First name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${BORDER}`,
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                fontFamily: SANS,
                fontSize: "0.9rem",
                color: "#fff",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: "1 1 200px",
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${BORDER}`,
                  borderRadius: "8px",
                  padding: "0.75rem 1rem",
                  fontFamily: SANS,
                  fontSize: "0.9rem",
                  color: "#fff",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="submit"
                disabled={subscribe.isPending || !email.trim()}
                style={{
                  flex: "0 0 auto",
                  background: subscribe.isPending || !email.trim() ? "rgba(41,121,255,0.4)" : BLUE,
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.75rem 1.5rem",
                  fontFamily: MONO,
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: subscribe.isPending || !email.trim() ? "not-allowed" : "pointer",
                  transition: "background 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {subscribe.isPending ? "Subscribing…" : "Subscribe →"}
              </button>
            </div>
            {subscribe.isError && (
              <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "#ff6b6b", margin: 0 }}>
                Something went wrong. Please try again.
              </p>
            )}
            <p style={{ fontFamily: SANS, fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", margin: 0 }}>
              No spam. Unsubscribe any time.
            </p>
          </form>
        </>
      )}
    </div>
  );
}
