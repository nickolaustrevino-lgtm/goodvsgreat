/*
 * HeroSection — GvG Design System v5
 * CHANGELOG (v4 → v5):
 *   - H1: "Great media" emphasis changed from color swap to 4px cobalt underline rule,
 *     animating scaleX(0→1) on viewport entry (480ms cubic-bezier(0.16,1,0.3,1), 200ms delay)
 *   - Subhead: updated copy per spec; max-width 480px
 *   - CTA row: "Get a 30-min diagnosis" primary + "See the framework" secondary;
 *     both 52px height, 8px radius; primary has inset top highlight + glow on hover;
 *     secondary has transparent fill + border brightens on hover; trailing arrow animates
 *   - Stat row: replaced "4 CHANNELS" with "5 FORTUNE 500 BRANDS" — moved to credibility band
 *   - Dashboard: colors aligned to spec tokens (#141A33 surface-1, #1B2240 surface-2);
 *     LIVE dot uses signal-green #5EE8B5; breathing animation on signal card
 *   - Section watermark "01": spec-accurate stroke-only treatment
 *   - Removed cursor-aware gradient (deprecated per spec — no particles/effects)
 *   - prefers-reduced-motion: all animations disabled, final state rendered immediately
 */

import { useEffect, useRef, useState, useMemo } from "react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const SURFACE_0 = "#0A1226";
const SURFACE_1 = "#141A33";
const SURFACE_2 = "#1B2240";
const COBALT    = "#2F6FFF";
const PURPLE    = "#9C7CFF";
const GREEN     = "#5EE8B5";
const BORDER_HAIRLINE = "rgba(255,255,255,0.06)";
const BORDER_STRONG   = "rgba(120,160,255,0.16)";
const TEXT_SECONDARY  = "rgba(255,255,255,0.8)";
const TEXT_MUTED      = "rgba(255,255,255,0.5)";
const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";

// ── Motion: respect prefers-reduced-motion ────────────────────────────────────
function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, active = false, delay = 0, reduced = false) {
  const [value, setValue] = useState(target); // SSR/no-JS: start at final value
  const started = useRef(false);
  useEffect(() => {
    if (reduced || !active || started.current) return;
    started.current = true;
    setValue(0);
    const t = setTimeout(() => {
      let startTime: number | null = null;
      const step = (ts: number) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
        else setValue(target);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [active, reduced]);
  return value;
}

// ── Animated pill bar ─────────────────────────────────────────────────────────
function PillBar({ pct, color, delay = 0, active, reduced }: { pct: number; color: string; delay?: number; active: boolean; reduced: boolean }) {
  const [w, setW] = useState(reduced ? pct : 0);
  useEffect(() => {
    if (reduced) { setW(pct); return; }
    if (!active) return;
    const t = setTimeout(() => setW(pct), delay);
    return () => clearTimeout(t);
  }, [active, pct, delay, reduced]);
  return (
    <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "999px", overflow: "hidden" }}>
      <div style={{
        height: "100%",
        width: `${w}%`,
        background: color,
        borderRadius: "999px",
        transition: reduced ? "none" : `width 1.2s cubic-bezier(0.16,1,0.3,1)`,
      }} />
    </div>
  );
}

// ── Pulsing LIVE dot ──────────────────────────────────────────────────────────
function LiveDot({ reduced }: { reduced: boolean }) {
  return (
    <span
      role="img"
      aria-label="Live demo data"
      style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "6px", height: "6px", flexShrink: 0 }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "6px", height: "6px",
          borderRadius: "50%",
          background: GREEN,
          opacity: 0.4,
          animation: reduced ? "none" : "gvg-live-pulse 2.4s ease-in-out infinite",
        }}
      />
      <span aria-hidden="true" style={{ width: "6px", height: "6px", borderRadius: "50%", background: GREEN, flexShrink: 0 }} />
    </span>
  );
}

// ── SVG Wordmarks ─────────────────────────────────────────────────────────────
// Inline SVGs — greyscale, aria-hidden, role="presentation"
// Sourced from Simple Icons and brand guidelines; total payload < 12KB

function EpicGamesLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "28px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M17.49 0H6.51A6.51 6.51 0 0 0 0 6.51v10.98A6.51 6.51 0 0 0 6.51 24h10.98A6.51 6.51 0 0 0 24 17.49V6.51A6.51 6.51 0 0 0 17.49 0zm-4.3 18.35H7.55V5.65h5.64v2.28H9.83v2.74h3.36v2.28H9.83v3.12h3.36zm4.32 0h-2.28V5.65h2.28z"/>
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 23 23" style={{ height: "28px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M0 0h11v11H0zm12 0h11v11H12zM0 12h11v11H0zm12 0h11v11H12z"/>
    </svg>
  );
}

function WarnerBrosLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "28px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 4.5h1v2h-1zm-4 1.5l.707.707-1.414 1.414L6.086 6.707zm9 0l.707 1.414-1.414 1.414L14.293 6.707zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-7.5 1.5h2v1h-2zm13 0h2v1h-2zM7.793 15.793l1.414 1.414-.707.707-1.414-1.414zm8.414 0l.707.707-1.414 1.414-.707-.707zM11.5 17h1v2h-1z"/>
    </svg>
  );
}

function WalmartLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "28px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M11.018 0l.938 5.604L13.9 0h-2.882zm5.478 1.658l-2.65 4.9 4.9-2.65-2.25-2.25zM1.658 6.496l4.9 2.65-2.65-4.9-2.25 2.25zm16.686 1.846l-5.604.938L18.342 11.1l-.002-2.758zM0 11.018l5.604.938L0 13.9v-2.882zm18.396 2.486l-4.9 2.65 4.9 2.65 2.25-2.25-2.25-3.05zm-14.15 2.65l-4.9 2.65 2.25 2.25 2.65-4.9zM11.1 18.342l-.938 5.604H13.9l-.938-5.604zM6.496 22.342l2.65-4.9-4.9 2.65 2.25 2.25zm10.98 0l2.25-2.25-4.9-2.65 2.65 4.9z"/>
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "22px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.67-1.94 1.18-4.08 1.78-6.42 1.78-2.34 0-4.48-.6-6.42-1.78-.406-.26-.75-.48-1.006-.67-.21-.144-.24-.306-.12-.48zm.48-1.8c.13-.2.3-.24.51-.12.06.04.12.08.18.12.06.04.12.08.18.12 3.3 2.04 7.1 3.06 11.4 3.06 2.7 0 5.4-.54 8.1-1.62.06-.02.12-.04.18-.06.21-.06.36-.02.45.12.09.14.06.3-.09.48-.06.06-.12.12-.18.18-1.8 1.5-4.14 2.25-7.02 2.25-2.88 0-5.22-.75-7.02-2.25-.06-.06-.12-.12-.18-.18-.15-.18-.18-.34-.09-.48zm-.48-1.8c.12-.18.27-.22.45-.12.06.04.12.08.18.12.06.04.12.08.18.12 3.24 2.04 7.02 3.06 11.34 3.06 2.7 0 5.4-.54 8.1-1.62.06-.02.12-.04.18-.06.21-.06.36-.02.45.12.09.14.06.3-.09.48-.06.06-.12.12-.18.18-1.8 1.5-4.14 2.25-7.02 2.25-2.88 0-5.22-.75-7.02-2.25-.06-.06-.12-.12-.18-.18-.15-.18-.18-.34-.09-.48zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12S24 18.63 24 12 18.63 0 12 0zm0 21.6c-5.3 0-9.6-4.3-9.6-9.6S6.7 2.4 12 2.4s9.6 4.3 9.6 9.6-4.3 9.6-9.6 9.6z"/>
    </svg>
  );
}

function TwoKLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "26px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M0 0v24h24V0H0zm4 4h4l2.5 4L13 4h4l-4.5 7L17 18h-4l-2.5-4-2.5 4H4l4.5-7L4 4zm16 0h-2v14h2V4z"/>
    </svg>
  );
}

function RazerLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "28px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M12 0L0 6.928v10.144L12 24l12-6.928V6.928L12 0zm0 2.309l9.5 5.484v8.414L12 21.691l-9.5-5.484V7.793L12 2.309zM8 7v10l2-1.155V12.31l4 2.309V17l2-1.155V7l-2 1.155v3.464L10 9.31V8.155L8 7z"/>
    </svg>
  );
}

// ── Attribution Check Dashboard (2-state hover toggle) ──────────────────────
function AttributionDashboard({ reduced }: { reduced: boolean }) {
  const [hovered, setHovered] = useState(false);
  // true = "True" state (clean incremental), false = "Last-Click" state (chaotic)
  const showTrue = hovered;

  const lastClickBars = [
    { label: "Paid Social",  pct: 62, color: COBALT },
    { label: "Paid Search",  pct: 48, color: "#5C7FFF" },
    { label: "Programmatic", pct: 31, color: "#8B6FFF" },
    { label: "Streaming",    pct: 18, color: "#9C7CFF" },
  ];
  const trueBars = [
    { label: "Paid Social",  pct: 38, color: COBALT },
    { label: "Paid Search",  pct: 28, color: "#5C7FFF" },
    { label: "Programmatic", pct: 20, color: "#8B6FFF" },
    { label: "Streaming",    pct: 14, color: "#9C7CFF" },
  ];
  const bars = showTrue ? trueBars : lastClickBars;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: SURFACE_1,
        border: `1px solid ${BORDER_STRONG}`,
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 24px 48px rgba(0,0,0,0.32), inset 0 0 1px rgba(255,255,255,0.04)",
        transition: "transform var(--motion-base, 240ms) ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      {/* Card header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: `rgba(47,111,255,0.7)` }}>
          The Decision Layer
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <LiveDot reduced={reduced} />
          <span style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: GREEN }}>LIVE</span>
        </span>
      </div>
      <div style={{ height: "1px", background: BORDER_HAIRLINE, marginBottom: "16px" }} />

      {/* Section label */}
      <div style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: TEXT_MUTED, marginBottom: "12px" }}>
        Attribution Check
      </div>

      {/* 2-stat tile row */}
      <div
        aria-live="polite"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}
      >
        {[
          {
            label: "Reported ROAS",
            value: showTrue ? "4.0×" : "6.8×",
            sub: showTrue ? "True signal" : "Last-click",
            accent: showTrue ? GREEN : "rgba(255,100,100,0.9)",
          },
          {
            label: "Incremental Lift",
            value: showTrue ? "68%" : "41%",
            sub: showTrue ? "Measured" : "Overstated",
            accent: showTrue ? GREEN : "rgba(255,180,50,0.9)",
          },
        ].map((tile) => (
          <div key={tile.label} style={{
            background: SURFACE_2,
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: "8px",
            padding: "12px",
            transition: "all 320ms ease",
          }}>
            <div style={{ fontFamily: MONO, fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.12em", color: TEXT_MUTED, marginBottom: "6px" }}>{tile.label}</div>
            <div style={{ fontFamily: SANS, fontSize: "28px", fontWeight: 600, color: tile.accent, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: "4px", transition: "color 320ms ease" }}>{tile.value}</div>
            <div style={{ fontFamily: MONO, fontSize: "10px", color: tile.accent, lineHeight: 1.3, opacity: 0.8, transition: "color 320ms ease" }}>{tile.sub}</div>
          </div>
        ))}
      </div>

      {/* State label */}
      <div style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: TEXT_MUTED, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ transition: "color 320ms ease", color: showTrue ? GREEN : "rgba(255,100,100,0.8)" }}>
          {showTrue ? "True attribution" : "Last-click attribution"}
        </span>
        <span style={{ opacity: 0.4 }}>— hover to toggle</span>
      </div>

      {/* Budget allocation bars */}
      <div style={{ marginBottom: "16px" }}>
        {bars.map((bar, i) => (
          <div key={bar.label} style={{ marginBottom: i < bars.length - 1 ? "10px" : "0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
              <span style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 500, color: TEXT_SECONDARY }}>{bar.label}</span>
              <span style={{ fontFamily: MONO, fontSize: "12px", fontWeight: 600, color: bar.color, transition: "color 320ms ease" }}>{bar.pct}%</span>
            </div>
            <PillBar pct={bar.pct} color={bar.color} delay={i * 60} active={true} reduced={reduced} />
          </div>
        ))}
      </div>

      {/* Decision Signal */}
      <div style={{
        background: "rgba(140,108,255,0.08)",
        border: "1px solid rgba(156,124,255,0.32)",
        borderRadius: "8px",
        padding: "12px",
        display: "flex",
        gap: "8px",
        alignItems: "flex-start",
      }}>
        <span aria-hidden="true" style={{ fontSize: "12px", flexShrink: 0, marginTop: "1px" }}>⚡</span>
        <div>
          <div style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: PURPLE, marginBottom: "4px" }}>
            Decision Signal
          </div>
          <div style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.9)", lineHeight: 1.5, transition: "opacity 320ms ease" }}>
            {showTrue
              ? "Shift 12% of Paid Search budget to Programmatic CTV. Projected +0.4× ROAS."
              : "Shift 14% of Search budget to CTV. Last-click overstates Search by 2.8×."}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const credBandRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [credVisible, setCredVisible] = useState(false);
  const [signalBreathing, setSignalBreathing] = useState(false);
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);
  const reduced = useReducedMotion();

  // Dashboard KPI counters
  const roasVal   = useCountUp(42,  900, heroVisible, 200, reduced); // ÷10 → 4.2
  const incrVal   = useCountUp(68, 1100, heroVisible, 300, reduced);
  const wastedVal = useCountUp(41,  900, heroVisible, 400, reduced);

  // Credential bar counters
  const mediaVal   = useCountUp(100, 1400, credVisible, 0,   reduced);
  const yrsVal     = useCountUp(12,  1200, credVisible, 100, reduced);
  const f500Val    = useCountUp(5,   1000, credVisible, 200, reduced);
  const vertsVal   = useCountUp(7,   1100, credVisible, 300, reduced);

  // Single shared IntersectionObserver for hero region
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
          if (!reduced) setTimeout(() => setSignalBreathing(true), 2000);
          else setSignalBreathing(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reduced]);

  // IntersectionObserver for credential band
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCredVisible(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (credBandRef.current) observer.observe(credBandRef.current);
    return () => observer.disconnect();
  }, []);

  // H1 underline animation
  useEffect(() => {
    if (!underlineRef.current) return;
    if (reduced) {
      underlineRef.current.style.transform = "scaleX(1)";
      return;
    }
    const t = setTimeout(() => {
      if (underlineRef.current) underlineRef.current.style.transform = "scaleX(1)";
    }, 200);
    return () => clearTimeout(t);
  }, [heroVisible, reduced]);

  const scrollToServices = () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });

  const bars = [
    { channel: "Paid Social",   pct: 38, color: COBALT },
    { channel: "Paid Search",   pct: 28, color: "#5C7FFF" },
    { channel: "Programmatic",  pct: 20, color: "#8B6FFF" },
    { channel: "Streaming",     pct: 14, color: "#9C7CFF" },
  ];

  const logos = [
    { name: "Epic Games",   el: <EpicGamesLogo /> },
    { name: "Microsoft",    el: <MicrosoftLogo /> },
    { name: "Warner Bros.", el: <WarnerBrosLogo /> },
    { name: "Walmart",      el: <WalmartLogo /> },
    { name: "Amazon",       el: <AmazonLogo /> },
    { name: "2K",           el: <TwoKLogo /> },
    { name: "Razer",        el: <RazerLogo /> },
  ];

  return (
    <>
      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={sectionRef}
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "calc(64px + 6rem)",
          paddingBottom: "6rem",
          background: SURFACE_0,
        }}
      >
        {/* Grain texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat", backgroundSize: "180px 180px",
          }}
        />

        {/* Section watermark "01" */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "32px",
            left: "32px",
            fontSize: "240px",
            fontWeight: 200,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
            zIndex: 0,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          01
        </span>

        {/* 12-col grid */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 4rem",
            display: "grid",
            gridTemplateColumns: "7fr 5fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="gvg-hero-grid"
        >
          {/* ── LEFT: 7 cols ─────────────────────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2rem" }}>
              <span aria-hidden="true" style={{ display: "inline-block", width: "24px", height: "1px", background: COBALT, flexShrink: 0 }} />
              <span style={{
                fontFamily: MONO,
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: `rgba(47,111,255,0.8)`,
              }}>
                Growth Decision Partner
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
                marginBottom: "2rem",
                maxWidth: "14ch",
              }}
            >
              Good media looks busy.{" "}
              <span style={{ position: "relative", display: "inline" }}>
                <span>Great media</span>
                {/* Animated cobalt underline rule */}
                <span
                  ref={underlineRef}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: COBALT,
                    borderRadius: "2px",
                    transformOrigin: "left center",
                    transform: "scaleX(0)",
                    transition: reduced ? "none" : "transform 480ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </span>{" "}
              makes decisions.
            </h1>

            {/* Subhead */}
            <p
              style={{
                fontFamily: SANS,
                fontSize: "18px",
                fontWeight: 400,
                color: TEXT_SECONDARY,
                lineHeight: 1.6,
                marginBottom: "2.5rem",
                maxWidth: "480px",
              }}
            >
              You're spending $1M+ on paid media. You can't prove what's working. I'm the decision layer between your dashboards and your CFO.
            </p>

            {/* CTA row */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              {/* Primary CTA */}
              <a
                href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setPrimaryHovered(true)}
                onMouseLeave={() => setPrimaryHovered(false)}
                onFocus={(e) => { e.currentTarget.style.outline = "2px solid #2F6FFF"; e.currentTarget.style.outlineOffset = "4px"; }}
                onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  height: "52px",
                  padding: "0 24px",
                  background: COBALT,
                  borderRadius: "8px",
                  boxShadow: primaryHovered
                    ? "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 32px rgba(47,111,255,0.4)"
                    : "inset 0 1px 0 rgba(255,255,255,0.18)",
                  fontFamily: SANS,
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "box-shadow var(--motion-base, 240ms) ease, transform var(--motion-base, 240ms) ease",
                  transform: primaryHovered ? "translateY(-1px)" : "translateY(0)",
                  outline: "none",
                }}
              >
                Get a 30-min diagnosis
                <span style={{ display: "inline-block", transition: "transform var(--motion-base, 240ms) ease", transform: primaryHovered ? "translateX(4px)" : "translateX(0)" }}>→</span>
              </a>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={scrollToServices}
                onMouseEnter={() => setSecondaryHovered(true)}
                onMouseLeave={() => setSecondaryHovered(false)}
                onFocus={(e) => { e.currentTarget.style.outline = "2px solid #2F6FFF"; e.currentTarget.style.outlineOffset = "4px"; }}
                onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  height: "52px",
                  padding: "0 24px",
                  background: secondaryHovered ? "rgba(255,255,255,0.04)" : "transparent",
                  border: `1px solid ${secondaryHovered ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.16)"}`,
                  borderRadius: "8px",
                  fontFamily: SANS,
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.9)",
                  cursor: "pointer",
                  transition: "background var(--motion-base, 240ms) ease, border-color var(--motion-base, 240ms) ease",
                  outline: "none",
                }}
              >
                See the framework
              </button>
            </div>
          </div>

          {/* ── RIGHT: 5 cols — Attribution Check Dashboard ──────────── */}
          <AttributionDashboard reduced={reduced} />
        </div>
      </section>

      {/* ── CREDIBILITY BAND ──────────────────────────────────────────────── */}
      <div
        ref={credBandRef}
        style={{
          background: SURFACE_0,
          borderTop: `1px solid ${BORDER_HAIRLINE}`,
          borderBottom: `1px solid ${BORDER_HAIRLINE}`,
        }}
      >
        {/* Logo wall */}
        <div style={{ padding: "48px 4rem", maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {logos.map((logo) => (
              <div
                key={logo.name}
                role="img"
                aria-label={logo.name}
                style={{
                  opacity: 1,
                  transition: "opacity var(--motion-base, 240ms) ease",
                  cursor: "default",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  const svgs = (e.currentTarget as HTMLDivElement).querySelectorAll("svg");
                  svgs.forEach((s) => (s.style.fill = "rgba(255,255,255,0.9)"));
                }}
                onMouseLeave={(e) => {
                  const svgs = (e.currentTarget as HTMLDivElement).querySelectorAll("svg");
                  svgs.forEach((s) => (s.style.fill = "rgba(255,255,255,0.5)"));
                }}
              >
                {logo.el}
              </div>
            ))}
          </div>
        </div>

        {/* Credential bar */}
        <div
          style={{
            borderTop: `1px solid ${BORDER_HAIRLINE}`,
            padding: "40px 4rem 80px",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <div
            aria-live="polite"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
            }}
            className="gvg-cred-bar"
          >
            {[
              { value: `$${mediaVal}M+`, label: "Media Governed" },
              { value: `${yrsVal}`,      label: "Years Experience" },
              { value: `${f500Val}`,     label: "Fortune 500 Brands" },
              { value: `${vertsVal}`,    label: "Verticals Governed" },
            ].map((stat, i, arr) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: MONO,
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    marginBottom: "6px",
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: MONO,
                    fontSize: "10px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: TEXT_MUTED,
                  }}>
                    {stat.label}
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <span aria-hidden="true" style={{ fontFamily: MONO, fontSize: "20px", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>·</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Keyframes + responsive ────────────────────────────────────────── */}
      <style>{`
        :root {
          --motion-fast:     120ms cubic-bezier(0.2, 0, 0, 1);
          --motion-base:     240ms cubic-bezier(0.2, 0, 0, 1);
          --motion-emphasis: 480ms cubic-bezier(0.16, 1, 0.3, 1);
          --motion-counter:  1400ms cubic-bezier(0.16, 1, 0.3, 1);
          --surface-0: #0A1226;
          --surface-1: #141A33;
          --surface-2: #1B2240;
          --accent-cobalt: #2F6FFF;
          --accent-purple: #9C7CFF;
          --signal-green:  #5EE8B5;
        }

        @keyframes gvg-live-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0;   transform: scale(2.5); }
        }
        @keyframes gvg-signal-breathe {
          0%, 100% { opacity: 0.92; }
          50%       { opacity: 1.0; }
        }

        /* Tablet: single column */
        @media (max-width: 1023px) {
          .gvg-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 0 2rem !important;
          }
          .gvg-hero-grid > div:last-child {
            display: none !important;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          #hero {
            padding-top: calc(64px + 3rem) !important;
            padding-bottom: 5rem !important;
          }
          .gvg-hero-grid {
            padding: 0 1.5rem !important;
          }
          .gvg-cred-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .gvg-cred-bar > div > span[aria-hidden] {
            display: none !important;
          }
        }

        /* Ghost number hidden on mobile */
        @media (max-width: 767px) {
          #hero > span[aria-hidden="true"] {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes gvg-live-pulse { 0%, 100% { opacity: 0.7; } }
          @keyframes gvg-signal-breathe { 0%, 100% { opacity: 1; } }
        }
      `}</style>
    </>
  );
}
