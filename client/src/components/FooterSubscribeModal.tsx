import React, { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";

interface FooterSubscribeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FooterSubscribeModal({ open, onOpenChange }: FooterSubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setAlreadySubscribed(false);
      setErrorMessage("");
    }
  }, [open]);

  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: (data) => {
      setSubmitted(true);
      setAlreadySubscribed(data.alreadySubscribed);
    },
    onError: (error) => setErrorMessage(error.message || "Unable to subscribe right now. Please try again."),
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setErrorMessage("");
    subscribe.mutate({
      email: email.trim(),
      name: name.trim() || undefined,
      source: "footer-modal",
      baseUrl: window.location.origin,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-0 p-0"
        style={{
          width: "min(calc(100% - 2rem), 520px)",
          maxWidth: "520px",
          background: "#111827",
          border: "1px solid rgba(107,145,255,0.24)",
          borderRadius: "16px",
          color: "#fff",
          boxShadow: "0 32px 100px rgba(0,0,0,0.6)",
          overflow: "hidden",
        }}
      >
        <div style={{ height: "3px", background: "linear-gradient(90deg, #2979FF, #8C6CFF)" }} />
        <div style={{ padding: "clamp(1.5rem, 5vw, 2.5rem)" }}>
          <p style={{ margin: "0 0 0.85rem", fontFamily: MONO, color: "#8CB6FF", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.14em" }}>
            The Media Decision Letter
          </p>
          <DialogTitle style={{ fontFamily: SANS, color: "#fff", fontSize: "clamp(1.55rem, 5vw, 2.25rem)", lineHeight: 1.12, letterSpacing: "-0.035em", margin: 0 }}>
            Strategic notes on media effectiveness, measurement systems, AI, and growth.
          </DialogTitle>
          <DialogDescription style={{ color: "rgba(255,255,255,0.62)", fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.7, margin: "1rem 0 1.75rem" }}>
            No cadence promises. Only when there is something worth saying.
          </DialogDescription>

          {submitted ? (
            <div style={{ padding: "1rem 0 0.2rem" }}>
              <p style={{ margin: 0, color: alreadySubscribed ? "#9BBEFF" : "#7CF0BB", fontFamily: SANS, fontWeight: 650, lineHeight: 1.55 }}>
                {alreadySubscribed ? "You are already confirmed on the list." : `Check ${email} to confirm your subscription.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="First name (optional)"
                disabled={subscribe.isPending}
                style={{ width: "100%", height: "50px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.045)", color: "#fff", padding: "0 0.95rem", fontFamily: SANS, fontSize: "0.95rem", outline: "none" }}
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                required
                disabled={subscribe.isPending}
                style={{ width: "100%", height: "50px", boxSizing: "border-box", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.045)", color: "#fff", padding: "0 0.95rem", fontFamily: SANS, fontSize: "0.95rem", outline: "none" }}
              />
              <button
                type="submit"
                disabled={subscribe.isPending || !email.trim()}
                style={{ height: "50px", border: 0, borderRadius: "8px", background: BLUE, color: "#fff", cursor: subscribe.isPending ? "wait" : "pointer", fontFamily: MONO, fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: !email.trim() ? 0.55 : 1 }}
              >
                {subscribe.isPending ? "Subscribing..." : "Subscribe"}
              </button>
              {errorMessage && <p style={{ margin: "0.25rem 0 0", color: "#FCA5A5", fontFamily: SANS, fontSize: "0.84rem", lineHeight: 1.5 }}>{errorMessage}</p>}
            </form>
          )}
          <p style={{ margin: "1.15rem 0 0", color: "rgba(255,255,255,0.34)", fontFamily: MONO, fontSize: "0.58rem", lineHeight: 1.6, letterSpacing: "0.04em" }}>No spam. Unsubscribe any time. Your email is never shared.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
