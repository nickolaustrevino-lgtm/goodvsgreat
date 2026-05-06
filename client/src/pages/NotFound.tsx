import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SURFACE_0 = "#0A1226";
const COBALT = "#2F6FFF";
const MONO = "'IBM Plex Mono', 'Fira Code', 'Courier New', monospace";
const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const TEXT_SECONDARY = "rgba(255,255,255,0.8)";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div style={{ background: SURFACE_0, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "160px 24px",
          textAlign: "center",
        }}
      >
        {/* Ghost number */}
        <div
          aria-hidden="true"
          style={{
            fontFamily: SANS,
            fontSize: "clamp(120px, 20vw, 200px)",
            fontWeight: 700,
            lineHeight: 1,
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            color: "transparent",
            marginBottom: "-0.15em",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          404
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: COBALT,
            marginBottom: "16px",
          }}
        >
          PAGE NOT FOUND
        </p>

        {/* Headline */}
        <h1
          style={{
            fontFamily: SANS,
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            color: "#FFFFFF",
            marginBottom: "16px",
            maxWidth: "640px",
          }}
        >
          This signal didn't resolve.
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontFamily: SANS,
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: TEXT_SECONDARY,
            marginBottom: "48px",
            maxWidth: "480px",
          }}
        >
          The page you're looking for doesn't exist — or the attribution model sent you somewhere it shouldn't have.
        </p>

        {/* CTA row */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {/* Primary */}
          <button
            onClick={() => setLocation("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "52px",
              padding: "0 24px",
              background: COBALT,
              color: "#FFFFFF",
              fontFamily: SANS,
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(47,111,255,0.18)",
              transition: "box-shadow 240ms ease, transform 240ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(47,111,255,0.4)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(47,111,255,0.18)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            Back to home
          </button>

          {/* Ghost */}
          <button
            onClick={() => setLocation("/blog")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              height: "52px",
              padding: "0 24px",
              background: "transparent",
              color: "#FFFFFF",
              fontFamily: SANS,
              fontSize: "15px",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "border-color 240ms ease, background 240ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.32)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.16)";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Read the blog →
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
