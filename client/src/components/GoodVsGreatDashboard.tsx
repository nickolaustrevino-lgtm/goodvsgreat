/* GoodVsGreatDashboard - GvG Brand Dashboard Variant 02 (v2)
   Section 04 (GoodVsGreatBlock) visual artifact
   Design critique v2 - all fixes applied:
   - Headline stats obnoxiously large (64-72px)
   - Color discipline: 4 tokens only (amber, blue, purple accent, green)
   - Pill bars (6px, border-radius 999)
   - Animated bar re-allocation: right bars start at left bar widths, animate to true values
   - Vertical 1px hairline divider between columns
   - Dashed empty-state with lock icon on left
   - Breathing Decision Signal (opacity loop)
   - "What you'd do next" closing row on both sides
   - Counters animate on viewport entry
   - Toggle pills with accent border + inner highlight */

import { useEffect, useRef, useState } from "react";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";

// 4 color tokens only
const AMBER = "#FBBF24";       // warning - left/last-click
const BLUE = "#2979FF";        // signal - right/incremental primary
const PURPLE = "#9C7CFF";      // accent - Decision Signal + Email
const GREEN = "#4ADE80";       // success - footnote ✓ only
const DIM = "rgba(255,255,255,0.28)";
const MID = "rgba(255,255,255,0.55)";
const HIGH = "rgba(255,255,255,0.9)";

// Left-side channel data (last-click)
const LEFT_CHANNELS = [
  { ch: "Paid Social",  pct: 38 },
  { ch: "Paid Search",  pct: 34 },
  { ch: "Display",      pct: 18 },
  { ch: "Email",        pct: 10 },
];

// Right-side channel data (incremental truth)
const RIGHT_CHANNELS = [
  { ch: "Paid Social",  pct: 52, color: BLUE },
  { ch: "Paid Search",  pct: 18, color: BLUE },
  { ch: "Display",      pct:  8, color: BLUE },
  { ch: "Email",        pct: 22, color: PURPLE },  // purple = newly-discovered
];

function useCounter(target: number, duration = 1200, active = false, delay = 0) {
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

// Pill bar - starts at `from` width, animates to `to` width
function PillBar({ from, to, color, delay = 0, active }: {
  from: number; to: number; color: string; delay?: number; active: boolean;
}) {
  const [w, setW] = useState(from); // start at the "from" position
  useEffect(() => {
    if (!active) return;
    // First render at `from` immediately, then after delay animate to `to`
    setW(from);
    const t = setTimeout(() => setW(to), delay);
    return () => clearTimeout(t);
  }, [active, from, to, delay]);
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

// Sparkline - noisy (left) or smooth ascending (right)
function Sparkline({ noisy = false, color }: { noisy?: boolean; color: string }) {
  const pts = noisy
    ? "0,18 10,5 20,22 30,3 40,19 50,7 60,23 70,9 80,17 90,4 100,20 110,10 120,16"
    : "0,22 20,19 40,15 60,11 80,7 100,5 120,3";
  return (
    <svg width="120" height="26" viewBox="0 0 120 26" fill="none" style={{ display: "block", marginTop: "0.25rem" }}>
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={0.75} />
    </svg>
  );
}

// Column header pill
function TogglePill({ label, color, active: on }: { label: string; color: string; active: boolean }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em",
      color: on ? color : DIM,
      background: on ? `rgba(${color === AMBER ? "251,191,36" : "41,121,255"},0.1)` : "transparent",
      border: `1px solid ${on ? color : "rgba(255,255,255,0.1)"}`,
      borderRadius: "4px", padding: "0.2rem 0.5rem",
      boxShadow: on ? `inset 0 1px 0 rgba(255,255,255,0.08)` : "none",
      transition: "all 0.3s ease",
    }}>{label}</span>
  );
}

export default function GoodVsGreatDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [signalBreathing, setSignalBreathing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          setTimeout(() => setSignalBreathing(true), 1800);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Headline counters
  const roasInt = useCounter(4, 900, active, 100);
  const roasDec = useCounter(0, 900, active, 100); // will show 4.0
  const incrPct = useCounter(68, 1100, active, 200);
  const wasted = useCounter(41, 900, active, 400);

  return (
    <div
      ref={ref}
      style={{
        background: "#0D1117",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 50px rgba(41,121,255,0.06), 0 24px 64px rgba(0,0,0,0.55)",
      }}
    >
      {/* ── Header bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.625rem 1rem",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.02)",
      }}>
        <span style={{ fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>
          Attribution Comparison · Same Campaign
        </span>
        {/* Divider rule beneath header content */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <TogglePill label="Last-Click" color={AMBER} active={true} />
          <span style={{ fontFamily: MONO, fontSize: "0.48rem", color: "rgba(255,255,255,0.15)" }}>vs</span>
          <TogglePill label="Incremental" color={BLUE} active={true} />
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div style={{ display: "flex", position: "relative" }}>

        {/* Vertical hairline divider */}
        <div style={{
          position: "absolute", left: "50%", top: "1rem", bottom: "1rem",
          width: "1px", background: "rgba(255,255,255,0.07)", zIndex: 1,
        }} />

        {/* ══ LEFT - Good / Last-Click ══ */}
        <div style={{ flex: 1, padding: "1.5rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Headline stat */}
          <div>
            <div style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(251,191,36,0.55)", marginBottom: "0.375rem" }}>
              Reported ROAS
            </div>
            <div style={{ fontFamily: MONO, fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 600, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.03em" }}>
              {roasInt}.{roasDec}<span style={{ fontSize: "0.4em", color: AMBER, marginLeft: "0.15em" }}>×</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.65rem", fontStyle: "italic", color: "rgba(251,191,36,0.55)", marginTop: "0.25rem", opacity: 0.8 }}>
              ↑ looks great
            </div>
            <Sparkline noisy color={AMBER} />
          </div>

          {/* Channel attribution bars */}
          <div>
            <div style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, marginBottom: "0.75rem" }}>
              Channel Attribution
            </div>
            {LEFT_CHANNELS.map((c, i) => (
              <div key={c.ch} style={{ marginBottom: "0.625rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: SANS, fontSize: "0.8125rem", fontWeight: 500, color: HIGH }}>{c.ch}</span>
                  <span style={{ fontFamily: MONO, fontSize: "0.8125rem", fontWeight: 600, color: AMBER }}>{c.pct}%</span>
                </div>
                <PillBar from={0} to={c.pct} color={AMBER} delay={i * 100 + 300} active={active} />
              </div>
            ))}
            <div style={{ fontFamily: MONO, fontSize: "0.6rem", color: "rgba(251,191,36,0.55)", marginTop: "0.5rem" }}>
              ⚠ Total: 100% - every channel claims full credit
            </div>
          </div>

          {/* Empty state - dashed, intentional */}
          <div style={{
            padding: "0.75rem 0.875rem",
            border: "1px dashed rgba(255,255,255,0.15)",
            borderRadius: "8px",
            display: "flex", gap: "0.5rem", alignItems: "flex-start",
          }}>
            <span style={{ fontSize: "0.85rem", flexShrink: 0, opacity: 0.4, marginTop: "1px" }}>🔒</span>
            <div>
              <div style={{ fontFamily: MONO, fontSize: "0.6rem", color: "rgba(255,255,255,0.35)", marginBottom: "0.2rem" }}>No decision signal available.</div>
              <div style={{ fontFamily: MONO, fontSize: "0.55rem", color: "rgba(255,255,255,0.2)" }}>Optimize for reported ROAS.</div>
            </div>
          </div>

          {/* What you'd do next - wrong move */}
          <div style={{
            padding: "0.75rem 0.875rem",
            background: "rgba(251,191,36,0.05)",
            border: "1px solid rgba(251,191,36,0.15)",
            borderRadius: "8px",
          }}>
            <div style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(251,191,36,0.5)", marginBottom: "0.35rem" }}>
              What you'd do next
            </div>
            <div style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Scale Paid Social. Cut Email.
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.55rem", fontStyle: "italic", color: "rgba(251,191,36,0.4)", marginTop: "0.25rem" }}>
              ← the wrong move
            </div>
          </div>
        </div>

        {/* ══ RIGHT - Great / Incremental ══ */}
        <div style={{ flex: 1, padding: "1.5rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: "1.5rem", background: "rgba(41,121,255,0.02)" }}>

          {/* Headline stat */}
          <div>
            <div style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(41,121,255,0.65)", marginBottom: "0.375rem" }}>
              Incremental Lift
            </div>
            <div style={{ fontFamily: MONO, fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 600, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.03em" }}>
              {incrPct}<span style={{ fontSize: "0.4em", color: BLUE, marginLeft: "0.1em" }}>%</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.65rem", fontStyle: "italic", color: "rgba(41,121,255,0.55)", marginTop: "0.25rem", opacity: 0.8 }}>
              ↑ proven causal
            </div>
            <Sparkline color={BLUE} />
          </div>

          {/* True contribution bars - animate from left bar widths */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>True Contribution</span>
              {/* Inline legend */}
              <div style={{ display: "flex", gap: "0.625rem", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: BLUE, display: "inline-block" }} />
                  <span style={{ fontFamily: MONO, fontSize: "0.44rem", color: DIM }}>Tracked</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: PURPLE, display: "inline-block" }} />
                  <span style={{ fontFamily: MONO, fontSize: "0.44rem", color: DIM }}>Newly-discovered</span>
                </span>
              </div>
            </div>
            {RIGHT_CHANNELS.map((c, i) => (
              <div key={c.ch} style={{ marginBottom: "0.625rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: SANS, fontSize: "0.8125rem", fontWeight: 500, color: HIGH }}>{c.ch}</span>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", textDecoration: "line-through" }}>{LEFT_CHANNELS[i].pct}%</span>
                    <span style={{ fontFamily: MONO, fontSize: "0.8125rem", fontWeight: 600, color: c.color }}>{c.pct}%</span>
                  </div>
                </div>
                {/* Starts at left bar width, re-allocates to true value */}
                <PillBar from={LEFT_CHANNELS[i].pct} to={c.pct} color={c.color} delay={i * 120 + 600} active={active} />
              </div>
            ))}
            <div style={{ fontFamily: MONO, fontSize: "0.6rem", color: "rgba(74,222,128,0.7)", marginTop: "0.5rem" }}>
              ✓ Wasted spend identified: ${wasted}K
            </div>
          </div>

          {/* Decision Signal - breathing glow */}
          <div style={{
            padding: "0.875rem",
            background: "rgba(41,121,255,0.08)",
            border: "1px solid rgba(156,124,255,0.3)",
            borderRadius: "8px",
            boxShadow: signalBreathing ? "0 0 24px rgba(156,124,255,0.16)" : "none",
            animation: signalBreathing ? "gvg-breathe 4s ease-in-out infinite" : "none",
            transition: "box-shadow 0.8s ease",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
              <span style={{ fontSize: "0.75rem" }}>⚡</span>
              <span style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", color: PURPLE }}>Decision Signal</span>
            </div>
            <div style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
              Shift 14% from Search → CTV. Projected +0.4× true ROAS.
            </div>
          </div>

          {/* What you'd do next - right move */}
          <div style={{
            padding: "0.75rem 0.875rem",
            background: "rgba(41,121,255,0.07)",
            border: "1px solid rgba(41,121,255,0.25)",
            borderRadius: "8px",
          }}>
            <div style={{ fontFamily: MONO, fontSize: "0.52rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(41,121,255,0.65)", marginBottom: "0.35rem" }}>
              What you'd do next
            </div>
            <div style={{ fontFamily: SANS, fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
              Shift 14% from Search → CTV.
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.55rem", fontStyle: "italic", color: "rgba(41,121,255,0.5)", marginTop: "0.25rem" }}>
              ← the right move
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gvg-breathe {
          0%, 100% { opacity: 0.92; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
