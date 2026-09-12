const DEFAULT_DEV_URL = 'http://10.140.22.212:3000';
export const ADMIN_API_CONFIG = {
  baseURL: __DEV__ ? (process.env.API_URL || DEFAULT_DEV_URL) : 'https://api.homebakers.com',
};
