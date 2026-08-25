/* ============================================================
   PUBLIC - Blog Index  /blog
   ============================================================ */
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { BLOG_MASTHEAD } from "@/lib/blogMasthead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function formatDate(d: Date | string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function PlaceholderCard() {
  return (
    <article className="editorial-empty-state">
      <span>Coming soon</span>
      <h2>The next decision letter is in production.</h2>
      <p>Frameworks, case studies, and operating ideas on measurement, AI, and the new media stack. Subscribe to know when the next piece publishes.</p>
      <div>
        <a href="https://goodvsgreat.substack.com" target="_blank" rel="noopener noreferrer" className="gvg-btn-secondary">Read on Substack <span className="gvg-btn-arrow">↗</span></a>
        <a href="/#subscribe" className="gvg-btn-primary">Subscribe for updates <span className="gvg-btn-arrow">→</span></a>
      </div>
    </article>
  );
}

export default function WritingIndex() {
  const { data: posts, isLoading } = trpc.posts.listPublished.useQuery();

  return (
    <div className="editorial-index-page">
      <Navbar />
      <main className="editorial-index-shell">
        <header className="editorial-index-header">
          <div className="editorial-index-header__rule" aria-hidden="true" />
          <span>{BLOG_MASTHEAD.eyebrow}</span>
          <h1>{BLOG_MASTHEAD.title}</h1>
          <p>{BLOG_MASTHEAD.subtitle}</p>
        </header>

        {isLoading ? (
          <div className="editorial-list editorial-list--loading" aria-label="Loading articles">
            {[1, 2, 3].map((item) => <div className="editorial-list__skeleton" key={item} />)}
          </div>
        ) : !posts || posts.length === 0 ? (
          <PlaceholderCard />
        ) : (
          <div className="editorial-list">
            {posts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="editorial-list__item">
                <article>
                  <span className="editorial-list__number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="editorial-list__copy">
                    <div className="editorial-list__meta"><span>{formatDate(post.publishedAt)}</span><i aria-hidden="true" /><span>The Decision Letter</span></div>
                    <h2>{post.title}</h2>
                    {post.excerpt && <p>{post.excerpt}</p>}
                    <span className="editorial-list__read">Read article <b aria-hidden="true">→</b></span>
                  </div>
                  {post.coverUrl && <img src={post.coverUrl} alt="" />}
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
