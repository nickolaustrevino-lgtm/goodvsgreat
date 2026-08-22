/* =====================================================
   PUBLIC - Blog Detail  /blog/:slug
   Good vs. Great · Dark Editorial Intelligence
   ===================================================== */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SubscribeCTA from "@/components/SubscribeCTA";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.10)";
const DIM = "rgba(255,255,255,0.46)";

function formatDate(d: Date | string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function readingTime(html: string): string {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: "3px", background: "rgba(255,255,255,0.05)", zIndex: 80 }}>
      <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg, ${BLUE}, #8C6CFF)`, boxShadow: "0 0 14px rgba(41,121,255,0.72)", transition: "width 80ms linear" }} />
    </div>
  );
}

interface Props {
  slug: string;
}

export default function WritingPost({ slug }: Props) {
  const { data: post, isLoading, error } = trpc.posts.bySlug.useQuery({ slug });

  return (
    <div style={{ minHeight: "100vh", background: "#0A1226", color: "#fff", fontFamily: SANS }}>
      <ReadingProgress />

      <style>{`
        .article-nav {
          position: sticky;
          top: 3px;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          min-height: 68px;
          padding: 0 5vw;
          border-bottom: 1px solid ${BORDER};
          background: rgba(10, 18, 38, 0.88);
          backdrop-filter: blur(16px);
        }
        .article-nav-link {
          display: inline-flex;
          align-items: center;
          min-height: 40px;
          font-family: ${MONO};
          font-size: 0.66rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          text-decoration: none;
          color: ${DIM};
          transition: color 160ms ease;
        }
        .article-nav-link:hover { color: #fff; }
        .article-nav-brand { color: #fff; letter-spacing: 0.08em; }
        .article-shell { width: min(100% - 3rem, 1060px); margin: 0 auto; padding: clamp(5.75rem, 10vw, 9.5rem) 0 6rem; }
        .article-header { max-width: 780px; margin: 0 auto; }
        .article-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 0.85rem; margin-bottom: 1.8rem; }
        .article-meta span { font-family: ${MONO}; font-size: 0.64rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.14em; color: ${DIM}; }
        .article-meta .meta-dot { color: rgba(255,255,255,0.25); }
        .article-title { max-width: 880px; margin: 0; font-family: ${SANS}; font-size: clamp(2.45rem, 5vw, 4.75rem); font-weight: 720; letter-spacing: -0.045em; line-height: 1.04; color: #fff; }
        .article-dek { max-width: 720px; margin: 2rem 0 0; padding: 1.35rem 1.5rem; border-left: 3px solid ${BLUE}; background: linear-gradient(90deg, rgba(41,121,255,0.11), rgba(41,121,255,0.025)); color: rgba(255,255,255,0.80); font-size: clamp(1.08rem, 2vw, 1.28rem); line-height: 1.7; }
        .article-cover { display: block; width: 100%; max-width: 920px; max-height: 520px; margin: clamp(2.75rem, 6vw, 4.75rem) auto 0; object-fit: cover; border: 1px solid ${BORDER}; border-radius: 16px; box-shadow: 0 24px 70px rgba(0,0,0,0.26); }
        .article-reading-grid { display: grid; grid-template-columns: 76px minmax(0, 700px); gap: clamp(1.75rem, 4vw, 4.25rem); max-width: 850px; margin: clamp(3.25rem, 7vw, 5.75rem) auto 0; }
        .article-rail { position: relative; }
        .article-rail::before { content: ""; position: sticky; top: 140px; display: block; width: 1px; height: 240px; margin-left: 18px; background: linear-gradient(180deg, ${BLUE}, rgba(41,121,255,0.05)); }
        .prose-gvg { min-width: 0; }
        .prose-gvg p { max-width: 70ch; margin: 0 0 1.65em; font-size: clamp(1.0625rem, 1.25vw, 1.125rem); line-height: 1.82; color: rgba(255,255,255,0.84); }
        .prose-gvg h1, .prose-gvg h2, .prose-gvg h3, .prose-gvg h4 { font-family: ${SANS}; font-weight: 700; color: #fff; letter-spacing: -0.028em; line-height: 1.16; }
        .prose-gvg h1 { font-size: clamp(1.8rem, 3.4vw, 2.45rem); margin: 2.8em 0 0.8em; }
        .prose-gvg h2 { font-size: clamp(1.45rem, 2.8vw, 1.9rem); margin: 3.15em 0 0.95em; }
        .prose-gvg h3 { font-size: clamp(1.18rem, 2.2vw, 1.4rem); margin: 2.6em 0 0.8em; }
        .prose-gvg strong, .prose-gvg b { color: #fff; font-weight: 650; }
        .prose-gvg em, .prose-gvg i { color: rgba(255,255,255,0.70); font-style: italic; }
        .prose-gvg a { color: #75A7FF; text-decoration: underline; text-decoration-color: rgba(117,167,255,0.55); text-underline-offset: 4px; }
        .prose-gvg a:hover { color: #fff; }
        .prose-gvg ul, .prose-gvg ol { max-width: 69ch; margin: 0 0 1.9em; padding: 0.3rem 0 0.3rem 1.65em; color: rgba(255,255,255,0.84); }
        .prose-gvg li { padding-left: 0.35em; margin-bottom: 0.78em; font-size: clamp(1.0625rem, 1.25vw, 1.125rem); line-height: 1.75; }
        .prose-gvg li::marker { color: ${BLUE}; }
        .prose-gvg li > ul, .prose-gvg li > ol { margin: 0.75em 0 0.2em; }
        .prose-gvg blockquote { position: relative; margin: 2.75em 0; padding: 1.8rem 2rem 1.8rem 2.25rem; border: 1px solid rgba(41,121,255,0.28); border-left: 3px solid ${BLUE}; border-radius: 0 14px 14px 0; background: linear-gradient(120deg, rgba(41,121,255,0.11), rgba(140,108,255,0.055)); color: rgba(255,255,255,0.92); font-family: ${SANS}; font-size: clamp(1.28rem, 2.5vw, 1.7rem); font-weight: 520; font-style: normal; letter-spacing: -0.022em; line-height: 1.42; }
        .prose-gvg blockquote::before { content: "“"; position: absolute; top: -1.1rem; left: 1.1rem; color: ${BLUE}; font-family: Georgia, serif; font-size: 4rem; line-height: 1; opacity: 0.78; }
        .prose-gvg hr { border: none; border-top: 1px solid ${BORDER}; margin: 3.4em 0; }
        .prose-gvg code { font-family: ${MONO}; font-size: 0.84em; background: rgba(255,255,255,0.07); padding: 0.15em 0.4em; border-radius: 4px; color: rgba(255,255,255,0.92); }
        .prose-gvg pre { background: rgba(255,255,255,0.035); border: 1px solid ${BORDER}; border-radius: 10px; padding: 1.25em; overflow-x: auto; margin: 2em 0; }
        .prose-gvg pre code { background: none; padding: 0; font-size: 0.86rem; }
        .prose-gvg img, .prose-gvg video { width: 100%; height: auto; border-radius: 12px; margin: 2.25em 0; border: 1px solid ${BORDER}; background: #050914; }
        .prose-gvg figure { margin: 2.5em 0; }
        .prose-gvg figure img, .prose-gvg figure video { margin: 0 0 0.85em; }
        .prose-gvg figcaption { color: ${DIM}; font-family: ${MONO}; font-size: 0.66rem; letter-spacing: 0.05em; line-height: 1.55; text-align: center; }
        .prose-gvg table { width: 100%; border-collapse: collapse; margin: 2.25em 0; font-size: 0.94rem; overflow: hidden; border: 1px solid ${BORDER}; border-radius: 10px; }
        .prose-gvg th { background: rgba(41,121,255,0.13); color: #fff; font-family: ${MONO}; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.09em; padding: 0.95em 1.1em; text-align: left; border-bottom: 1px solid ${BORDER}; }
        .prose-gvg td { padding: 0.9em 1.1em; border-bottom: 1px solid ${BORDER}; color: rgba(255,255,255,0.78); line-height: 1.55; }
        .prose-gvg tr:last-child td { border-bottom: none; }
        .article-footer-links { display: flex; align-items: stretch; gap: 1rem; margin-top: 4.25rem; padding-top: 2rem; border-top: 1px solid ${BORDER}; }
        .article-footer-link { flex: 1; display: flex; flex-direction: column; justify-content: center; min-height: 88px; padding: 1rem 1.15rem; border: 1px solid ${BORDER}; border-radius: 10px; background: rgba(255,255,255,0.025); color: rgba(255,255,255,0.68); font-family: ${MONO}; font-size: 0.63rem; text-transform: uppercase; letter-spacing: 0.1em; text-decoration: none; transition: border-color 160ms ease, background 160ms ease, color 160ms ease; }
        .article-footer-link strong { display: block; margin-top: 0.45rem; color: #fff; font-family: ${SANS}; font-size: 0.9rem; font-weight: 620; letter-spacing: -0.01em; text-transform: none; }
        .article-footer-link:hover { border-color: rgba(41,121,255,0.55); background: rgba(41,121,255,0.08); color: #9BBEFF; }
        @media (max-width: 680px) {
          .article-nav { min-height: 60px; padding: 0 1.25rem; }
          .article-nav-brand { display: none; }
          .article-shell { width: min(100% - 2.5rem, 1060px); padding-top: 4.25rem; }
          .article-title { font-size: clamp(2.25rem, 11vw, 3.25rem); }
          .article-dek { padding: 1.15rem 1.2rem; }
          .article-reading-grid { display: block; margin-top: 3rem; }
          .article-rail { display: none; }
          .prose-gvg p, .prose-gvg li { font-size: 1.05rem; }
          .prose-gvg blockquote { margin: 2.25em 0; padding: 1.5rem 1.25rem 1.5rem 1.55rem; }
          .article-footer-links { flex-direction: column; }
        }
      `}</style>

      <nav className="article-nav" aria-label="Article navigation">
        <Link href="/blog" className="article-nav-link">← All articles</Link>
        <Link href="/" className="article-nav-link article-nav-brand">Good vs. Great</Link>
        <Link href="/#booking" className="article-nav-link" style={{ color: "#9BBEFF" }}>Book a call →</Link>
      </nav>

      {isLoading ? (
        <div style={{ maxWidth: "720px", margin: "8rem auto", padding: "0 1.5rem" }}>
          <div style={{ height: "10px", width: "120px", borderRadius: "4px", background: "rgba(255,255,255,0.08)", marginBottom: "1.5rem" }} />
          <div style={{ height: "60px", width: "88%", borderRadius: "8px", background: "rgba(255,255,255,0.07)", marginBottom: "1rem" }} />
          <div style={{ height: "18px", width: "68%", borderRadius: "5px", background: "rgba(255,255,255,0.05)" }} />
        </div>
      ) : error || !post ? (
        <div style={{ maxWidth: "720px", margin: "8rem auto", padding: "0 1.5rem", textAlign: "center" }}>
          <span style={{ fontFamily: MONO, fontSize: "2rem", display: "block", marginBottom: "1rem", opacity: 0.3 }}>404</span>
          <p style={{ fontFamily: SANS, color: DIM, marginBottom: "1.5rem" }}>This article does not exist or has not been published yet.</p>
          <Link href="/blog" style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: BLUE, textDecoration: "none" }}>← Back to articles</Link>
        </div>
      ) : (
        <article className="article-shell">
          <header className="article-header">
            <div className="article-meta">
              <span>{formatDate(post.publishedAt)}</span>
              {post.content && <><span className="meta-dot">•</span><span>{readingTime(post.content)}</span></>}
            </div>
            <h1 className="article-title">{post.title}</h1>
            {post.excerpt && <p className="article-dek">{post.excerpt}</p>}
          </header>

          {post.coverUrl && <img className="article-cover" src={post.coverUrl} alt={post.title} />}

          <div className="article-reading-grid">
            <aside className="article-rail" aria-hidden="true" />
            <div>
              <div className="prose-gvg" dangerouslySetInnerHTML={{ __html: post.content }} />
              <SubscribeCTA source={post.slug} />
              <div className="article-footer-links">
                <Link href="/blog" className="article-footer-link">Keep reading<strong>Browse all articles →</strong></Link>
                <Link href="/#booking" className="article-footer-link">Need a decision layer?<strong>Book a diagnostic call →</strong></Link>
              </div>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
