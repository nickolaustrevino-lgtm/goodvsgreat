/* CaseStudyDashboard — GvG Brand Dashboard Variant 03
   Section 05 (ProofSection) visual artifact
   Shows Fab Marketplace case study results as a live metrics dashboard:
   - Measurement system built from scratch
   - 10 global markets, privacy-first
   - Incrementality proven, wasted spend recovered
   Design: matches hero dashboard — IBM Plex Mono, Electric Blue, animated counters */

import { useEffect, useRef, useState } from "react";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const GREEN = "#4ADE80";
const RED = "#F87171";
const AMBER = "#FBBF24";
const SURFACE = "rgba(255,255,255,0.04)";
const BORDER = "rgba(255,255,255,0.07)";
const DIM = "rgba(255,255,255,0.28)";
const MID = "rgba(255,255,255,0.5)";

function useCounter(target: number, duration = 1400, active = false, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      let start: number | null = null;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, duration, delay]);
  return val;
}

function AnimBar({ pct, color, delay = 0, active }: { pct: number; color: string; delay?: number; active: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setW(pct), delay);
    return () => clearTimeout(t);
  }, [active, pct, delay]);
  return (
    <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: "2px", transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}44` }} />
    </div>
  );
}

function LiveDot({ color = GREEN }: { color?: string }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "8px", height: "8px", flexShrink: 0 }}>
      <span style={{ position: "absolute", width: "8px", height: "8px", borderRadius: "50%", background: color, opacity: 0.3, animation: "gvg-pulse 2s ease-in-out infinite" }} />
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0 }} />
    </span>
  );
}

// Mini sparkline for a KPI card
function MiniSpark({ color, up = true }: { color: string; up?: boolean }) {
  const pts = up
    ? "0,20 14,18 28,14 42,11 56,8 70,6 84,4 98,2"
    : "0,4 14,7 28,10 42,12 56,14 70,16 84,18 98,20";
  return (
    <svg width="98" height="22" viewBox="0 0 98 22" fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={0.7} />
    </svg>
  );
}

// KPI card
function KpiCard({ label, value, delta, up, color, delay, active }: {
  label: string; value: string; delta: string; up: boolean; color: string; delay: number; active: boolean;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  return (
    <div style={{
      background: visible ? `rgba(${color === BLUE ? "41,121,255" : color === GREEN ? "74,222,128" : "248,113,113"},0.06)` : SURFACE,
      border: `1px solid ${visible ? `rgba(${color === BLUE ? "41,121,255" : color === GREEN ? "74,222,128" : "248,113,113"},0.2)` : BORDER}`,
      borderRadius: "8px",
      padding: "0.75rem",
      transition: "all 0.5s ease",
      opacity: visible ? 1 : 0.4,
    }}>
      <div style={{ fontFamily: MONO, fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, marginBottom: "0.3rem" }}>{label}</div>
      <div style={{ fontFamily: MONO, fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1, marginBottom: "0.2rem" }}>{value}</div>
      <div style={{ fontFamily: MONO, fontSize: "0.52rem", color: up ? GREEN : RED, marginBottom: "0.35rem" }}>{delta}</div>
      <MiniSpark color={color} up={up} />
    </div>
  );
}

// Market row
function MarketRow({ market, status, lift, color, delay, active }: {
  market: string; status: string; lift: string; color: string; delay: number; active: boolean;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.5rem",
      padding: "0.375rem 0",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-8px)",
      transition: "all 0.4s ease",
    }}>
      {visible && <LiveDot color={color} />}
      <span style={{ fontFamily: SANS, fontSize: "0.62rem", color: MID, flex: 1 }}>{market}</span>
      <span style={{ fontFamily: MONO, fontSize: "0.52rem", color: DIM }}>{status}</span>
      <span style={{ fontFamily: MONO, fontSize: "0.62rem", fontWeight: 700, color }}>{lift}</span>
    </div>
  );
}

export default function CaseStudyDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [phase2, setPhase2] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          setTimeout(() => setPhase2(true), 1600);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const markets = useCounter(10, 800, active, 400);
  const lift = useCounter(68, 1200, active, 200);
  const recovered = useCounter(41, 1000, active, 300);
  const confidence = useCounter(94, 1100, active, 100);

  return (
    <div
      ref={ref}
      style={{
        background: "#0D1117",
        border: "1px solid rgba(41,121,255,0.15)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 50px rgba(41,121,255,0.07), 0 24px 64px rgba(0,0,0,0.55)",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.625rem 0.875rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(41,121,255,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LiveDot color={BLUE} />
          <span style={{ fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: BLUE }}>Fab Marketplace · Measurement Results</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.48rem", color: DIM }}>Epic Games · Global</span>
          <span style={{
            fontFamily: MONO, fontSize: "0.44rem", textTransform: "uppercase",
            color: GREEN, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)",
            borderRadius: "3px", padding: "0.1rem 0.35rem",
          }}>Privacy-First</span>
        </div>
      </div>

      <div style={{ padding: "0.875rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {/* KPI grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
          <KpiCard label="Incremental Lift" value={`${lift}%`} delta="↑ proven causal" up color={BLUE} delay={100} active={active} />
          <KpiCard label="Wasted Spend" value={`$${recovered}K`} delta="↓ recovered" up={false} color={RED} delay={250} active={active} />
          <KpiCard label="Markets Live" value={`${markets}`} delta="↑ simultaneous" up color={GREEN} delay={400} active={active} />
          <KpiCard label="Model Confidence" value={`${confidence}%`} delta="↑ vs baseline" up color={AMBER} delay={550} active={active} />
        </div>

        {/* Budget reallocation bars */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "0.75rem" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, marginBottom: "0.625rem" }}>Budget Reallocation · Post-Measurement</div>
          {[
            { label: "Paid Social (↑ incremental)", before: 28, after: 45, color: BLUE },
            { label: "Paid Search (↓ diminishing)", before: 42, after: 22, color: "#6366F1" },
            { label: "Programmatic CTV (↑ new)", before: 12, after: 24, color: "#8B5CF6" },
            { label: "Display (↓ wasted)", before: 18, after: 9, color: "#A78BFA" },
          ].map((b, i) => (
            <div key={b.label} style={{ marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
                <span style={{ fontFamily: SANS, fontSize: "0.62rem", color: MID }}>{b.label}</span>
                <span style={{ fontFamily: MONO, fontSize: "0.56rem", color: "rgba(255,255,255,0.35)" }}>
                  <span style={{ color: "rgba(255,255,255,0.25)", textDecoration: "line-through", marginRight: "0.35rem" }}>{b.before}%</span>
                  <span style={{ color: b.after > b.before ? GREEN : RED }}>{b.after}%</span>
                </span>
              </div>
              <AnimBar pct={b.after} color={b.color} delay={i * 120 + 600} active={active} />
            </div>
          ))}
        </div>

        {/* Market status table */}
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "8px", padding: "0.75rem" }}>
          <div style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM, marginBottom: "0.5rem" }}>Global Market Incrementality</div>
          {[
            { market: "United States", status: "Holdout complete", lift: "+74%", color: GREEN },
            { market: "United Kingdom", status: "Holdout complete", lift: "+61%", color: GREEN },
            { market: "Germany", status: "Holdout complete", lift: "+58%", color: GREEN },
            { market: "Japan", status: "Holdout complete", lift: "+82%", color: GREEN },
            { market: "Brazil", status: "Holdout complete", lift: "+49%", color: BLUE },
            { market: "+ 5 more markets", status: "All verified", lift: "↑ avg 63%", color: BLUE },
          ].map((m, i) => (
            <MarketRow key={m.market} {...m} delay={i * 120 + 900} active={phase2} />
          ))}
        </div>

        {/* Outcome signal */}
        <div style={{
          padding: "0.625rem 0.75rem",
          background: phase2 ? "rgba(41,121,255,0.08)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${phase2 ? "rgba(41,121,255,0.25)" : BORDER}`,
          borderRadius: "8px",
          transition: "all 0.5s ease",
          display: "flex", gap: "0.5rem", alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "0.7rem", flexShrink: 0, marginTop: "1px" }}>⚡</span>
          <div>
            <div style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.08em", color: phase2 ? BLUE : DIM, marginBottom: "0.2rem" }}>Outcome</div>
            <div style={{ fontFamily: SANS, fontSize: "0.7rem", color: phase2 ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)", lineHeight: 1.5, transition: "color 0.5s ease" }}>
              Measurement system built from scratch. 10 markets. Privacy-first. Finance-defensible. One answer: what is actually working.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gvg-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
