// services.ts
import axios, { AxiosInstance } from "axios"

const service: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:7001/',
  timeout: 5000,
});

export default service
