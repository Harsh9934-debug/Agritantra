const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { executeQuery } = require('../config/database');
const iotService = require('../services/iotService');

const router = express.Router();

// Validation schemas
const deviceSchema = Joi.object({
  farmId: Joi.string().uuid().required(),
  deviceName: Joi.string().min(2).max(100).required(),
  deviceType: Joi.string().valid('sensor', 'actuator', 'camera').required(),
  locationDescription: Joi.string().max(200),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90),
    lng: Joi.number().min(-180).max(180)
  })
});

// Get all devices for user's farms
router.get('/', async (req, res) => {
  try {
    let query;
    let params;

    if (req.user.userType === 'admin') {
      query = `
        SELECT d.*, f.name as farm_name, u.name as owner_name
        FROM iot_devices d
        JOIN farms f ON d.farm_id = f.id
        JOIN users u ON f.user_id = u.id
        ORDER BY d.created_at DESC
      `;
      params = [];
    } else {
      query = `
        SELECT d.*, f.name as farm_name
        FROM iot_devices d
        JOIN farms f ON d.farm_id = f.id
        WHERE f.user_id = ?
        ORDER BY d.created_at DESC
      `;
      params = [req.user.userId];
    }

    const devices = await executeQuery(query, params);

    res.json({
      success: true,
      data: { devices }
    });

  } catch (error) {
    console.error('Error fetching devices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch devices'
    });
  }
});

// Get single device
router.get('/:id', async (req, res) => {
  try {
    const devices = await executeQuery(
      `SELECT d.*, f.name as farm_name
       FROM iot_devices d
       JOIN farms f ON d.farm_id = f.id
       WHERE d.id = ? AND (f.user_id = ? OR ? = 'admin')`,
      [req.params.id, req.user.userId, req.user.userType]
    );

    if (devices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    // Get latest sensor data
    const sensorData = await iotService.getLatestSensorData(req.params.id);

    res.json({
      success: true,
      data: {
        device: devices[0],
        sensorData
      }
    });

  } catch (error) {
    console.error('Error fetching device:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch device'
    });
  }
});

// Register new device
router.post('/', async (req, res) => {
  try {
    const { error, value } = deviceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details
      });
    }

    const { farmId, deviceName, deviceType, locationDescription, coordinates } = value;

    // Verify farm ownership
    const farms = await executeQuery(
      'SELECT id FROM farms WHERE id = ? AND user_id = ?',
      [farmId, req.user.userId]
    );

    if (farms.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this farm'
      });
    }

    // Generate unique API key for device
    const apiKey = `ak_${uuidv4().replace(/-/g, '')}`;
    const deviceId = uuidv4();

    await executeQuery(
      `INSERT INTO iot_devices 
       (id, farm_id, device_name, device_type, api_key, location_description, 
        coordinates_lat, coordinates_lng)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        deviceId,
        farmId,
        deviceName,
        deviceType,
        apiKey,
        locationDescription,
        coordinates?.lat,
        coordinates?.lng
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Device registered successfully',
      data: {
        deviceId,
        apiKey,
        mqttTopic: `agritantra/${deviceId}/sensor/data`
      }
    });

  } catch (error) {
    console.error('Error registering device:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register device'
    });
  }
});

// Update device
router.put('/:id', async (req, res) => {
  try {
    const updateSchema = Joi.object({
      deviceName: Joi.string().min(2).max(100),
      locationDescription: Joi.string().max(200),
      coordinates: Joi.object({
        lat: Joi.number().min(-90).max(90),
        lng: Joi.number().min(-180).max(180)
      }),
      status: Joi.string().valid('active', 'inactive', 'maintenance')
    });

    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details
      });
    }

    // Verify device ownership
    const devices = await executeQuery(
      `SELECT d.id FROM iot_devices d
       JOIN farms f ON d.farm_id = f.id
       WHERE d.id = ? AND (f.user_id = ? OR ? = 'admin')`,
      [req.params.id, req.user.userId, req.user.userType]
    );

    if (devices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    const updateFields = [];
    const updateValues = [];

    Object.entries(value).forEach(([key, val]) => {
      if (val !== undefined) {
        if (key === 'coordinates') {
          if (val.lat !== undefined) {
            updateFields.push('coordinates_lat = ?');
            updateValues.push(val.lat);
          }
          if (val.lng !== undefined) {
            updateFields.push('coordinates_lng = ?');
            updateValues.push(val.lng);
          }
        } else {
          updateFields.push(`${key === 'deviceName' ? 'device_name' : key} = ?`);
          updateValues.push(val);
        }
      }
    });

    if (updateFields.length > 0) {
      updateValues.push(req.params.id);
      await executeQuery(
        `UPDATE iot_devices SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = ?`,
        updateValues
      );
    }

    res.json({
      success: true,
      message: 'Device updated successfully'
    });

  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update device'
    });
  }
});

// Delete device
router.delete('/:id', async (req, res) => {
  try {
    // Verify device ownership
    const devices = await executeQuery(
      `SELECT d.id FROM iot_devices d
       JOIN farms f ON d.farm_id = f.id
       WHERE d.id = ? AND (f.user_id = ? OR ? = 'admin')`,
      [req.params.id, req.user.userId, req.user.userType]
    );

    if (devices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    await executeQuery('DELETE FROM iot_devices WHERE id = ?', [req.params.id]);

    res.json({
      success: true,
      message: 'Device deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting device:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete device'
    });
  }
});

// Get device sensor data
router.get('/:id/sensor-data', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    // Verify device access
    const devices = await executeQuery(
      `SELECT d.id FROM iot_devices d
       JOIN farms f ON d.farm_id = f.id
       WHERE d.id = ? AND (f.user_id = ? OR ? = 'admin')`,
      [req.params.id, req.user.userId, req.user.userType]
    );

    if (devices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    let query = `
      SELECT * FROM sensor_data 
      WHERE device_id = ?
    `;
    let params = [req.params.id];

    if (startDate && endDate) {
      query += ' AND timestamp BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY timestamp DESC LIMIT ?';
    params.push(limit);

    const sensorData = await executeQuery(query, params);

    res.json({
      success: true,
      data: { sensorData }
    });

  } catch (error) {
    console.error('Error fetching sensor data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sensor data'
    });
  }
});

// Send command to device
router.post('/:id/command', async (req, res) => {
  try {
    const commandSchema = Joi.object({
      action: Joi.string().valid('start_irrigation', 'stop_irrigation', 'calibrate', 'restart').required(),
      duration: Joi.number().positive(),
      parameters: Joi.object()
    });

    const { error, value } = commandSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.details
      });
    }

    // Verify device access
    const devices = await executeQuery(
      `SELECT d.id FROM iot_devices d
       JOIN farms f ON d.farm_id = f.id
       WHERE d.id = ? AND (f.user_id = ? OR ? = 'admin')`,
      [req.params.id, req.user.userId, req.user.userType]
    );

    if (devices.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Device not found'
      });
    }

    // Send command via IoT service
    const command = {
      ...value,
      timestamp: new Date().toISOString(),
      userId: req.user.userId
    };

    const success = iotService.publishCommand(req.params.id, command);

    if (success) {
      res.json({
        success: true,
        message: 'Command sent successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send command'
      });
    }

  } catch (error) {
    console.error('Error sending command:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send command'
    });
  }
});

module.exports = router;