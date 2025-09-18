import mysql from "mysql2/promise";
import cfg from "./config";

export const pool = mysql.createPool({
  host: cfg.DB_HOST,
  port: cfg.DB_PORT,
  user: cfg.DB_USER,
  password: cfg.DB_PASSWORD,
  database: cfg.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection and initialize tables on startup
pool.getConnection()
  .then(async connection => {
    console.log('✅ Database connected successfully');
    connection.release();
    
    // Initialize database tables
    const { initializeDatabase } = await import('./init-db');
    await initializeDatabase();
  })
  .catch(error => {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Please check:');
    console.error('   1. MySQL server is running');
    console.error('   2. Database credentials in .env file are correct');
    console.error('   3. Database "telemedicine" exists');
    console.error('   4. Run: CREATE DATABASE IF NOT EXISTS telemedicine;');
  });
