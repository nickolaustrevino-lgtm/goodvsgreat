/* Navbar — GvG Dark Editorial Intelligence */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(26,26,46,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 group"
          >
            <div
              className="flex items-center justify-center px-2.5 py-1.5"
              style={{ backgroundColor: "#2979FF" }}
            >
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                GvG
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                good vs. <span style={{ color: "#2979FF" }}>Great</span>
              </span>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.55rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                better media decisions.
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "What I Do", id: "services" },
              { label: "Proof", id: "proof" },
              { label: "How It Works", id: "pricing" },
              { label: "Writing", id: "writing" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="btn-primary"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.7rem" }}
            >
              Book a Call →
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            backgroundColor: "rgba(26,26,46,0.98)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="container py-6 flex flex-col gap-5">
            {[
              { label: "What I Do", id: "services" },
              { label: "Proof", id: "proof" },
              { label: "How It Works", id: "pricing" },
              { label: "Writing", id: "writing" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link text-left"
                style={{ fontSize: "0.85rem" }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="btn-primary mt-2"
              style={{ alignSelf: "flex-start" }}
            >
              Book a Call →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
