import axios from "axios";
import {getAccessToken, getRefreshToken, clearTokens, setAccessToken} from "../services/token.service.js"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers:{
        'Content-Type': 'application/json'
    },
});

// Attach access token before each request
api.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Optional: response interceptor to handle 401 -> try refresh (simple)
api.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config
        if (err.response && err.response.status === 401 && !originalRequest._retry){
            // Try refresh token flow basic
            originalRequest._retry = true
            const refresh = getRefreshToken()
            if (!refresh){
                clearTokens()
                return Promise.reject(err)
            }
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {refresh_token: refresh});
                const newAccess = data?.data?.access_token;
                if (newAccess) {
                    setAccessToken(newAccess)
                    originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                }
                return axios(originalRequest);
            } catch(refreshErr){
                clearTokens();
                return Promise.reject(refreshErr)
            }
        }
        return Promise.reject(refreshErr);
    }
);

export default api;