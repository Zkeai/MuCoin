import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

class HttpService {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      withCredentials: true,
      baseURL: '/api', // 你的 API 基础 URL
      timeout: 60000, // 请求超时时间
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.http.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
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

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.http.get<T>(url, config).then(response => response);
  }

  public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.http.post<T>(url, data, config).then(response => response);
  }

  // 其他 HTTP 方法也可以类似封装
}

const httpServiceInstance = new HttpService();
export default httpServiceInstance;