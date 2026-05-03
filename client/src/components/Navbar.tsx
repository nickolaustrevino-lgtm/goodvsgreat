/* Navbar — GvG Brand Guidelines v2
   Uses explicit CSS media queries (not Tailwind responsive classes) for reliable breakpoints.
   Mobile (<768px): logo + hamburger only
   Desktop (≥768px): logo + nav links + social icons + CTA */

import { useState, useEffect } from "react";

const LOGO_URL = "/manus-storage/logo-banner_353f07ff.png";

const NAV_LINKS = [
  { label: "What I Do", id: "services" },
  { label: "Proof", id: "proof" },
  { label: "How It Works", id: "pricing" },
  { label: "Writing", id: "writing" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/goodvsgreat.ai/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/goodversusgreat",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/goodvsgreat/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@goodvsgreat.ai",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@goodvsgreat.ai",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.027-3.579.877-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.594 12c.022 3.086.713 5.496 2.051 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.583-1.313-.879-2.378-.885h-.053c-.842 0-1.95.22-2.67 1.177l-1.677-1.21C8.56 5.925 9.874 5.197 12.02 5.197h.073c3.773.03 5.965 2.317 6.07 6.3.046.016.09.033.135.05 1.178.44 2.083 1.157 2.692 2.133.824 1.33.99 3.056.47 4.82-.54 1.836-1.72 3.35-3.33 4.27C16.63 23.51 14.6 24 12.186 24z"/>
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navBg = "oklch(16% 0.005 285)";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: navBg,
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.09)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Main bar */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
          gap: "1rem",
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
            alignItems: "center",
            flexShrink: 0,
          }}
          aria-label="Good vs. Great — home"
        >
          <img
            src={LOGO_URL}
            alt="good vs. Great"
            style={{ height: "34px", width: "auto", display: "block" }}
          />
        </button>

        {/* Desktop: nav + social + CTA */}
        {isDesktop && (
          <>
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                flex: 1,
                justifyContent: "center",
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
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    transition: "color 0.15s ease",
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
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
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
              {/* Social icons */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      display: "flex",
                      alignItems: "center",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#2979FF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <span style={{ width: "1px", height: "20px", backgroundColor: "rgba(255,255,255,0.12)", flexShrink: 0 }} />

              <a
                href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
                target="_blank"
                rel="noopener noreferrer"
                className="gvg-btn-primary"
                style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem", whiteSpace: "nowrap", textDecoration: "none", display: "inline-block" }}
              >
                Book a Call →
              </a>
            </div>
          </>
        )}

        {/* Mobile: hamburger only */}
        {!isDesktop && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              flexShrink: 0,
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
        )}
      </div>

      {/* Mobile dropdown menu */}
      {!isDesktop && menuOpen && (
        <div
          style={{
            backgroundColor: navBg,
            borderTop: "1px solid rgba(255,255,255,0.09)",
            padding: "1.5rem 1rem 2rem",
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
                padding: "0.25rem 0",
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.75)",
                cursor: "pointer",
                textAlign: "left",
                letterSpacing: "0.01em",
              }}
            >
              {link.label}
            </button>
          ))}

          {/* Social icons row */}
          <div style={{ display: "flex", gap: "1.25rem", paddingTop: "0.25rem", alignItems: "center" }}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  color: "rgba(255,255,255,0.45)",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.15s ease",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          <a
            href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
            target="_blank"
            rel="noopener noreferrer"
            className="gvg-btn-primary"
            style={{ marginTop: "0.25rem", textDecoration: "none", display: "block", textAlign: "center" }}
          >
            Book a Call →
          </a>
        </div>
      )}
    </header>
  );
}
