import { eq, isNotNull } from "drizzle-orm";
import { getDb } from "./db";
import { subscribers, InsertSubscriber } from "../drizzle/schema";

export async function addSubscriber(data: InsertSubscriber) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(subscribers).values(data).onDuplicateKeyUpdate({
    set: { email: data.email }, // no-op update to avoid error on duplicate
  });
}

export async function getSubscriberByEmail(email: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
  return rows[0] ?? null;
}

export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(subscribers).orderBy(subscribers.createdAt);
}

export async function getSubscriberByToken(token: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(subscribers).where(eq(subscribers.confirmToken, token)).limit(1);
  return rows[0] ?? null;
}

export async function confirmSubscriber(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(subscribers).set({ confirmedAt: new Date(), confirmToken: null }).where(eq(subscribers.id, id));
}

export async function upsertSubscriberWithToken(data: { email: string; name?: string | null; source?: string | null; confirmToken: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(subscribers).values({
    email: data.email,
    name: data.name ?? null,
    source: data.source ?? "re-permission",
    confirmToken: data.confirmToken,
  }).onDuplicateKeyUpdate({
    set: { confirmToken: data.confirmToken },
  });
}

export async function getConfirmedSubscribers() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(subscribers).where(isNotNull(subscribers.confirmedAt)).orderBy(subscribers.confirmedAt);
}
