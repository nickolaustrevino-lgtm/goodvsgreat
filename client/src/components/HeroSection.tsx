/* =====================================================
   HERO SECTION — GvG Design System v4
   Layout: 12-column grid, H1 on left 7 cols, visual artifact right 5 cols
   Typography: Inter 800 display, Inter 400 body, IBM Plex Mono stats/eyebrows
   Background: Cursor-aware radial gradient (no dot-grid)
   Motion: Animated stat counters, cursor-aware gradient
   Dashboard: Upgraded to match GoodVsGreatDashboard design language —
     large animated KPI numbers, pill bars (7px, border-radius 999),
     breathing Decision Signal, 4-token color discipline
   Bio block: removed per design direction
   Founder identity card: removed per design direction
   ===================================================== */

import { useEffect, useRef, useState } from "react";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const GREEN = "#4ADE80";
const RED = "#F87171";
const PURPLE = "#9C7CFF";
const DIM = "rgba(255,255,255,0.28)";
const MID = "rgba(255,255,255,0.55)";

function useCountUp(target: number, duration = 1800, start = false, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => {
      let startTime: number | null = null;
      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, start, delay]);
  return value;
}

// Animated pill bar
function PillBar({ pct, color, delay = 0, active }: { pct: number; color: string; delay?: number; active: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setW(pct), delay);
    return () => clearTimeout(t);
  }, [active, pct, delay]);
  return (
    <div style={{ height: "7px", background: "rgba(255,255,255,0.07)", borderRadius: "999px", overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${w}%`, background: color, borderRadius: "999px",
        transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: `0 0 8px ${color}55`,
      }} />
    </div>
  );
}

// Pulsing live dot
function LiveDot({ color = GREEN }: { color?: string }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "8px", height: "8px", flexShrink: 0 }}>
      <span style={{ position: "absolute", width: "8px", height: "8px", borderRadius: "50%", background: color, opacity: 0.3, animation: "gvg-hero-pulse 2s ease-in-out infinite" }} />
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0 }} />
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [signalBreathing, setSignalBreathing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.35, y: 0.4 });

  // Left-column stat counters
  const years = useCountUp(12, 1400, statsVisible);
  const media = useCountUp(100, 1800, statsVisible);
  const channels = useCountUp(4, 1000, statsVisible);

  // Dashboard KPI counters — large headline numbers
  const roasVal = useCountUp(42, 900, statsVisible, 200);   // 4.2× (÷10)
  const incrVal = useCountUp(68, 1100, statsVisible, 300);
  const wastedVal = useCountUp(41, 900, statsVisible, 400);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          setTimeout(() => setSignalBreathing(true), 2000);
        }
      },
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

          {/* H1 */}
          <h1
            style={{
              fontFamily: SANS,
              fontSize: "clamp(2.8rem, 5.2vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
          >
            Good media looks busy.{" "}
            <span style={{ color: BLUE }}>Great media</span>{" "}
            makes decisions.
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontFamily: SANS,
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
                    fontFamily: MONO,
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
                    fontFamily: MONO,
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

        {/* ── RIGHT: 5 cols — Media ROI Dashboard ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
          {/* Artifact label */}
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.22)" }}>
            The Decision Layer
          </span>

          {/* Dashboard card */}
          <div
            style={{
              background: "#0D1117",
              border: "1px solid rgba(41,121,255,0.15)",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 0 50px rgba(41,121,255,0.07), 0 24px 64px rgba(0,0,0,0.55)",
            }}
          >
            {/* Blue accent top bar */}
            <div aria-hidden="true" style={{ height: "2px", background: BLUE }} />

            {/* Header row */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "0.75rem 1rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(41,121,255,0.03)",
            }}>
              <span style={{ fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>
                Media ROI Dashboard
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <LiveDot color={GREEN} />
                <span style={{ fontFamily: MONO, fontSize: "0.52rem", color: GREEN, textTransform: "uppercase", letterSpacing: "0.08em" }}>Live</span>
              </span>
            </div>

            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* KPI grid — large animated headline numbers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                {[
                  { label: "True ROAS", value: `${Math.floor(roasVal / 10)}.${roasVal % 10}×`, delta: "+0.8×", up: true, color: BLUE },
                  { label: "Incremental", value: `${incrVal}%`, delta: "+12% vs last qtr", up: true, color: GREEN },
                  { label: "Wasted Spend", value: `$${wastedVal}K`, delta: "−$18K recovered", up: false, color: RED },
                ].map((kpi, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid rgba(255,255,255,0.07)`,
                    borderRadius: "8px",
                    padding: "0.625rem 0.5rem",
                    display: "flex", flexDirection: "column", gap: "0.2rem",
                  }}>
                    <div style={{ fontFamily: MONO, fontSize: "0.44rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>{kpi.label}</div>
                    <div style={{ fontFamily: MONO, fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.02em" }}>{kpi.value}</div>
                    <div style={{ fontFamily: MONO, fontSize: "0.44rem", color: kpi.up ? GREEN : RED, lineHeight: 1.3 }}>{kpi.delta}</div>
                  </div>
                ))}
              </div>

              {/* Budget allocation — pill bars */}
              <div>
                <div style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, marginBottom: "0.625rem" }}>Budget Allocation</div>
                {[
                  { channel: "Paid Social",  pct: 38, color: BLUE },
                  { channel: "Paid Search",  pct: 28, color: "#6366F1" },
                  { channel: "Programmatic", pct: 20, color: PURPLE },
                  { channel: "Streaming",    pct: 14, color: "#A78BFA" },
                ].map((ch, i) => (
                  <div key={i} style={{ marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                      <span style={{ fontFamily: SANS, fontSize: "0.75rem", fontWeight: 500, color: MID }}>{ch.channel}</span>
                      <span style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 600, color: ch.color }}>{ch.pct}%</span>
                    </div>
                    <PillBar pct={ch.pct} color={ch.color} delay={i * 100 + 400} active={statsVisible} />
                  </div>
                ))}
              </div>

              {/* Decision Signal — breathing glow */}
              <div style={{
                background: "rgba(41,121,255,0.08)",
                border: "1px solid rgba(156,124,255,0.3)",
                borderRadius: "8px",
                padding: "0.75rem",
                display: "flex", gap: "0.5rem", alignItems: "flex-start",
                boxShadow: signalBreathing ? "0 0 24px rgba(156,124,255,0.16)" : "none",
                animation: signalBreathing ? "gvg-hero-breathe 4s ease-in-out infinite" : "none",
                transition: "box-shadow 0.8s ease",
              }}>
                <span style={{ fontSize: "0.7rem", flexShrink: 0, marginTop: "1px" }}>⚡</span>
                <div>
                  <div style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em", color: PURPLE, marginBottom: "0.2rem" }}>Decision Signal</div>
                  <div style={{ fontFamily: SANS, fontSize: "0.75rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                    Shift 12% of Paid Search budget to Programmatic CTV. Projected +0.4× ROAS.
                  </div>
                </div>
              </div>

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
        @keyframes gvg-hero-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes gvg-hero-breathe {
          0%, 100% { opacity: 0.92; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
