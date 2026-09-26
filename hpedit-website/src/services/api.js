export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: token ? 'Bearer ' + token : '',
  };
}
