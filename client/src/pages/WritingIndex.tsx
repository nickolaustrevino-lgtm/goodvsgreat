/* =====================================================
   PUBLIC — Writing Index  /writing
   GvG Design System v4 · Dark Editorial Intelligence
   ===================================================== */
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";

function formatDate(d: Date | string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function WritingIndex() {
  const { data: posts, isLoading } = trpc.posts.listPublished.useQuery();

  return (
    <div style={{ minHeight: "100vh", background: "oklch(16% 0.005 285)", color: "#fff", fontFamily: SANS }}>
      {/* Nav */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>← Good vs. Great</Link>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "4rem 2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: BLUE, display: "block", marginBottom: "0.75rem" }}>Writing</span>
          <h1 style={{ fontFamily: MONO, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.75rem" }}>
            Ideas on media, measurement, and decisions.
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "1rem", color: DIM, lineHeight: 1.6 }}>
            Frameworks, case studies, and perspectives on what separates good media from great media.
          </p>
        </div>

        {/* Post list */}
        {isLoading ? (
          <div style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM, textAlign: "center", padding: "3rem" }}>Loading…</div>
        ) : !posts || posts.length === 0 ? (
          <div style={{ border: `1px dashed ${BORDER}`, borderRadius: "12px", padding: "4rem", textAlign: "center" }}>
            <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: DIM }}>No articles published yet. Check back soon.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {posts.map((post, i) => (
              <Link key={post.id} href={`/writing/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <article
                    style={{
                      padding: "2rem 0",
                      borderBottom: `1px solid ${BORDER}`,
                      borderTop: i === 0 ? `1px solid ${BORDER}` : "none",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "0.5rem"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
                  >
                    {post.coverUrl && (
                      <img
                        src={post.coverUrl}
                        alt={post.title}
                        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "1.25rem", border: `1px solid ${BORDER}` }}
                      />
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.6rem" }}>
                      <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h2 style={{ fontFamily: MONO, fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.25, marginBottom: "0.6rem", transition: "color 0.15s" }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                        {post.excerpt}
                      </p>
                    )}
                    <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: BLUE }}>Read →</span>
                  </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
