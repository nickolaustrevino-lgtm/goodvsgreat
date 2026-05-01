/* ClientsSection — GvG Dark Editorial Intelligence
   Deep Navy background. Scrolling client name marquee. */

const clients = [
  "Epic Games", "Microsoft", "Warner Bros.", "Walmart", "Amazon",
  "2K Games", "Razer", "Turtle Beach", "RiverSpring Living", "Wonderlic",
];

export default function ClientsSection() {
  return (
    <section
      style={{
        backgroundColor: "#1A1A2E",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "3.5rem 0",
        overflow: "hidden",
      }}
    >
      <div className="container mb-5">
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
        }}>
          Clients I've Done This For
        </p>
      </div>

      {/* Marquee */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: "4rem",
            animation: "marquee 28s linear infinite",
            width: "max-content",
          }}
        >
          {[...clients, ...clients, ...clients].map((client, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.75)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.22)"; }}
            >
              {client}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
