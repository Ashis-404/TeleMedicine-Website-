import express from "express";
import { pool } from "../db";
import jwt from "jsonwebtoken";
import cfg from "../config";

const router = express.Router();

console.log("Profile router loaded");

router.get("/me", async (req, res) => {
  console.log("Profile API called", req.headers.authorization);
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "no_token" });
  
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ error: "invalid_token_format" });
  
  let decoded: any;
  try {
    decoded = jwt.verify(token, cfg.JWT_SECRET);
    console.log("Token decoded:", decoded);
  } catch (error) {
    console.log("JWT verification failed:", error);
    return res.status(401).json({ error: "invalid_token" });
  }
  
  const conn = await pool.getConnection();
  
  try {
    let user: any = null;
    let profile: any = null;
    
    // Get user data
    const [users] = await conn.query("SELECT * FROM users WHERE id=?", [decoded.id]);
    user = (users as any[])[0];
    
    if (!user) {
      return res.status(404).json({ error: "user_not_found" });
    }
    
    console.log("User found:", user);
    
    if (decoded.role === "patient") {
      const [p] = await conn.query("SELECT * FROM patients WHERE user_id=?", [decoded.id]);
      profile = (p as any[])[0];
      console.log("Patient profile:", profile);
    }
    if (decoded.role === "doctor") {
      const [d] = await conn.query("SELECT * FROM doctors WHERE user_id=?", [decoded.id]);
      profile = (d as any[])[0];
    }
    if (decoded.role === "healthworker") {
      const [h] = await conn.query("SELECT * FROM healthworkers WHERE user_id=?", [decoded.id]);
      profile = (h as any[])[0];
    }
    
    res.json({ ok: true, user, profile });
    
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "database_error" });
  } finally {
    conn.release();
  }
});


export default router;
