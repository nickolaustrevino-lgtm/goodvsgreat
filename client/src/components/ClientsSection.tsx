/* ClientsSection — GvG Brand Guidelines v2
   Background: --gvg-navy
   Static 5×2 grid (desktop) / 2×5 (mobile) — no animation
   Client names: IBM Plex Mono, muted white, hover to full opacity
   Label: IBM Plex Mono, Electric Blue */

const CLIENTS = [
  "Epic Games", "Microsoft", "Warner Bros.", "Walmart", "Amazon",
  "2K Games", "Razer", "Turtle Beach", "RiverSpring Living", "Wonderlic",
];

export default function ClientsSection() {
  return (
    <section
      style={{
        backgroundColor: "#1A1A2E",
        padding: "4rem 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.25)",
            marginBottom: "1.75rem",
          }}
        >
          Clients I've Done This For
        </p>

        {/* 5-col × 2-row desktop / 2-col × 5-row mobile */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.5rem",
          }}
          className="gvg-clients-grid"
        >
          {CLIENTS.map((client) => (
            <div
              key={client}
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                padding: "0.75rem 0.5rem",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.2s ease, border-color 0.2s ease",
                cursor: "default",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.85)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(41,121,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.28)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
