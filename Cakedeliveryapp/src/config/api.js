// Centralized API configuration for Customer App
export const API_CONFIG = {
  baseURL: __DEV__ ? 'http://10.0.3.1:3000' : 'https://api.homebakers.com',
};

// For Android emulator, use 10.0.2.2 pointing to host localhost
// For physical device, change to your computer's LAN IP (e.g., 192.168.1.x)
// Example: baseURL: 'http://192.168.1.42:3000'
