import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface SensorData {
  deviceId: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  ph: number;
  timestamp: Date;
}

interface IrrigationSchedule {
  id: string;
  farmId: string;
  startTime: string;
  duration: number;
  active: boolean;
}

interface IoTContextType {
  sensorData: SensorData[];
  irrigationSchedules: IrrigationSchedule[];
  isConnected: boolean;
  addIrrigationSchedule: (schedule: Omit<IrrigationSchedule, 'id'>) => void;
  updateIrrigationSchedule: (id: string, updates: Partial<IrrigationSchedule>) => void;
  deleteIrrigationSchedule: (id: string) => void;
}

const IoTContext = createContext<IoTContextType | undefined>(undefined);

export const useIoT = () => {
  const context = useContext(IoTContext);
  if (!context) {
    throw new Error('useIoT must be used within an IoTProvider');
  }
  return context;
};

interface IoTProviderProps {
  children: ReactNode;
}

export const IoTProvider: React.FC<IoTProviderProps> = ({ children }) => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [irrigationSchedules, setIrrigationSchedules] = useState<IrrigationSchedule[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize WebSocket connection for IoT data
    const newSocket = io(import.meta.env.VITE_IOT_ENDPOINT || 'ws://localhost:8080', {
      autoConnect: true,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to IoT server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from IoT server');
    });

    newSocket.on('sensor_data', (data: SensorData) => {
      setSensorData(prev => [...prev.slice(-49), data]); // Keep last 50 readings
    });

    newSocket.on('irrigation_update', (schedules: IrrigationSchedule[]) => {
      setIrrigationSchedules(schedules);
    });

    setSocket(newSocket);

    // Load initial data
    loadMockData();

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const loadMockData = () => {
    // Mock sensor data for demonstration
    const mockSensorData: SensorData[] = [
      {
        deviceId: 'sensor_001',
        soilMoisture: 65,
        temperature: 28,
        humidity: 70,
        ph: 6.8,
        timestamp: new Date()
      },
      {
        deviceId: 'sensor_002',
        soilMoisture: 45,
        temperature: 30,
        humidity: 65,
        ph: 7.2,
        timestamp: new Date()
      }
    ];

    const mockSchedules: IrrigationSchedule[] = [
      {
        id: '1',
        farmId: 'farm_001',
        startTime: '06:00',
        duration: 30,
        active: true
      },
      {
        id: '2',
        farmId: 'farm_001',
        startTime: '18:00',
        duration: 25,
        active: true
      }
    ];

    setSensorData(mockSensorData);
    setIrrigationSchedules(mockSchedules);
  };

  const addIrrigationSchedule = (schedule: Omit<IrrigationSchedule, 'id'>) => {
    const newSchedule = { ...schedule, id: Date.now().toString() };
    setIrrigationSchedules(prev => [...prev, newSchedule]);
    
    if (socket) {
      socket.emit('add_irrigation_schedule', newSchedule);
    }
  };

  const updateIrrigationSchedule = (id: string, updates: Partial<IrrigationSchedule>) => {
    setIrrigationSchedules(prev =>
      prev.map(schedule =>
        schedule.id === id ? { ...schedule, ...updates } : schedule
      )
    );

    if (socket) {
      socket.emit('update_irrigation_schedule', { id, updates });
    }
  };

  const deleteIrrigationSchedule = (id: string) => {
    setIrrigationSchedules(prev => prev.filter(schedule => schedule.id !== id));
    
    if (socket) {
      socket.emit('delete_irrigation_schedule', id);
    }
  };

  return (
    <IoTContext.Provider value={{
      sensorData,
      irrigationSchedules,
      isConnected,
      addIrrigationSchedule,
      updateIrrigationSchedule,
      deleteIrrigationSchedule
    }}>
      {children}
    </IoTContext.Provider>
  );
};