// import { getCurrentInstance } from 'vue'
import type User from '../model/User'
import axios from 'axios';
import config from '../../src/globals.js'

const axiosInstance = axios.create({
    baseURL: config.apiUrl, // adiciona a URL global
    timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const id = localStorage.getItem('id'); // Deveria ser o token, mas como não tem, então enviaremos o ID mesmo
        if (id) {
            config.headers['Authorization'] = `Bearer ${id}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

export default {
    async login(email: string, password: string): Promise<User> {
        try {
            const response = await axiosInstance.post('/user/login', {
                email,
                password,
            });

            const loggedUser: User = {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email
            };

            return loggedUser;
        } catch (error) {
            throw error;
        }
    },
    async register(name: string, email: string, password: string, confirmpassword: string): Promise<User> {
        try {
            return await axiosInstance.post('/user', {
                name,
                email,
                password,
                confirmpassword
            });
        } catch (error) {
            throw error;
        }
    },
    async me(): Promise<User> {
        try {
            const response = await axiosInstance.get('/user/me');

            const loggedUser: User = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email
            };

            return loggedUser;
        } catch (error) {
            throw error;
        }
    },
    // Add more methods as needed
};
