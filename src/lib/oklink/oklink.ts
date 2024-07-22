import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义参数类型
interface GetAddressSummaryParams {
  [key: string]: string | number | boolean; // 根据实际情况调整类型
}

// 定义 HTTP 响应类型
interface HttpResponse<T> {
  data: T;
}

class Oklink {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.oklink.com/api/v5/explorer";
  }

  // 获取地址数据
  async getAddressSummary<T>(endpoint: string, params: GetAddressSummaryParams = {}): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const config: AxiosRequestConfig = {
      headers: {
        "Accept": "*/*",
        "Ok-Access-Key": this.apiKey,
      },
      params, // 将 params 作为请求参数传递给 Axios
    };

    try {
      const response: AxiosResponse<T> = await axios.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default Oklink;