// Centralized API configuration for Customer App
// Configure via environment or build settings; do not hardcode LAN IPs in source.
const DEFAULT_DEV_URL = 'http://10.140.22.212:3000';
export const API_CONFIG = {
  baseURL: __DEV__ ? (process.env.API_URL || DEFAULT_DEV_URL) : 'https://api.homebakers.com',
};

// For Android emulator, use 10.0.2.2 pointing to host localhost
// For physical device, change to your computer's LAN IP (e.g., 192.168.1.x)
// Example: baseURL: 'http://192.168.1.42:3000'
