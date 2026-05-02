/* WritingSection — GvG Brand Guidelines v2
   Background: --gvg-navy
   Article cards: dark surface, Electric Blue top border on hover
   Label: IBM Plex Mono
   Ghost number: 07 */

import { useEffect, useRef } from "react";

const ARTICLES = [
  {
    label: "Essay",
    title: "The Advertiser Has Been Demoted",
    desc: "The real job now is systems architecture and signal design. A reframing of what modern marketing leadership actually looks like.",
    link: "https://linkedin.com",
  },
  {
    label: "Framework",
    title: "From Clicks to Citations",
    desc: "A measurement framework for AI search that replaces traffic-volume thinking with a more useful model for visibility and value.",
    link: "https://linkedin.com",
  },
  {
    label: "Essay",
    title: "Why Modern Marketers Need to Build, Not Just Buy",
    desc: "Why strategic leaders increasingly need to ship tools, not just recommendations.",
    link: "https://linkedin.com",
  },
];

export default function WritingSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".gvg-fadeup").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="writing"
      ref={ref}
      style={{
        backgroundColor: "#1A1A2E",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">07</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <span className="gvg-section-label">Thinking, Frameworks, and Operating Ideas</span>
          <span className="gvg-divider" />
          <h2
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "0.75rem",
            }}
          >
            Writing worth reading.
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "540px",
            }}
          >
            I write publicly about measurement, AI, and the changing operating model of marketing — especially where old reporting models stop being useful.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {ARTICLES.map((article, i) => (
            <a
              key={i}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="gvg-fadeup"
              style={{
                transitionDelay: `${i * 100}ms`,
                backgroundColor: "#252530",
                borderTop: "2px solid rgba(255,255,255,0.1)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                transition: "border-top-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderTopColor = "#2979FF";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderTopColor = "rgba(255,255,255,0.1)";
                el.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#2979FF",
                  marginBottom: "0.875rem",
                  display: "block",
                }}
              >
                {article.label}
              </span>
              <h3
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1.35,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.875rem",
                }}
              >
                {article.title}
              </h3>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                {article.desc}
              </p>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#2979FF",
                  letterSpacing: "0.04em",
                }}
              >
                Read on LinkedIn →
              </span>
            </a>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div
          className="gvg-fadeup"
          style={{
            marginTop: "3rem",
            padding: "2rem",
            border: "1px solid rgba(255,255,255,0.09)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            backgroundColor: "#252530",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "0.35rem",
              }}
            >
              Get the newsletter.
            </div>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              I write when there's something worth saying. No pitch sequences. No nurture tracks.
            </p>
          </div>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="gvg-btn-primary"
            style={{ textDecoration: "none", flexShrink: 0 }}
          >
            Follow on LinkedIn →
          </a>
        </div>
      </div>
    </section>
  );
}
