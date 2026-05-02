/* Navbar — GvG Brand Guidelines v2
   Background: --gvg-charcoal (oklch 16%)
   Logo: "good vs. Great" in Space Mono inside #2979FF rect
   Nav: IBM Plex Sans 400
   CTA: Electric Blue, border-radius: 0 */

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
    const onScroll = () => setScrolled(window.scrollY > 20);
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
        backgroundColor: "oklch(16% 0.005 285)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.09)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
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
        {/* Logo — Primary Dark Horizontal (brand asset) */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Good vs. Great — home"
        >
          <img
            src="/manus-storage/logo-primary-dark_3ef35a6a.png"
            alt="good vs. Great — better media decisions"
            style={{
              height: "36px",
              width: "auto",
              display: "block",
            }}
          />
        </button>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.25rem",
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
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                transition: "color 0.15s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
              }}
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => scrollTo("booking")}
            className="gvg-btn-primary"
            style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}
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
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                backgroundColor: "#FFFFFF",
                transition: "transform 0.2s ease, opacity 0.2s ease",
                transform:
                  i === 0 && menuOpen
                    ? "translateY(7px) rotate(45deg)"
                    : i === 2 && menuOpen
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "oklch(16% 0.005 285)",
            borderTop: "1px solid rgba(255,255,255,0.09)",
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
                color: "rgba(255,255,255,0.7)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("booking")}
            className="gvg-btn-primary"
          >
            Book a Call →
          </button>
        </div>
      )}
    </header>
  );
}
