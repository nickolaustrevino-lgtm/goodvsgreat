/* ServicesSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Cards: dark surface, Electric Blue top border accent
   Numbers: IBM Plex Mono, Electric Blue
   Ghost number: 03 */

import { useEffect, useRef } from "react";

const SERVICES = [
  {
    num: "01",
    title: "Measurement Infrastructure",
    desc: "I build the systems that make paid media easier to trust: MMM, incrementality testing, brand lift frameworks, and decision-ready measurement models that go beyond last-click reporting.",
  },
  {
    num: "02",
    title: "Cross-Channel Budget Strategy",
    desc: "I help govern investment across the full system. Where should the next dollar go? What is overstated? What should be reallocated? Where are you hitting diminishing returns? That's the layer most teams are missing.",
  },
  {
    num: "03",
    title: "AI-Augmented Workflow Design",
    desc: "I build tools clients actually use — calculators, planning systems, market intelligence workflows, and decision-support dashboards. Not AI theater. Working infrastructure that helps teams make faster, better calls.",
  },
];

export default function ServicesSection() {
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
      { threshold: 0.08 }
    );
    el.querySelectorAll(".gvg-fadeup").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={ref}
      style={{
        backgroundColor: "oklch(16% 0.005 285)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">03</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          <span className="gvg-section-label">What I Actually Help Clients Do</span>
          <span className="gvg-divider" />
          <h2
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "0.75rem",
            }}
          >
            Three capabilities.{" "}
            <span style={{ color: "#2979FF" }}>One outcome.</span>
          </h2>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            Most teams already have reporting. Very few have real decision confidence.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="gvg-fadeup gvg-card"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  color: "#2979FF",
                  letterSpacing: "0.1em",
                  marginBottom: "1rem",
                }}
              >
                {s.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.875rem",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div
          className="gvg-fadeup"
          style={{
            marginTop: "3rem",
            padding: "1.75rem 2rem",
            borderLeft: "2px solid #2979FF",
            backgroundColor: "rgba(41,121,255,0.05)",
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            If the measurement model is weak, the budget logic is weak. If the budget logic is weak,{" "}
            <span style={{ color: "#FFFFFF" }}>optimization just makes the wrong system run faster.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
