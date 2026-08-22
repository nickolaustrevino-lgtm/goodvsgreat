import { isNotNull } from "drizzle-orm";
import { sendAuditedAugust21AnnouncementProduction } from "../server/blogAnnouncement";
import { getDb } from "../server/db";
import { subscribers } from "../drizzle/schema";

const db = await getDb();
if (!db) throw new Error("Database not available");

const recipients = await db
  .select({ email: subscribers.email })
  .from(subscribers)
  .where(isNotNull(subscribers.confirmedAt));

let accepted = 0;
const failed: string[] = [];

for (const { email } of recipients) {
  const result = await sendAuditedAugust21AnnouncementProduction(email);
  if (result.accepted) accepted += 1;
  else failed.push(email);
}

console.log(JSON.stringify({ attempted: recipients.length, accepted, failed }, null, 2));

if (failed.length > 0) process.exitCode = 1;
