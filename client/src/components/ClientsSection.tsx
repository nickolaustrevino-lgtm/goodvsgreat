/* =====================================================
   CLIENTS SECTION — Previous Clients scrolling carousel
   Design: Dark navy strip, 90px logo images, marquee scroll
   Positioned directly below HeroSection for social proof
   ===================================================== */

const LOGOS = [
  { name: "Epic Games",          src: "/manus-storage/epic_games_35d6941d.png"   },
  { name: "Microsoft",           src: "/manus-storage/microsoft_5e5828ef.png"    },
  { name: "Amazon",              src: "/manus-storage/amazon_fcaa0611.png"       },
  { name: "Warner Bros.",        src: "/manus-storage/warnerbros_773c3b2e.png"   },
  { name: "Walmart",             src: "/manus-storage/walmart_6b6fb808.png"      },
  { name: "Razer",               src: "/manus-storage/razer_308cf392.png"        },
  { name: "Samsung",             src: "/manus-storage/samsung_f596dbbb.png"      },
  { name: "Scopely",             src: "/manus-storage/scopely_1125f63c.png"      },
  { name: "2K Games",            src: "/manus-storage/2k_games_6d7fb3b8.png"     },
  { name: "Turtle Beach",        src: "/manus-storage/turtlebeach_9e5be1ea.png"  },
  { name: "Charter Schools USA", src: "/manus-storage/charterusa_57a2ec3d.png"   },
  { name: "FlatRate Moving",     src: "/manus-storage/flatrate_9a082cda.png"     },
];

export default function ClientsSection() {
  const tripled = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      style={{
        backgroundColor: "#12122A",
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
        .gvg-marquee-track {
          display: flex;
          width: max-content;
          animation: gvg-marquee-scroll 36s linear infinite;
          align-items: center;
        }
        .gvg-marquee-track:hover {
          animation-play-state: paused;
        }
        .gvg-logo-item {
          display: inline-flex;
          align-items: center;
          padding: 0 3rem;
          opacity: 0.45;
          transition: opacity 0.25s ease;
          flex-shrink: 0;
        }
        .gvg-logo-item:hover {
          opacity: 0.85;
        }
        .gvg-logo-item img {
          height: 90px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .gvg-marquee-wrap {
          position: relative;
          overflow: hidden;
        }
        .gvg-marquee-wrap::before,
        .gvg-marquee-wrap::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .gvg-marquee-wrap::before {
          left: 0;
          background: linear-gradient(to right, #12122A 0%, transparent 100%);
        }
        .gvg-marquee-wrap::after {
          right: 0;
          background: linear-gradient(to left, #12122A 0%, transparent 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .gvg-marquee-track { animation: none; }
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

      {/* Marquee */}
      <div className="gvg-marquee-wrap">
        <div className="gvg-marquee-track">
          {tripled.map((logo, i) => (
            <div key={i} className="gvg-logo-item">
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
