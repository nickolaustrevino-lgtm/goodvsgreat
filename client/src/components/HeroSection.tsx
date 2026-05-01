/* HeroSection — GvG Dark Editorial Intelligence
   Full-bleed Deep Navy with data-grid background image.
   Left-anchored headline in Space Mono. Electric Blue accent on "Great".
   Stats row with count-up animation. Two CTAs. */
import { useEffect, useRef, useState } from "react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663601301359/Zm5tL57jf4wPW4KuoqDKLS/gvg-hero-bg-akTokEdjNXsLN3Nns4PMGC.webp";

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(12, 1200, statsVisible);
  const media = useCountUp(100, 1600, statsVisible);
  const channels = useCountUp(4, 800, statsVisible);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(26,26,46,0.96) 0%, rgba(26,26,46,0.82) 50%, rgba(26,26,46,0.92) 100%)",
        }}
      />

      {/* Subtle vertical rule on left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(41,121,255,0.3) 40%, rgba(41,121,255,0.3) 60%, transparent)" }}
      />

      <div className="container relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-3xl">
          {/* Section label */}
          <div className="fade-up mb-8">
            <span className="section-label">Growth Decision Partner</span>
          </div>

          {/* Main headline */}
          <h1 className="fade-up delay-100 mb-6" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
          }}>
            Better growth starts<br />
            with better{" "}
            <span style={{ color: "#2979FF" }}>media decisions.</span>
          </h1>

          {/* Sub-label */}
          <p className="fade-up delay-200 mb-5" style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.85rem",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
          }}>
            Your media is running. But is it working?
          </p>

          {/* Body copy */}
          <p className="fade-up delay-300 mb-10" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.72)",
            maxWidth: "560px",
          }}>
            I help companies spending $1M+ on paid media figure out what's actually driving revenue — and fix what isn't. Not with more dashboards. With the measurement, incrementality, and decision logic that tells you where your next dollar should go and why.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="fade-up delay-300 flex flex-wrap gap-8 mb-12">
            {[
              { value: years, suffix: "", label: "Years Experience" },
              { value: media, suffix: "M+", label: "Media Managed", prefix: "$" },
              { value: channels, suffix: "", label: "Channels" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="stat-number">
                  {stat.prefix || ""}{stat.value}{stat.suffix}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="fade-up delay-400 flex flex-wrap gap-4">
            <button onClick={() => scrollTo("booking")} className="btn-primary">
              Book a Free 30-Min Diagnostic
            </button>
            <button onClick={() => scrollTo("services")} className="btn-ghost">
              See How I Work
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #1A1A2E)" }}
      />
    </section>
  );
}
