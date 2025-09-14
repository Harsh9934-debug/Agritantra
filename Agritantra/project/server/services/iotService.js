const mqtt = require('mqtt');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const { executeQuery } = require('../config/database');

class IoTService {
  constructor() {
    this.mqttClient = null;
    this.wsServer = null;
    this.devices = new Map(); // Track connected devices
    this.initialize();
  }

  async initialize() {
    await this.initializeMQTT();
    this.initializeWebSocket();
    console.log('🌐 IoT Service initialized');
  }

  // Initialize MQTT broker connection
  async initializeMQTT() {
    try {
      const mqttUrl = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
      
      this.mqttClient = mqtt.connect(mqttUrl, {
        clientId: `agritantra-server-${Math.random().toString(16).slice(3)}`,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        keepalive: 60,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000
      });

      this.mqttClient.on('connect', () => {
        console.log('✅ MQTT broker connected');
        // Subscribe to all device topics
        this.mqttClient.subscribe('agritantra/+/sensor/+');
        this.mqttClient.subscribe('agritantra/+/status');
        this.mqttClient.subscribe('agritantra/+/irrigation/+');
      });

      this.mqttClient.on('message', (topic, message) => {
        this.handleMQTTMessage(topic, message);
      });

      this.mqttClient.on('error', (error) => {
        console.error('MQTT Error:', error);
      });

    } catch (error) {
      console.error('Failed to initialize MQTT:', error);
    }
  }

  // Initialize WebSocket server
  initializeWebSocket() {
    const port = process.env.WS_PORT || 8080;
    
    this.wsServer = new WebSocket.Server({
      port,
      verifyClient: (info) => {
        // Add authentication logic here if needed
        return true;
      }
    });

    this.wsServer.on('connection', (ws, req) => {
      console.log('New WebSocket connection');
      
      ws.on('message', (message) => {
        this.handleWebSocketMessage(ws, message);
      });

      ws.on('close', () => {
        console.log('WebSocket connection closed');
      });

      // Send initial device status
      this.sendDeviceStatusToClient(ws);
    });

    console.log(`🔌 WebSocket server listening on port ${port}`);
  }

  // Handle incoming MQTT messages
  async handleMQTTMessage(topic, message) {
    try {
      const data = JSON.parse(message.toString());
      const topicParts = topic.split('/');
      
      if (topicParts.length < 3) return;

      const deviceId = topicParts[1];
      const messageType = topicParts[2];

      switch (messageType) {
        case 'sensor':
          await this.processSensorData(deviceId, data);
          break;
          
        case 'status':
          await this.processDeviceStatus(deviceId, data);
          break;
          
        case 'irrigation':
          await this.processIrrigationData(deviceId, data);
          break;
      }

      // Broadcast to WebSocket clients
      this.broadcastToClients({
        type: messageType,
        deviceId,
        data,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error processing MQTT message:', error);
    }
  }

  // Process sensor data
  async processSensorData(deviceId, data) {
    try {
      // Validate device exists and is active
      const devices = await executeQuery(
        'SELECT id, farm_id FROM iot_devices WHERE id = ? AND status = "active"',
        [deviceId]
      );

      if (devices.length === 0) {
        console.warn(`Unknown or inactive device: ${deviceId}`);
        return;
      }

      // Insert sensor data
      const sensorId = uuidv4();
      await executeQuery(
        `INSERT INTO sensor_data 
         (id, device_id, temperature, humidity, soil_moisture, ph_level, light_intensity)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          sensorId,
          deviceId,
          data.temperature,
          data.humidity,
          data.soilMoisture,
          data.ph,
          data.lightIntensity
        ]
      );

      // Check irrigation thresholds
      await this.checkIrrigationTriggers(devices[0].farm_id, data);

      console.log(`📊 Sensor data saved for device ${deviceId}`);

    } catch (error) {
      console.error('Error processing sensor data:', error);
    }
  }

  // Process device status updates
  async processDeviceStatus(deviceId, data) {
    try {
      await executeQuery(
        'UPDATE iot_devices SET status = ?, updated_at = NOW() WHERE id = ?',
        [data.status, deviceId]
      );

      console.log(`📡 Device ${deviceId} status updated to ${data.status}`);

    } catch (error) {
      console.error('Error processing device status:', error);
    }
  }

  // Process irrigation data
  async processIrrigationData(deviceId, data) {
    try {
      // Log irrigation events, update schedules, etc.
      console.log(`💧 Irrigation event for device ${deviceId}:`, data);

    } catch (error) {
      console.error('Error processing irrigation data:', error);
    }
  }

  // Check if irrigation should be triggered based on sensor data
  async checkIrrigationTriggers(farmId, sensorData) {
    try {
      const schedules = await executeQuery(
        `SELECT id, moisture_threshold, device_id 
         FROM irrigation_schedules 
         WHERE farm_id = ? AND is_active = 1 AND moisture_threshold IS NOT NULL`,
        [farmId]
      );

      for (const schedule of schedules) {
        if (sensorData.soilMoisture < schedule.moisture_threshold) {
          await this.triggerIrrigation(schedule.device_id, schedule.id);
        }
      }

    } catch (error) {
      console.error('Error checking irrigation triggers:', error);
    }
  }

  // Trigger irrigation
  async triggerIrrigation(deviceId, scheduleId) {
    try {
      if (!this.mqttClient) return;

      const command = {
        action: 'start_irrigation',
        scheduleId,
        timestamp: new Date().toISOString()
      };

      this.mqttClient.publish(`agritantra/${deviceId}/command`, JSON.stringify(command));
      console.log(`💧 Irrigation triggered for device ${deviceId}`);

    } catch (error) {
      console.error('Error triggering irrigation:', error);
    }
  }

  // Handle WebSocket messages
  handleWebSocketMessage(ws, message) {
    try {
      const data = JSON.parse(message);
      
      switch (data.type) {
        case 'subscribe':
          // Subscribe client to specific device updates
          ws.deviceSubscriptions = data.deviceIds || [];
          break;
          
        case 'irrigation_command':
          this.handleIrrigationCommand(data);
          break;
      }

    } catch (error) {
      console.error('Error handling WebSocket message:', error);
    }
  }

  // Handle irrigation commands from WebSocket
  handleIrrigationCommand(data) {
    if (!this.mqttClient) return;

    const command = {
      action: data.action, // start_irrigation, stop_irrigation
      duration: data.duration,
      timestamp: new Date().toISOString()
    };

    this.mqttClient.publish(`agritantra/${data.deviceId}/command`, JSON.stringify(command));
  }

  // Broadcast data to WebSocket clients
  broadcastToClients(data) {
    if (!this.wsServer) return;

    this.wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        // Check if client is subscribed to this device
        if (!client.deviceSubscriptions || 
            client.deviceSubscriptions.includes(data.deviceId)) {
          client.send(JSON.stringify(data));
        }
      }
    });
  }

  // Send device status to new client
  async sendDeviceStatusToClient(ws) {
    try {
      const devices = await executeQuery(
        'SELECT id, device_name, status FROM iot_devices WHERE status = "active"'
      );

      ws.send(JSON.stringify({
        type: 'device_list',
        devices,
        timestamp: new Date().toISOString()
      }));

    } catch (error) {
      console.error('Error sending device status:', error);
    }
  }

  // Publish device command via MQTT
  publishCommand(deviceId, command) {
    if (!this.mqttClient) return false;

    try {
      this.mqttClient.publish(
        `agritantra/${deviceId}/command`,
        JSON.stringify(command)
      );
      return true;
    } catch (error) {
      console.error('Error publishing command:', error);
      return false;
    }
  }

  // Get device status
  async getDeviceStatus(deviceId) {
    try {
      const devices = await executeQuery(
        'SELECT * FROM iot_devices WHERE id = ?',
        [deviceId]
      );
      return devices[0] || null;
    } catch (error) {
      console.error('Error getting device status:', error);
      return null;
    }
  }

  // Get latest sensor data
  async getLatestSensorData(deviceId, limit = 10) {
    try {
      const data = await executeQuery(
        `SELECT * FROM sensor_data 
         WHERE device_id = ? 
         ORDER BY timestamp DESC 
         LIMIT ?`,
        [deviceId, limit]
      );
      return data;
    } catch (error) {
      console.error('Error getting sensor data:', error);
      return [];
    }
  }
}

// Create singleton instance
const iotService = new IoTService();

module.exports = iotService;