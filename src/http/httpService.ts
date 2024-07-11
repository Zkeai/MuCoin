// httpService.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: '/api', // 你的 API 基础 URL
      timeout: 10000, // 请求超时时间
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.http.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.http.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.http.get<T>(url, config);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.http.post<T>(url, data, config);
  }

  // 其他 HTTP 方法也可以类似封装
}

const httpServiceInstance = new HttpService();
export default httpServiceInstance;