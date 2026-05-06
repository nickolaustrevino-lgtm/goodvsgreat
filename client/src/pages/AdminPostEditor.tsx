/* =====================================================
   ADMIN — Post Editor  /admin/posts/new | /admin/posts/:id
   GvG Design System v4 · Dark Editorial Intelligence
   ===================================================== */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { AdminShell } from "./AdminPosts";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";
const SURFACE = "#0F172A";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

interface EditorProps {
  postId?: number; // undefined = new post
}

export default function AdminPostEditor({ postId }: EditorProps) {
  const [, navigate] = useLocation();
  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Load existing post for editing
  const { data: existingPost, isLoading: loadingPost } = trpc.posts.adminGetById.useQuery(
    { id: postId! },
    { enabled: !!postId && !!user }
  );

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setSlug(existingPost.slug);
      setExcerpt(existingPost.excerpt ?? "");
      setContent(existingPost.content);
      setCoverUrl(existingPost.coverUrl ?? "");
      setStatus(existingPost.status);
      setSlugTouched(true);
    }
  }, [existingPost]);

  // Auto-generate slug from title (only if user hasn't manually edited it)
  useEffect(() => {
    if (!slugTouched && title) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  const createMutation = trpc.posts.create.useMutation({
    onSuccess: (post) => {
      toast.success("Post created");
      navigate(`/admin/posts/${post?.id}`);
    },
    onError: (err) => { toast.error(err.message); setSaving(false); },
  });

  const updateMutation = trpc.posts.update.useMutation({
    onSuccess: () => { toast.success("Post saved"); setSaving(false); },
    onError: (err) => { toast.error(err.message); setSaving(false); },
  });

  const handleSave = (targetStatus?: "draft" | "published") => {
    const finalStatus = targetStatus ?? status;
    setSaving(true);
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || undefined,
      content: content.trim(),
      coverUrl: coverUrl.trim() || undefined,
      status: finalStatus,
    };
    if (postId) {
      updateMutation.mutate({ id: postId, ...payload });
      setStatus(finalStatus);
    } else {
      createMutation.mutate({ ...payload, status: finalStatus });
    }
  };

  if (authLoading || (postId && loadingPost)) {
    return <AdminShell><span style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM }}>Loading…</span></AdminShell>;
  }

  if (!user || user.role !== "admin") {
    return <AdminShell><p style={{ fontFamily: SANS, color: DIM }}>Access denied.</p></AdminShell>;
  }

  const isNew = !postId;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <AdminShell>
      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: MONO, fontSize: "1.1rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.2rem" }}>
            {isNew ? "New Post" : "Edit Post"}
          </h1>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: DIM, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {wordCount} words
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {/* Status indicator */}
          <span style={{
            fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.08em",
            padding: "0.2rem 0.6rem", borderRadius: "999px",
            background: status === "published" ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.06)",
            color: status === "published" ? "#4ADE80" : DIM,
            border: `1px solid ${status === "published" ? "rgba(74,222,128,0.25)" : BORDER}`,
          }}>
            {status}
          </span>
          <button
            disabled={saving}
            onClick={() => handleSave("draft")}
            style={{ fontFamily: MONO, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, color: "rgba(255,255,255,0.7)", borderRadius: "8px", padding: "0.55rem 1rem", cursor: "pointer" }}
          >
            Save Draft
          </button>
          <button
            disabled={saving}
            onClick={() => handleSave("published")}
            style={{ fontFamily: MONO, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", background: BLUE, border: "none", color: "#fff", borderRadius: "8px", padding: "0.55rem 1.1rem", cursor: "pointer" }}
          >
            {saving ? "Saving…" : status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "1.5rem", alignItems: "start" }}>
        {/* Main editor column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Title */}
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title…"
            style={{
              fontFamily: MONO, fontSize: "1.5rem", fontWeight: 700, color: "#fff",
              background: "transparent", border: "none", borderBottom: `1px solid ${BORDER}`,
              outline: "none", padding: "0.5rem 0", width: "100%",
            }}
          />

          {/* Write / Preview tabs */}
          <div style={{ display: "flex", gap: "0", borderBottom: `1px solid ${BORDER}` }}>
            {(["write", "preview"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em",
                  background: "transparent", border: "none", cursor: "pointer",
                  padding: "0.5rem 1rem",
                  color: activeTab === tab ? BLUE : DIM,
                  borderBottom: activeTab === tab ? `2px solid ${BLUE}` : "2px solid transparent",
                  marginBottom: "-1px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "write" ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your article in Markdown…"
              style={{
                fontFamily: MONO, fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.85)",
                background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "10px",
                padding: "1.25rem", outline: "none", resize: "vertical",
                minHeight: "480px", width: "100%", boxSizing: "border-box",
              }}
            />
          ) : (
            <div
              style={{
                fontFamily: SANS, fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(255,255,255,0.85)",
                background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "10px",
                padding: "1.5rem", minHeight: "480px",
              }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          )}
        </div>

        {/* Sidebar — meta fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "sticky", top: "1.5rem" }}>
          <MetaCard label="Slug">
            <input
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
              placeholder="post-slug"
              style={inputStyle}
            />
            <span style={{ fontFamily: MONO, fontSize: "0.55rem", color: DIM, marginTop: "0.25rem", display: "block" }}>/writing/{slug || "…"}</span>
          </MetaCard>

          <MetaCard label="Excerpt">
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description for the post list…"
              rows={3}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
            />
          </MetaCard>

          <MetaCard label="Cover Image URL">
            <input
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://… or /manus-storage/…"
              style={inputStyle}
            />
            {coverUrl && (
              <img
                src={coverUrl}
                alt="Cover preview"
                style={{ marginTop: "0.5rem", width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px", border: `1px solid ${BORDER}` }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            )}
          </MetaCard>

          <MetaCard label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </MetaCard>
        </div>
      </div>
    </AdminShell>
  );
}

// ── Helpers ──────────────────────────────────────────

function MetaCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "1rem" }}>
      <label style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, display: "block", marginBottom: "0.5rem" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "0.8rem",
  color: "rgba(255,255,255,0.85)",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "6px",
  padding: "0.5rem 0.75rem",
  outline: "none",
  width: "100%",
  boxSizing: "border-box" as const,
};

/** Very lightweight Markdown → HTML renderer (no external deps) */
function renderMarkdown(md: string): string {
  if (!md) return '<p style="color:rgba(255,255,255,0.3);font-style:italic">Nothing to preview yet…</p>';
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
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#2979FF">$1</a>')
    .replace(/^---$/gm, "<hr>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hH\d]|<ul|<blockquote|<hr)(.+)$/gm, "<p>$1</p>")
    .replace(/<p><\/p>/g, "");
}
