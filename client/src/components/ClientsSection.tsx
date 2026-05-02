/* ClientsSection — GvG Brand Guidelines v2
   Background: --gvg-navy
   Client names: Space Mono, muted white
   Label: IBM Plex Mono, Electric Blue
   Marquee: CSS animation */

const CLIENTS = [
  "Epic Games", "Microsoft", "Warner Bros.", "Walmart",
  "Amazon", "2K Games", "Razer", "Turtle Beach",
  "RiverSpring Living", "Wonderlic",
];

export default function ClientsSection() {
  const tripled = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section
      style={{
        backgroundColor: "#1A1A2E",
        padding: "4rem 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes gvg-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .gvg-marquee-inner {
          display: flex;
          width: max-content;
          animation: gvg-marquee-scroll 28s linear infinite;
        }
        .gvg-marquee-inner:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container" style={{ marginBottom: "1.5rem" }}>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Clients I've Done This For
        </span>
      </div>

      <div style={{ overflow: "hidden", position: "relative" }}>
        <div className="gvg-marquee-inner">
          {tripled.map((client, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                padding: "0 2.5rem",
                transition: "color 0.2s ease",
                cursor: "default",
                display: "inline-flex",
                alignItems: "center",
                gap: "2.5rem",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.22)"; }}
            >
              {client}
              <span
                style={{
                  display: "inline-block",
                  width: "3px",
                  height: "3px",
                  backgroundColor: "#2979FF",
                  borderRadius: "50%",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
