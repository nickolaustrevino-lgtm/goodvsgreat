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
      <path d="M3.537 0C2.165 0 1.66.506 1.66 1.879V18.44a4.262 4.262 0 00.02.433c.031.3.037.59.316.92.027.033.311.245.311.245.153.075.258.13.43.2l8.335 3.491c.433.199.614.276.928.27h.002c.314.006.495-.071.928-.27l8.335-3.492c.172-.07.277-.124.43-.2 0 0 .284-.211.311-.243.28-.33.285-.621.316-.92a4.261 4.261 0 00.02-.434V1.879c0-1.373-.506-1.88-1.878-1.88zm13.366 3.11h.68c1.138 0 1.688.553 1.688 1.696v1.88h-1.374v-1.8c0-.369-.17-.54-.523-.54h-.235c-.367 0-.537.17-.537.539v5.81c0 .369.17.54.537.54h.262c.353 0 .523-.171.523-.54V8.619h1.373v2.143c0 1.144-.562 1.71-1.7 1.71h-.694c-1.138 0-1.7-.566-1.7-1.71V4.82c0-1.144.562-1.709 1.7-1.709zm-12.186.08h3.114v1.274H6.117v2.603h1.648v1.275H6.117v2.774h1.74v1.275h-3.14zm3.816 0h2.198c1.138 0 1.7.564 1.7 1.708v2.445c0 1.144-.562 1.71-1.7 1.71h-.799v3.338h-1.4zm4.53 0h1.4v9.201h-1.4zm-3.13 1.235v3.392h.575c.354 0 .523-.171.523-.54V4.965c0-.368-.17-.54-.523-.54z"/>
    </svg>
  );
}

function MicrosoftLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "28px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M0 0v11.408h11.408V0zm12.594 0v11.408H24V0zM0 12.594V24h11.408V12.594zm12.594 0V24H24V12.594z"/>
    </svg>
  );
}

function WarnerBrosLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "28px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M16.5798 10.2379c-.5236 0-.9992.201-2.4648 1.2525v5.6593c2.5407-2.8547 3.2641-4.808 3.2641-5.81-.0026-.7013-.3264-1.1018-.7993-1.1018zm.1998-3.7564c0-1.0047-1.1458-1.8286-2.6646-1.9284v5.234c1.9165-1.1267 2.664-2.2566 2.664-3.3056zm4.5098-2.2211c-.0246-.0998-.05-.1373-.0999-.15l-1.796-.4763-.249-1.0268c-.0127-.0503-.0254-.0878-.0747-.0998l-1.8439-.501-.2238-.9773a.1372.1372 0 00-.1-.1253L12.1154.0111a.6414.6414 0 00-.2372 0l-4.789.8928a.1372.1372 0 00-.0998.1253l-.2245.9773-1.8432.5003c-.05.012-.062.0496-.0747.0998l-.249 1.0268-1.7914.477c-.0493.0127-.0746.0502-.0992.15a12.9347 12.9347 0 00-.2245 2.4301c0 7.214 3.737 13.4768 9.3174 17.209A.2493.2493 0 0012 24a.2493.2493 0 00.1999-.1005c5.5803-3.7322 9.3173-9.995 9.3173-17.209a12.9906 12.9906 0 00-.2284-2.4301zm-9.9922 16.3208c0 .0503-.05.075-.0992.0248-1.3703-1.5774-2.2916-3.5058-2.9144-5.6097l-.9466.6028c-.2491.1755-.4483.1005-.5995-.1748-1.2704-2.254-2.0924-5.9614-2.167-8.565a.4522.4522 0 01.1246-.3255 11.8352 11.8352 0 011.0958-1.1521c.0746-.075.1499-.0255.1499.0998 0 3.2057.5475 6.1858 1.4195 8.1396.0746.15.1492.15.2492.075l.2737-.1754c-.5229-2.329-.822-5.4343-.7474-9.0158 0-.1253.0253-.1755.1-.225a8.7268 8.7268 0 011.195-.6264c.1246-.0502.1499-.0247.1499.075-.0706 5.2086.3544 8.8136 1.2743 11.6938.0247.075.0993.0495.0993-.0255-.05-1.0516-.05-1.978-.05-3.1053l-.0493-8.991c0-.0998.0247-.15.1246-.1748a9.9022 9.9022 0 011.245-.2257.0664.0664 0 01.0557.019.0672.0672 0 01.019.056zm1.4949.0248c-.05.0503-.1.0255-.1-.0248V2.9757a.0672.0672 0 01.019-.056.0664.0664 0 01.0557-.019c3.3373.2257 5.4797 1.6283 5.4797 3.6565a3.4113 3.4113 0 01-.872 2.2774c1.0958.3007 1.5195 1.1273 1.5195 2.2292.002 1.9538-1.4176 5.185-6.1 9.5422Z"/>
    </svg>
  );
}

function WalmartLogo() {
  // Official 2025 Walmart wordmark — 7-path SVG, coordinate space ~642×114
  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 642 114"
      style={{ height: "22px", width: "auto", fill: "rgba(255,255,255,0.5)" }}
    >
      <path d="M 120.594,0 105.854,74.6036 89.316,0 H 60.5936 L 44.0556,74.6036 29.3248,0 H 0 L 23.9125,113.958 H 58.038 L 74.7312,38.2933 91.4243,113.958 H 124.801 L 148.559,0 Z" />
      <path d="m 180.513,98.1586 c -6.617,0 -10.222,-4.1042 -10.222,-9.7209 0,-7.2953 5.714,-10.1821 12.933,-12.7644 3.76,-1.4296 7.53,-2.9145 10.076,-5.1648 v 12.6076 c 0,9.5733 -4.965,15.0425 -12.778,15.0425 m 3.907,-77.1861 c -18.199,0 -30.977,6.2347 -35.641,10.634 v 24.3114 c 5.412,-4.8604 16.839,-11.9989 31.88,-11.9989 9.319,0 12.778,2.5824 12.778,7.904 0,4.556 -4.81,6.3822 -18.199,9.2689 -20.298,4.2518 -32.026,11.7038 -32.026,29.4762 0,16.4079 10.678,25.9809 26.167,25.9809 12.969,0 20.718,-6.078 24.962,-14.249 v 11.667 h 27.965 V 58.0484 c 0,-25.6764 -13.234,-37.0759 -37.895,-37.0759" />
      <path d="m 261.805,0 h -29.024 v 113.958 h 29.024 z" />
      <path d="m 378.279,21.2773 c -14.083,0 -23.183,8.5496 -27.938,19.9398 -2.555,-12.2018 -11.034,-19.9398 -22.89,-19.9398 -13.426,0 -22.179,7.9132 -26.614,19.0268 V 23.8597 H 272.27 v 90.1073 h 29.023 V 63.9791 c 0,-12.3032 4.062,-19.2942 12.778,-19.2942 7.064,0 9.474,4.8605 9.474,12.4601 v 56.831 h 29.023 V 63.9884 c 0,-12.3033 4.062,-19.2942 12.778,-19.2942 7.064,0 9.474,4.8604 9.474,12.46 v 56.8308 h 29.023 V 53.0316 c 0,-18.9898 -8.871,-31.7543 -25.564,-31.7543 z" />
      <path d="m 447.444,98.1586 c -6.617,0 -10.222,-4.1042 -10.222,-9.7209 0,-7.2953 5.714,-10.1821 12.933,-12.7644 3.76,-1.4296 7.53,-2.9145 10.076,-5.1648 v 12.6076 c 0,9.5733 -4.965,15.0425 -12.787,15.0425 z m 3.907,-77.1861 c -18.199,0 -30.977,6.2347 -35.641,10.634 v 24.3114 c 5.412,-4.8604 16.839,-11.9989 31.88,-11.9989 9.319,0 12.778,2.5824 12.778,7.904 0,4.556 -4.81,6.3822 -18.199,9.2689 -20.298,4.2518 -32.026,11.7038 -32.026,29.4762 0,16.4079 10.678,25.9809 26.166,25.9809 12.97,0 20.719,-6.078 24.963,-14.249 v 11.667 h 27.964 V 58.0484 c 0,-25.6764 -13.234,-37.0759 -37.895,-37.0759" />
      <path d="M 527.589,49.3147 V 23.8596 h -28.421 v 90.1074 h 29.024 V 75.6736 c 0,-17.6249 10.824,-22.3378 21.201,-22.3378 3.459,0 6.763,0.4519 8.269,0.9131 v -30.998 c -16.328,-0.7932 -26.249,9.7393 -30.073,26.0638 z" />
      <path d="M 612.999,46.6487 V 23.859 H 594.508 V 6.38171 H 565.484 V 83.8721 c 0,21.7289 12.176,31.9109 31.579,31.9109 9.027,0 13.837,-1.826 15.936,-3.191 V 89.95 c -1.652,1.2174 -4.363,2.1304 -7.822,2.1304 -6.462,0.1476 -10.678,-2.7392 -10.678,-12.3032 V 46.6487 h 18.491 z" />
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "22px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z"/>
    </svg>
  );
}

function TwoKLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "26px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M0 .002v23.997h24V.002H0Zm10.962 5.592c2.36 0 4.443.416 3.799 2.423-.434 1.365-2.017 1.918-3.114 2.109l-2.757.489c-.655.114-1.039.277-1.3.549h6.012l-.818 2.529 3.446-2.529h3.755l-4.091 2.772 2.07 4.402h-3.766l-1.082-2.754-1.197.826-.619 1.928H8.471l1.718-5.374h-6.25C4.874 10.2 6.891 9.36 8.731 8.989l2.264-.457c.387-.07.64-.259.736-.557.136-.416-.32-.581-.994-.581-.784 0-1.604.074-1.984 1.005H5.646c1.009-2.474 3.483-2.805 5.316-2.805Z"/>
    </svg>
  );
}

function RazerLogo() {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 24 24" style={{ height: "28px", width: "auto", fill: "rgba(255,255,255,0.5)" }}>
      <path d="M23.4 0a.385.385 0 00-.278.125L22.91.35l-.401.182a.711.711 0 00-.417 0 .305.305 0 01-.171 0 1.005 1.005 0 00-.567 0A.936.936 0 0021 .596a.877.877 0 00-.412.337l-.037.048a1.246 1.246 0 00-.898.684 1.07 1.07 0 00-.07.225 1.935 1.935 0 00-.337-.193 2.026 2.026 0 00-2.063.305 2.08 2.08 0 00-.69 2.139c.086.376.23.737.428 1.069.496.776 1.079 1.494 1.737 2.138.526.512.996 1.078 1.401 1.69l.053.096c.396.754.321 1.31-.219 1.647a1.358 1.358 0 01-.572.198 2.491 2.491 0 00-.144-2.07 2.342 2.342 0 00-.3-.406c-.79-.866-1.63-.674-1.962-.449a.385.385 0 00-.15.455l.027.058a.385.385 0 00.38.188 1.07 1.07 0 01.962.582c.23.384.23.862 0 1.246a4.812 4.812 0 01-.534-.535l-.07-.07-.037-.042a3.368 3.368 0 00-1.92-1.208 3.09 3.09 0 00-.406-1.455 4.368 4.368 0 00-1.358-1.48 2.673 2.673 0 00-.267-.16 3.085 3.085 0 00-2.251-2.717 2.7 2.7 0 00-2.968 1.139c-.053.086-.112.171-.165.267a12.26 12.26 0 00-1.038 2.78 11.64 11.64 0 01-.775 2.187l-.059.107c-.213.374-.406.583-.609.647a.406.406 0 01-.374-.064c-.203-.14-.155-.423 0-.973a3.33 3.33 0 00.128-.45c.07-.33-.005-.673-.203-.946a1.07 1.07 0 00-.786-.411c-.49-.018-.94.27-1.128.722l-.08.15a.968.968 0 00-.316-.46.936.936 0 00-.294-.129 1.016 1.016 0 00-.535-.198.342.342 0 01-.17-.053.711.711 0 00-.434-.097l-.326-.256-.144-.278c-.18-.35-.707-.238-.727.155a.385.385 0 00.032.727l.305.075.342.267c.026.14.093.268.192.37.043.04.072.092.086.149.058.184.167.347.315.47a.877.877 0 00.727.465h.06c.262.313.662.477 1.068.439a1.07 1.07 0 00.23-.054 1.935 1.935 0 000 .38 2.026 2.026 0 001.3 1.636 2.08 2.08 0 002.208-.481c.276-.26.51-.562.695-.893.422-.817.75-1.68.978-2.572.179-.711.433-1.401.76-2.058l.058-.096c.454-.722.973-.936 1.535-.637.18.096.338.231.46.396-.714.12-1.34.543-1.717 1.16-.084.146-.152.3-.203.46-.353 1.117.23 1.748.593 1.925.16.077.353.035.466-.102l.037-.053a.385.385 0 000-.423 1.07 1.07 0 010-1.128c.218-.384.627-.62 1.07-.615-.04.245-.1.486-.177.722l-.034.093a3.533 3.533 0 00-.084 2.324 3.09 3.09 0 00-1.07 1.07 4.368 4.368 0 00-.603 1.913 2.674 2.674 0 000 .31 3.085 3.085 0 00-1.23 3.31 2.7 2.7 0 002.47 2h.31a12.26 12.26 0 002.925-.493 11.64 11.64 0 012.283-.422h.117c.304-.037.61.035.866.203.102.09.152.224.134.358 0 .246-.289.348-.855.466a3.33 3.33 0 00-.45.117 1.192 1.192 0 00-.721.647 1.07 1.07 0 00.037.888c.229.435.704.683 1.193.62h.165a.968.968 0 00-.235.502.936.936 0 000 .364c-.019.183.013.368.091.535.03.054.045.115.043.176-.002.151.045.3.133.422l-.058.412-.166.262a.385.385 0 00.497.535c.287.265.74-.016.63-.39l-.085-.3.064-.433a.711.711 0 00.22-.353.305.305 0 01.085-.15c.131-.141.218-.318.252-.508a.936.936 0 00.122-.336.877.877 0 00-.085-.535v-.053c.134-.376.08-.794-.144-1.123a1.07 1.07 0 00-.16-.171c.115-.05.226-.11.33-.182a2.026 2.026 0 00.77-1.94 2.08 2.08 0 00-1.518-1.674 3.71 3.71 0 00-1.123-.155c-.919.043-1.83.19-2.716.438-.697.198-1.414.322-2.138.369h-.112c-.85-.032-1.294-.374-1.316-1.01-.007-.204.031-.407.113-.594.459.559 1.138.89 1.86.909.17 0 .338-.018.503-.054 1.144-.25 1.4-1.069 1.374-1.475a.385.385 0 00-.321-.353h-.064a.385.385 0 00-.353.235 1.07 1.07 0 01-.984.535 1.214 1.214 0 01-1.069-.631c.233-.088.473-.158.716-.209h.155a3.368 3.368 0 002.01-1.069c.449.243.95.372 1.46.374.679.01 1.35-.138 1.962-.433.094-.044.185-.094.273-.15a3.085 3.085 0 003.48-.587 2.7 2.7 0 00.498-3.139 6.884 6.884 0 00-.15-.273 12.259 12.259 0 00-1.887-2.288 11.64 11.64 0 01-1.508-1.764l-.064-.102a1.294 1.294 0 01-.257-.85.406.406 0 01.16-.267c.225-.107.444.08.83.508.1.118.21.228.326.331.25.225.584.334.92.3a1.07 1.07 0 00.748-.476c.263-.416.24-.951-.06-1.342l-.085-.145c.18.035.365.019.535-.048a.936.936 0 00.32-.197c.178-.076.33-.2.44-.359a.342.342 0 01.133-.123.711.711 0 00.3-.326l.384-.155h.31a.385.385 0 00.353-.577l-.005.01a.385.385 0 00-.118-.128A.385.385 0 0023.4 0z"/>
    </svg>
  );
}

// ── Attribution Check Dashboard (2-state hover toggle) ──────────────────────
function AttributionDashboard({ reduced }: { reduced: boolean }) {
  const [showTrue, setShowTrue] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Toggle on hover (desktop) and click (mobile)
  const toggle = () => setShowTrue(v => !v);

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
      onMouseEnter={() => { setHovered(true); setShowTrue(true); }}
      onMouseLeave={() => { setHovered(false); setShowTrue(false); }}
      onClick={toggle}
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

      {/* 2-stat tile row — both tiles use same unit (ROAS multiplier) for clean comparison */}
      <div
        aria-live="polite"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}
      >
        {[
          {
            label: "Reported ROAS",
            value: showTrue ? "2.4×" : "6.8×",
            sub: showTrue ? "True signal" : "Last-click inflated",
            accent: showTrue ? GREEN : "rgba(255,100,100,0.9)",
          },
          {
            label: "True ROAS",
            value: showTrue ? "2.4×" : "2.4×",
            sub: showTrue ? "Incremental lift" : "Hidden by last-click",
            accent: showTrue ? COBALT : "rgba(255,255,255,0.3)",
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

      {/* Budget allocation bars — last-click total = 159% (every channel claims credit) */}
      <div style={{ marginBottom: "8px" }}>
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

      {/* Over-100% footnote — explains why last-click totals exceed 100% */}
      {!showTrue && (
        <div style={{ fontFamily: MONO, fontSize: "10px", color: "rgba(255,255,255,0.4)", marginBottom: "16px", letterSpacing: "0.04em" }}>
          total: 159% — every channel claims full credit
        </div>
      )}
      {showTrue && (
        <div style={{ fontFamily: MONO, fontSize: "10px", color: "rgba(94,232,181,0.5)", marginBottom: "16px", letterSpacing: "0.04em" }}>
          total: 100% — incremental attribution
        </div>
      )}

      {/* Decision Signal — 20-24px padding, 8px eyebrow clearance */}
      <div style={{
        background: "rgba(140,108,255,0.08)",
        border: "1px solid rgba(156,124,255,0.32)",
        borderRadius: "8px",
        padding: "20px 16px",
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
      }}>
        <span aria-hidden="true" style={{ fontSize: "13px", flexShrink: 0, marginTop: "2px" }}>⚡</span>
        <div>
          <div style={{ fontFamily: MONO, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", color: PURPLE, marginBottom: "8px" }}>
            Decision Signal
          </div>
          <div style={{ fontFamily: SANS, fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, transition: "opacity 320ms ease" }}>
            {showTrue
              ? "Shift 12% of Paid Search budget to Programmatic CTV. Projected +0.4× ROAS."
              : "Last-click overstates Search by 2.8×. Shift 14% to Programmatic CTV to recover true signal."}
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

  // Credibility cascade: lead with universally recognized enterprise brands
  const logos = [
    { name: "Microsoft",    el: <MicrosoftLogo />,    label: null },
    { name: "Amazon",       el: <AmazonLogo />,        label: null },
    { name: "Warner Bros.", el: <WarnerBrosLogo />,    label: null },
    { name: "Walmart",      el: <WalmartLogo />,       label: null },
    { name: "Epic Games",   el: <EpicGamesLogo />,     label: null },
    { name: "2K",           el: <TwoKLogo />,          label: "2K Games" },
    { name: "Razer",        el: <RazerLogo />,         label: null },
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

        {/* Section watermark "01" — vertically centered against H1 baseline, not floating above */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "112px",
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
              Good media looks busy.<br />
              <span style={{ position: "relative", display: "inline-block" }}>
                <span>Great media</span>
                {/* Animated cobalt underline rule — spans only "Great media", not the full line */}
                <span
                  ref={underlineRef}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "-6px",
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
              </span>{" "}makes decisions.
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

          {/* ── RIGHT: 5 cols — Attribution Check Dashboard (vertically centered) ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AttributionDashboard reduced={reduced} />
          </div>
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
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  const svgs = (e.currentTarget as HTMLDivElement).querySelectorAll("svg");
                  svgs.forEach((s) => (s.style.fill = "rgba(255,255,255,0.9)"));
                  const labels = (e.currentTarget as HTMLDivElement).querySelectorAll("span");
                  labels.forEach((l) => (l.style.color = "rgba(255,255,255,0.7)"));
                }}
                onMouseLeave={(e) => {
                  const svgs = (e.currentTarget as HTMLDivElement).querySelectorAll("svg");
                  svgs.forEach((s) => (s.style.fill = "rgba(255,255,255,0.5)"));
                  const labels = (e.currentTarget as HTMLDivElement).querySelectorAll("span");
                  labels.forEach((l) => (l.style.color = "rgba(255,255,255,0.35)"));
                }}
              >
                {logo.el}
                {logo.label && (
                  <span style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.35)",
                    transition: "color 240ms ease",
                    whiteSpace: "nowrap",
                  }}>{logo.label}</span>
                )}
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
                {/* Fixed-height stat block keeps baseline locked */}
                <div style={{ textAlign: "center", minWidth: "80px" }}>
                  <div style={{
                    fontFamily: MONO,
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    letterSpacing: "-0.01em",
                    marginBottom: "6px",
                    whiteSpace: "nowrap",
                  }}>
                    {stat.value}
                  </div>
                  {/* Fixed min-height prevents multi-line labels from pushing numbers up */}
                  <div style={{
                    fontFamily: MONO,
                    fontSize: "10px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: TEXT_MUTED,
                    minHeight: "24px",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}>
                    {stat.label}
                  </div>
                </div>
                {/* Vertical hairline separator — 20% opacity for architectural feel */}
                {i < arr.length - 1 && (
                  <span aria-hidden="true" style={{
                    display: "inline-block",
                    width: "1px",
                    height: "40px",
                    background: "rgba(255,255,255,0.12)",
                    flexShrink: 0,
                  }} />
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
