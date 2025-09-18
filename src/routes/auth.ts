import express from "express";
import { pool } from "../db";
import { hashPassword, comparePassword } from "../utils/hash";
import { createOtp, verifyOtp } from "../utils/otp";
import { signToken } from "../utils/jwt";

const router = express.Router();

/** Patient register */
router.post("/register/patient", async (req, res) => {
  const { name, age, gender, village, phone } = req.body;
  
  // Validate required fields
  if (!name || !age || !gender || !village || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  // Validate data formats
  if (age < 1 || age > 150) {
    return res.status(400).json({ error: "Age must be between 1 and 150" });
  }
  
  if (!/^[0-9]{10,15}$/.test(phone.replace(/[^\d]/g, ''))) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }
  
  const conn = await pool.getConnection();
  
  try {
    // Check if patient already exists
    const [existingUsers] = await conn.query("SELECT id FROM users WHERE phone=? AND role='patient'", [phone]);
    if ((existingUsers as any[]).length > 0) {
      return res.status(400).json({ error: "Patient with this phone number already exists" });
    }

    // Start transaction for data integrity
    await conn.beginTransaction();
    
    // Insert into users table
    const [result] = await conn.query(
      "INSERT INTO users (role, phone, is_verified, is_active) VALUES ('patient', ?, TRUE, TRUE)", 
      [phone]
    );
    const userId = (result as any).insertId;
    
    // Insert into patients table with all details
    await conn.query(
      `INSERT INTO patients (user_id, name, age, gender, village, registration_date, created_at) 
       VALUES (?, ?, ?, ?, ?, CURDATE(), NOW())`,
      [userId, name.trim(), parseInt(age), gender, village]
    );
    
    // Generate medical record number
    const medicalRecordNumber = `MRN${String(userId).padStart(6, '0')}`;
    await conn.query(
      "UPDATE patients SET medical_record_number = ? WHERE user_id = ?",
      [medicalRecordNumber, userId]
    );
    
    // Commit transaction
    await conn.commit();
    
    // Get complete user data
    const [userRows] = await conn.query(
      `SELECT u.id, u.role, u.phone, u.email, p.name, p.medical_record_number, p.village
       FROM users u JOIN patients p ON u.id = p.user_id WHERE u.id = ?`, 
      [userId]
    );
    const user: any = (userRows as any[])[0];
    
    // Generate JWT token
    const token = signToken({ id: user.id, role: user.role, phone: user.phone });
    
    console.log(`✅ Patient registered successfully: ${user.name} (${user.medical_record_number})`);
    
    res.json({ 
      ok: true, 
      token, 
      user: {
        id: user.id,
        role: user.role,
        phone: user.phone,
        name: user.name,
        medicalRecordNumber: user.medical_record_number,
        village: user.village
      }
    });
  } catch (error) {
    // Rollback transaction on error
    await conn.rollback();
    console.error('Patient registration error:', error);
    res.status(500).json({ error: "Registration failed. Please try again." });
  } finally {
    conn.release();
  }
});

/** Doctor register */
router.post("/register/doctor", async (req, res) => {
  const { name, phone, email, password, employeeId } = req.body;
  
  // Validate required fields
  if (!name || !phone || !email || !password || !employeeId) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  // Validate email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  
  // Validate phone format
  if (!/^[0-9]{10,15}$/.test(phone.replace(/[^\d]/g, ''))) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }
  
  // Validate password strength
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }
  
  const conn = await pool.getConnection();
  
  try {
    // Check if doctor already exists
    const [existingUsers] = await conn.query(
      "SELECT id FROM users WHERE (email=? OR phone=? OR employee_id=?) AND role='doctor'", 
      [email, phone, employeeId]
    );
    if ((existingUsers as any[]).length > 0) {
      return res.status(400).json({ error: "Doctor with this email, phone, or employee ID already exists" });
    }

    // Start transaction for data integrity
    await conn.beginTransaction();
    
    const pwHash = await hashPassword(password);
    
    // Insert into users table
    const [result] = await conn.query(
      "INSERT INTO users (role, phone, email, password_hash, employee_id, is_verified, is_active) VALUES ('doctor',?,?,?,?, TRUE, TRUE)",
      [phone, email.toLowerCase(), pwHash, employeeId]
    );
    const userId = (result as any).insertId;
    
    // Insert into doctors table with comprehensive data
    await conn.query(
      `INSERT INTO doctors (user_id, name, phone, email, employee_id, qualification, specialization, 
       years_of_experience, consultation_fee, is_available, created_at) 
       VALUES (?,?,?,?,?, 'MBBS', 'General Medicine', 0, 0.00, TRUE, NOW())`,
      [userId, name.trim(), phone, email.toLowerCase(), employeeId]
    );
    
    // Commit transaction
    await conn.commit();
    
    // Get complete user data
    const [userRows] = await conn.query(
      `SELECT u.id, u.role, u.phone, u.email, d.name, d.employee_id, d.specialization
       FROM users u JOIN doctors d ON u.id = d.user_id WHERE u.id = ?`, 
      [userId]
    );
    const user: any = (userRows as any[])[0];
    
    // Generate JWT token
    const token = signToken({ id: user.id, role: user.role, phone: user.phone });
    
    console.log(`✅ Doctor registered successfully: ${user.name} (${user.employee_id})`);
    
    res.json({ 
      ok: true, 
      token, 
      user: {
        id: user.id,
        role: user.role,
        phone: user.phone,
        email: user.email,
        name: user.name,
        employeeId: user.employee_id,
        specialization: user.specialization
      }
    });
  } catch (error) {
    // Rollback transaction on error
    await conn.rollback();
    console.error('Doctor registration error:', error);
    res.status(500).json({ error: "Registration failed. Please try again." });
  } finally {
    conn.release();
  }
});

/** Healthworker register */
router.post("/register/healthworker", async (req, res) => {
  const { name, village, phone, email, password, employeeId } = req.body;
  
  // Validate required fields
  if (!name || !village || !phone || !email || !password || !employeeId) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  // Validate email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  
  // Validate phone format
  if (!/^[0-9]{10,15}$/.test(phone.replace(/[^\d]/g, ''))) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }
  
  // Validate password strength
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }
  
  const conn = await pool.getConnection();
  
  try {
    // Check if healthworker already exists
    const [existingUsers] = await conn.query(
      "SELECT id FROM users WHERE (email=? OR phone=? OR employee_id=?) AND role='healthworker'", 
      [email, phone, employeeId]
    );
    if ((existingUsers as any[]).length > 0) {
      return res.status(400).json({ error: "Health worker with this email, phone, or employee ID already exists" });
    }

    // Start transaction for data integrity
    await conn.beginTransaction();
    
    const pwHash = await hashPassword(password);
    
    // Insert into users table
    const [result] = await conn.query(
      "INSERT INTO users (role, phone, email, password_hash, employee_id, is_verified, is_active) VALUES ('healthworker',?,?,?,?, TRUE, TRUE)",
      [phone, email.toLowerCase(), pwHash, employeeId]
    );
    const userId = (result as any).insertId;
    
    // Insert into healthworkers table with comprehensive data
    await conn.query(
      `INSERT INTO healthworkers (user_id, name, assigned_village, phone, email, employee_id, 
       qualification, shift_timing, is_on_duty, created_at) 
       VALUES (?,?,?,?,?,?, 'ANM/GNM', 'Day Shift', TRUE, NOW())`,
      [userId, name.trim(), village, phone, email.toLowerCase(), employeeId]
    );
    
    // Commit transaction
    await conn.commit();
    
    // Get complete user data
    const [userRows] = await conn.query(
      `SELECT u.id, u.role, u.phone, u.email, h.name, h.employee_id, h.assigned_village
       FROM users u JOIN healthworkers h ON u.id = h.user_id WHERE u.id = ?`, 
      [userId]
    );
    const user: any = (userRows as any[])[0];
    
    // Generate JWT token
    const token = signToken({ id: user.id, role: user.role, phone: user.phone });
    
    console.log(`✅ Health worker registered successfully: ${user.name} (${user.employee_id}) - ${user.assigned_village}`);
    
    res.json({ 
      ok: true, 
      token, 
      user: {
        id: user.id,
        role: user.role,
        phone: user.phone,
        email: user.email,
        name: user.name,
        employeeId: user.employee_id,
        assignedVillage: user.assigned_village
      }
    });
  } catch (error) {
    // Rollback transaction on error
    await conn.rollback();
    console.error('Health worker registration error:', error);
    res.status(500).json({ error: "Registration failed. Please try again." });
  } finally {
    conn.release();
  }
});

/** Patient login - direct authentication */
router.post("/login/patient", async (req, res) => {
  const { phone } = req.body;
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT id, role, phone, email FROM users WHERE phone=? AND role='patient'", [phone]);
    const user: any = (rows as any[])[0];
    if (!user) return res.status(404).json({ error: "Patient not found. Please register first." });
    
    const token = signToken({ id: user.id, role: user.role });
    res.json({ ok: true, token, user });
  } finally {
    conn.release();
  }
});

/** Doctor/healthworker direct login */
router.post("/login", async (req, res) => {
  const { identifier, password, employeeId, role } = req.body;
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM users WHERE (email=? OR phone=?) AND employee_id=? AND role=?", [identifier, identifier, employeeId, role]);
    const user: any = (rows as any[])[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    const ok = await comparePassword(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    
    const token = signToken({ id: user.id, role: user.role });
    const userData = { id: user.id, role: user.role, phone: user.phone, email: user.email };
    res.json({ ok: true, token, user: userData });
  } finally {
    conn.release();
  }
});

/** Patient login - request OTP (legacy - kept for backward compatibility) */
router.post("/request-otp/patient", async (req, res) => {
  const { phone } = req.body;
  const conn = await pool.getConnection();
  const [rows] = await conn.query("SELECT id FROM users WHERE phone=? AND role='patient'", [phone]);
  conn.release();
  const user: any = (rows as any[])[0];
  if (!user) return res.status(404).json({ error: "Patient not found. Please register first." });
  await createOtp(user.id);
  res.json({ ok: true, userId: user.id });
});

/** Doctor/healthworker login step 1 */
router.post("/login/stage1", async (req, res) => {
  const { identifier, password, employeeId } = req.body;
  const conn = await pool.getConnection();
  const [rows] = await conn.query("SELECT * FROM users WHERE (email=? OR phone=?) AND employee_id=?", [identifier, identifier, employeeId]);
  conn.release();
  const user: any = (rows as any[])[0];
  if (!user) return res.status(401).json({ error: "invalid" });
  const ok = await comparePassword(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "invalid" });
  await createOtp(user.id);
  res.json({ ok: true, userId: user.id });
});

/** Verify OTP for any user */
router.post("/verify-otp", async (req, res) => {
  const { userId, otp } = req.body;
  const valid = await verifyOtp(userId, otp);
  if (!valid) return res.status(400).json({ error: "otp_invalid" });
  const conn = await pool.getConnection();
  const [rows] = await conn.query("SELECT id, role, phone, email FROM users WHERE id=?", [userId]);
  conn.release();
  const user: any = (rows as any[])[0];
  const token = signToken({ id: user.id, role: user.role });
  res.json({ ok: true, token, user });
});

export default router;
