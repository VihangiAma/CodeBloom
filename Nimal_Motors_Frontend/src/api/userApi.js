// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; // ✅ FIXED

// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export const getAllUsers = async () => {
//     try {
//         const response = await api.get('/users'); // ✅ now goes to /api/users
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || { message: 'Failed to fetch users' };
//     }
// };

// export const register = async (userData) => {
//     try {
//         const response = await api.post('/register', userData); // ✅ /api/register
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || { message: 'Registration failed' };
//     }
// };

// export const login = async (credentials) => {
//     try {
//         const response = await api.post('/login', credentials); // ✅ /api/login
//         if (response.data.token) {
//             localStorage.setItem('token', response.data.token);
//         }
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || { message: 'Login failed' };
//     }
// };

// export const getProfile = async () => {
//     try {
//         const response = await api.get('/profile'); // ✅ /api/profile
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || { message: 'Failed to fetch profile' };
//     }
// };

// export const updateProfile = async (profileData) => {
//     try {
//         const response = await api.put('/profile', profileData); // ✅ /api/profile
//         return response.data;
//     } catch (error) {
//         throw error.response?.data || { message: 'Failed to update profile' };
//     }
// };

// export const logout = () => {
//     localStorage.removeItem('token');
// };
