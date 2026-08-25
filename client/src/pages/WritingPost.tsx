/* ============================================================
   PUBLIC - Post Detail  /blog/:slug
   Premium editorial reading experience
   ============================================================ */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import SubscribeCTA from "@/components/SubscribeCTA";
import { calculateReadingProgress, calculateReadingTime } from "@/lib/blogEditorial";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";

function formatDate(d: Date | string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface Props {
  slug: string;
}

export default function WritingPost({ slug }: Props) {
  const { data: post, isLoading, error } = trpc.posts.bySlug.useQuery({ slug });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(calculateReadingProgress(window.scrollY, scrollableHeight));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [slug]);

  return (
    <div className="blog-post-page">
      <div className="blog-reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <nav className="blog-post-nav" aria-label="Article navigation">
        <Link href="/blog" className="blog-post-nav__link">← All articles</Link>
        <span className="blog-post-nav__separator" aria-hidden="true" />
        <Link href="/" className="blog-post-nav__brand">Good vs. Great</Link>
      </nav>

      {isLoading ? (
        <div className="blog-post-state">
          <span>Loading article</span>
        </div>
      ) : error || !post ? (
        <div className="blog-post-state">
          <span className="blog-post-state__code">404</span>
          <p>This article does not exist or has not been published yet.</p>
          <Link href="/blog" className="blog-text-link">← Back to all articles</Link>
        </div>
      ) : (
        <article className="blog-post-article">
          <header className="blog-post-header">
            <div className="blog-post-meta">
              <span>{formatDate(post.publishedAt)}</span>
              {post.content && <><i aria-hidden="true" /> <span>{calculateReadingTime(post.content)}</span></>}
            </div>
            <span className="blog-post-kicker">The Decision Letter</span>
            <h1>{post.title}</h1>
            {post.excerpt && <p className="blog-post-dek">{post.excerpt}</p>}
          </header>

          {post.coverUrl && (
            <figure className="blog-post-cover">
              <img src={post.coverUrl} alt={post.title} />
            </figure>
          )}

          <div className="blog-post-reading-layout">
            <aside className="blog-reading-rail" aria-label="Article information">
              <span className="blog-reading-rail__label">Reading note</span>
              <p>Practical thinking for senior media operators.</p>
              <div className="blog-reading-rail__line" aria-hidden="true" />
              <span className="blog-reading-rail__label">In this piece</span>
              <p>Signals, decisions, and the operating system behind better media outcomes.</p>
            </aside>

            <div className="prose-gvg" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <SubscribeCTA source={post.slug} />

          <footer className="blog-post-footer">
            <Link href="/blog" className="blog-text-link">← All articles</Link>
            <Link href="/#booking-form" className="blog-post-footer__cta">
              Book a diagnostic call <span aria-hidden="true">→</span>
            </Link>
          </footer>
        </article>
      )}
    </div>
  );
}
