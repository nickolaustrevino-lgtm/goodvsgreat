/* Footer — GvG Dark Editorial Intelligence
   Deep Navy background. Minimal footer with logo and nav links. */

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#0F0F1E",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 0",
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              style={{
                backgroundColor: "#2979FF",
                padding: "0.4rem 0.6rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
              }}>
                GvG
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}>
                good vs. <span style={{ color: "#2979FF" }}>Great</span>
              </span>
              <span style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.5rem",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: "2px",
              }}>
                better media decisions.
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6">
            {[
              { label: "What I Do", id: "services" },
              { label: "Proof", id: "proof" },
              { label: "Pricing", id: "pricing" },
              { label: "Writing", id: "writing" },
              { label: "About", id: "about" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                  padding: 0,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)"; }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => scrollTo("booking")}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#2979FF",
              background: "none",
              border: "1px solid rgba(41,121,255,0.3)",
              cursor: "pointer",
              padding: "0.6rem 1rem",
              transition: "border-color 0.2s ease, color 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "#2979FF";
              el.style.color = "#5B9BFF";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "rgba(41,121,255,0.3)";
              el.style.color = "#2979FF";
            }}
          >
            Book a Call →
          </button>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          marginTop: "2.5rem",
          paddingTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.2)",
          }}>
            © {new Date().getFullYear()} Good vs. Great. All rights reserved. · New York, NY · Remote
          </p>
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.12)",
          }}>
            Media Systems Architecture · Measurement Infrastructure · Cross-Channel Budget Strategy · AI-Augmented Workflow Design
          </p>
        </div>
      </div>
    </footer>
  );
}
