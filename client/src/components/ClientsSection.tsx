/* ClientsSection — Good vs. Great Brand Guidelines Applied
   Background: Charcoal Dark (#2D2D2D) with top/bottom borders
   Caption: IBM Plex Mono, muted white
   Client names: Space Mono 700 — muted, hover to full white
   Marquee: continuous horizontal scroll */

const clients = [
  "Epic Games", "Microsoft", "Warner Bros.", "Walmart", "Amazon",
  "2K Games", "Razer", "Turtle Beach", "RiverSpring Living", "Wonderlic",
];

export default function ClientsSection() {
  return (
    <section
      style={{
        backgroundColor: "#2D2D2D",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "3rem 0",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ marginBottom: "1.5rem" }}>
        <span
          className="gvg-caption"
          style={{
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Clients I've Done This For
        </span>
      </div>

      {/* Marquee track */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div
          style={{
            display: "flex",
            gap: "4rem",
            width: "max-content",
            animation: "gvg-marquee 30s linear infinite",
          }}
        >
          {[...clients, ...clients, ...clients].map((client, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
                transition: "color 0.2s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(255,255,255,0.25)"; }}
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
