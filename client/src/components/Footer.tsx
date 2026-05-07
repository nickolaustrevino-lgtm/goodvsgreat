/* Footer - GvG Brand Guidelines v2
   Background: #0D0D1A (deepest layer)
   Logo: GoodvsGreatBlueBannerLogoOnly.png brand asset
   Social: Instagram, Facebook, LinkedIn, TikTok, Threads, Reddit
   Nav: IBM Plex Sans 400
   Copyright: IBM Plex Mono, very muted */

const LOGO_URL = "/manus-storage/logo-banner_353f07ff.png";

const NAV_LINKS = [
  { label: "What I Do", id: "services" },
  { label: "Proof", id: "proof" },
  { label: "Pricing", id: "pricing" },
  { label: "Fit", id: "fit" },
  { label: "About", id: "about" },
  { label: "FAQ", id: "faq" },
  { label: "Book a Call", id: "booking" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/goodvsgreat.ai/",
    color: "#E1306C",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/goodversusgreat",
    color: "#1877F2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/goodvsgreat/",
    color: "#0A66C2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@goodvsgreat.ai",
    color: "#FFFFFF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@goodvsgreat.ai",
    color: "#FFFFFF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.027-3.579.877-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.594 12c.022 3.086.713 5.496 2.051 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.583-1.313-.879-2.378-.885h-.053c-.842 0-1.95.22-2.67 1.177l-1.677-1.21C8.56 5.925 9.874 5.197 12.02 5.197h.073c3.773.03 5.965 2.317 6.07 6.3.046.016.09.033.135.05 1.178.44 2.083 1.157 2.692 2.133.824 1.33.99 3.056.47 4.82-.54 1.836-1.72 3.35-3.33 4.27C16.63 23.51 14.6 24 12.186 24z"/>
      </svg>
    ),
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/user/goodversusgreat/",
    color: "#FF4500",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
        <path fill="#0D0D1A" d="M20 12a1.65 1.65 0 0 0-1.65-1.65c-.44 0-.84.17-1.13.45a8.1 8.1 0 0 0-4.37-1.38l.74-3.48 2.4.51a1.17 1.17 0 1 0 .12-.56l-2.68-.57a.28.28 0 0 0-.33.21l-.83 3.9a8.12 8.12 0 0 0-4.4 1.37 1.65 1.65 0 1 0-1.8 2.67 3.23 3.23 0 0 0-.03.44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06c0-.15-.01-.29-.03-.43A1.65 1.65 0 0 0 20 12zm-11.5 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm5.58 2.65c-.72.72-2.1.77-2.08.77s-1.37-.05-2.08-.77a.28.28 0 0 1 .4-.4c.46.46 1.43.62 1.68.62s1.22-.16 1.68-.62a.28.28 0 0 1 .4.4zm-.16-1.65a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
    ),
  },
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
          {/* Logo + tagline + social icons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
              aria-label="Good vs. Great - home"
            >
              <img
                src={LOGO_URL}
                alt="good vs. Great"
                style={{ height: "32px", width: "auto", display: "block" }}
              />
            </button>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.6,
                maxWidth: "280px",
                margin: 0,
              }}
            >
              Measurement infrastructure, budget strategy, and AI-augmented workflow design for companies spending $1M+ on paid media.
            </p>

            {/* Prominent social icon row */}
            <div style={{ display: "flex", gap: "0.625rem", alignItems: "center", flexWrap: "wrap" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.55)",
                    transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease, transform 0.18s ease",
                    textDecoration: "none",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = `${s.color}22`;
                    el.style.borderColor = `${s.color}55`;
                    el.style.color = s.color;
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.06)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.color = "rgba(255,255,255,0.55)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
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
                  fontFamily: "'Inter', sans-serif",
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

          {/* Subscribe column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "260px" }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Stay in the loop
            </span>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.55, margin: 0 }}>
              Writing on media systems, attribution strategy, and growth decisions.
            </p>
            <a
              href="/subscribe"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#2979FF",
                textDecoration: "none",
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              Subscribe to the blog →
            </a>
          </div>

          {/* Follow column — text links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              Follow
            </span>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = s.color; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)"; }}
              >
                <span style={{ opacity: 0.7, display: "flex", alignItems: "center" }}>{s.icon}</span>
                {s.label}
              </a>
            ))}
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
          <img
            src="/manus-storage/gvg-logo_7908b53b.png"
            alt=""
            aria-hidden="true"
            style={{ width: "18px", height: "18px", objectFit: "contain", opacity: 0.22, borderRadius: "3px" }}
          />
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
