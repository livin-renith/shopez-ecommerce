import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` : '/api',
});


// Request interceptor to attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('shopez_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth API Calls
export const loginApi = (credentials) => API.post('/auth/login', credentials);
export const registerApi = (userData) => API.post('/auth/register', userData);
export const getProfileApi = () => API.get('/auth/profile');
export const updateProfileApi = (data) => API.put('/auth/profile', data);

// Product API Calls
export const fetchProductsApi = (params) => API.get('/products', { params });
export const fetchProductByIdApi = (id) => API.get(`/products/${id}`);
export const createProductApi = (data) => API.post('/products', data);
export const updateProductApi = (id, data) => API.put(`/products/${id}`, data);
export const deleteProductApi = (id) => API.delete(`/products/${id}`);

// Cart API Calls
export const fetchCartApi = () => API.get('/cart');
export const addToCartApi = (data) => API.post('/cart', data);
export const updateCartItemApi = (itemId, data) => API.put(`/cart/item/${itemId}`, data);
export const removeCartItemApi = (itemId) => API.delete(`/cart/item/${itemId}`);
export const clearCartApi = () => API.delete('/cart');

// Order API Calls
export const createOrderApi = (orderData) => API.post('/orders', orderData);
export const fetchMyOrdersApi = () => API.get('/orders/myorders');
export const fetchOrderByIdApi = (id) => API.get(`/orders/${id}`);
export const updateOrderStatusApi = (id, status) => API.put(`/orders/${id}/status`, { status });

// Admin API Calls
export const fetchAdminStatsApi = () => API.get('/admin/stats');
export const fetchAllUsersApi = () => API.get('/admin/users');
export const deleteUserApi = (id) => API.delete(`/admin/users/${id}`);
export const updateUserRoleApi = (id, userType) => API.put(`/admin/users/${id}/role`, { userType });
export const fetchAllOrdersApi = () => API.get('/admin/orders');

export default API;
