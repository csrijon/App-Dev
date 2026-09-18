const DEFAULT_PROD_URL = 'https://api.homebakers.com';
export const ADMIN_API_CONFIG = {
  baseURL: __DEV__ ? (process.env.API_URL || 'http://10.140.22.212:3000') : process.env.PROD_API_URL || DEFAULT_PROD_URL,
};
