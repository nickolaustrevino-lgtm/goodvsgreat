/* =====================================================
   ADMIN - Leads Dashboard  /admin/leads
   GvG Design System v4 · Dark Editorial Intelligence
   ===================================================== */
import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const MONO = "'IBM Plex Mono', monospace";
const SANS = "'Inter', sans-serif";
const BLUE = "#2979FF";
const BORDER = "rgba(255,255,255,0.08)";
const DIM = "rgba(255,255,255,0.35)";
const SURFACE = "#0F172A";

type Status = "new" | "contacted" | "closed";
type StatusFilter = "all" | Status;

const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  new:       { bg: "rgba(47,111,255,0.15)", text: "#6B9FFF" },
  contacted: { bg: "rgba(251,191,36,0.12)", text: "#FBBF24" },
  closed:    { bg: "rgba(52,211,153,0.12)", text: "#34D399" },
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function StatusBadge({ status, onClick }: { status: Status; onClick?: () => void }) {
  const c = STATUS_COLORS[status];
  return (
    <button
      onClick={onClick}
      title="Click to cycle status"
      style={{
        fontFamily: MONO,
        fontSize: "0.55rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        padding: "3px 8px",
        borderRadius: "4px",
        background: c.bg,
        color: c.text,
        border: "none",
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </button>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: SURFACE, color: "#E8E8F0" }}>
      {/* Top bar */}
      <div style={{
        borderBottom: `1px solid ${BORDER}`,
        padding: "0 clamp(1rem, 4vw, 3rem)",
        height: "52px",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        position: "sticky",
        top: 0,
        background: SURFACE,
        zIndex: 10,
      }}>
        <Link href="/" style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: BLUE, textDecoration: "none" }}>
          ← goodvsgreat.ai
        </Link>
        <span style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: DIM }}>
          Admin
        </span>
        <span style={{ fontFamily: MONO, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.55)" }}>
          / Leads
        </span>
        <div style={{ marginLeft: "auto", display: "flex", gap: "1.5rem" }}>
          <Link href="/admin/posts" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>Posts</Link>
          <Link href="/admin/subscribers" style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em", color: DIM, textDecoration: "none" }}>Subscribers</Link>
        </div>
      </div>
      <div style={{ padding: "2rem clamp(1rem, 4vw, 3rem)", maxWidth: "1200px", margin: "0 auto" }}>
        {children}
      </div>
    </div>
  );
}

const STATUS_CYCLE: Record<Status, Status> = {
  new: "contacted",
  contacted: "closed",
  closed: "new",
};

export default function AdminLeads() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 25;

  const exportQuery = trpc.leads.export.useQuery(
    { status: statusFilter },
    { enabled: false } // only fetch on demand
  );

  const handleExport = async () => {
    const result = await exportQuery.refetch();
    const csv = result.data?.csv;
    if (!csv) { toast.error("No data to export"); return; }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gvg-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV downloaded");
  };

  const { data, isLoading, refetch } = trpc.leads.list.useQuery(
    { search, status: statusFilter, page, limit: PAGE_SIZE },
    { enabled: !!user && user.role === "admin" }
  );

  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => { refetch(); },
    onError: (err) => { toast.error(err.message); },
  });

  if (authLoading) {
    return <AdminShell><span style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM }}>Loading…</span></AdminShell>;
  }

  if (!user) {
    return (
      <AdminShell>
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ fontFamily: SANS, color: DIM, marginBottom: "1.5rem" }}>Sign in to access the admin panel.</p>
          <a href={getLoginUrl()} style={{ fontFamily: MONO, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: BLUE, textDecoration: "none" }}>
            Sign in →
          </a>
        </div>
      </AdminShell>
    );
  }

  if (user.role !== "admin") {
    return (
      <AdminShell>
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ fontFamily: SANS, color: DIM }}>You do not have permission to view this page.</p>
        </div>
      </AdminShell>
    );
  }

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusFilter = (s: StatusFilter) => {
    setStatusFilter(s);
    setPage(1);
  };

  const cycleStatus = (id: number, current: Status) => {
    const next = STATUS_CYCLE[current];
    updateStatus.mutate({ id, status: next });
  };

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={{ fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: DIM, margin: "0 0 6px" }}>
          Admin / Leads
        </p>
        <h1 style={{ fontFamily: SANS, fontSize: "1.5rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
          Booking Requests
        </h1>
        <p style={{ fontFamily: SANS, fontSize: "14px", color: DIM, margin: "6px 0 0" }}>
          {total} total lead{total !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search name, email, org…"
          value={search}
          onChange={handleSearch}
          style={{
            flex: "1 1 240px",
            minWidth: "200px",
            maxWidth: "360px",
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${BORDER}`,
            borderRadius: "6px",
            padding: "8px 12px",
            fontFamily: SANS,
            fontSize: "14px",
            color: "#E8E8F0",
            outline: "none",
          }}
        />

        {/* Status filter pills */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center" }}>
          {(["all", "new", "contacted", "closed"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => handleStatusFilter(s)}
              style={{
                fontFamily: MONO,
                fontSize: "0.55rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "5px 12px",
                borderRadius: "4px",
                border: `1px solid ${statusFilter === s ? BLUE : BORDER}`,
                background: statusFilter === s ? "rgba(47,111,255,0.12)" : "transparent",
                color: statusFilter === s ? BLUE : DIM,
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
          {/* Export CSV button */}
          <button
            onClick={handleExport}
            disabled={exportQuery.isFetching}
            style={{
              fontFamily: MONO,
              fontSize: "0.55rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "5px 12px",
              borderRadius: "4px",
              border: `1px solid ${BORDER}`,
              background: "transparent",
              color: exportQuery.isFetching ? DIM : "rgba(52,211,153,0.9)",
              cursor: exportQuery.isFetching ? "not-allowed" : "pointer",
              marginLeft: "auto",
            }}
          >
            {exportQuery.isFetching ? "Exporting…" : "↓ Export CSV"}
          </button>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <p style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM }}>Loading…</p>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0", border: `1px dashed ${BORDER}`, borderRadius: "8px" }}>
          <p style={{ fontFamily: MONO, fontSize: "0.7rem", color: DIM }}>No leads found.</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: SANS, fontSize: "14px" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                {["Name", "Email", "Organisation", "Spend", "Challenge", "Status", "Date"].map((h) => (
                  <th key={h} style={{
                    fontFamily: MONO,
                    fontSize: "0.55rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: DIM,
                    textAlign: "left",
                    padding: "8px 12px",
                    whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((lead) => (
                <tr
                  key={lead.id}
                  style={{ borderBottom: `1px solid ${BORDER}`, transition: "background 160ms ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "12px", whiteSpace: "nowrap", color: "#FFFFFF", fontWeight: 500 }}>
                    {lead.firstName} {lead.lastName}
                  </td>
                  <td style={{ padding: "12px", color: "rgba(255,255,255,0.65)" }}>
                    <a href={`mailto:${lead.email}`} style={{ color: BLUE, textDecoration: "none" }}>{lead.email}</a>
                  </td>
                  <td style={{ padding: "12px", color: "rgba(255,255,255,0.65)", whiteSpace: "nowrap" }}>{lead.org}</td>
                  <td style={{ padding: "12px", color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap", fontSize: "13px" }}>{lead.spend}</td>
                  <td style={{ padding: "12px", color: "rgba(255,255,255,0.55)", fontSize: "13px" }}>{lead.challenge}</td>
                  <td style={{ padding: "12px" }}>
                    <StatusBadge
                      status={lead.status as Status}
                      onClick={() => cycleStatus(lead.id, lead.status as Status)}
                    />
                  </td>
                  <td style={{ padding: "12px", color: DIM, whiteSpace: "nowrap", fontSize: "13px" }}>
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "2rem", alignItems: "center" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em",
              padding: "6px 14px", borderRadius: "4px", border: `1px solid ${BORDER}`,
              background: "transparent", color: page === 1 ? DIM : "#E8E8F0", cursor: page === 1 ? "not-allowed" : "pointer",
            }}
          >← Prev</button>
          <span style={{ fontFamily: MONO, fontSize: "0.6rem", color: DIM }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              fontFamily: MONO, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.1em",
              padding: "6px 14px", borderRadius: "4px", border: `1px solid ${BORDER}`,
              background: "transparent", color: page === totalPages ? DIM : "#E8E8F0", cursor: page === totalPages ? "not-allowed" : "pointer",
            }}
          >Next →</button>
        </div>
      )}

      {/* Details hint */}
      {items.some((l) => l.details) && (
        <p style={{ fontFamily: MONO, fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "1.5rem" }}>
          Tip: open the Database panel to view the full "details" field for each lead.
        </p>
      )}
    </AdminShell>
  );
}
