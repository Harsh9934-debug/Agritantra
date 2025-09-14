const mysql = require('mysql2/promise');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

// MySQL Database Configuration
const mysqlConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'agritantra',
  connectionLimit: 20,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create MySQL connection pool
let mysqlPool;

const initializeMysql = async () => {
  try {
    mysqlPool = mysql.createPool(mysqlConfig);
    
    // Test connection
    const connection = await mysqlPool.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
    
    // Create tables if they don't exist
    await createTables();
    
    return mysqlPool;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    throw error;
  }
};

// Firebase Configuration
let firestore;

const initializeFirebase = () => {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      
      initializeApp({
        credential: cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
      
      firestore = getFirestore();
      console.log('✅ Firebase connected successfully');
      
      return firestore;
    } else {
      console.log('⚠️  Firebase not configured (FIREBASE_SERVICE_ACCOUNT not found)');
      return null;
    }
  } catch (error) {
    console.error('❌ Firebase connection failed:', error.message);
    return null;
  }
};

// Create database tables
const createTables = async () => {
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      address TEXT,
      user_type ENUM('farmer', 'buyer', 'admin') DEFAULT 'farmer',
      email_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_email (email),
      INDEX idx_user_type (user_type)
    )`,
    
    `CREATE TABLE IF NOT EXISTS farms (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255),
      area_hectares DECIMAL(10,2),
      soil_type VARCHAR(100),
      coordinates_lat DECIMAL(10,8),
      coordinates_lng DECIMAL(11,8),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_id (user_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS iot_devices (
      id VARCHAR(36) PRIMARY KEY,
      farm_id VARCHAR(36) NOT NULL,
      device_name VARCHAR(255) NOT NULL,
      device_type ENUM('sensor', 'actuator', 'camera') NOT NULL,
      api_key VARCHAR(255) UNIQUE NOT NULL,
      status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
      location_description TEXT,
      coordinates_lat DECIMAL(10,8),
      coordinates_lng DECIMAL(11,8),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
      INDEX idx_farm_id (farm_id),
      INDEX idx_api_key (api_key)
    )`,
    
    `CREATE TABLE IF NOT EXISTS sensor_data (
      id VARCHAR(36) PRIMARY KEY,
      device_id VARCHAR(36) NOT NULL,
      temperature DECIMAL(5,2),
      humidity DECIMAL(5,2),
      soil_moisture DECIMAL(5,2),
      ph_level DECIMAL(4,2),
      light_intensity INT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (device_id) REFERENCES iot_devices(id) ON DELETE CASCADE,
      INDEX idx_device_id (device_id),
      INDEX idx_timestamp (timestamp)
    )`,
    
    `CREATE TABLE IF NOT EXISTS irrigation_schedules (
      id VARCHAR(36) PRIMARY KEY,
      farm_id VARCHAR(36) NOT NULL,
      device_id VARCHAR(36),
      name VARCHAR(255) NOT NULL,
      start_time TIME NOT NULL,
      duration_minutes INT NOT NULL,
      days_of_week JSON,
      is_active BOOLEAN DEFAULT TRUE,
      moisture_threshold DECIMAL(5,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
      FOREIGN KEY (device_id) REFERENCES iot_devices(id) ON DELETE SET NULL,
      INDEX idx_farm_id (farm_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS crop_health_analysis (
      id VARCHAR(36) PRIMARY KEY,
      farm_id VARCHAR(36) NOT NULL,
      image_url VARCHAR(500),
      analysis_result JSON,
      disease_detected VARCHAR(255),
      confidence_score DECIMAL(5,4),
      recommendations TEXT,
      analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
      INDEX idx_farm_id (farm_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS marketplace_products (
      id VARCHAR(36) PRIMARY KEY,
      farmer_id VARCHAR(36) NOT NULL,
      farm_id VARCHAR(36) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      quantity_available DECIMAL(10,2),
      unit VARCHAR(20),
      price_per_unit DECIMAL(10,2),
      description TEXT,
      harvest_date DATE,
      quality_grade ENUM('A', 'B', 'C') DEFAULT 'A',
      images JSON,
      status ENUM('available', 'sold', 'expired') DEFAULT 'available',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
      INDEX idx_farmer_id (farmer_id),
      INDEX idx_category (category)
    )`,
    
    `CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(36) PRIMARY KEY,
      buyer_id VARCHAR(36) NOT NULL,
      farmer_id VARCHAR(36) NOT NULL,
      product_id VARCHAR(36) NOT NULL,
      quantity DECIMAL(10,2) NOT NULL,
      price_per_unit DECIMAL(10,2) NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
      payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
      payment_intent_id VARCHAR(255),
      delivery_address TEXT,
      delivery_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES marketplace_products(id) ON DELETE CASCADE,
      INDEX idx_buyer_id (buyer_id),
      INDEX idx_farmer_id (farmer_id)
    )`,
    
    `CREATE TABLE IF NOT EXISTS financial_transactions (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      farm_id VARCHAR(36),
      transaction_type ENUM('income', 'expense') NOT NULL,
      category VARCHAR(100),
      amount DECIMAL(10,2) NOT NULL,
      description TEXT,
      transaction_date DATE NOT NULL,
      payment_method VARCHAR(50),
      reference_id VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE SET NULL,
      INDEX idx_user_id (user_id),
      INDEX idx_transaction_type (transaction_type)
    )`
  ];

  try {
    for (const table of tables) {
      await mysqlPool.execute(table);
    }
    console.log('✅ Database tables created/verified successfully');
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    throw error;
  }
};

// Database query helpers
const executeQuery = async (query, params = []) => {
  try {
    const [results] = await mysqlPool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
};

const beginTransaction = async () => {
  const connection = await mysqlPool.getConnection();
  await connection.beginTransaction();
  return connection;
};

const commitTransaction = async (connection) => {
  await connection.commit();
  connection.release();
};

const rollbackTransaction = async (connection) => {
  await connection.rollback();
  connection.release();
};

// Initialize databases
const initializeDatabases = async () => {
  try {
    await initializeMysql();
    initializeFirebase();
    console.log('🎉 Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
};

module.exports = {
  mysqlPool,
  firestore,
  executeQuery,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
  initializeDatabases
};