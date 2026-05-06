import mysql from "mysql2/promise";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";

// Load DATABASE_URL
let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  try {
    const env = readFileSync("/home/ubuntu/goodvsgreat/.env", "utf8");
    const match = env.match(/DATABASE_URL=(.+)/);
    if (match) dbUrl = match[1].trim();
  } catch {}
}
if (!dbUrl) throw new Error("DATABASE_URL not set");

const token = randomBytes(24).toString("hex");
const email = "nickolaus.trevino@gmail.com";
const confirmUrl = `https://goodvsgreat.ai/subscribe/confirm?token=${token}`;

const conn = await mysql.createConnection(dbUrl);
await conn.execute(
  "UPDATE subscribers SET confirmToken = ?, confirmedAt = NULL WHERE email = ?",
  [token, email]
);
await conn.end();

console.log("TOKEN:", token);
console.log("CONFIRM URL:", confirmUrl);
