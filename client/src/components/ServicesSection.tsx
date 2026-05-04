/* ServicesSection — GvG Brand Guidelines v2
   Background: --gvg-charcoal
   Decision Layer diagram: inline HTML/CSS, class names from spec (decision-layer, dl-block, etc.)
   Ghost number: 03 */

import { useEffect, useRef } from "react";

const PORTRAIT_URL = "/manus-storage/portrait_7d6c2a03.jpg";

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
        padding: "7.5rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">03</span>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>

        {/* ── Section heading ── */}
        <div className="gvg-fadeup" style={{ marginBottom: "3.5rem" }}>
          {/* Founder avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <img
              src={PORTRAIT_URL}
              alt="Nickolaus Trevino"
              style={{
                width: "48px",
                height: "48px",
                objectFit: "cover",
                objectPosition: "center top",
                flexShrink: 0,
                filter: "grayscale(15%)",
              }}
            />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>Nickolaus Trevino</span>
          </div>
          <span className="gvg-section-label">What I Actually Help Clients Do</span>
          <span className="gvg-divider" />
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.05,
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.65,
              maxWidth: "60ch",
            }}
          >
            Most teams already have reporting. Very few have real decision confidence.
          </p>
        </div>

        {/* ══════════════════════════════════════════
            THE DECISION LAYER — Methodology Diagram
            Inline HTML per spec — class names unchanged
            ══════════════════════════════════════════ */}
        <div className="gvg-fadeup" style={{ marginBottom: "4.5rem" }}>
          {/* ============================================== */}
          {/* THE DECISION LAYER — METHODOLOGY DIAGRAM      */}
          {/* ============================================== */}
          <div className="decision-layer">
            <p className="decision-layer__eyebrow">THE DECISION LAYER</p>
            <p className="decision-layer__intro">The operating model behind every engagement.</p>

            <div className="decision-layer__stack">

              {/* TIER 01 */}
              <div className="dl-block dl-block--tier">
                <div className="dl-block__number">TIER 01</div>
                <div className="dl-block__content">
                  <h3 className="dl-block__title">Measurement Infrastructure</h3>
                  <p className="dl-block__desc">MMM, incrementality testing, and brand-lift logic that go beyond last-click reporting.</p>
                </div>
              </div>

              {/* CONNECTOR */}
              <div className="dl-connector">
                <div className="dl-connector__line"></div>
                <div className="dl-connector__chevron"></div>
                <span className="dl-connector__label">feeds</span>
              </div>

              {/* TIER 02 */}
              <div className="dl-block dl-block--tier">
                <div className="dl-block__number">TIER 02</div>
                <div className="dl-block__content">
                  <h3 className="dl-block__title">Cross-Channel Budget Strategy</h3>
                  <p className="dl-block__desc">Where the next dollar goes, what is overstated, where you are hitting diminishing returns.</p>
                </div>
              </div>

              {/* CONNECTOR */}
              <div className="dl-connector">
                <div className="dl-connector__line"></div>
                <div className="dl-connector__chevron"></div>
                <span className="dl-connector__label">governs</span>
              </div>

              {/* TIER 03 */}
              <div className="dl-block dl-block--tier">
                <div className="dl-block__number">TIER 03</div>
                <div className="dl-block__content">
                  <h3 className="dl-block__title">AI-Native Decision Tools</h3>
                  <p className="dl-block__desc">Calculators, planning systems, and decision dashboards your team will actually use.</p>
                </div>
              </div>

              {/* CONNECTOR */}
              <div className="dl-connector">
                <div className="dl-connector__line"></div>
                <div className="dl-connector__chevron"></div>
                <span className="dl-connector__label">enables</span>
              </div>

              {/* OUTCOME */}
              <div className="dl-block dl-block--outcome">
                <div className="dl-block__number">OUTCOME</div>
                <div className="dl-block__content">
                  <h3 className="dl-block__title">Decisions Leadership Can Trust</h3>
                  <p className="dl-block__desc">One defensible answer to: is this spend creating real business value?</p>
                </div>
              </div>

            </div>
          </div>
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.65,
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
