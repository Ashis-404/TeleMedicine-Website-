import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db: any = null;

export async function getDatabase() {
  if (!db) {
    db = await open({
      filename: path.join(process.cwd(), 'telemedicine.db'),
      driver: sqlite3.Database
    });

    // Initialize tables if they don't exist
    await initializeTables();
  }
  return db;
}

async function initializeTables() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL CHECK (role IN ('patient','doctor','healthworker')),
      phone TEXT NOT NULL,
      email TEXT,
      password_hash TEXT,
      employee_id TEXT,
      is_verified BOOLEAN DEFAULT TRUE,
      is_active BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(phone, role),
      UNIQUE(email, role),
      UNIQUE(employee_id)
    );

    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL CHECK (gender IN ('male','female','other')),
      village TEXT NOT NULL,
      registration_date DATE DEFAULT CURRENT_DATE,
      medical_record_number TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS doctors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      specialization TEXT DEFAULT 'General Medicine',
      qualification TEXT DEFAULT 'MBBS',
      years_of_experience INTEGER DEFAULT 0,
      consultation_fee DECIMAL(10,2) DEFAULT 0.00,
      is_available BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS healthworkers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      assigned_village TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      qualification TEXT DEFAULT 'ANM/GNM',
      shift_timing TEXT DEFAULT 'Day Shift',
      is_on_duty BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  console.log('✅ SQLite database initialized successfully');
}