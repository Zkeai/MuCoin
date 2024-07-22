import httpService from '@/http/httpService';

interface CadCommonQuery {
    appkey: string;
  }
  interface CadResCommonQuery {
    appkey: string;
    resultid: string;
  }
export const getCadRep= (data: CadCommonQuery): Promise<any> => {
    return httpService.post<any>('/cad/recognize', data);
  };
export const getCadRes= (data: CadResCommonQuery): Promise<any> => {
  return httpService.post<any>('/cad/getResult', data);
};