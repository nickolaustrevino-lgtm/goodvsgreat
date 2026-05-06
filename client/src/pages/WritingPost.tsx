/* =====================================================
   PUBLIC - Post Detail  /writing/:slug
   GvG Design System v4 · Dark Editorial Intelligence
   ===================================================== */
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SubscribeCTA from "@/components/SubscribeCTA";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";

function formatDate(d: Date | string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** Estimate reading time from HTML content */
function readingTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
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
        <Link href="/writing" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>← Writing</Link>
        <span style={{ color: BORDER }}>|</span>
        <Link href="/" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>Good vs. Great</Link>
      </div>

      {isLoading ? (
        <div style={{ maxWidth: "720px", margin: "6rem auto", textAlign: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM }}>Loading…</span>
        </div>
      ) : error || !post ? (
        <div style={{ maxWidth: "720px", margin: "6rem auto", textAlign: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "2rem", display: "block", marginBottom: "1rem", opacity: 0.3 }}>404</span>
          <p style={{ fontFamily: SANS, color: DIM, marginBottom: "1.5rem" }}>This article doesn't exist or hasn't been published yet.</p>
          <Link href="/writing" style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: BLUE, textDecoration: "none" }}>← Back to Writing</Link>
        </div>
      ) : (
        <article style={{ maxWidth: "720px", margin: "0 auto", padding: "4rem 2rem 6rem" }}>
          {/* Cover image */}
          {post.coverUrl && (
            <img
              src={post.coverUrl}
              alt={post.title}
              style={{ width: "100%", height: "auto", maxHeight: "420px", objectFit: "cover", borderRadius: "12px", marginBottom: "2.5rem", border: `1px solid ${BORDER}` }}
            />
          )}

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>{formatDate(post.publishedAt)}</span>
            {post.content && (
              <>
                <span style={{ color: BORDER }}>·</span>
                <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>{readingTime(post.content)}</span>
              </>
            )}
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

          {/* Body - rendered as HTML with injected prose styles */}
          <style>{`
            .prose-gvg p {
              margin: 0 0 1.5em 0;
              font-size: 1.0625rem;
              line-height: 1.8;
              color: rgba(255,255,255,0.82);
            }
            .prose-gvg h1, .prose-gvg h2, .prose-gvg h3, .prose-gvg h4 {
              font-family: ${MONO};
              font-weight: 700;
              color: #fff;
              letter-spacing: -0.02em;
              line-height: 1.25;
              margin: 2.25em 0 0.75em;
            }
            .prose-gvg h1 { font-size: clamp(1.5rem, 3vw, 2rem); }
            .prose-gvg h2 { font-size: clamp(1.2rem, 2.5vw, 1.5rem); }
            .prose-gvg h3 { font-size: 1.1rem; }
            .prose-gvg strong, .prose-gvg b {
              color: #fff;
              font-weight: 600;
            }
            .prose-gvg em, .prose-gvg i {
              color: rgba(255,255,255,0.65);
              font-style: italic;
            }
            .prose-gvg a {
              color: ${BLUE};
              text-decoration: underline;
              text-underline-offset: 3px;
            }
            .prose-gvg a:hover { opacity: 0.8; }
            .prose-gvg ul, .prose-gvg ol {
              margin: 0 0 1.5em 0;
              padding-left: 1.75em;
              color: rgba(255,255,255,0.82);
              line-height: 1.8;
            }
            .prose-gvg ul { list-style-type: disc; }
            .prose-gvg ol { list-style-type: decimal; }
            .prose-gvg li {
              margin-bottom: 0.5em;
              font-size: 1.0625rem;
            }
            .prose-gvg li > ul, .prose-gvg li > ol {
              margin-top: 0.5em;
              margin-bottom: 0.25em;
            }
            .prose-gvg li > p { margin: 0 0 0.5em; }
            .prose-gvg blockquote {
              border-left: 3px solid ${BLUE};
              padding: 0.75em 1.25em;
              margin: 1.5em 0;
              color: rgba(255,255,255,0.6);
              font-style: italic;
            }
            .prose-gvg hr {
              border: none;
              border-top: 1px solid ${BORDER};
              margin: 2.5em 0;
            }
            .prose-gvg code {
              font-family: ${MONO};
              font-size: 0.875em;
              background: rgba(255,255,255,0.06);
              padding: 0.15em 0.4em;
              border-radius: 4px;
              color: rgba(255,255,255,0.9);
            }
            .prose-gvg pre {
              background: rgba(255,255,255,0.04);
              border: 1px solid ${BORDER};
              border-radius: 8px;
              padding: 1.25em;
              overflow-x: auto;
              margin: 1.5em 0;
            }
            .prose-gvg pre code {
              background: none;
              padding: 0;
              font-size: 0.875rem;
            }
            .prose-gvg img {
              width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 1.5em 0;
              border: 1px solid ${BORDER};
            }
            .prose-gvg figure {
              margin: 2em 0;
            }
            .prose-gvg figure img {
              margin: 0 0 0.75em;
            }
            .prose-gvg figcaption {
              font-size: 0.8rem;
              color: ${DIM};
              text-align: center;
              font-style: italic;
            }
            .prose-gvg table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.5em 0;
              font-size: 0.9rem;
            }
            .prose-gvg th {
              background: rgba(41,121,255,0.12);
              color: #fff;
              font-family: ${MONO};
              font-size: 0.7rem;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              padding: 0.75em 1em;
              text-align: left;
              border-bottom: 1px solid ${BORDER};
            }
            .prose-gvg td {
              padding: 0.65em 1em;
              border-bottom: 1px solid ${BORDER};
              color: rgba(255,255,255,0.75);
            }
            .prose-gvg tr:last-child td { border-bottom: none; }
          `}</style>
          <div
            className="prose-gvg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Subscribe CTA */}
          <SubscribeCTA source={post.slug} />

          {/* Footer */}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/writing" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>← All Articles</Link>
            <Link href="/#booking" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: BLUE, textDecoration: "none" }}>Book a Call →</Link>
          </div>
        </article>
      )}
    </div>
  );
}
