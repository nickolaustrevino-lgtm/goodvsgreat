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
      <style>{`
        .blog-index-shell { max-width: 920px; margin: 0 auto; padding: clamp(112px, 13vw, 170px) 24px clamp(84px, 11vw, 170px); }
        .blog-index-header { position: relative; max-width: 780px; margin-bottom: clamp(58px, 9vw, 92px); padding: 1.1rem 0 1.1rem 1.45rem; border-left: 2px solid ${COBALT}; background: linear-gradient(90deg, rgba(47,111,255,0.09), transparent 62%); }
        .blog-index-eyebrow { font-family: ${MONO}; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.16em; color: ${COBALT}; display: block; margin-bottom: 18px; }
        .blog-index-title { max-width: 760px; font-family: ${SANS}; font-size: clamp(38px, 5.3vw, 62px); font-weight: 720; color: #fff; letter-spacing: -0.045em; line-height: 1.06; margin: 0 0 18px; }
        .blog-index-dek { max-width: 620px; font-family: ${SANS}; font-size: clamp(17px, 2vw, 19px); color: ${TEXT_SECONDARY}; line-height: 1.7; margin: 0; }
        .blog-list { border-top: 1px solid ${BORDER_HAIRLINE}; }
        .blog-post { position: relative; display: grid; grid-template-columns: 94px minmax(0, 1fr); gap: 22px; padding: 38px 0; border-bottom: 1px solid ${BORDER_HAIRLINE}; cursor: pointer; transition: padding 160ms ease, background 160ms ease; }
        .blog-post:hover { padding-left: 10px; background: linear-gradient(90deg, rgba(47,111,255,0.055), transparent 70%); }
        .blog-post-index { padding-top: 2px; color: ${TEXT_MUTED}; font-family: ${MONO}; font-size: 10px; text-transform: uppercase; letter-spacing: 0.13em; line-height: 1.5; }
        .blog-post-index strong { display: block; margin-top: 5px; color: ${COBALT}; font-size: 10px; font-weight: 500; }
        .blog-post-content { min-width: 0; }
        .blog-post-cover { width: 100%; height: 250px; object-fit: cover; border-radius: 13px; margin: 0 0 22px; border: 1px solid ${BORDER_HAIRLINE}; }
        .blog-post-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 11px; }
        .blog-post-date { font-family: ${MONO}; font-size: 10px; text-transform: uppercase; letter-spacing: 0.13em; color: ${TEXT_MUTED}; }
        .blog-post-title { max-width: 720px; font-family: ${SANS}; font-size: clamp(22px, 3vw, 30px); font-weight: 700; color: #fff; letter-spacing: -0.026em; line-height: 1.16; margin: 0 0 12px; transition: color 160ms ease; }
        .blog-post:hover .blog-post-title { color: #B9D0FF; }
        .blog-post-excerpt { max-width: 70ch; font-family: ${SANS}; font-size: 16px; color: ${TEXT_SECONDARY}; line-height: 1.68; margin: 0 0 16px; }
        .blog-post-read { font-family: ${MONO}; font-size: 10px; text-transform: uppercase; letter-spacing: 0.13em; color: ${COBALT}; }
        @media (max-width: 620px) {
          .blog-index-shell { padding: 100px 20px 80px; }
          .blog-index-header { padding-left: 1.05rem; margin-bottom: 52px; }
          .blog-post { grid-template-columns: 1fr; gap: 12px; padding: 30px 0; }
          .blog-post-index { display: flex; gap: 8px; align-items: center; }
          .blog-post-index strong { display: inline; margin-top: 0; }
          .blog-post-cover { height: 210px; margin-bottom: 18px; }
        }
      `}</style>
      <Navbar />

      <div className="blog-index-shell">
        {/* Header */}
        <div className="blog-index-header">
          <span className="blog-index-eyebrow">
            THE MEDIA DECISION LETTER
          </span>
          <h1 className="blog-index-title">
            Strategic notes on media effectiveness, measurement systems, AI, and growth.
          </h1>
          <p className="blog-index-dek">
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
          <div className="blog-list">
            {posts.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <article
                  className="blog-post"
                >
                  <div className="blog-post-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                    <strong>{i === 0 ? "Latest issue" : "Archive"}</strong>
                  </div>
                  <div className="blog-post-content">
                    {post.coverUrl && <img src={post.coverUrl} alt={post.title} className="blog-post-cover" />}
                    <div className="blog-post-meta"><span className="blog-post-date">{formatDate(post.publishedAt)}</span></div>
                    <h2 className="blog-post-title">{post.title}</h2>
                    {post.excerpt && <p className="blog-post-excerpt">{post.excerpt}</p>}
                    <span className="blog-post-read">Read article →</span>
                  </div>
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
