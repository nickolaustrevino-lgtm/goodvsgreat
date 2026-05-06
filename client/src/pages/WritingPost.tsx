/* =====================================================
   PUBLIC — Post Detail  /writing/:slug
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

/** Very lightweight Markdown → HTML renderer (no external deps) */
function renderMarkdown(md: string): string {
  if (!md) return "";
  return md
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^#{6}\s(.+)$/gm, "<h6>$1</h6>")
    .replace(/^#{5}\s(.+)$/gm, "<h5>$1</h5>")
    .replace(/^#{4}\s(.+)$/gm, "<h4>$1</h4>")
    .replace(/^#{3}\s(.+)$/gm, "<h3>$1</h3>")
    .replace(/^#{2}\s(.+)$/gm, "<h2>$1</h2>")
    .replace(/^#{1}\s(.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#2979FF;text-decoration:underline">$1</a>')
    .replace(/^---$/gm, "<hr>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hH\d]|<ul|<blockquote|<hr)(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}

interface Props {
  slug: string;
}

export default function WritingPost({ slug }: Props) {
  const { data: post, isLoading, error } = trpc.posts.bySlug.useQuery({ slug });

  return (
    <div style={{ minHeight: "100vh", background: "oklch(16% 0.005 285)", color: "#fff", fontFamily: SANS }}>
      {/* Nav */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/writing"><a style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>← Writing</a></Link>
        <span style={{ color: BORDER }}>|</span>
        <Link href="/"><a style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>Good vs. Great</a></Link>
      </div>

      {isLoading ? (
        <div style={{ maxWidth: "720px", margin: "6rem auto", textAlign: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM }}>Loading…</span>
        </div>
      ) : error || !post ? (
        <div style={{ maxWidth: "720px", margin: "6rem auto", textAlign: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "2rem", display: "block", marginBottom: "1rem", opacity: 0.3 }}>404</span>
          <p style={{ fontFamily: SANS, color: DIM, marginBottom: "1.5rem" }}>This article doesn't exist or hasn't been published yet.</p>
          <Link href="/writing"><a style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: BLUE, textDecoration: "none" }}>← Back to Writing</a></Link>
        </div>
      ) : (
        <article style={{ maxWidth: "720px", margin: "0 auto", padding: "4rem 2rem 6rem" }}>
          {/* Cover image */}
          {post.coverUrl && (
            <img
              src={post.coverUrl}
              alt={post.title}
              style={{ width: "100%", height: "320px", objectFit: "cover", borderRadius: "12px", marginBottom: "2.5rem", border: `1px solid ${BORDER}` }}
            />
          )}

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>{formatDate(post.publishedAt)}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: MONO, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.25rem" }}>
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p style={{ fontFamily: SANS, fontSize: "1.1rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65, marginBottom: "2.5rem", borderLeft: `3px solid ${BLUE}`, paddingLeft: "1.25rem" }}>
              {post.excerpt}
            </p>
          )}

          {/* Divider */}
          <div style={{ height: "1px", background: BORDER, marginBottom: "2.5rem" }} />

          {/* Body */}
          <div
            style={{
              fontFamily: SANS,
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.82)",
            }}
            className="prose-gvg"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Footer */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/writing"><a style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>← All Articles</a></Link>
            <Link href="/#booking"><a style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: BLUE, textDecoration: "none" }}>Book a Call →</a></Link>
          </div>
        </article>
      )}
    </div>
  );
}
