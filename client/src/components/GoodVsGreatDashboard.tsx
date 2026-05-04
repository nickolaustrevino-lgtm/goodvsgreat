/* GoodVsGreatDashboard — GvG Brand Dashboard Variant 02
   Section 04 (GoodVsGreatBlock) visual artifact
   Split-screen: LEFT = "Good" (attribution theater, last-click, busy charts)
                 RIGHT = "Great" (incremental truth, clean decision signal)
   Design: matches hero dashboard — IBM Plex Mono, Electric Blue, animated */

import { useEffect, useRef, useState } from "react";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const GREEN = "#4ADE80";
const RED = "#F87171";
const AMBER = "#FBBF24";
const DIM = "rgba(255,255,255,0.28)";
const MID = "rgba(255,255,255,0.5)";

function AnimBar({ pct, color, delay = 0, active }: { pct: number; color: string; delay?: number; active: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setW(pct), delay);
    return () => clearTimeout(t);
  }, [active, pct, delay]);
  return (
    <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: "2px", transition: "width 1s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 5px ${color}44` }} />
    </div>
  );
}

function useCounter(target: number, duration = 1200, active = false, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setVal(Math.round(p * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, duration, delay]);
  return val;
}

// Sparkline — fake waveform path
function Sparkline({ color, noisy = false }: { color: string; noisy?: boolean }) {
  const points = noisy
    ? "0,18 8,6 16,22 24,4 32,20 40,8 48,24 56,10 64,18 72,5 80,22 88,12 96,20 104,8 112,16"
    : "0,22 16,20 32,16 48,12 64,10 80,7 96,5 112,4";
  return (
    <svg width="112" height="28" viewBox="0 0 112 28" fill="none" style={{ display: "block" }}>
      <polyline points={points} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={0.8} />
    </svg>
  );
}

// Panel: "Good" side — attribution theater
function GoodPanel({ active }: { active: boolean }) {
  const roas = useCounter(4.2, 900, active, 100);
  return (
    <div style={{
      flex: 1,
      background: "rgba(255,255,255,0.02)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      padding: "0.875rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.625rem",
    }}>
      {/* Panel header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>Good</span>
        <span style={{
          fontFamily: MONO, fontSize: "0.44rem", textTransform: "uppercase", letterSpacing: "0.08em",
          color: AMBER, background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)",
          borderRadius: "3px", padding: "0.1rem 0.35rem",
        }}>Last-Click</span>
      </div>

      {/* Big vanity ROAS */}
      <div style={{ padding: "0.625rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "6px" }}>
        <div style={{ fontFamily: MONO, fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, marginBottom: "0.2rem" }}>Reported ROAS</div>
        <div style={{ fontFamily: MONO, fontSize: "1.4rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>{roas.toFixed(1)}×</div>
        <div style={{ fontFamily: MONO, fontSize: "0.52rem", color: GREEN, marginTop: "0.15rem" }}>↑ looks great</div>
        <Sparkline color={GREEN} noisy />
      </div>

      {/* Channel breakdown — all channels claim credit */}
      <div>
        <div style={{ fontFamily: MONO, fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, marginBottom: "0.4rem" }}>Channel Attribution</div>
        {[
          { ch: "Paid Social", pct: 38, color: AMBER },
          { ch: "Paid Search", pct: 34, color: AMBER },
          { ch: "Display", pct: 18, color: AMBER },
          { ch: "Email", pct: 10, color: AMBER },
        ].map((c, i) => (
          <div key={c.ch} style={{ marginBottom: "0.35rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.12rem" }}>
              <span style={{ fontFamily: SANS, fontSize: "0.6rem", color: MID }}>{c.ch}</span>
              <span style={{ fontFamily: MONO, fontSize: "0.56rem", color: AMBER }}>{c.pct}%</span>
            </div>
            <AnimBar pct={c.pct} color={AMBER} delay={i * 100 + 300} active={active} />
          </div>
        ))}
        <div style={{ fontFamily: MONO, fontSize: "0.48rem", color: "rgba(251,191,36,0.5)", marginTop: "0.3rem" }}>⚠ Total: 100% — every channel claims full credit</div>
      </div>

      {/* No decision signal */}
      <div style={{ padding: "0.5rem 0.625rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }}>
        <div style={{ fontFamily: MONO, fontSize: "0.52rem", color: "rgba(255,255,255,0.2)" }}>No decision signal available.</div>
        <div style={{ fontFamily: MONO, fontSize: "0.48rem", color: "rgba(255,255,255,0.12)", marginTop: "0.15rem" }}>Optimize for reported ROAS.</div>
      </div>
    </div>
  );
}

// Panel: "Great" side — incremental truth
function GreatPanel({ active }: { active: boolean }) {
  const incr = useCounter(68, 1100, active, 200);
  const wasted = useCounter(41, 900, active, 300);
  const [signalOn, setSignalOn] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setSignalOn(true), 1200);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div style={{
      flex: 1,
      background: "rgba(41,121,255,0.03)",
      padding: "0.875rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.625rem",
    }}>
      {/* Panel header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", color: BLUE }}>Great</span>
        <span style={{
          fontFamily: MONO, fontSize: "0.44rem", textTransform: "uppercase", letterSpacing: "0.08em",
          color: GREEN, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)",
          borderRadius: "3px", padding: "0.1rem 0.35rem",
        }}>Incremental</span>
      </div>

      {/* Incremental ROAS */}
      <div style={{ padding: "0.625rem", background: "rgba(41,121,255,0.06)", border: "1px solid rgba(41,121,255,0.18)", borderRadius: "6px" }}>
        <div style={{ fontFamily: MONO, fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(41,121,255,0.6)", marginBottom: "0.2rem" }}>Incremental Lift</div>
        <div style={{ fontFamily: MONO, fontSize: "1.4rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>{incr}%</div>
        <div style={{ fontFamily: MONO, fontSize: "0.52rem", color: GREEN, marginTop: "0.15rem" }}>↑ proven causal</div>
        <Sparkline color={BLUE} />
      </div>

      {/* True channel contribution */}
      <div>
        <div style={{ fontFamily: MONO, fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, marginBottom: "0.4rem" }}>True Contribution</div>
        {[
          { ch: "Paid Social", pct: 52, color: BLUE },
          { ch: "Paid Search", pct: 18, color: "#6366F1" },
          { ch: "Display", pct: 8, color: "#8B5CF6" },
          { ch: "Email", pct: 22, color: "#A78BFA" },
        ].map((c, i) => (
          <div key={c.ch} style={{ marginBottom: "0.35rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.12rem" }}>
              <span style={{ fontFamily: SANS, fontSize: "0.6rem", color: MID }}>{c.ch}</span>
              <span style={{ fontFamily: MONO, fontSize: "0.56rem", color: c.color }}>{c.pct}%</span>
            </div>
            <AnimBar pct={c.pct} color={c.color} delay={i * 100 + 300} active={active} />
          </div>
        ))}
        <div style={{ fontFamily: MONO, fontSize: "0.48rem", color: "rgba(74,222,128,0.6)", marginTop: "0.3rem" }}>✓ Wasted spend identified: ${wasted}K</div>
      </div>

      {/* Decision signal */}
      <div style={{
        padding: "0.5rem 0.625rem",
        background: signalOn ? "rgba(41,121,255,0.08)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${signalOn ? "rgba(41,121,255,0.25)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "6px",
        transition: "all 0.5s ease",
      }}>
        <div style={{ fontFamily: MONO, fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.08em", color: signalOn ? BLUE : DIM, marginBottom: "0.2rem" }}>⚡ Decision Signal</div>
        <div style={{ fontFamily: SANS, fontSize: "0.62rem", color: signalOn ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)", lineHeight: 1.5, transition: "color 0.5s ease" }}>
          Shift 14% from Search → CTV. Projected +0.4× true ROAS.
        </div>
      </div>
    </div>
  );
}

export default function GoodVsGreatDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setActive(true); obs.disconnect(); }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#0D1117",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 40px rgba(41,121,255,0.06), 0 20px 60px rgba(0,0,0,0.5)",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.625rem 0.875rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <span style={{ fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>Attribution Comparison · Same Campaign</span>
        <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.48rem", color: AMBER }}>Last-Click</span>
          <span style={{ fontFamily: MONO, fontSize: "0.48rem", color: "rgba(255,255,255,0.2)" }}>vs</span>
          <span style={{ fontFamily: MONO, fontSize: "0.48rem", color: GREEN }}>Incremental</span>
        </div>
      </div>

      {/* Split panels */}
      <div style={{ display: "flex" }}>
        <GoodPanel active={active} />
        <GreatPanel active={active} />
      </div>
    </div>
  );
}
