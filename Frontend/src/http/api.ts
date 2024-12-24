import useTokenStore from "@/store";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  api.interceptors.request.use(
    (config) => {
      const { accessToken } = useTokenStore.getState(); // Access Zustand state
      //console.log('Interceptor Access Token:', accessToken);
  
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.warn('No access token found!');
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  export default api;
  


export const login = async (data: {email: string, password: string}) => {
    return api.post('/api/v1/users/login', data)
}

export const userRegister = async (data: {userName: string, email: string, password: string}) => {
    return api.post('/api/v1/users/register', data)
}

export const getBooks = async () => {
  const response = await api.get('/api/v1/books');
  return response.data;
};