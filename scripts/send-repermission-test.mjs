import mysql from "mysql2/promise";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";

// Load DATABASE_URL from .env if present
let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  try {
    const env = readFileSync("/home/ubuntu/goodvsgreat/.env", "utf8");
    const match = env.match(/DATABASE_URL=(.+)/);
    if (match) dbUrl = match[1].trim();
  } catch {}
}
if (!dbUrl) throw new Error("DATABASE_URL not set");

const token = randomBytes(24).toString("hex"); // 48-char hex token
const email = "nickolaus.trevino@gmail.com";
const name = "Nickolaus Trevino";

const conn = await mysql.createConnection(dbUrl);

// Upsert subscriber with token
await conn.execute(
  `INSERT INTO subscribers (email, name, source, confirmToken)
   VALUES (?, ?, ?, ?)
   ON DUPLICATE KEY UPDATE confirmToken = VALUES(confirmToken), confirmedAt = NULL`,
  [email, name, "re-permission-test", token]
);

await conn.end();

console.log("TOKEN:", token);
console.log("CONFIRM URL:", `https://goodvsgreat.ai/subscribe/confirm?token=${token}`);
