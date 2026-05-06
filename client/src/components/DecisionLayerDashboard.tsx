/* DecisionLayerDashboard - GvG Brand Dashboard Variant 01
   Section 03 (ServicesSection) visual artifact
   Shows the three-tier pipeline as a live data flow:
   Measurement → Budget Logic → AI Tools → Decision Output
   Design: matches hero dashboard - IBM Plex Mono, Electric Blue, dark surfaces, animated */

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

// Animated counter hook
function useCounter(target: number, duration = 1200, active: boolean = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

// Pulsing dot
function LiveDot({ color = GREEN }: { color?: string }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "8px", height: "8px", flexShrink: 0 }}>
      <span style={{
        position: "absolute", width: "8px", height: "8px", borderRadius: "50%",
        background: color, opacity: 0.3,
        animation: "gvg-pulse 2s ease-in-out infinite",
      }} />
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: color, flexShrink: 0 }} />
    </span>
  );
}

// Animated bar
function AnimBar({ pct, color, delay = 0, active }: { pct: number; color: string; delay?: number; active: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setW(pct), delay);
    return () => clearTimeout(t);
  }, [active, pct, delay]);
  return (
    <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: "2px", transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 6px ${color}55` }} />
    </div>
  );
}

// Tier row in the pipeline
function TierRow({ num, title, status, value, color, active }: {
  num: string; title: string; status: string; value: string; color: string; active: boolean;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setVisible(true), parseInt(num.replace("TIER ", "")) * 220);
    return () => clearTimeout(t);
  }, [active, num]);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "0.625rem",
      padding: "0.625rem 0.75rem",
      background: visible ? "rgba(41,121,255,0.06)" : SURFACE,
      border: `1px solid ${visible ? "rgba(41,121,255,0.18)" : BORDER}`,
      borderRadius: "6px",
      transition: "all 0.4s ease",
      opacity: visible ? 1 : 0.45,
    }}>
      <div style={{ fontFamily: MONO, fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.1em", color: visible ? BLUE : DIM, minWidth: "42px" }}>{num}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: MONO, fontSize: "0.62rem", color: visible ? "#FFFFFF" : MID, fontWeight: 600 }}>{title}</div>
        <div style={{ fontFamily: MONO, fontSize: "0.52rem", color: DIM, marginTop: "0.1rem" }}>{status}</div>
      </div>
      <div style={{ fontFamily: MONO, fontSize: "0.68rem", fontWeight: 700, color: color }}>{value}</div>
      {visible && <LiveDot color={color} />}
    </div>
  );
}

export default function DecisionLayerDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [signalVisible, setSignalVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          setTimeout(() => setSignalVisible(true), 1400);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const confidence = useCounter(94, 1400, active);
  const signals = useCounter(12, 1000, active);
  const latency = useCounter(340, 900, active);

  return (
    <div
      ref={ref}
      style={{
        background: "#0D1117",
        border: "1px solid rgba(41,121,255,0.18)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 40px rgba(41,121,255,0.08), 0 20px 60px rgba(0,0,0,0.5)",
        fontFamily: MONO,
      }}
    >
      {/* Header bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.625rem 0.875rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(41,121,255,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <LiveDot color={BLUE} />
          <span style={{ fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: BLUE }}>Decision Layer Pipeline</span>
        </div>
        <div style={{ display: "flex", gap: "0.875rem" }}>
          {[
            { label: "Confidence", val: `${confidence}%`, color: GREEN },
            { label: "Signals", val: `${signals}`, color: BLUE },
            { label: "Latency", val: `${latency}ms`, color: AMBER },
          ].map((m) => (
            <div key={m.label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.48rem", textTransform: "uppercase", letterSpacing: "0.08em", color: DIM }}>{m.label}</div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, color: m.color }}>{m.val}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0.875rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* Three-tier pipeline */}
        <TierRow num="TIER 01" title="Measurement Infrastructure" status="MMM · Incrementality · Brand Lift" value="✓ LIVE" color={GREEN} active={active} />

        {/* Connector arrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0 0.75rem" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(41,121,255,0.2)" }} />
          <span style={{ fontFamily: MONO, fontSize: "0.48rem", color: "rgba(41,121,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>feeds</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(41,121,255,0.2)" }} />
        </div>

        <TierRow num="TIER 02" title="Cross-Channel Budget Strategy" status="Allocation · Saturation · ROAS" value="↑ 0.4×" color={BLUE} active={active} />

        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "0 0.75rem" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(41,121,255,0.2)" }} />
          <span style={{ fontFamily: MONO, fontSize: "0.48rem", color: "rgba(41,121,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>governs</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(41,121,255,0.2)" }} />
        </div>

        <TierRow num="TIER 03" title="AI-Native Decision Tools" status="Calculators · Dashboards · Alerts" value="12 SIG" color={AMBER} active={active} />

        {/* Outcome signal */}
        <div style={{
          marginTop: "0.25rem",
          padding: "0.75rem",
          background: signalVisible ? "rgba(41,121,255,0.08)" : "rgba(255,255,255,0.02)",
          border: `1px solid ${signalVisible ? "rgba(41,121,255,0.25)" : BORDER}`,
          borderRadius: "8px",
          transition: "all 0.5s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.7rem" }}>🎯</span>
            <span style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", color: signalVisible ? BLUE : DIM }}>Outcome · Decisions Leadership Can Trust</span>
          </div>
          {/* Confidence bars */}
          {[
            { label: "Measurement Confidence", pct: 94, color: GREEN, delay: 200 },
            { label: "Budget Defensibility", pct: 88, color: BLUE, delay: 400 },
            { label: "Exec Alignment", pct: 96, color: AMBER, delay: 600 },
          ].map((b) => (
            <div key={b.label} style={{ marginBottom: "0.4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.15rem" }}>
                <span style={{ fontFamily: SANS, fontSize: "0.62rem", color: MID }}>{b.label}</span>
                <span style={{ fontFamily: MONO, fontSize: "0.58rem", color: b.color }}>{b.pct}%</span>
              </div>
              <AnimBar pct={b.pct} color={b.color} delay={b.delay} active={signalVisible} />
            </div>
          ))}
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
