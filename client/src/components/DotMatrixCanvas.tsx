/**
 * DotMatrixCanvas — GvG Brand Design Element
 * Renders an animated LED dot-matrix parallax background using HTML5 Canvas.
 * Inspired by the pixel/dot-matrix aesthetic of the GvG logo and brand identity.
 *
 * Design Philosophy:
 * - Dark navy (#0d1b2a) base with Electric Blue (#2979FF) dots
 * - Dots vary in brightness/size to create depth and a "glowing LED panel" feel
 * - Parallax: the dot grid shifts at a slower rate than the page scroll
 * - Occasional "hot" dots pulse with a brighter cyan/white glow (like the reference image)
 * - Performance: uses requestAnimationFrame, canvas off-screen rendering, and passive scroll listeners
 */

import { useEffect, useRef } from "react";

interface DotMatrixCanvasProps {
  /** Height of the canvas in CSS pixels. Defaults to 100% of parent. */
  height?: number | string;
  /** Parallax scroll speed multiplier (0 = no parallax, 1 = full scroll). Default 0.35 */
  parallaxFactor?: number;
  /** Opacity of the entire canvas layer. Default 0.85 */
  opacity?: number;
  className?: string;
}

interface Dot {
  col: number;
  row: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  isHot: boolean;
  hotIntensity: number;
}

const DOT_SPACING = 22; // px between dot centres
const DOT_RADIUS = 3.5; // base dot radius in px — reduced for subtlety
const BASE_COLOR = [41, 121, 255] as const; // Electric Blue #2979FF
const HOT_COLOR = [100, 200, 255] as const; // Cyan highlight for "hot" dots
const BG_COLOR = "#0d1b2a"; // Deep navy

export default function DotMatrixCanvas({
  height = "100%",
  parallaxFactor = 0.35,
  opacity = 0.85,
  className = "",
}: DotMatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize handler ──────────────────────────────────────────────────────
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = rect?.width ?? window.innerWidth;
      const h = typeof height === "number" ? height : rect?.height ?? 400;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = (h as number) * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      buildDots(w, h as number);
    };

    const buildDots = (w: number, h: number) => {
      const cols = Math.ceil(w / DOT_SPACING) + 2;
      const rows = Math.ceil(h / DOT_SPACING) + 4;
      const dots: Dot[] = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const isHot = Math.random() < 0.008; // fewer hot dots for subtlety
          dots.push({
            col,
            row,
            baseAlpha: 0.06 + Math.random() * 0.18, // much lower base alpha — subtle noise
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.008 + Math.random() * 0.018,
            isHot,
            hotIntensity: isHot ? 0.6 + Math.random() * 0.4 : 0,
          });
        }
      }
      dotsRef.current = dots;
    };

    // ── Scroll listener ──────────────────────────────────────────────────────
    const onScroll = () => {
      const el = canvas.parentElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // scrollY relative to the section's top
      scrollYRef.current = window.scrollY - (window.scrollY + rect.top - (window.scrollY - window.scrollY));
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Draw loop ────────────────────────────────────────────────────────────
    const draw = () => {
      frameRef.current++;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      // Parallax offset — the dot grid moves up slower than the page
      const parentTop = canvas.parentElement?.getBoundingClientRect().top ?? 0;
      const parallaxOffset = -parentTop * parallaxFactor;

      ctx.clearRect(0, 0, w, h);

      // Background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, w, h);

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const x = d.col * DOT_SPACING - (DOT_SPACING / 2);
        const y = d.row * DOT_SPACING - (DOT_SPACING / 2) + (parallaxOffset % (DOT_SPACING * 2));

        // Skip dots outside the visible area
        if (y < -DOT_SPACING * 2 || y > h + DOT_SPACING * 2) continue;

        // Pulse animation
        d.pulsePhase += d.pulseSpeed;
        const pulse = (Math.sin(d.pulsePhase) + 1) / 2; // 0..1

        let alpha: number;
        let r: number, g: number, b: number;
        let radius: number;

        if (d.isHot) {
          // Hot dots: pulse from dim base up to full 100% brightness at peak
          alpha = Math.min(d.baseAlpha + pulse * d.hotIntensity, 1.0);
          // Color shifts toward pure white-cyan at full brightness
          const WHITE = [255, 255, 255] as const;
          const blend = pulse * d.hotIntensity;
          r = Math.round(BASE_COLOR[0] + (HOT_COLOR[0] - BASE_COLOR[0]) * pulse + (WHITE[0] - HOT_COLOR[0]) * Math.max(blend - 0.5, 0) * 2);
          g = Math.round(BASE_COLOR[1] + (HOT_COLOR[1] - BASE_COLOR[1]) * pulse + (WHITE[1] - HOT_COLOR[1]) * Math.max(blend - 0.5, 0) * 2);
          b = Math.round(BASE_COLOR[2] + (HOT_COLOR[2] - BASE_COLOR[2]) * pulse + (WHITE[2] - HOT_COLOR[2]) * Math.max(blend - 0.5, 0) * 2);
          radius = DOT_RADIUS + pulse * 2.0; // expand more at peak

          // Glow halo — scales with pulse so it blooms at full brightness
          const glowRadius = radius * (2.5 + pulse * 2.0);
          const grd = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
          grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.6})`);
          grd.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.2})`);
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          alpha = d.baseAlpha * (0.6 + pulse * 0.4); // gentle pulse on regular dots
          r = BASE_COLOR[0];
          g = BASE_COLOR[1];
          b = BASE_COLOR[2];
          radius = DOT_RADIUS * (0.85 + pulse * 0.15);
        }

        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha, 1)})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [height, parallaxFactor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
