/* =====================================================
   ADMIN - Blog Post Manager  /admin/posts
   GvG Design System v4 · Dark Editorial Intelligence
   ===================================================== */
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const RED = "#F87171";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";
const SURFACE = "#0F172A";

function formatDate(d: Date | string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const linkStyle = (color = DIM): React.CSSProperties => ({
  fontFamily: MONO,
  fontSize: "0.6rem",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color,
  textDecoration: "none",
  cursor: "pointer",
  background: "none",
  border: "none",
  padding: 0,
});

export default function AdminPosts() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: posts, isLoading, refetch } = trpc.posts.adminList.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  const deleteMutation = trpc.posts.delete.useMutation({
    onSuccess: () => { refetch(); toast.success("Post deleted"); setDeletingId(null); },
    onError: (err) => { toast.error(err.message); setDeletingId(null); },
  });

  if (authLoading) {
    return <AdminShell><span style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM }}>Loading…</span></AdminShell>;
  }

  if (!user) {
    return (
      <AdminShell>
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ fontFamily: SANS, color: DIM, marginBottom: "1.5rem" }}>Sign in to access the admin panel.</p>
          <a href={getLoginUrl()} style={{ fontFamily: SANS, fontWeight: 600, color: BLUE, border: `1px solid ${BLUE}`, borderRadius: "8px", padding: "0.6rem 1.5rem", textDecoration: "none" }}>Sign In</a>
        </div>
      </AdminShell>
    );
  }

  if (user.role !== "admin") {
    return (
      <AdminShell>
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ fontFamily: SANS, color: DIM }}>You don't have admin access.</p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: MONO, fontSize: "1.2rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>Blog Posts</h1>
          <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: DIM }}>{posts?.length ?? 0} total posts</p>
        </div>
        <button
          onClick={() => navigate("/admin/posts/new")}
          style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", background: BLUE, color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.25rem", cursor: "pointer" }}
        >
          + New Post
        </button>
      </div>

      {/* Posts table */}
      {isLoading ? (
        <div style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM, textAlign: "center", padding: "3rem" }}>Loading posts…</div>
      ) : !posts || posts.length === 0 ? (
        <div style={{ border: `1px dashed ${BORDER}`, borderRadius: "12px", padding: "4rem", textAlign: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: "2rem", marginBottom: "1rem", opacity: 0.3 }}>✍</div>
          <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: DIM, marginBottom: "1.5rem" }}>No posts yet. Create your first article.</p>
          <button
            onClick={() => navigate("/admin/posts/new")}
            style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", background: BLUE, color: "#fff", border: "none", borderRadius: "8px", padding: "0.6rem 1.25rem", cursor: "pointer" }}
          >
            + New Post
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 120px 120px 160px", gap: "1rem", padding: "0 1rem 0.5rem", borderBottom: `1px solid ${BORDER}` }}>
            {["Title", "Status", "Published", "Updated", "Actions"].map((h) => (
              <span key={h} style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>{h}</span>
            ))}
          </div>

          {posts.map((post) => (
            <div key={post.id} style={{ display: "grid", gridTemplateColumns: "1fr 110px 120px 120px 160px", gap: "1rem", alignItems: "center", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "0.875rem 1rem" }}>
              {/* Title + slug */}
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: SANS, fontSize: "0.875rem", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{post.title}</div>
                <div style={{ fontFamily: MONO, fontSize: "0.58rem", color: DIM, marginTop: "0.1rem" }}>/writing/{post.slug}</div>
              </div>

              {/* Status badge */}
              <span style={{
                fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.08em",
                padding: "0.2rem 0.55rem", borderRadius: "999px",
                background: post.status === "published" ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.06)",
                color: post.status === "published" ? "#4ADE80" : DIM,
                border: `1px solid ${post.status === "published" ? "rgba(74,222,128,0.25)" : BORDER}`,
                display: "inline-block",
              }}>
                {post.status}
              </span>

              <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>{formatDate(post.publishedAt)}</span>
              <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>{formatDate(post.updatedAt)}</span>

              {/* Actions */}
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <button
                  onClick={() => navigate(`/admin/posts/${post.id}`)}
                  style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.06em", background: "rgba(41,121,255,0.1)", border: `1px solid rgba(41,121,255,0.25)`, color: BLUE, borderRadius: "6px", padding: "0.3rem 0.6rem", cursor: "pointer" }}
                >
                  Edit
                </button>
                {post.status === "published" && (
                  <a
                    href={`/writing/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.06em", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, color: "rgba(255,255,255,0.5)", borderRadius: "6px", padding: "0.3rem 0.6rem", textDecoration: "none", display: "inline-block" }}
                  >
                    View
                  </a>
                )}
                <button
                  disabled={deletingId === post.id}
                  onClick={() => {
                    if (confirm(`Delete "${post.title}"?`)) {
                      setDeletingId(post.id);
                      deleteMutation.mutate({ id: post.id });
                    }
                  }}
                  style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.06em", background: "rgba(248,113,113,0.08)", border: `1px solid rgba(248,113,113,0.2)`, color: RED, borderRadius: "6px", padding: "0.3rem 0.6rem", cursor: "pointer" }}
                >
                  {deletingId === post.id ? "…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}

// Shared admin shell layout - uses plain <a> tags (no nested Link+a)
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "oklch(16% 0.005 285)", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <a href="/" style={linkStyle(DIM)}>← Site</a>
        <span style={{ color: BORDER }}>|</span>
        <a href="/admin/posts" style={linkStyle("rgba(255,255,255,0.5)")}>Posts</a>
        <a href="/admin/import" style={linkStyle("rgba(255,255,255,0.5)")}>Import</a>
        <a href="/admin/subscribers" style={linkStyle("rgba(255,255,255,0.5)")}>Subscribers</a>
        <a href="/files" style={linkStyle("rgba(255,255,255,0.5)")}>Files</a>
      </div>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        {children}
      </div>
    </div>
  );
}
