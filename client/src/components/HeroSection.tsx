/* =====================================================
   HERO SECTION — GvG Design System v3
   Layout: 12-column grid, H1 on left 7 cols, visual artifact right 5 cols
   Typography: Inter 800 display, Inter 400 body, IBM Plex Mono stats/eyebrows
   Background: Cursor-aware radial gradient (no dot-grid)
   Motion: Animated stat counters, cursor-aware gradient
   ===================================================== */

import { useEffect, useRef, useState } from "react";

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.35, y: 0.4 });

  const years = useCountUp(12, 1400, statsVisible);
  const media = useCountUp(100, 1800, statsVisible);
  const channels = useCountUp(4, 1000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "calc(64px + 7.5rem)",
        paddingBottom: "7.5rem",
        background: `
          radial-gradient(ellipse 70% 60% at ${mousePos.x * 100}% ${mousePos.y * 80}%, rgba(41,121,255,0.13) 0%, transparent 65%),
          radial-gradient(ellipse 50% 70% at 88% 15%, rgba(41,121,255,0.07) 0%, transparent 55%),
          oklch(16% 0.005 285)
        `,
        transition: "background 0.5s ease",
      }}
    >
      {/* Subtle grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ghost section number */}
      <span className="gvg-ghost-number">01</span>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: 7 cols — copy + stats + CTAs ── */}
        <div>
          {/* Eyebrow */}
          <span className="gvg-eyebrow" style={{ marginBottom: "1.25rem" }}>
            Growth Decision Partner
          </span>
          <span className="gvg-divider" />

          {/* H1 — Inter 800 display */}
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.8rem, 5.2vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
          >
            Good media looks busy.{" "}
            <span style={{ color: "#2979FF" }}>Great media</span>{" "}
            makes decisions.
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
              maxWidth: "52ch",
            }}
          >
            Good vs. Great helps brands turn paid media, analytics, and AI into clearer decisions, stronger systems, and measurable growth.
          </p>

          {/* Portrait + body copy */}
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "flex-start",
              marginBottom: "2.5rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src={PORTRAIT_URL}
              alt="Nickolaus Trevino, fractional media strategy consultant"
              style={{
                width: "72px",
                height: "72px",
                objectFit: "cover",
                objectPosition: "center top",
                flexShrink: 0,
                borderRadius: "50%",
                border: "2px solid rgba(41,121,255,0.4)",
              }}
            />
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9375rem", lineHeight: 1.65 }}>
              <p style={{ marginBottom: "0.5rem", fontWeight: 600, color: "rgba(255,255,255,0.92)" }}>
                You're spending $1M+ on paid media. You can't prove what's working.
              </p>
              <p style={{ marginBottom: "0.5rem", color: "rgba(255,255,255,0.62)" }}>
                I'm the decision layer between your dashboards and your CFO. Measurement infrastructure, incrementality, and budget logic that turns $100M+ in media spend into defensible growth, not attribution theater.
              </p>
              <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.32)", fontStyle: "italic" }}>
                Trusted by Epic Games, Microsoft, Warner Bros., Walmart, Amazon.
              </p>
            </div>
          </div>

          {/* Animated stat counters */}
          <div
            style={{
              display: "flex",
              gap: "2.5rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            {[
              { value: years, suffix: "", label: "Years Experience", prefix: "" },
              { value: media, suffix: "M+", label: "Media Managed", prefix: "$" },
              { value: channels, suffix: "", label: "Channels", prefix: "" },
            ].map((stat, i) => (
              <div key={i} className="gvg-stat-glow">
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "2.25rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1,
                    marginBottom: "0.35rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.prefix}{stat.value}{stat.suffix}
                </div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", alignItems: "center" }}>
            <a
              href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
              target="_blank"
              rel="noopener noreferrer"
              className="gvg-btn-primary"
            >
              Get better media decisions
            </a>
            <button
              onClick={() => scrollTo("services")}
              className="gvg-btn-secondary"
            >
              See how it works
            </button>
          </div>
        </div>

        {/* ── RIGHT: 5 cols — Decision Layer dashboard artifact ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {/* Artifact label */}
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            The Decision Layer
          </span>

          {/* Dashboard card */}
          <div
            style={{
              background: "#0F172A",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 1px 0 rgba(255,255,255,0.07) inset, 0 24px 64px rgba(0,0,0,0.55)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Blue accent top bar */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "#2979FF", borderRadius: "12px 12px 0 0" }} />
            {/* Inner highlight */}
            <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }} />

            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.38)" }}>
                Media ROI Dashboard
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: "#4ADE80", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ADE80", display: "inline-block", boxShadow: "0 0 6px #4ADE80" }} />
                Live
              </span>
            </div>

            {/* KPI grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.625rem", marginBottom: "1.25rem" }}>
              {[
                { label: "True ROAS", value: "4.2×", delta: "+0.8×", up: true },
                { label: "Incremental", value: "68%", delta: "+12%", up: true },
                { label: "Wasted Spend", value: "$41K", delta: "−$18K", up: false },
              ].map((kpi, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "0.625rem" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.32)", marginBottom: "0.3rem" }}>{kpi.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "0.2rem" }}>{kpi.value}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", color: kpi.up ? "#4ADE80" : "#F87171" }}>{kpi.delta} vs last qtr</div>
                </div>
              ))}
            </div>

            {/* Budget allocation bars */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.28)", marginBottom: "0.625rem" }}>Budget Allocation</div>
              {[
                { channel: "Paid Social", pct: 38, color: "#2979FF" },
                { channel: "Paid Search", pct: 28, color: "#6366F1" },
                { channel: "Programmatic", pct: 20, color: "#8B5CF6" },
                { channel: "Streaming", pct: 14, color: "#A78BFA" },
              ].map((ch, i) => (
                <div key={i} style={{ marginBottom: "0.45rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.15rem" }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.5)" }}>{ch.channel}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.62rem", color: "rgba(255,255,255,0.4)" }}>{ch.pct}%</span>
                  </div>
                  <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${ch.pct}%`, background: ch.color, borderRadius: "2px", boxShadow: `0 0 6px ${ch.color}55` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Decision signal */}
            <div style={{ background: "rgba(41,121,255,0.08)", border: "1px solid rgba(41,121,255,0.2)", borderRadius: "8px", padding: "0.75rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "0.7rem", flexShrink: 0, marginTop: "1px" }}>⚡</span>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#2979FF", marginBottom: "0.2rem" }}>Decision Signal</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.5 }}>
                  Shift 12% of Paid Search budget to Programmatic CTV. Projected +0.4× ROAS.
                </div>
              </div>
            </div>
          </div>

          {/* Founder identity card */}
          <div
            style={{
              background: "#0F172A",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "0.875rem 1.125rem",
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={PORTRAIT_URL}
              alt="Nickolaus Trevino"
              style={{ width: "44px", height: "44px", objectFit: "cover", objectPosition: "center top", flexShrink: 0, borderRadius: "50%", border: "1.5px solid rgba(41,121,255,0.35)" }}
            />
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "0.1rem" }}>Nickolaus Trevino</div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.3)" }}>Fractional Media Strategist · New York, NY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: collapse to single column, hide right artifact */}
      <style>{`
        @media (max-width: 900px) {
          #hero > .container {
            grid-template-columns: 1fr !important;
          }
          #hero > .container > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
