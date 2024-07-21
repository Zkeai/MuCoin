declare module '@binance/connector' {
  export class Spot {
    constructor(apiKey: string, apiSecret: string);

    userAsset(): Promise<{ data: any }>;
    assetDetail(params: { asset: string }): Promise<{ data: any }>;
    coinInfo(): Promise<{ data: any }>;
    withdraw(asset: string, address: string, amount: string, params: { network: string }): Promise<{ data: any }>;
  }
}