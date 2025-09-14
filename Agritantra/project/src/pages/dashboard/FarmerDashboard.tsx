import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Droplets, Thermometer, Activity, TrendingUp, AlertTriangle, 
  Calendar, DollarSign, Package, Settings, Bell
} from 'lucide-react';
import { useIoT } from '../../contexts/IoTContext';
import { useAuth } from '../../contexts/AuthContext';

export const FarmerDashboard: React.FC = () => {
  const { sensorData, irrigationSchedules, isConnected } = useIoT();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts
  const cropHealthData = [
    { month: 'Jan', healthy: 85, diseased: 15 },
    { month: 'Feb', healthy: 90, diseased: 10 },
    { month: 'Mar', healthy: 88, diseased: 12 },
    { month: 'Apr', healthy: 92, diseased: 8 },
    { month: 'May', healthy: 94, diseased: 6 },
    { month: 'Jun', healthy: 91, diseased: 9 }
  ];

  const waterUsageData = [
    { day: 'Mon', usage: 120 },
    { day: 'Tue', usage: 98 },
    { day: 'Wed', usage: 86 },
    { day: 'Thu', usage: 108 },
    { day: 'Fri', usage: 95 },
    { day: 'Sat', usage: 110 },
    { day: 'Sun', usage: 88 }
  ];

  const revenueData = [
    { name: 'Wheat', value: 35000 },
    { name: 'Rice', value: 28000 },
    { name: 'Vegetables', value: 15000 },
    { name: 'Fruits', value: 12000 }
  ];

  const COLORS = ['#059669', '#3B82F6', '#F59E0B', '#EF4444'];

  const latestSensorReading = sensorData[sensorData.length - 1];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity className="h-5 w-5" /> },
    { id: 'irrigation', label: 'Irrigation', icon: <Droplets className="h-5 w-5" /> },
    { id: 'crops', label: 'Crop Health', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'marketplace', label: 'Marketplace', icon: <Package className="h-5 w-5" /> },
    { id: 'finance', label: 'Finance', icon: <DollarSign className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">Monitor and manage your farm operations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
              </div>
              <Bell className="h-6 w-6 text-gray-600" />
              <Settings className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Droplets className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Soil Moisture</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {latestSensorReading?.soilMoisture || 0}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Thermometer className="h-8 w-8 text-red-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Temperature</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {latestSensorReading?.temperature || 0}°C
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Water Saved</p>
                    <p className="text-2xl font-bold text-gray-900">38%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹90,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Water Usage This Week</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={waterUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#059669" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Health Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cropHealthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="healthy" fill="#059669" />
                    <Bar dataKey="diseased" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-gray-900">Low soil moisture in Field A</p>
                      <p className="text-sm text-gray-600">Irrigation recommended - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Irrigation cycle completed</p>
                      <p className="text-sm text-gray-600">Field B - 4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Irrigation Tab */}
        {activeTab === 'irrigation' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Status */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
                <div className="space-y-4">
                  {sensorData.map((sensor, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Device {sensor.deviceId}</span>
                        <span className="text-sm text-gray-500">
                          {sensor.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Soil Moisture:</span>
                          <span className="ml-2 font-medium">{sensor.soilMoisture}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Temperature:</span>
                          <span className="ml-2 font-medium">{sensor.temperature}°C</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Humidity:</span>
                          <span className="ml-2 font-medium">{sensor.humidity}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">pH:</span>
                          <span className="ml-2 font-medium">{sensor.ph}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Irrigation Schedules */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Irrigation Schedules</h3>
                <div className="space-y-3">
                  {irrigationSchedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{schedule.startTime}</span>
                        </div>
                        <p className="text-sm text-gray-600">{schedule.duration} minutes</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        schedule.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {schedule.active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Add New Schedule
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab !== 'overview' && activeTab !== 'irrigation' && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {tabs.find(tab => tab.id === activeTab)?.label} Dashboard
            </h3>
            <p className="text-gray-600">This section is under development and will be available soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};