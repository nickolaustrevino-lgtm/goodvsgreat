/* WritingSection — GvG Brand Guidelines v2
   Background: --gvg-navy
   Post feed: 3 cards with title, date, excerpt, linked
   Email capture: "Get the Decision Layer Audit Checklist" with single input + button
   Ghost number: 07 */

import { useEffect, useRef, useState } from "react";

const ARTICLES = [
  {
    label: "Essay",
    title: "The Advertiser Has Been Demoted",
    date: "2024",
    desc: "The platforms have taken the wheel. The real job for marketing leaders is now systems architecture and signal design — not campaign management.",
    link: "https://goodversusgreat.substack.com/p/the-advertiser-has-been-demoted-your",
    cta: "Read on Substack →",
  },
  {
    label: "Framework",
    title: "From Clicks to Citations",
    date: "2024",
    desc: "Traffic metrics don't tell you whether AI systems are recommending your brand. This framework replaces volume-based thinking with a more useful model for measuring visibility in the age of AI search.",
    link: "https://goodversusgreat.substack.com/p/from-clicks-to-citations-redesigning",
    cta: "Read on Substack →",
  },
  {
    label: "Essay",
    title: "Why Modern Marketers Need to Build, Not Just Buy",
    date: "2024",
    desc: "The most effective marketing leaders aren't just buyers of tools and media — they're builders. A case for why strategic leaders increasingly need to ship working infrastructure.",
    link: "https://www.linkedin.com/pulse/why-modern-marketers-need-build-just-buy-nickolaus-trevi%C3%B1o-ukuxe/?trackingId=mBWGArwjT%2B688WX8bOESzw%3D%3D",
    cta: "Read on LinkedIn →",
  },
];

export default function WritingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Opens Substack subscribe with pre-filled email
      window.open(
        `https://goodversusgreat.substack.com/subscribe?email=${encodeURIComponent(email)}`,
        "_blank"
      );
      setSubmitted(true);
    }
  };

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

        {/* ── Post feed cards ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
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
              {/* Label + date row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#2979FF",
                  }}
                >
                  {article.label}
                </span>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.25)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {article.date}
                </span>
              </div>
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
                {article.cta}
              </span>
            </a>
          ))}
        </div>

        {/* ── Email capture: Checklist offer ── */}
        <div
          className="gvg-fadeup"
          style={{
            padding: "2.5rem",
            border: "1px solid rgba(41,121,255,0.25)",
            backgroundColor: "rgba(41,121,255,0.04)",
          }}
        >
          <div style={{ maxWidth: "560px" }}>
            <h3
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Get the Decision Layer Audit Checklist
            </h3>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.65,
                marginBottom: "1.5rem",
              }}
            >
              A 12-point self-assessment used with Fortune 500 measurement teams. Free download, plus the newsletter.
            </p>

            {submitted ? (
              <p
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.8rem",
                  color: "#2979FF",
                  letterSpacing: "0.04em",
                }}
              >
                ✓ Opening Substack — complete your subscription there.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
              >
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    flex: "1 1 220px",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.875rem",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#FFFFFF",
                    padding: "0.625rem 1rem",
                    outline: "none",
                    letterSpacing: "0.02em",
                  }}
                />
                <button
                  type="submit"
                  className="gvg-btn-primary"
                  style={{ flexShrink: 0, cursor: "pointer" }}
                >
                  Send me the checklist
                </button>
              </form>
            )}

            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.06em",
                marginTop: "0.875rem",
              }}
            >
              No pitch sequences. No nurture tracks. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
