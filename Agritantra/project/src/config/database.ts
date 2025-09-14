// Database configuration and schemas
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
}

// MySQL/PostgreSQL Schema Definitions
export const SQL_SCHEMAS = {
  // Users table
  users: `
    CREATE TABLE IF NOT EXISTS users (
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
    );
  `,

  // Farms table
  farms: `
    CREATE TABLE IF NOT EXISTS farms (
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
      INDEX idx_user_id (user_id),
      INDEX idx_location (location)
    );
  `,

  // IoT Devices table
  iot_devices: `
    CREATE TABLE IF NOT EXISTS iot_devices (
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
      INDEX idx_api_key (api_key),
      INDEX idx_status (status)
    );
  `,

  // Sensor Data table
  sensor_data: `
    CREATE TABLE IF NOT EXISTS sensor_data (
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
    );
  `,

  // Irrigation Schedules table
  irrigation_schedules: `
    CREATE TABLE IF NOT EXISTS irrigation_schedules (
      id VARCHAR(36) PRIMARY KEY,
      farm_id VARCHAR(36) NOT NULL,
      device_id VARCHAR(36),
      name VARCHAR(255) NOT NULL,
      start_time TIME NOT NULL,
      duration_minutes INT NOT NULL,
      days_of_week VARCHAR(20), -- JSON array of day numbers
      is_active BOOLEAN DEFAULT TRUE,
      moisture_threshold DECIMAL(5,2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
      FOREIGN KEY (device_id) REFERENCES iot_devices(id) ON DELETE SET NULL,
      INDEX idx_farm_id (farm_id),
      INDEX idx_active (is_active)
    );
  `,

  // Crop Health Analysis table
  crop_health_analysis: `
    CREATE TABLE IF NOT EXISTS crop_health_analysis (
      id VARCHAR(36) PRIMARY KEY,
      farm_id VARCHAR(36) NOT NULL,
      image_url VARCHAR(500),
      analysis_result JSON,
      disease_detected VARCHAR(255),
      confidence_score DECIMAL(5,4),
      recommendations TEXT,
      analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
      INDEX idx_farm_id (farm_id),
      INDEX idx_analyzed_at (analyzed_at)
    );
  `,

  // Marketplace Products table
  marketplace_products: `
    CREATE TABLE IF NOT EXISTS marketplace_products (
      id VARCHAR(36) PRIMARY KEY,
      farmer_id VARCHAR(36) NOT NULL,
      farm_id VARCHAR(36) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      quantity_available DECIMAL(10,2),
      unit VARCHAR(20), -- kg, quintal, etc.
      price_per_unit DECIMAL(10,2),
      description TEXT,
      harvest_date DATE,
      quality_grade ENUM('A', 'B', 'C') DEFAULT 'A',
      images JSON, -- Array of image URLs
      status ENUM('available', 'sold', 'expired') DEFAULT 'available',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
      INDEX idx_farmer_id (farmer_id),
      INDEX idx_category (category),
      INDEX idx_status (status)
    );
  `,

  // Orders table
  orders: `
    CREATE TABLE IF NOT EXISTS orders (
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
      INDEX idx_farmer_id (farmer_id),
      INDEX idx_status (status)
    );
  `,

  // Financial Transactions table
  financial_transactions: `
    CREATE TABLE IF NOT EXISTS financial_transactions (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      farm_id VARCHAR(36),
      transaction_type ENUM('income', 'expense') NOT NULL,
      category VARCHAR(100), -- seeds, fertilizer, equipment, sales, etc.
      amount DECIMAL(10,2) NOT NULL,
      description TEXT,
      transaction_date DATE NOT NULL,
      payment_method VARCHAR(50),
      reference_id VARCHAR(255), -- Order ID, Bill number, etc.
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE SET NULL,
      INDEX idx_user_id (user_id),
      INDEX idx_transaction_type (transaction_type),
      INDEX idx_transaction_date (transaction_date)
    );
  `,

  // API Keys table
  api_keys: `
    CREATE TABLE IF NOT EXISTS api_keys (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      service_name VARCHAR(100) NOT NULL, -- stripe, weather, crop_ai, etc.
      api_key_encrypted VARCHAR(500) NOT NULL,
      is_active BOOLEAN DEFAULT TRUE,
      expires_at TIMESTAMP NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_id (user_id),
      INDEX idx_service (service_name)
    );
  `
};

// Firebase/Firestore Schema Definitions
export const FIRESTORE_COLLECTIONS = {
  users: {
    structure: {
      id: 'string',
      email: 'string',
      name: 'string',
      phone: 'string',
      address: 'string',
      userType: 'farmer | buyer | admin',
      emailVerified: 'boolean',
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    },
    indexes: ['email', 'userType']
  },

  farms: {
    structure: {
      id: 'string',
      userId: 'string',
      name: 'string',
      location: 'string',
      areaHectares: 'number',
      soilType: 'string',
      coordinates: { lat: 'number', lng: 'number' },
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    },
    indexes: ['userId', 'location']
  },

  iotDevices: {
    structure: {
      id: 'string',
      farmId: 'string',
      deviceName: 'string',
      deviceType: 'sensor | actuator | camera',
      apiKey: 'string',
      status: 'active | inactive | maintenance',
      locationDescription: 'string',
      coordinates: { lat: 'number', lng: 'number' },
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    },
    indexes: ['farmId', 'status', 'apiKey']
  },

  sensorData: {
    structure: {
      id: 'string',
      deviceId: 'string',
      temperature: 'number',
      humidity: 'number',
      soilMoisture: 'number',
      phLevel: 'number',
      lightIntensity: 'number',
      timestamp: 'timestamp'
    },
    indexes: ['deviceId', 'timestamp']
  },

  irrigationSchedules: {
    structure: {
      id: 'string',
      farmId: 'string',
      deviceId: 'string',
      name: 'string',
      startTime: 'string',
      durationMinutes: 'number',
      daysOfWeek: 'array<number>',
      isActive: 'boolean',
      moistureThreshold: 'number',
      createdAt: 'timestamp',
      updatedAt: 'timestamp'
    },
    indexes: ['farmId', 'isActive']
  }
};

// Database connection utilities
export const createDatabaseConnection = () => {
  const config: DatabaseConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    database: process.env.DB_NAME || 'agritantra',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.NODE_ENV === 'production'
  };

  return config;
};

// API Key encryption/decryption utilities
export const encryptApiKey = (apiKey: string, encryptionKey: string): string => {
  // In production, use proper encryption like AES
  // This is a simple base64 encoding for demo
  return Buffer.from(apiKey + ':' + encryptionKey).toString('base64');
};

export const decryptApiKey = (encryptedKey: string, encryptionKey: string): string => {
  // In production, use proper decryption
  const decoded = Buffer.from(encryptedKey, 'base64').toString('utf-8');
  return decoded.split(':')[0];
};