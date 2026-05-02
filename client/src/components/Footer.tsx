/* Footer — GvG Brand Guidelines v2
   Background: #0D0D1A (deepest layer)
   Logo: "good vs. Great" in Space Mono inside #2979FF rectangle
   Tagline: IBM Plex Mono, muted
   Nav: IBM Plex Sans 400
   Copyright: IBM Plex Mono, very muted */

const NAV_LINKS = [
  { label: "What I Do", id: "services" },
  { label: "Proof", id: "proof" },
  { label: "Pricing", id: "pricing" },
  { label: "Writing", id: "writing" },
  { label: "About", id: "about" },
  { label: "Book a Call", id: "booking" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#0D0D1A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "4rem 0 2.5rem",
      }}
    >
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2.5rem",
            marginBottom: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo + tagline */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                alignItems: "flex-start",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#2979FF",
                  padding: "0.28rem 0.65rem",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.01em",
                  lineHeight: 1.3,
                }}
              >
                good vs. Great
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.58rem",
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.08em",
                }}
              >
                better media decisions.
              </span>
            </button>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.6,
                maxWidth: "280px",
                margin: 0,
              }}
            >
              Measurement infrastructure, budget strategy, and AI-augmented workflow design for companies spending $1M+ on paid media.
            </p>
          </div>

          {/* Nav links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.2)",
                marginBottom: "0.25rem",
              }}
            >
              Navigation
            </span>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* LinkedIn CTA */}
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.2)",
                marginBottom: "1rem",
              }}
            >
              Connect
            </div>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="gvg-btn-secondary"
              style={{ textDecoration: "none", fontSize: "0.875rem" }}
            >
              LinkedIn →
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.08em",
            }}
          >
            © {new Date().getFullYear()} Good vs. Great. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.08em",
            }}
          >
            goodvsgreat.ai
          </span>
        </div>
      </div>
    </footer>
  );
}
