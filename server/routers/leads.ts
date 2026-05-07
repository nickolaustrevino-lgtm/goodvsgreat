/**
 * Leads router — admin-only procedures for managing booking requests.
 *
 * Procedures:
 *   leads.list   — paginated list with optional search query and status filter
 *   leads.update — update the status of a single lead
 */

import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";
import { bookingRequests } from "../../drizzle/schema";
import { getDb } from "../db";
import { adminProcedure, router } from "../_core/trpc";

const STATUS_VALUES = ["new", "contacted", "closed"] as const;

export const leadsRouter = router({
  /** List all booking requests, newest first, with optional search and status filter. */
  list: adminProcedure
    .input(
      z.object({
        search: z.string().optional(),
        status: z.enum(["all", ...STATUS_VALUES]).default("all"),
        page:   z.number().int().min(1).default(1),
        limit:  z.number().int().min(1).max(100).default(25),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { items: [], total: 0 };

      const offset = (input.page - 1) * input.limit;

      // Build WHERE conditions
      const conditions = [];

      if (input.status !== "all") {
        conditions.push(eq(bookingRequests.status, input.status));
      }

      if (input.search && input.search.trim().length > 0) {
        const q = `%${input.search.trim()}%`;
        conditions.push(
          or(
            like(bookingRequests.firstName, q),
            like(bookingRequests.lastName, q),
            like(bookingRequests.email, q),
            like(bookingRequests.org, q),
          )
        );
      }

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const [items, countResult] = await Promise.all([
        db
          .select()
          .from(bookingRequests)
          .where(where)
          .orderBy(desc(bookingRequests.createdAt))
          .limit(input.limit)
          .offset(offset),
        db
          .select({ count: sql<number>`count(*)` })
          .from(bookingRequests)
          .where(where),
      ]);

      const total = Number(countResult[0]?.count ?? 0);

      return { items, total };
    }),

  /** Export all booking requests as CSV (no pagination). */
  export: adminProcedure
    .input(
      z.object({
        status: z.enum(["all", ...STATUS_VALUES]).default("all"),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { csv: "" };

      const conditions = [];
      if (input?.status && input.status !== "all") {
        conditions.push(eq(bookingRequests.status, input.status));
      }
      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const rows = await db
        .select()
        .from(bookingRequests)
        .where(where)
        .orderBy(desc(bookingRequests.createdAt));

      // Build CSV
      const headers = ["ID", "First Name", "Last Name", "Email", "Organisation", "Spend", "Challenge", "Details", "Status", "Created At"];
      const escape = (v: unknown) => {
        const s = v == null ? "" : String(v);
        return s.includes(",") || s.includes('"') || s.includes("\n")
          ? `"${s.replace(/"/g, '""')}"`
          : s;
      };
      const lines = [
        headers.join(","),
        ...rows.map((r) =>
          [
            r.id,
            r.firstName,
            r.lastName,
            r.email,
            r.org,
            r.spend,
            r.challenge,
            r.details ?? "",
            r.status,
            new Date(r.createdAt).toISOString(),
          ]
            .map(escape)
            .join(",")
        ),
      ];

      return { csv: lines.join("\n") };
    }),

  /** Update the pipeline status of a single booking request. */
  updateStatus: adminProcedure
    .input(
      z.object({
        id:     z.number().int().positive(),
        status: z.enum(STATUS_VALUES),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      await db
        .update(bookingRequests)
        .set({ status: input.status })
        .where(eq(bookingRequests.id, input.id));

      return { success: true };
    }),
});
