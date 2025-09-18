import crypto from "crypto";
import { pool } from "../db";
import cfg from "../config";

export function generateOtp() {
  return String(crypto.randomInt(100000, 999999));
}

export async function createOtp(userId: number) {
  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + cfg.OTP_TTL_MINUTES * 60 * 1000);
  const conn = await pool.getConnection();
  await conn.query("INSERT INTO otps (user_id, otp, expires_at) VALUES (?, ?, ?)", [userId, otp, expiresAt]);
  conn.release();
  console.log(`[DEV] OTP for user ${userId}: ${otp}`); // logs for testing
  return otp;
}

export async function verifyOtp(userId: number, otp: string) {
  const conn = await pool.getConnection();
  const [rows] = await conn.query("SELECT * FROM otps WHERE user_id=? AND otp=? ORDER BY id DESC LIMIT 1", [userId, otp]);
  conn.release();
  const rec: any = (rows as any[])[0];
  if (!rec) return false;
  if (rec.used) return false;
  if (new Date(rec.expires_at) < new Date()) return false;
  const c = await pool.getConnection();
  await c.query("UPDATE otps SET used=1 WHERE id=?", [rec.id]);
  c.release();
  return true;
}
