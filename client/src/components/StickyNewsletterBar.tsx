/* StickyNewsletterBar — GvG Brand Guidelines v2
   Desktop only (hidden on mobile)
   Appears after user scrolls past Section 02 (problem section)
   Dismissible — sets localStorage flag so it doesn't reappear in the same session
   Left: offer copy  Right: email input + "Get it" button + × close */

import { useState, useEffect } from "react";

const STORAGE_KEY = "gvg_newsletter_bar_dismissed";

export default function StickyNewsletterBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setDismissed(true);
      return;
    }

    // Show bar after user scrolls past the problem section (#problem)
    const onScroll = () => {
      const problemSection = document.getElementById("problem");
      if (!problemSection) return;
      const rect = problemSection.getBoundingClientRect();
      // Show once the bottom of the problem section has scrolled above the viewport
      if (rect.bottom < 0) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      window.open(
        `https://goodversusgreat.substack.com/subscribe?email=${encodeURIComponent(email)}`,
        "_blank"
      );
      setSubmitted(true);
      setTimeout(() => {
        handleDismiss();
      }, 2000);
    }
  };

  if (dismissed || !visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: "oklch(14% 0.008 285)",
        borderTop: "1px solid rgba(41,121,255,0.35)",
        padding: "0.875rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        // Desktop only
        boxShadow: "0 -4px 32px rgba(0,0,0,0.5)",
        // Hide on mobile via media query — handled in CSS
      }}
      className="gvg-sticky-bar"
    >
      {/* Left: offer copy */}
      <p
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.75)",
          letterSpacing: "0.04em",
          margin: 0,
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        Get the Decision Layer Audit Checklist —{" "}
        <span style={{ color: "#2979FF" }}>free.</span>
      </p>

      {/* Right: form + close */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, justifyContent: "flex-end" }}>
        {submitted ? (
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.75rem",
              color: "#2979FF",
              letterSpacing: "0.04em",
            }}
          >
            ✓ Opening Substack…
          </span>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.8rem",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF",
                padding: "0.45rem 0.875rem",
                outline: "none",
                width: "200px",
                letterSpacing: "0.02em",
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                backgroundColor: "#2979FF",
                color: "#FFFFFF",
                border: "none",
                padding: "0.45rem 1rem",
                cursor: "pointer",
                transition: "background-color 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a5fd4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2979FF"; }}
            >
              Get it
            </button>
          </form>
        )}

        {/* Close button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.35)",
            cursor: "pointer",
            fontSize: "1.1rem",
            lineHeight: 1,
            padding: "0.25rem",
            transition: "color 0.15s ease",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.8)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)"; }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
