/* FinalCTASection — GvG Brand Guidelines v2
   Full-bleed dark section with scanline texture
   Headline: "Stop optimizing what looks good. Start building what works."
   CTA: Electric Blue primary button
   Background: --gvg-navy with scanline overlay */

import { useEffect, useRef } from "react";
import DotMatrixCanvas from "./DotMatrixCanvas";
import { trackEvent } from "../lib/pixel";

export default function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll(".gvg-fadeup").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="final-cta"
      ref={ref}
      className="gvg-scanline"
      style={{
        backgroundColor: "#080D1A",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Dot-matrix parallax background */}
      <DotMatrixCanvas opacity={0.55} parallaxFactor={0.4} />

      {/* Ghost number */}
      <span className="gvg-ghost-number" style={{ left: "50%", transform: "translateX(-50%)" }}>11</span>

      {/* Horizontal rule top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(41,121,255,0.4), transparent)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              marginBottom: "24px",
            }}
          >
            Stop optimizing what{" "}
            <span style={{ color: "rgba(255,255,255,0.25)" }}>looks good.</span>
            <br />
            Start building what{" "}
            <span style={{ color: "#2979FF" }}>works.</span>
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.65,
              maxWidth: "560px",
              margin: "0 auto 48px",
            }}
          >
            Better dashboards don’t matter if the decision is still unclear. Let’s fix the decision layer.
          </p>

          <a
            href="https://calendar.app.google/b3ctixpS5tVRxYVJ9"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              height: "60px",
              padding: "0 40px",
              background: "#2F6FFF",
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 600,
              borderRadius: "8px",
              textDecoration: "none",
              boxShadow: "0 0 40px rgba(47,111,255,0.35)",
              transition: "background 240ms ease, box-shadow 240ms ease, transform 160ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#4080FF";
              el.style.boxShadow = "0 0 60px rgba(47,111,255,0.5)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "#2F6FFF";
              el.style.boxShadow = "0 0 40px rgba(47,111,255,0.35)";
              el.style.transform = "translateY(0)";
            }}
            onClick={() => trackEvent("Lead", { content_name: "Final CTA — Book Diagnostic Call" })}
          >
            Book a Diagnostic Call →
          </a>
        </div>
      </div>

      {/* Horizontal rule bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(41,121,255,0.4), transparent)",
        }}
      />
    </section>
  );
}
