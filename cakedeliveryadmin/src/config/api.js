const DEFAULT_PROD_URL = 'https://api.homebakers.com';
export const ADMIN_API_CONFIG = {
  baseURL: __DEV__ ? (process.env.API_URL || 'http://192.168.29.19:3000') : process.env.PROD_API_URL || DEFAULT_PROD_URL,
};
