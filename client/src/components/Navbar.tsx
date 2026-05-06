/*
 * Navbar - GvG Design System v5
 * CHANGELOG (v4 → v5):
 *   - Removed all social icons (Instagram, Facebook, LinkedIn, TikTok, Threads) - migrated to footer
 *   - Sticky blur: after 600px scroll, backdrop-filter: blur(12px) + rgba(10,18,38,0.8) fill
 *   - CTA upgraded to spec pill: 40px height, 8px radius, filled cobalt, 1px inner top highlight
 *   - Nav items: 14px humanist sans, weight 500, 80% opacity, 32px gap
 *   - Hairline 1px divider beneath nav at rgba(255,255,255,0.06)
 *   - Mobile: hamburger with fixed bottom CTA bar (56px, above iOS safe area)
 */

import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { trackEvent } from "../lib/pixel";

const LOGO_URL = "/manus-storage/logo-banner_353f07ff.png";
const LOGO_ICON_URL = "/manus-storage/gvg-logo_7908b53b.png";

const NAV_LINKS = [
  { label: "What I Do",       id: "services" },
  { label: "The Distinction", id: "contrast" },
  { label: "Proof",           id: "proof" },
  { label: "Pricing",         id: "pricing" },
  { label: "Blog",            id: "blog",    href: "/blog" },
  { label: "Is This a Fit?",  id: "fit" },
  { label: "About",           id: "about" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeId = useScrollSpy(SECTION_IDS, 80);

  const scrolled = scrollY > 20;
  const blurred = scrollY > 600;

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  const scrollTo = (link: { id: string; href?: string }) => {
    setMenuOpen(false);
    if (link.href) { window.location.href = link.href; return; }
    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
  };

  const bookingHref = "https://calendar.app.google/b3ctixpS5tVRxYVJ9";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "64px",
          backgroundColor: blurred ? "rgba(10,18,38,0.8)" : "oklch(16% 0.005 285)",
          backdropFilter: blurred ? "blur(12px)" : "none",
          WebkitBackdropFilter: blurred ? "blur(12px)" : "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.4)" : "none",
          transition: "background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            gap: "1rem",
          }}
        >
          {/* Logo — always navigates to home page */}
          <Link
            href="/"
            aria-label="Good vs. Great - home"
            style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}
          >
            <img
              src={LOGO_URL}
              alt="good vs. Great"
              style={{ height: "34px", width: "auto", display: isDesktop ? "block" : "none" }}
            />
            <img
              src={LOGO_ICON_URL}
              alt="good vs. Great"
              style={{ height: "34px", width: "34px", objectFit: "contain", borderRadius: "7px", display: isDesktop ? "none" : "block" }}
            />
          </Link>

          {/* Desktop: nav + CTA */}
          {isDesktop && (
            <>
              <nav
                aria-label="Main navigation"
                style={{ display: "flex", alignItems: "center", gap: "2rem", flex: 1, justifyContent: "center" }}
              >
              {NAV_LINKS.map((link, i) => {
                const isActive = activeId === link.id;
                const isHovered = hoveredId === link.id;
                return (
                  <React.Fragment key={link.id}>
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        style={{
                          display: "inline-block",
                          width: "3px",
                          height: "3px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.22)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => scrollTo(link)}
                      onMouseEnter={() => setHoveredId(link.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "0 0 2px 0",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: isActive ? "#2F6FFF" : isHovered ? "#FFFFFF" : "rgba(255,255,255,0.8)",
                        cursor: "pointer",
                        transition: "color var(--motion-base, 240ms) ease",
                        letterSpacing: "0",
                        whiteSpace: "nowrap",
                        borderBottom: isActive ? "1.5px solid #2F6FFF" : "1.5px solid transparent",
                        lineHeight: "1.4",
                        outline: "none",
                      }}
                      onFocus={(e) => { e.currentTarget.style.outline = "2px solid #2F6FFF"; e.currentTarget.style.outlineOffset = "4px"; }}
                      onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
                    >
                      {link.label}
                    </button>
                  </React.Fragment>
                );
              })}
              </nav>

              {/* CTA pill */}
              <a
                href={bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Contact", { content_name: "Navbar CTA" })}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  height: "40px",
                  padding: "0 20px",
                  background: "#2F6FFF",
                  borderRadius: "8px",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "box-shadow var(--motion-base, 240ms) ease, transform var(--motion-base, 240ms) ease",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.15), 0 0 32px rgba(47,111,255,0.4)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.15)";
                  el.style.transform = "translateY(0)";
                }}
                onFocus={(e) => { e.currentTarget.style.outline = "2px solid #2F6FFF"; e.currentTarget.style.outlineOffset = "4px"; }}
                onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
              >
                Book a call <span style={{ display: "inline-block", transition: "transform var(--motion-base, 240ms) ease" }}>→</span>
              </a>
            </>
          )}

          {/* Mobile: hamburger */}
          {!isDesktop && (
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "flex", flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}
            >
              <span style={{ display: "block", width: "22px", height: "1.5px", background: menuOpen ? "transparent" : "#fff", transition: "all 0.2s ease" }} />
              <span style={{ display: "block", width: "22px", height: "1.5px", background: "#fff", transform: menuOpen ? "rotate(45deg) translateY(0)" : "none", transition: "all 0.2s ease", marginTop: menuOpen ? "-6.5px" : "0" }} />
              <span style={{ display: "block", width: "22px", height: "1.5px", background: "#fff", transform: menuOpen ? "rotate(-45deg) translateY(0)" : "none", transition: "all 0.2s ease", marginTop: menuOpen ? "-6.5px" : "0" }} />
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {!isDesktop && menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "64px",
              left: 0,
              right: 0,
              backgroundColor: "rgba(10,18,38,0.98)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "1rem 2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  padding: "0.875rem 0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: activeId === link.id ? "#2F6FFF" : "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Mobile: fixed bottom CTA bar */}
      {!isDesktop && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99,
            height: "56px",
            backgroundColor: "#2F6FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <a
            href={bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("Contact", { content_name: "Mobile Bottom CTA" })}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            Book a call →
          </a>
        </div>
      )}
    </>
  );
}
