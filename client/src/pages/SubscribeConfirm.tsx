/* =====================================================
   PUBLIC — Subscription Confirmation  /subscribe/confirm?token=xxx
   GvG Design System v4 · Dark Editorial Intelligence
   ===================================================== */
import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const GREEN = "#4ADE80";
const RED = "#F87171";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";
const BG = "oklch(16% 0.005 285)";

type State = "loading" | "success" | "already" | "error";

export default function SubscribeConfirm() {
  const [state, setState] = useState<State>("loading");
  const [message, setMessage] = useState("");

  const confirmMutation = trpc.subscribers.confirm.useMutation({
    onSuccess: (data) => {
      if (data.success && data.alreadyConfirmed) {
        setState("already");
      } else if (data.success) {
        setState("success");
      } else {
        setState("error");
        setMessage(data.message ?? "Something went wrong.");
      }
    },
    onError: (err) => {
      setState("error");
      setMessage(err.message);
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      setState("error");
      setMessage("No confirmation token found. Please use the link from your email.");
      return;
    }
    confirmMutation.mutate({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", fontFamily: SANS, display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>Good vs. Great</Link>
        <span style={{ color: BORDER }}>|</span>
        <Link href="/writing" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>Writing</Link>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>

          {state === "loading" && (
            <>
              <div style={{ fontFamily: MONO, fontSize: "2rem", marginBottom: "1.5rem", opacity: 0.4 }}>⟳</div>
              <p style={{ fontFamily: MONO, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>Confirming your subscription…</p>
            </>
          )}

          {state === "success" && (
            <>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: `1px solid rgba(74,222,128,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.5rem" }}>✓</div>
              <h1 style={{ fontFamily: MONO, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: GREEN, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                You're confirmed.
              </h1>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: "2.5rem" }}>
                You're on the list. You'll get new writing on paid media, measurement, and AI directly in your inbox.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/writing" style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", background: BLUE, color: "#fff", padding: "0.65rem 1.5rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>
                  Read the latest →
                </Link>
                <Link href="/" style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, border: `1px solid ${BORDER}`, padding: "0.65rem 1.5rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>
                  Back to home
                </Link>
              </div>
            </>
          )}

          {state === "already" && (
            <>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(41,121,255,0.12)", border: `1px solid rgba(41,121,255,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.5rem" }}>✓</div>
              <h1 style={{ fontFamily: MONO, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: BLUE, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Already confirmed.
              </h1>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: "2.5rem" }}>
                You're already on the list — no action needed.
              </p>
              <Link href="/writing" style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", background: BLUE, color: "#fff", padding: "0.65rem 1.5rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>
                Read the latest →
              </Link>
            </>
          )}

          {state === "error" && (
            <>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(248,113,113,0.12)", border: `1px solid rgba(248,113,113,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.5rem" }}>✕</div>
              <h1 style={{ fontFamily: MONO, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: RED, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Link expired or invalid.
              </h1>
              <p style={{ fontFamily: SANS, fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                {message || "This confirmation link is no longer valid."}
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: DIM, marginBottom: "2.5rem" }}>
                You can subscribe again from any article on the blog.
              </p>
              <Link href="/writing" style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: BLUE, border: `1px solid rgba(41,121,255,0.4)`, padding: "0.65rem 1.5rem", borderRadius: "8px", textDecoration: "none", display: "inline-block" }}>
                Go to Writing →
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
