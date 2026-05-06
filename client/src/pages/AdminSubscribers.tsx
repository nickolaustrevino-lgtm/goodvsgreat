/* =====================================================
   ADMIN — Subscribers  /admin/subscribers
   GvG Design System v4
   ===================================================== */
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";
const BG = "oklch(16% 0.005 285)";

function AdminShell({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#fff", fontFamily: SANS }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "1rem 2rem", display: "flex", alignItems: "center", gap: "2rem" }}>
        <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: BLUE }}>GvG Admin</span>
        <button onClick={() => navigate("/admin/posts")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>Posts</button>
        <button onClick={() => navigate("/admin/import")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>Import</button>
        <button onClick={() => navigate("/admin/subscribers")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff" }}>Subscribers</button>
        <button onClick={() => navigate("/files")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>Files</button>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>← Site</button>
        </div>
      </div>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem" }}>{children}</div>
    </div>
  );
}

function formatDate(d: Date | string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AdminSubscribers() {
  const { user, loading } = useAuth();
  const { data: subscribers, isLoading } = trpc.subscribers.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  if (loading) {
    return (
      <AdminShell>
        <div style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM, textAlign: "center", padding: "4rem" }}>Loading…</div>
      </AdminShell>
    );
  }

  if (!user) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user.role !== "admin") {
    return (
      <AdminShell>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p style={{ fontFamily: SANS, color: DIM }}>Admin access required.</p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: BLUE, display: "block", marginBottom: "0.5rem" }}>Subscribers</span>
          <h1 style={{ fontFamily: MONO, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
            Email List
          </h1>
        </div>
        {subscribers && (
          <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>
            {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM, textAlign: "center", padding: "3rem" }}>Loading…</div>
      ) : !subscribers || subscribers.length === 0 ? (
        <div style={{ border: `1px dashed ${BORDER}`, borderRadius: "12px", padding: "4rem", textAlign: "center" }}>
          <p style={{ fontFamily: SANS, fontSize: "0.9rem", color: DIM }}>No subscribers yet. The form appears at the bottom of every published post.</p>
        </div>
      ) : (
        <div style={{ border: `1px solid ${BORDER}`, borderRadius: "12px", overflow: "hidden" }}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr", padding: "0.75rem 1.25rem", borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
            {["Email", "Name", "Source", "Subscribed"].map((h) => (
              <span key={h} style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>{h}</span>
            ))}
          </div>
          {/* Rows */}
          {subscribers.map((sub, i) => (
            <div
              key={sub.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1.5fr 1.5fr",
                padding: "0.9rem 1.25rem",
                borderBottom: i < subscribers.length - 1 ? `1px solid ${BORDER}` : "none",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.email}</span>
              <span style={{ fontFamily: SANS, fontSize: "0.875rem", color: DIM }}>{sub.name || "—"}</span>
              <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: BLUE }}>{sub.source || "blog"}</span>
              <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>{formatDate(sub.createdAt)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Export hint */}
      {subscribers && subscribers.length > 0 && (
        <p style={{ fontFamily: SANS, fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", marginTop: "1.5rem" }}>
          To export, use the Database panel → subscribers table → export as CSV.
        </p>
      )}
    </AdminShell>
  );
}
