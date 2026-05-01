/* Footer — Good vs. Great Brand Guidelines Applied
   Background: Deep Navy (#1A1A2E)
   Logo: "good vs. Great" in Courier New inside #2979FF rectangle
   Tagline: "better media decisions." in Courier New, muted
   Nav: IBM Plex Sans 400
   Captions: IBM Plex Mono
   Links: Electric Blue on hover */

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#1A1A2E",
        padding: "4rem 0 2rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Logo + tagline */}
          <div>
            <div style={{ marginBottom: "1.25rem" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#2979FF",
                  padding: "0.28rem 0.6rem",
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                  lineHeight: 1.25,
                }}
              >
                good vs. Great
              </span>
              <div
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.04em",
                  marginTop: "0.35rem",
                  paddingLeft: "0.1rem",
                }}
              >
                better media decisions.
              </div>
            </div>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.3)",
                lineHeight: 1.7,
                letterSpacing: "0.04em",
              }}
            >
              Media systems architecture for companies spending $1M+ on paid media.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Navigation
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              {[
                { label: "What I Do", id: "services" },
                { label: "Proof", id: "proof" },
                { label: "How It Works", id: "pricing" },
                { label: "Writing", id: "writing" },
                { label: "About", id: "about" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#2979FF"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)"; }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              Contact
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#2979FF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                LinkedIn →
              </a>
              <button
                onClick={() => scrollTo("booking")}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.45)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#2979FF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.45)"; }}
              >
                Book a Call →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.06em",
            }}
          >
            © {new Date().getFullYear()} Good vs. Great. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.06em",
            }}
          >
            New York, NY · Remote
          </span>
        </div>
      </div>
    </footer>
  );
}
