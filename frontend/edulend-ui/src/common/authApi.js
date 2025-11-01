// src/common/api/authApi.js
import { httpRequest } from '../common/connector/http';
import {
    transformRegisterRequest,
    transformRegisterResponse,
    transformLoginRequest,
    transformLoginResponse,
} from '../common/transformers/authTransformer';

const API_BASE_URL = 'https://your-backend.com/api/auth';

export const AuthAPI = {
    register: async (payload) => {
        const client = httpRequest();
        const reqData = transformRegisterRequest(payload);
        const response = await client.post(`${API_BASE_URL}/register`, reqData);
        return transformRegisterResponse(response.data);
    },

    login: async (payload) => {
        const client = httpRequest();
        const reqData = transformLoginRequest(payload);
        const response = await client.post(`${API_BASE_URL}/login`, reqData);
        return transformLoginResponse(response.data);
    },
};
