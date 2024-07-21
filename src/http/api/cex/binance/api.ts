// apiService.ts

import httpService from '@/http/httpService';


interface BinanceCommonQuery {
  apiKey: string;
  secretKey: string;
}

interface BinanceWithDrawal {
  apiKey: string;
  secretKey: string;
  coin: string;
  network: string;
  amount: string;
  address: string;
}

interface AssetDetail {
  apiKey: string;
  secretKey: string;
  asset: string;
}

interface BinanceCoinInfoQuery{
  apiKey: string;
  secretKey: string;
  coins: string[]
}

export const getBinanceAccountInfo = (data: BinanceCommonQuery): Promise<any> => {
  return httpService.post<any>('/cex/binance/getAccountInfo', data);
};

export const getBinanceAssetDetail = (data: AssetDetail): Promise<any> => {
  return httpService.post<any>('/cex/binance/getAssetDetail', data);
};

export const binanceWithDrawal = (data: BinanceWithDrawal): Promise<any> => {
  return httpService.post<any>('/cex/binance/withDrawal', data);
};

export const getBinanceAllCoinInfo = (data: BinanceCoinInfoQuery): Promise<any> => {
  return httpService.post<any>('/cex/binance/getAllCoinInfo', data);
};
