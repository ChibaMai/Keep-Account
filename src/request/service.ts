// services.ts
import axios, { AxiosInstance } from "axios"

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

export default service
