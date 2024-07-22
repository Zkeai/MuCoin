import httpService from "@/http/httpService";

interface CadCommonQuery {
  damaKey: string;
}
interface CadResCommonQuery {
  damaKey: string;
  resultid: string;
}
interface CadSignCommonQuery {
  captchaId: string;
  captchaOutput: string;
  genTime: string;
  lotNumber: string;
  passToken: string;
  key: string;
}
interface CadInviteCommonQuery {
  captchaId: string;
  captchaOutput: string;
  genTime: string;
  lotNumber: string;
  passToken: string;
  inviter:string;
  key: string;
}
interface CadTaskCommonQuery {
  taskid: string;
}
export const getCadRep = (data: CadCommonQuery): Promise<any> => {
  return httpService.post<any>("/cad/recognize", data);
};
export const getCadRes = (data: CadResCommonQuery): Promise<any> => {
  return httpService.post<any>("/cad/getResult", data);
};
export const sign = (data: CadSignCommonQuery): Promise<any> => {
  return httpService.post<any>("/cad/sign", data);
};
export const task = (data: CadTaskCommonQuery): Promise<any> => {
  return httpService.post<any>("/cad/task", data);
};
export const invite = (data: CadInviteCommonQuery): Promise<any> => {
  return httpService.post<any>("/cad/invite", data);
};