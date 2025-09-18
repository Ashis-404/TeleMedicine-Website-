/*database.ts*/

// Database configuration for HealthBridge
import mysql from 'mysql2/promise';

// Database connection configuration
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'healthbridge_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00',
  charset: 'utf8mb4'
};

// Create connection pool
export const pool = mysql.createPool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Close all connections
export async function closeConnection() {
  try {
    await pool.end();
    console.log('🔒 Database connections closed');
  } catch (error) {
    console.error('Error closing database connections:', error);
  }
}