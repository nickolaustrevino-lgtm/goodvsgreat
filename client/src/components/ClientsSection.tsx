/* ClientsSection — GvG Brand Guidelines v2
   Background: --gvg-navy
   Label: IBM Plex Mono, muted white
   Logos: #F5F5F5, ~90px height, transparent bg
   Marquee: CSS animation, pauses on hover */

interface ClientLogo {
  name: string;
  logo: string;
}

const CLIENTS: ClientLogo[] = [
  { name: "Epic Games",          logo: "/manus-storage/epic_games_f60f1c01.png"   },
  { name: "Microsoft",           logo: "/manus-storage/microsoft_940eb498.png"    },
  { name: "Warner Bros.",        logo: "/manus-storage/warnerbros_e8e50a85.png"   },
  { name: "Walmart",             logo: "/manus-storage/walmart_d6aa680f.png"      },
  { name: "Amazon",              logo: "/manus-storage/amazon_7fece456.png"       },
  { name: "2K Games",            logo: "/manus-storage/2k_games_d1045906.png"     },
  { name: "Razer",               logo: "/manus-storage/razer_991f2868.png"        },
  { name: "Turtle Beach",        logo: "/manus-storage/turtlebeach_71e38bf3.png"  },
  { name: "Samsung",             logo: "/manus-storage/samsung_381aa17f.png"      },
  { name: "Scopely",             logo: "/manus-storage/scopely_09b65381.png"      },
  { name: "FlatRate Moving",     logo: "/manus-storage/flatrate_6ac3b3ff.png"     },
  { name: "Charter Schools USA", logo: "/manus-storage/charterusa_111cf7f8.png"   },
];

export default function ClientsSection() {
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
          animation: gvg-marquee-scroll 44s linear infinite;
        }
        .gvg-marquee-inner:hover {
          animation-play-state: paused;
        }
        .gvg-client-logo {
          opacity: 0.45;
          transition: opacity 0.25s ease;
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
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to right, #1A1A2E, transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "120px",
          background: "linear-gradient(to left, #1A1A2E, transparent)",
          zIndex: 2, pointerEvents: "none",
        }} />

        <div className="gvg-marquee-inner">
          {tripled.map((client, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0 3.5rem",
                flexShrink: 0,
                height: "110px",
              }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="gvg-client-logo"
                style={{
                  height: "90px",
                  width: "auto",
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
