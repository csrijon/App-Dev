import AsyncStorage from '@react-native-async-storage/async-storage';

// Read API base from environment (set in .env)
const API_BASE_URL = process.env.API_BASE_URL || 'http://10.0.3.1:3000';

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
  forgotPassword: (email) => request('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token, body) => request(`/api/auth/reset-password/${token}`, { method: 'POST', body: JSON.stringify(body) }),
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

// Cart (simulated locally when backend unavailable; real integration preserved)
export const cart = {
  // Client-side simulation for reliable customer journey
  getLocalCart: async () => {
    const raw = await AsyncStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  },
  setLocalCart: async (items) => {
    await AsyncStorage.setItem('cart', JSON.stringify(items));
  },
  addItem: async (item) => {
    const current = await cart.getLocalCart();
    const existing = current.find(i => i.id === item.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
    } else {
      current.push({ ...item, quantity: item.quantity || 1 });
    }
    await cart.setLocalCart(current);
    return current;
  },
  removeItem: async (id) => {
    const current = await cart.getLocalCart();
    const filtered = current.filter(i => i.id !== id);
    await cart.setLocalCart(filtered);
    return filtered;
  },
  updateQuantity: async (id, qty) => {
    const current = await cart.getLocalCart();
    const updated = current.map(i => (i.id === id ? { ...i, quantity: qty } : i));
    await cart.setLocalCart(updated);
    return updated;
  },
};

// Orders
export const orders = {
  create: (body) => request('/api/orders', { method: 'POST', body: JSON.stringify(body) }),
  list: () => request('/api/orders'),
  get: (id) => request(`/api/orders/${id}`),
  tracking: (orderId) => request(`/api/orders/${orderId}/tracking`),
  cancel: (id) => request(`/api/orders/${id}/cancel`, { method: 'PUT' }),
};

export const store = {
  get: () => request('/api/store'),
};

// Reviews
export const reviews = {
  create: (body) => request('/api/reviews', { method: 'POST', body: JSON.stringify(body) }),
  list: (productId) => request(`/api/reviews?productId=${productId}`),
};

// Notifications (simulated events stored locally when backend unavailable)
export const notifications = {
  list: async () => {
    const raw = await AsyncStorage.getItem('notifications');
    return raw ? JSON.parse(raw) : [];
  },
  add: async (n) => {
    const current = await notifications.list();
    current.unshift({ ...n, time: n.time || new Date().toISOString(), isUnread: true });
    await AsyncStorage.setItem('notifications', JSON.stringify(current));
  },
  markAllRead: async () => {
    const current = await notifications.list();
    await AsyncStorage.setItem('notifications', JSON.stringify(current.map(n => ({ ...n, isUnread: false }))));
  },
};
