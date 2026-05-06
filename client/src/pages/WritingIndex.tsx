/* =====================================================
   PUBLIC - Blog Index  /blog
   GvG Design System v6 · Dark Editorial Intelligence
   ===================================================== */
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const COBALT = "#2F6FFF";
const SURFACE_0 = "#0A1226";
const SURFACE_1 = "#141A33";
const BORDER_HAIRLINE = "rgba(255,255,255,0.06)";
const BORDER_STRONG = "rgba(120,160,255,0.16)";
const TEXT_SECONDARY = "rgba(255,255,255,0.8)";
const TEXT_MUTED = "rgba(255,255,255,0.5)";

function formatDate(d: Date | string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function PlaceholderCard() {
  return (
    <article
      style={{
        background: SURFACE_1,
        border: `1px solid ${BORDER_HAIRLINE}`,
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Eyebrow */}
      <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.16em", color: COBALT }}>
        COMING SOON
      </span>
      {/* Title */}
      <h2 style={{ fontFamily: SANS, fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1.25, margin: 0 }}>
        First piece publishing soon. The back catalog lives on Substack until then.
      </h2>
      {/* Subtext */}
      <p style={{ fontFamily: SANS, fontSize: "16px", color: TEXT_SECONDARY, lineHeight: 1.6, margin: 0 }}>
        Frameworks, case studies, and operating ideas on measurement, AI, and the new media stack. Subscribe to be notified when new pieces publish here.
      </p>
      {/* CTA row */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
        <a
          href="https://goodvsgreat.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            height: "44px",
            padding: "0 20px",
            background: "transparent",
            color: "#FFFFFF",
            fontFamily: SANS,
            fontSize: "14px",
            fontWeight: 600,
            border: `1px solid rgba(255,255,255,0.16)`,
            borderRadius: "8px",
            textDecoration: "none",
            transition: "border-color 240ms ease, background 240ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.32)";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.16)";
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }}
        >
          ↗ Read on Substack
        </a>
        <a
          href="/#subscribe"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            height: "44px",
            padding: "0 20px",
            background: COBALT,
            color: "#FFFFFF",
            fontFamily: SANS,
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            borderRadius: "8px",
            textDecoration: "none",
            boxShadow: "0 0 24px rgba(47,111,255,0.18)",
            transition: "box-shadow 240ms ease, transform 240ms ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(47,111,255,0.4)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(47,111,255,0.18)";
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
          }}
        >
          Subscribe to be notified
        </a>
      </div>
    </article>
  );
}

export default function WritingIndex() {
  const { data: posts, isLoading } = trpc.posts.listPublished.useQuery();

  return (
    <div style={{ minHeight: "100vh", background: SURFACE_0, color: "#fff", fontFamily: SANS }}>
      <Navbar />

      <div style={{ maxWidth: "880px", margin: "0 auto", padding: "clamp(96px, 12vw, 160px) 24px clamp(72px, 10vw, 160px)" }}>
        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.16em", color: COBALT, display: "block", marginBottom: "16px" }}>
            THE DECISION LETTER
          </span>
          <h1 style={{ fontFamily: SANS, fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.015em", lineHeight: 1.1, marginBottom: "16px" }}>
            Operating ideas on measurement,<br />AI, and the new media stack.
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "18px", color: TEXT_SECONDARY, lineHeight: 1.6, maxWidth: "600px" }}>
            Frameworks, case studies, and perspectives on what separates good media from great media.
          </p>
        </div>

        {/* Post list */}
        {isLoading ? (
          /* Loading skeleton - never show "Loading…" as terminal state */
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  padding: "32px 0",
                  borderBottom: `1px solid ${BORDER_HAIRLINE}`,
                  borderTop: i === 1 ? `1px solid ${BORDER_HAIRLINE}` : "none",
                }}
              >
                <div style={{ width: "80px", height: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", marginBottom: "12px" }} />
                <div style={{ width: "60%", height: "22px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", marginBottom: "10px" }} />
                <div style={{ width: "90%", height: "14px", background: "rgba(255,255,255,0.05)", borderRadius: "4px" }} />
              </div>
            ))}
          </div>
        ) : !posts || posts.length === 0 ? (
          <PlaceholderCard />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {posts.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <article
                  style={{
                    padding: "32px 0",
                    borderBottom: `1px solid ${BORDER_HAIRLINE}`,
                    borderTop: i === 0 ? `1px solid ${BORDER_HAIRLINE}` : "none",
                    cursor: "pointer",
                    transition: "padding-left 120ms ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "8px"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
                >
                  {post.coverUrl && (
                    <img
                      src={post.coverUrl}
                      alt={post.title}
                      style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "12px", marginBottom: "20px", border: `1px solid ${BORDER_HAIRLINE}` }}
                    />
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                    <span style={{ fontFamily: MONO, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: TEXT_MUTED }}>
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: SANS, fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: "10px", transition: "color 120ms ease" }}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p style={{ fontFamily: SANS, fontSize: "16px", color: TEXT_SECONDARY, lineHeight: 1.6, marginBottom: "12px" }}>
                      {post.excerpt}
                    </p>
                  )}
                  <span style={{ fontFamily: MONO, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: COBALT }}>
                    Read →
                  </span>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
