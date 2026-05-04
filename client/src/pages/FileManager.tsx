/* =====================================================
   FILE MANAGER — GvG Design System v4
   Full-stack S3 file storage management interface.
   Accessible via /files (admin/owner only in practice).
   ===================================================== */
import { useCallback, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const RED = "#F87171";
const GREEN = "#4ADE80";
const SURFACE = "#0F172A";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fileIcon(mime: string) {
  if (mime.startsWith("image/")) return "🖼";
  if (mime.startsWith("video/")) return "🎬";
  if (mime.startsWith("audio/")) return "🎵";
  if (mime.includes("pdf")) return "📄";
  if (mime.includes("zip") || mime.includes("gzip")) return "🗜";
  return "📁";
}

export default function FileManager() {
  const { user, loading: authLoading } = useAuth();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: files, isLoading, refetch } = trpc.files.list.useQuery(undefined, {
    enabled: !!user,
  });

  const uploadMutation = trpc.files.upload.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("File uploaded successfully");
    },
    onError: (err) => {
      toast.error(`Upload failed: ${err.message}`);
    },
  });

  const deleteMutation = trpc.files.delete.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("File deleted");
    },
    onError: (err) => {
      toast.error(`Delete failed: ${err.message}`);
    },
  });

  const handleFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    if (file.size > MAX_SIZE) {
      toast.error(`File too large. Maximum size is 10 MB.`);
      return;
    }
    setUploading(true);
    setUploadProgress(`Reading ${file.name}…`);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1] ?? "");
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      setUploadProgress(`Uploading ${file.name}…`);
      await uploadMutation.mutateAsync({
        filename: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        base64,
      });
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  }, [uploadMutation]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "oklch(16% 0.005 285)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: MONO, fontSize: "0.75rem", color: DIM }}>Loading…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "oklch(16% 0.005 285)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
        <span style={{ fontFamily: MONO, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>Sign in to access File Manager</span>
        <a href={getLoginUrl()} style={{ fontFamily: SANS, fontSize: "0.9rem", fontWeight: 600, color: BLUE, textDecoration: "none", border: `1px solid ${BLUE}`, borderRadius: "8px", padding: "0.6rem 1.5rem" }}>Sign In</a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "oklch(16% 0.005 285)", color: "#fff", fontFamily: SANS }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="/" style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>← Back to Site</a>
          <span style={{ color: BORDER }}>|</span>
          <span style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.5)" }}>File Manager</span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: DIM }}>{user.name ?? user.email ?? "Signed in"}</span>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 2rem" }}>

        {/* Page title */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: MONO, fontSize: "1.25rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.35rem" }}>
            File Storage
          </h1>
          <p style={{ fontFamily: SANS, fontSize: "0.875rem", color: DIM }}>
            Upload and manage files stored in S3. Max 10 MB per file.
          </p>
        </div>

        {/* Upload dropzone */}
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => !uploading && fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? BLUE : BORDER}`,
            borderRadius: "12px",
            padding: "2.5rem",
            textAlign: "center",
            cursor: uploading ? "wait" : "pointer",
            background: dragging ? "rgba(41,121,255,0.06)" : "rgba(255,255,255,0.02)",
            transition: "all 0.2s ease",
            marginBottom: "2rem",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
          {uploading ? (
            <>
              <div style={{ fontFamily: MONO, fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏳</div>
              <div style={{ fontFamily: MONO, fontSize: "0.7rem", color: BLUE, textTransform: "uppercase", letterSpacing: "0.08em" }}>{uploadProgress}</div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: MONO, fontSize: "2rem", marginBottom: "0.75rem" }}>☁</div>
              <div style={{ fontFamily: SANS, fontSize: "0.9rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: "0.35rem" }}>
                Drop a file here or click to browse
              </div>
              <div style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Any file type · Max 10 MB
              </div>
            </>
          )}
        </div>

        {/* File list */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>
              Your Files {files ? `(${files.length})` : ""}
            </span>
          </div>

          {isLoading ? (
            <div style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM, textAlign: "center", padding: "2rem" }}>Loading files…</div>
          ) : !files || files.length === 0 ? (
            <div style={{
              border: `1px dashed ${BORDER}`,
              borderRadius: "10px",
              padding: "3rem",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: MONO, fontSize: "1.5rem", marginBottom: "0.75rem", opacity: 0.4 }}>📂</div>
              <div style={{ fontFamily: SANS, fontSize: "0.875rem", color: DIM }}>No files uploaded yet. Drop a file above to get started.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {files.map((file) => (
                <div
                  key={file.id}
                  style={{
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: "10px",
                    padding: "0.875rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {/* Icon */}
                  <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{fileIcon(file.mimeType)}</span>

                  {/* Preview thumbnail for images */}
                  {file.mimeType.startsWith("image/") && (
                    <img
                      src={file.url}
                      alt={file.filename}
                      style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "6px", flexShrink: 0, border: `1px solid ${BORDER}` }}
                    />
                  )}

                  {/* File info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: SANS, fontSize: "0.875rem", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {file.filename}
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: "0.6rem", color: DIM, marginTop: "0.15rem" }}>
                      {formatBytes(file.size)} · {file.mimeType} · {formatDate(file.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.origin + file.url);
                        toast.success("URL copied to clipboard");
                      }}
                      style={{
                        fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.06em",
                        background: "rgba(41,121,255,0.1)", border: `1px solid rgba(41,121,255,0.25)`,
                        color: BLUE, borderRadius: "6px", padding: "0.35rem 0.65rem", cursor: "pointer",
                      }}
                    >
                      Copy URL
                    </button>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.06em",
                        background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`,
                        color: "rgba(255,255,255,0.6)", borderRadius: "6px", padding: "0.35rem 0.65rem",
                        textDecoration: "none", display: "inline-flex", alignItems: "center",
                      }}
                    >
                      View
                    </a>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${file.filename}"?`)) {
                          deleteMutation.mutate({ id: file.id });
                        }
                      }}
                      style={{
                        fontFamily: MONO, fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.06em",
                        background: "rgba(248,113,113,0.08)", border: `1px solid rgba(248,113,113,0.2)`,
                        color: RED, borderRadius: "6px", padding: "0.35rem 0.65rem", cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Storage note */}
        <div style={{ marginTop: "2.5rem", padding: "1rem", background: "rgba(41,121,255,0.05)", border: `1px solid rgba(41,121,255,0.12)`, borderRadius: "8px" }}>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em", color: BLUE, marginRight: "0.5rem" }}>ℹ Storage</span>
          <span style={{ fontFamily: SANS, fontSize: "0.75rem", color: DIM }}>
            Files are stored in S3 via the Manus built-in storage layer. URLs are served via signed redirect at <code style={{ fontFamily: MONO, color: "rgba(255,255,255,0.5)" }}>/manus-storage/…</code>. Deleting a record removes the metadata — the key becomes unreachable.
          </span>
        </div>
      </div>
    </div>
  );
}
