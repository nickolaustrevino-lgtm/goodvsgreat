import { eq, desc, and } from "drizzle-orm";
import { getDb } from "./db";
import { posts, InsertPost } from "../drizzle/schema";

export async function createPost(data: InsertPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(posts).values(data);
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, data.slug))
    .limit(1);
  return result[0];
}

export async function updatePost(
  id: number,
  data: Partial<Omit<InsertPost, "id" | "authorId" | "createdAt">>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(posts).set(data).where(eq(posts.id, id));
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0];
}

export async function deletePost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(posts).where(eq(posts.id, id));
}

export async function getPostById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return result[0] ?? null;
}

export async function getPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return result[0] ?? null;
}

export async function getPublishedPosts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));
}

export async function getAllPosts() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(posts).orderBy(desc(posts.updatedAt));
}
