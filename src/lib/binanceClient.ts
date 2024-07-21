import { Spot } from '@binance/connector';

// 定义方法的参数类型
interface AssetDetailResponse {
  data: any; // 你可以根据实际 API 响应的结构定义具体的类型
}

interface CoinInfoResponse {
  data: any; // 你可以根据实际 API 响应的结构定义具体的类型
}

interface WithdrawResponse {
  data: any; // 你可以根据实际 API 响应的结构定义具体的类型
}

class BinanceClient {
  private client: Spot;

  constructor(apiKey: string, apiSecret: string) {
    this.client = new Spot(apiKey, apiSecret);
  }

  // 为方法参数和返回值指定类型
  async getAccountInfo(): Promise<any> {
    try {
      const response = await this.client.userAsset();
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAssetDetail(asset: string): Promise<any> {
    try {
      const response = await this.client.assetDetail({ asset });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllCoinInfo(coins: string[]): Promise<{ [key: string]: any }> {
    try {
      const response = await this.client.coinInfo();
      const allCoins = response.data;

      const results: { [key: string]: any } = {};

      coins.forEach(coin => {
        const coinInfo = allCoins.find((c: { coin: string }) => c.coin === coin);
        if (coinInfo) {
          results[coin] = coinInfo.networkList;
        } else {
          results[coin] = 'Coin not found';
        }
      });

      return results;
    } catch (error) {
      throw error;
    }
  }

  async getWithDraw(coin: string, address: string, amount: string, network: string): Promise<any> {
    try {
      const response = await this.client.withdraw(coin, address, amount, { network });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default BinanceClient;