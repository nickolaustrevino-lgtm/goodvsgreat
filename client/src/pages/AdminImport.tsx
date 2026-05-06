/* =====================================================
   ADMIN - Article Importer  /admin/import
   GvG Design System · Dark Editorial Intelligence
   ===================================================== */
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { AdminShell } from "./AdminPosts";

const MONO = "'IBM Plex Mono', monospace";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";
const SURFACE = "#0F172A";

type ImportStatus =
  | { state: "idle" }
  | { state: "pending" }
  | { state: "success"; postId: number; slug: string; title: string }
  | { state: "error"; message: string };

interface UrlRow {
  id: string;
  url: string;
  status: ImportStatus;
}

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function AdminImport() {
  const [, navigate] = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<UrlRow[]>([{ id: uid(), url: "", status: { state: "idle" } }]);
  const [bulkText, setBulkText] = useState("");
  const [importing, setImporting] = useState(false);

  const importMutation = trpc.posts.importFromUrl.useMutation();

  if (authLoading) {
    return (
      <AdminShell>
        <span style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM }}>Loading…</span>
      </AdminShell>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <AdminShell>
        <p style={{ fontFamily: MONO, color: DIM }}>Access denied.</p>
      </AdminShell>
    );
  }

  // ── Helpers ─────────────────────────────────────────

  function updateRow(id: string, patch: Partial<UrlRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { id: uid(), url: "", status: { state: "idle" } }]);
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  function parseBulk() {
    const urls = bulkText
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.startsWith("http"));
    if (!urls.length) return;
    setRows(urls.map((url) => ({ id: uid(), url, status: { state: "idle" } })));
    setBulkText("");
  }

  async function importAll() {
    const pending = rows.filter((r) => r.url.trim().startsWith("http") && r.status.state === "idle");
    if (!pending.length) return;
    setImporting(true);

    // Import sequentially to avoid hammering the LLM
    for (const row of pending) {
      updateRow(row.id, { status: { state: "pending" } });
      try {
        const result = await importMutation.mutateAsync({ url: row.url.trim() });
        updateRow(row.id, {
          status: {
            state: "success",
            postId: result.post?.id ?? 0,
            slug: result.slug,
            title: result.post?.title ?? "Imported post",
          },
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        updateRow(row.id, { status: { state: "error", message: msg } });
      }
    }

    setImporting(false);
  }

  const readyCount = rows.filter((r) => r.url.trim().startsWith("http") && r.status.state === "idle").length;
  const successCount = rows.filter((r) => r.status.state === "success").length;
  const errorCount = rows.filter((r) => r.status.state === "error").length;

  // ── Render ───────────────────────────────────────────

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontFamily: MONO, fontSize: "1.1rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.3rem" }}>
            Import Articles
          </h1>
          <p style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM, lineHeight: 1.6, maxWidth: "520px" }}>
            Paste URLs from Substack, LinkedIn, Medium, or any public article page. The importer fetches each page, extracts the content with AI, and saves it as a draft for your review.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {successCount > 0 && (
            <button
              onClick={() => navigate("/admin/posts")}
              style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ADE80", borderRadius: "8px", padding: "0.55rem 1rem", cursor: "pointer" }}
            >
              View {successCount} imported →
            </button>
          )}
          <button
            disabled={importing || readyCount === 0}
            onClick={importAll}
            style={{ fontFamily: MONO, fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.08em", background: readyCount > 0 && !importing ? BLUE : "rgba(255,255,255,0.06)", border: "none", color: readyCount > 0 && !importing ? "#fff" : DIM, borderRadius: "8px", padding: "0.55rem 1.2rem", cursor: readyCount > 0 && !importing ? "pointer" : "not-allowed", opacity: readyCount > 0 && !importing ? 1 : 0.5 }}
          >
            {importing ? "Importing…" : `Import ${readyCount} URL${readyCount !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>

      {/* Bulk paste */}
      <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "1rem", marginBottom: "1.5rem" }}>
        <label style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, display: "block", marginBottom: "0.5rem" }}>
          Bulk paste (one URL per line, or comma-separated)
        </label>
        <textarea
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          placeholder={"https://yoursubstack.com/p/article-one\nhttps://medium.com/@you/article-two\nhttps://linkedin.com/pulse/article-three"}
          rows={4}
          style={{ fontFamily: MONO, fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, borderRadius: "6px", padding: "0.75rem", outline: "none", resize: "vertical", width: "100%", boxSizing: "border-box", lineHeight: 1.6 }}
        />
        <button
          disabled={!bulkText.trim()}
          onClick={parseBulk}
          style={{ marginTop: "0.5rem", fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(41,121,255,0.1)", border: "1px solid rgba(41,121,255,0.3)", color: BLUE, borderRadius: "6px", padding: "0.4rem 0.75rem", cursor: bulkText.trim() ? "pointer" : "not-allowed", opacity: bulkText.trim() ? 1 : 0.5 }}
        >
          Parse URLs →
        </button>
      </div>

      {/* URL rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {rows.map((row) => (
          <UrlRowItem
            key={row.id}
            row={row}
            onUrlChange={(url) => updateRow(row.id, { url })}
            onRemove={() => removeRow(row.id)}
            onEdit={() => navigate(`/admin/posts/${(row.status as { postId: number }).postId}`)}
          />
        ))}
      </div>

      {/* Add row */}
      <button
        onClick={addRow}
        style={{ marginTop: "0.75rem", fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "transparent", border: `1px dashed ${BORDER}`, color: DIM, borderRadius: "8px", padding: "0.6rem 1rem", cursor: "pointer", width: "100%" }}
      >
        + Add URL
      </button>

      {/* Summary */}
      {(successCount > 0 || errorCount > 0) && (
        <div style={{ marginTop: "1.5rem", background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "10px", padding: "1rem", display: "flex", gap: "2rem" }}>
          {successCount > 0 && (
            <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: "#4ADE80" }}>
              ✓ {successCount} imported successfully
            </span>
          )}
          {errorCount > 0 && (
            <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: "#F87171" }}>
              ✗ {errorCount} failed
            </span>
          )}
          <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>
            All imports saved as drafts - review and publish from the Posts list.
          </span>
        </div>
      )}
    </AdminShell>
  );
}

// ── URL Row Item ──────────────────────────────────────

function UrlRowItem({
  row,
  onUrlChange,
  onRemove,
  onEdit,
}: {
  row: UrlRow;
  onUrlChange: (url: string) => void;
  onRemove: () => void;
  onEdit: () => void;
}) {
  const MONO = "'IBM Plex Mono', monospace";
  const BORDER = "rgba(255,255,255,0.08)";
  const DIM = "rgba(255,255,255,0.35)";
  const SURFACE = "#0F172A";

  const { state } = row.status;

  const borderColor =
    state === "success" ? "rgba(74,222,128,0.3)" :
    state === "error" ? "rgba(248,113,113,0.3)" :
    state === "pending" ? "rgba(41,121,255,0.3)" :
    BORDER;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: SURFACE, border: `1px solid ${borderColor}`, borderRadius: "8px", padding: "0.6rem 0.75rem", transition: "border-color 0.2s" }}>
      {/* Status dot */}
      <div style={{
        width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
        background: state === "success" ? "#4ADE80" : state === "error" ? "#F87171" : state === "pending" ? "#2979FF" : "rgba(255,255,255,0.15)",
        animation: state === "pending" ? "pulse 1.5s ease-in-out infinite" : "none",
      }} />

      {/* URL input or result */}
      {state === "idle" || state === "pending" ? (
        <input
          value={row.url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://…"
          disabled={state === "pending"}
          style={{ fontFamily: MONO, fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", background: "transparent", border: "none", outline: "none", flex: 1, minWidth: 0 }}
        />
      ) : state === "success" ? (
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: MONO, fontSize: "0.72rem", color: "#4ADE80", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            ✓ {(row.status as { title: string }).title}
          </span>
          <span style={{ fontFamily: MONO, fontSize: "0.58rem", color: DIM }}>{row.url}</span>
        </div>
      ) : (
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontFamily: MONO, fontSize: "0.72rem", color: "#F87171", display: "block" }}>
            ✗ {(row.status as { message: string }).message}
          </span>
          <span style={{ fontFamily: MONO, fontSize: "0.58rem", color: DIM }}>{row.url}</span>
        </div>
      )}

      {/* Actions */}
      {state === "success" && (
        <button
          onClick={onEdit}
          style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(41,121,255,0.1)", border: "1px solid rgba(41,121,255,0.3)", color: "#2979FF", borderRadius: "5px", padding: "0.3rem 0.6rem", cursor: "pointer", flexShrink: 0 }}
        >
          Edit →
        </button>
      )}
      {(state === "idle" || state === "error") && (
        <button
          onClick={onRemove}
          style={{ fontFamily: MONO, fontSize: "0.6rem", background: "transparent", border: "none", color: DIM, cursor: "pointer", padding: "0.2rem 0.4rem", flexShrink: 0 }}
          title="Remove"
        >
          ✕
        </button>
      )}
    </div>
  );
}
