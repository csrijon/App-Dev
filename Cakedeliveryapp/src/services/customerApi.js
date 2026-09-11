import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = process.env.API_BASE_URL || API_CONFIG.baseURL;

// Helper for JSON requests
async function request(url, options = {}) {
  const token = await AsyncStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

// Auth
export const auth = {
  signup: (body) => request('/api/auth/signupmain', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/api/auth/loginmain', { method: 'POST', body: JSON.stringify(body) }),
  forgotPassword: () => Promise.reject(new Error("Password reset not supported in this backend. Contact support.")),
  resetPassword: () => Promise.reject(new Error("Password reset not supported in this backend. Contact support.")),
};

// Profile
export const profile = {
  get: () => request('/api/user/profile'),
  update: (body) => request('/api/user/profile', { method: 'PUT', body: JSON.stringify(body) }),
  changePassword: (body) => request('/api/user/change-password', { method: 'PUT', body: JSON.stringify(body) }),
};

// Address
export const address = {
  list: () => request('/api/address'),
  save: (body) => request('/api/address/save', { method: 'POST', body: JSON.stringify(body) }),
  delete: (id) => request(`/api/address/${id}`, { method: 'DELETE' }),
};

// Products / Catalogue
export const products = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/api/products?${qs}`);
  },
  get: (id) => request(`/api/products/${id}`),
  search: (q) => request(`/api/products/search?q=${encodeURIComponent(q)}`),
};

// Cart uses real backend endpoints
export const cart = {
  getLocalCart: async () => {
    return []; // deprecated
  },
  setLocalCart: async () => {},
  // Real backend integration
  get: () => request('/api/cart'),
  addItem: (body) => request('/api/cart/add', { method: 'POST', body: JSON.stringify(body) }),
  updateQuantity: (id, qty) => request(`/api/cart/${id}`, { method: 'PUT', body: JSON.stringify({ quantity: qty }) }),
  removeItem: (id) => request(`/api/cart/${id}`, { method: 'DELETE' }),
};

// Orders
export const orders = {
  create: (body) => request('/api/orders', { method: 'POST', body: JSON.stringify(body) }),
  list: () => request('/api/orders/customer'),
  get: (id) => request(`/api/orders/${id}`),
  tracking: (orderId) => request(`/api/orders/${orderId}/tracking`),
  cancel: (id) => request(`/api/orders/${id}/cancel`, { method: 'PUT' }),
};

export const notifications = {
  list: () => request('/api/notifications'),
  add: (body) => request('/api/notifications', { method: 'POST', body: JSON.stringify(body) }),
  markRead: (id) => request(`/api/notifications/${id}/read`, { method: 'PATCH' }),
};

export const refunds = {
  request: (body) => request('/api/refunds', { method: 'POST', body: JSON.stringify(body) }),
  list: () => request('/api/refunds'),
};

export const store = {
  get: () => request('/api/store'),
};

// Reviews
export const reviews = {
  create: (body) => request('/api/reviews', { method: 'POST', body: JSON.stringify(body) }),
  list: (productId) => request(`/api/reviews?productId=${productId}`),
};

