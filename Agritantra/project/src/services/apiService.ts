import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;
  
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle common errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AxiosResponse> {
    return this.api.post('/auth/login', { email, password });
  }

  async register(userData: any): Promise<AxiosResponse> {
    return this.api.post('/auth/register', userData);
  }

  async logout(): Promise<AxiosResponse> {
    return this.api.post('/auth/logout');
  }

  // Farm management
  async getFarms(): Promise<AxiosResponse> {
    return this.api.get('/farms');
  }

  async getFarm(id: string): Promise<AxiosResponse> {
    return this.api.get(`/farms/${id}`);
  }

  async createFarm(farmData: any): Promise<AxiosResponse> {
    return this.api.post('/farms', farmData);
  }

  async updateFarm(id: string, farmData: any): Promise<AxiosResponse> {
    return this.api.put(`/farms/${id}`, farmData);
  }

  // IoT device management
  async getDevices(): Promise<AxiosResponse> {
    return this.api.get('/devices');
  }

  async getDevice(id: string): Promise<AxiosResponse> {
    return this.api.get(`/devices/${id}`);
  }

  async registerDevice(deviceData: any): Promise<AxiosResponse> {
    return this.api.post('/devices', deviceData);
  }

  async updateDevice(id: string, deviceData: any): Promise<AxiosResponse> {
    return this.api.put(`/devices/${id}`, deviceData);
  }

  async deleteDevice(id: string): Promise<AxiosResponse> {
    return this.api.delete(`/devices/${id}`);
  }

  // Sensor data
  async getSensorData(deviceId: string, startDate?: string, endDate?: string): Promise<AxiosResponse> {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    return this.api.get(`/devices/${deviceId}/sensor-data?${params.toString()}`);
  }

  // Irrigation management
  async getIrrigationSchedules(farmId: string): Promise<AxiosResponse> {
    return this.api.get(`/farms/${farmId}/irrigation-schedules`);
  }

  async createIrrigationSchedule(farmId: string, scheduleData: any): Promise<AxiosResponse> {
    return this.api.post(`/farms/${farmId}/irrigation-schedules`, scheduleData);
  }

  async updateIrrigationSchedule(farmId: string, scheduleId: string, scheduleData: any): Promise<AxiosResponse> {
    return this.api.put(`/farms/${farmId}/irrigation-schedules/${scheduleId}`, scheduleData);
  }

  async deleteIrrigationSchedule(farmId: string, scheduleId: string): Promise<AxiosResponse> {
    return this.api.delete(`/farms/${farmId}/irrigation-schedules/${scheduleId}`);
  }

  // Crop health analysis
  async analyzeCropHealth(imageData: FormData): Promise<AxiosResponse> {
    return this.api.post('/crop-analysis', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getCropHealthHistory(farmId: string): Promise<AxiosResponse> {
    return this.api.get(`/farms/${farmId}/crop-health-history`);
  }

  // Marketplace
  async getMarketplaceProducts(filters?: any): Promise<AxiosResponse> {
    return this.api.get('/marketplace/products', { params: filters });
  }

  async createMarketplaceProduct(productData: any): Promise<AxiosResponse> {
    return this.api.post('/marketplace/products', productData);
  }

  async updateMarketplaceProduct(id: string, productData: any): Promise<AxiosResponse> {
    return this.api.put(`/marketplace/products/${id}`, productData);
  }

  async deleteMarketplaceProduct(id: string): Promise<AxiosResponse> {
    return this.api.delete(`/marketplace/products/${id}`);
  }

  // Orders
  async getOrders(): Promise<AxiosResponse> {
    return this.api.get('/orders');
  }

  async createOrder(orderData: any): Promise<AxiosResponse> {
    return this.api.post('/orders', orderData);
  }

  async updateOrderStatus(id: string, status: string): Promise<AxiosResponse> {
    return this.api.patch(`/orders/${id}/status`, { status });
  }

  // Payments
  async createPaymentIntent(amount: number, currency: string = 'INR'): Promise<AxiosResponse> {
    return this.api.post('/payments/create-intent', { amount, currency });
  }

  async confirmPayment(paymentIntentId: string): Promise<AxiosResponse> {
    return this.api.post('/payments/confirm', { paymentIntentId });
  }

  async getPaymentHistory(): Promise<AxiosResponse> {
    return this.api.get('/payments/history');
  }

  // Financial tracking
  async getFinancialSummary(farmId: string): Promise<AxiosResponse> {
    return this.api.get(`/farms/${farmId}/financial-summary`);
  }

  async addExpense(farmId: string, expenseData: any): Promise<AxiosResponse> {
    return this.api.post(`/farms/${farmId}/expenses`, expenseData);
  }

  async addRevenue(farmId: string, revenueData: any): Promise<AxiosResponse> {
    return this.api.post(`/farms/${farmId}/revenue`, revenueData);
  }

  // Weather data
  async getWeatherData(location: string): Promise<AxiosResponse> {
    return this.api.get(`/weather`, { params: { location } });
  }

  async getWeatherForecast(location: string, days: number = 7): Promise<AxiosResponse> {
    return this.api.get(`/weather/forecast`, { params: { location, days } });
  }

  // Generic CRUD methods
  async get(url: string, config?: any): Promise<AxiosResponse> {
    return this.api.get(url, config);
  }

  async post(url: string, data?: any, config?: any): Promise<AxiosResponse> {
    return this.api.post(url, data, config);
  }

  async put(url: string, data?: any, config?: any): Promise<AxiosResponse> {
    return this.api.put(url, data, config);
  }

  async patch(url: string, data?: any, config?: any): Promise<AxiosResponse> {
    return this.api.patch(url, data, config);
  }

  async delete(url: string, config?: any): Promise<AxiosResponse> {
    return this.api.delete(url, config);
  }
}

export const apiService = new ApiService();