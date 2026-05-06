/* =====================================================
   ADMIN - Subscribers  /admin/subscribers
   GvG Design System v4
   ===================================================== */
import { useState } from "react";
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
const GREEN = "#22c55e";
const AMBER = "#f59e0b";

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
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 2rem" }}>{children}</div>
    </div>
  );
}

function formatDate(d: Date | string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Small toast notification */
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999,
      background: type === "success" ? "#052e16" : "#2d0a0a",
      border: `1px solid ${type === "success" ? GREEN : "#ef4444"}`,
      borderRadius: "8px", padding: "0.75rem 1.25rem",
      fontFamily: MONO, fontSize: "0.7rem", color: type === "success" ? GREEN : "#ef4444",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      maxWidth: "360px",
    }}>
      {message}
    </div>
  );
}

export default function AdminSubscribers() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();

  const { data: subscribers, isLoading } = trpc.subscribers.list.useQuery(undefined, {
    enabled: !!user && user.role === "admin",
  });

  const sendConfirmation = trpc.subscribers.sendConfirmation.useMutation({
    onSuccess: (_, vars) => {
      setToast({ message: `Confirmation email sent to ${vars.email}`, type: "success" });
      setTimeout(() => setToast(null), 4000);
      utils.subscribers.list.invalidate();
    },
    onError: (err, vars) => {
      setToast({ message: `Failed to send to ${vars.email}: ${err.message}`, type: "error" });
      setTimeout(() => setToast(null), 5000);
    },
  });

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [sendingId, setSendingId] = useState<number | null>(null);

  function handleSendConfirmation(sub: { id: number; email: string; name: string | null }) {
    setSendingId(sub.id);
    const firstName = sub.name?.split(" ")[0] ?? undefined;
    sendConfirmation.mutate(
      { email: sub.email, firstName },
      { onSettled: () => setSendingId(null) }
    );
  }

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

  const confirmedCount = subscribers?.filter((s) => s.confirmedAt).length ?? 0;
  const pendingCount = (subscribers?.length ?? 0) - confirmedCount;

  return (
    <AdminShell>
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Header */}
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: BLUE, display: "block", marginBottom: "0.5rem" }}>Subscribers</span>
          <h1 style={{ fontFamily: MONO, fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", margin: 0 }}>
            Email List
          </h1>
        </div>
        {subscribers && (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: GREEN }}>
              {confirmedCount} confirmed
            </span>
            <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: AMBER }}>
              {pendingCount} pending
            </span>
            <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: DIM }}>
              {subscribers.length} total
            </span>
          </div>
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
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1.5fr", padding: "0.75rem 1.25rem", borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.02)" }}>
            {["Email", "Name", "Source", "Status", "Action"].map((h) => (
              <span key={h} style={{ fontFamily: MONO, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM }}>{h}</span>
            ))}
          </div>
          {/* Rows */}
          {subscribers.map((sub, i) => {
            const isConfirmed = !!sub.confirmedAt;
            const isSending = sendingId === sub.id;
            return (
              <div
                key={sub.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1.5fr",
                  padding: "0.9rem 1.25rem",
                  borderBottom: i < subscribers.length - 1 ? `1px solid ${BORDER}` : "none",
                  alignItems: "center",
                  background: isConfirmed ? "rgba(34,197,94,0.03)" : "transparent",
                }}
              >
                {/* Email */}
                <span style={{ fontFamily: SANS, fontSize: "0.875rem", color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {sub.email}
                </span>

                {/* Name */}
                <span style={{ fontFamily: SANS, fontSize: "0.875rem", color: DIM }}>
                  {sub.name || "-"}
                </span>

                {/* Source */}
                <span style={{ fontFamily: MONO, fontSize: "0.65rem", color: BLUE }}>
                  {sub.source || "blog"}
                </span>

                {/* Status badge */}
                <span style={{
                  fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: isConfirmed ? GREEN : AMBER,
                  background: isConfirmed ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.12)",
                  border: `1px solid ${isConfirmed ? "rgba(34,197,94,0.3)" : "rgba(245,158,11,0.3)"}`,
                  borderRadius: "4px", padding: "2px 6px", display: "inline-block",
                }}>
                  {isConfirmed ? "✓ confirmed" : "pending"}
                </span>

                {/* Send button */}
                <div>
                  <button
                    onClick={() => handleSendConfirmation(sub)}
                    disabled={isSending}
                    style={{
                      background: "none",
                      border: `1px solid ${isSending ? BORDER : "rgba(41,121,255,0.4)"}`,
                      borderRadius: "4px",
                      padding: "4px 10px",
                      cursor: isSending ? "not-allowed" : "pointer",
                      fontFamily: MONO,
                      fontSize: "0.6rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: isSending ? DIM : BLUE,
                      opacity: isSending ? 0.5 : 1,
                      transition: "opacity 0.15s, border-color 0.15s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isSending ? "Sending…" : "Send Email"}
                  </button>
                </div>
              </div>
            );
          })}
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
