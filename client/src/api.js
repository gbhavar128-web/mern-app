const API = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  products: (q = '') => request(`/products${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me'),
  rate: (id, value) => request(`/products/${id}/rate`, { method: 'POST', body: JSON.stringify({ value }) }),
  order: (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) }),
  orders: () => request('/orders/mine')
};
