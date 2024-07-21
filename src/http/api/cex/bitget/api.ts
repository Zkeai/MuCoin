  import httpService from '@/http/httpService';

  interface BitgetCommonQuery {
    apiKey: string;
    secretKey: string;
    passphrase: string;

  }

  interface BitgetWithDrawal {
    apiKey: string;
    secretKey: string;
    passphrase: string;
    coin: string;
    chain: string;
    amount: string;
    address: string;
  }

  export const getBitgetAccountInfo = (data: BitgetCommonQuery): Promise<any> => {
    return httpService.post<any>('/cex/bitget/getAccountInfo', data);
  };
  
  export const bitgetNetworkList = (data: BitgetCommonQuery): Promise<any> => {
    return httpService.post<any>('/cex/bitget/networkList', data);
  };

  export const bitgetWithDrawa = (data: BitgetWithDrawal): Promise<any> => {
    return httpService.post<any>('/cex/bitget/withDrawal', data);
  };

  