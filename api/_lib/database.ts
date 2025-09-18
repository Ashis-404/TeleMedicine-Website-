import mysql from "mysql2/promise";

// Database configuration for serverless deployment
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'telemedicine',
  waitForConnections: true,
  connectionLimit: 1, // Serverless functions work better with single connections
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Global variable to cache the connection
let cachedConnection: mysql.Connection | null = null;

export async function getDbConnection() {
  if (cachedConnection) {
    try {
      // Test if connection is still alive
      await cachedConnection.ping();
      return cachedConnection;
    } catch (error) {
      // Connection is dead, create a new one
      cachedConnection = null;
    }
  }
  
  try {
    cachedConnection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connection established');
    return cachedConnection;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw new Error('Database connection failed');
  }
}

// Initialize tables if they don't exist
export async function ensureTablesExist() {
  const conn = await getDbConnection();
  
  try {
    // Create users table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role ENUM('patient','doctor','healthworker') NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(255) NULL,
        password_hash VARCHAR(255) NULL,
        employee_id VARCHAR(50) NULL,
        is_verified BOOLEAN DEFAULT TRUE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        UNIQUE KEY uk_phone_role (phone, role),
        UNIQUE KEY uk_email_role (email, role),
        UNIQUE KEY uk_employee_id (employee_id)
      )
    `);

    // Create patients table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        gender ENUM('male','female','other') NOT NULL,
        village VARCHAR(100) NOT NULL,
        registration_date DATE DEFAULT (CURRENT_DATE),
        medical_record_number VARCHAR(20) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    // Create doctors table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(255) NOT NULL,
        employee_id VARCHAR(50) NOT NULL,
        specialization VARCHAR(100) DEFAULT 'General Medicine',
        qualification VARCHAR(200) DEFAULT 'MBBS',
        years_of_experience INT DEFAULT 0,
        consultation_fee DECIMAL(10,2) DEFAULT 0.00,
        is_available BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    // Create healthworkers table
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS healthworkers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        assigned_village VARCHAR(100) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(255) NOT NULL,
        employee_id VARCHAR(50) NOT NULL,
        qualification VARCHAR(200) DEFAULT 'ANM/GNM',
        shift_timing VARCHAR(50) DEFAULT 'Day Shift',
        is_on_duty BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    console.log('✅ Database tables verified/created');
    
  } catch (error) {
    console.error('❌ Error creating database tables:', error);
    throw error;
  }
}