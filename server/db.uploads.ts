import { eq, desc } from "drizzle-orm";
import { getDb } from "./db";
import { uploads, InsertUpload } from "../drizzle/schema";

export async function insertUpload(data: InsertUpload) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(uploads).values(data);
}

export async function getUploadsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(uploads)
    .where(eq(uploads.userId, userId))
    .orderBy(desc(uploads.createdAt));
}

export async function deleteUploadById(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .delete(uploads)
    .where(eq(uploads.id, id));
}
