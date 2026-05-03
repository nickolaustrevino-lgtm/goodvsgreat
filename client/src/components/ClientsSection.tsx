/* ClientsSection — GvG Brand Guidelines v2
   Background: --gvg-navy
   Label: IBM Plex Mono, muted white
   Logos: #F5F5F5, 48px height, transparent bg
   Marquee: CSS animation, pauses on hover */

const CLIENTS: { name: string; logo: string; width: number }[] = [
  { name: "Epic Games",        logo: "/manus-storage/epic_games_7414249d.png",   width: 48  },
  { name: "Microsoft",         logo: "/manus-storage/microsoft_8e135769.png",    width: 46  },
  { name: "Warner Bros.",      logo: "/manus-storage/warnerbros_a41618cc.png",   width: 48  },
  { name: "Walmart",           logo: "/manus-storage/walmart_b04ca64f.png",      width: 166 },
  { name: "Amazon",            logo: "/manus-storage/amazon_2fa8362c.png",       width: 127 },
  { name: "2K Games",          logo: "/manus-storage/2k_games_2e4d48bb.png",     width: 85  },
  { name: "Razer",             logo: "/manus-storage/razer_2eaf85c5.png",        width: 48  },
  { name: "Turtle Beach",      logo: "/manus-storage/turtlebeach_7093de44.png",  width: 53  },
  { name: "Samsung",           logo: "/manus-storage/samsung_f71a6dc7.png",      width: 48  },
  { name: "Scopely",           logo: "/manus-storage/scopely_40ea3e0c.png",      width: 48  },
  { name: "FlatRate Moving",   logo: "/manus-storage/flatrate_6923ecf5.png",     width: 56  },
  { name: "U.S. Army",         logo: "/manus-storage/army_6f314350.png",         width: 34  },
  { name: "Charter Schools USA", logo: "/manus-storage/charterusa_01a54216.png", width: 114 },
];

export default function ClientsSection() {
  // Triple the list so the marquee loops seamlessly
  const tripled = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section
      style={{
        backgroundColor: "#1A1A2E",
        padding: "3.5rem 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes gvg-marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .gvg-marquee-inner {
          display: flex;
          align-items: center;
          width: max-content;
          animation: gvg-marquee-scroll 40s linear infinite;
        }
        .gvg-marquee-inner:hover {
          animation-play-state: paused;
        }
        .gvg-client-logo {
          opacity: 0.45;
          transition: opacity 0.25s ease;
          filter: brightness(1);
        }
        .gvg-client-logo:hover {
          opacity: 0.85;
        }
      `}</style>

      {/* Section label */}
      <div className="container" style={{ marginBottom: "2rem" }}>
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Previous Clients
        </span>
      </div>

      {/* Scrolling logo strip */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, #1A1A2E, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, #1A1A2E, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div className="gvg-marquee-inner">
          {tripled.map((client, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0 2.75rem",
                flexShrink: 0,
              }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="gvg-client-logo"
                style={{
                  height: "48px",
                  width: "auto",
                  maxWidth: `${client.width + 20}px`,
                  objectFit: "contain",
                  display: "block",
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
