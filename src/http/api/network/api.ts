import httpService from '@/http/httpService';

interface NetworkTestI {
    url: string;
  }

export const networkTest = (data: NetworkTestI ): Promise<any> => {
    return httpService.post<any>('/network', data);
  };