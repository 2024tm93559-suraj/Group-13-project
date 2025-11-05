// src/common/api/authApi.js
import { httpRequest } from './connector/http';
import {
  transformRegisterRequest,
  transformRegisterResponse,
  transformLoginRequest,
  transformLoginResponse,
} from './transformers/authTransformer';

const API_BASE_URL = 'https://localhost:5001/api/auth';

export const AuthAPI = {
  register: (payload) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const reqData = transformRegisterRequest(payload);
        const response = await client.post(`${API_BASE_URL}/register`, reqData, {
          withCredentials: true,
        });
        resolve(transformRegisterResponse(response.data));
      } catch (error) {
        console.error('Register API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),

  login: (payload) =>
    new Promise(async (resolve, reject) => {
      try {
        const client = httpRequest();
        const reqData = transformLoginRequest(payload);
        const response = await client.post(`${API_BASE_URL}/login`, reqData, {
          withCredentials: true,
        });
        resolve(transformLoginResponse(response.data));
      } catch (error) {
        console.error('Login API Error:', error);
        reject(error.response?.data || error.message);
      }
    }),
};
