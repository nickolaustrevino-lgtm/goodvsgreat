/* Navbar — Good vs. Great Brand Guidelines Applied
   Logo: "good vs. Great" in Courier New inside #2979FF rectangle
   Tagline: "better media decisions." in Courier New below
   Nav: IBM Plex Sans 400
   CTA: Electric Blue filled button, sharp corners */
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "What I Do", id: "services" },
  { label: "Proof", id: "proof" },
  { label: "How It Works", id: "pricing" },
  { label: "Writing", id: "writing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#FFFFFF",
        borderBottom: scrolled
          ? "1px solid rgba(45,45,45,0.12)"
          : "1px solid rgba(45,45,45,0.08)",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            alignItems: "flex-start",
          }}
        >
          {/* Wordmark in Electric Blue rectangle — Courier New per brand spec */}
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
              whiteSpace: "nowrap",
            }}
          >
            good vs. Great
          </span>
          {/* Tagline — Courier New, muted */}
          <span
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: "0.6rem",
              color: "rgba(45,45,45,0.45)",
              letterSpacing: "0.04em",
              paddingLeft: "0.1rem",
            }}
          >
            better media decisions.
          </span>
        </button>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                color: "#2D2D2D",
                cursor: "pointer",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#2979FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#2D2D2D";
              }}
            >
              {link.label}
            </button>
          ))}

          {/* CTA — Electric Blue, sharp corners */}
          <button
            onClick={() => scrollTo("booking")}
            style={{
              backgroundColor: "#2979FF",
              color: "#FFFFFF",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "0.55rem 1.2rem",
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5B9BFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#2979FF";
            }}
          >
            Book a Call →
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              backgroundColor: "#2D2D2D",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              backgroundColor: "#2D2D2D",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s ease",
            }}
          />
          <span
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              backgroundColor: "#2D2D2D",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid rgba(45,45,45,0.08)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "1rem",
                fontWeight: 400,
                color: "#2D2D2D",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("booking")}
            style={{
              backgroundColor: "#2979FF",
              color: "#FFFFFF",
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              fontWeight: 500,
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Book a Call →
          </button>
        </div>
      )}
    </header>
  );
}
