/* Section 09 - FAQ
   Background: #0D1117 (darkest surface)
   Accordion: 7 questions, single-open, animated expand
   Ghost number: 09 */

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "What exactly does a 'Growth Decision Partner' do?",
    a: "I sit at the intersection of your media investment, measurement infrastructure, and executive reporting. Concretely: I audit your current attribution model, identify where spend is misallocated, build the decision frameworks your team uses to govern budget, and translate all of it into language your CFO can act on. I don't run campaigns - I build the operating logic that makes campaigns defensible.",
  },
  {
    q: "How is this different from hiring a media agency?",
    a: "Agencies are optimised for execution at scale - buying, trafficking, reporting. I'm optimised for the strategic layer above that: what should we be measuring, what does the data actually mean, and how do we make better capital allocation decisions? Most of my clients already have an agency. I work alongside them, not instead of them.",
  },
  {
    q: "What's the minimum spend level where this makes sense?",
    a: "The work becomes most valuable when you're spending $1M+ annually on paid media and the measurement complexity has outpaced your internal capacity to interpret it. Below that threshold, the ROI on a strategic engagement is harder to justify. That said, if you're scaling fast and want to build the right infrastructure before you waste more, earlier is better.",
  },
  {
    q: "Do you work with in-house teams or replace them?",
    a: "Always alongside, never instead of. My model is embedded partnership - I work with your existing media team, data team, and finance stakeholders. The goal is to make your team more effective, not to create a dependency on me. Part of the engagement deliverable is always a set of frameworks and processes your team can own after I'm gone.",
  },
  {
    q: "What does the engagement process look like?",
    a: "It starts with a 60-minute diagnostic call where I assess your current measurement stack, attribution model, and decision-making process. From there, most engagements begin with a 2-week audit that produces a clear picture of where your media investment is and isn't working. Ongoing retainer work typically runs 3-6 months and includes weekly working sessions, a monthly executive summary, and access to me for real-time decisions.",
  },
  {
    q: "How do you handle confidentiality?",
    a: "Every engagement is covered by a mutual NDA before any data is shared. I work with a small number of clients at a time specifically so I can maintain clear separation between accounts. I don't share client data, methodologies, or outcomes without explicit permission - the case studies on this site are shared with client approval.",
  },
  {
    q: "What if we're not ready for a full engagement?",
    a: "Book a call anyway. Sometimes the most useful outcome of a first conversation is clarity on what you actually need - which might be a one-day workshop, a specific audit, or a referral to someone better suited to your situation. I'd rather give you an honest assessment than sell you an engagement that isn't the right fit.",
  },
];

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      { threshold: 0.06 }
    );
    el.querySelectorAll(".gvg-fadeup").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="faq"
      ref={ref}
      style={{
        backgroundColor: "#0D1117",
        padding: "clamp(5rem, 10vw, 10rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span className="gvg-ghost-number">09</span>

      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
        <div className="gvg-fadeup" style={{ marginBottom: "64px" }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.16em", color: "#2F6FFF", opacity: 0.8, marginBottom: "16px" }}>
            FAQ
          </p>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              color: "#FFFFFF",
              marginBottom: "16px",
            }}
          >
            Common questions.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "560px" }}>
            If yours isn't here, book a call - I'll answer it directly.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="gvg-fadeup"
                style={{ transitionDelay: `${i * 40}ms`, borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "24px",
                    padding: "24px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "17px",
                      fontWeight: 600,
                      color: isOpen ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                      lineHeight: 1.4,
                      transition: "color 200ms ease",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      border: `1px solid ${isOpen ? "#2F6FFF" : "rgba(255,255,255,0.12)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? "#2F6FFF" : "rgba(255,255,255,0.4)",
                      fontSize: "18px",
                      lineHeight: 1,
                      fontWeight: 300,
                      transition: "border-color 200ms ease, color 200ms ease, transform 200ms ease",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "600px" : "0",
                    transition: "max-height 320ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.75,
                      margin: "0 0 24px",
                      paddingRight: "52px",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
