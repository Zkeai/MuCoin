import { Spot } from '@binance/connector';

class BinanceClient {
  private client: Spot;

  constructor(apiKey: string, apiSecret: string) {
    this.client = new Spot(apiKey, apiSecret);
  }


  async getAccountInfo() {
    try {
      const response = await this.client.userAsset();
      return response.data;
    } catch (error) {

      throw error;
    }
  }

  async getAssetDetail(asset) {
    
    try {
      const response = await this.client.assetDetail({asset});
      return response.data;
    } catch (error) {

      throw error;
    }
  }

  async getAllCoinInfo(coins) {

    try {
      const response = await this.client.coinInfo();
      const allCoins = response.data;

      const results = {};
  
      coins.forEach(coin => {
        const coinInfo = allCoins.find(c => c.coin === coin);
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

  async getWithDrawa(coin,address,amount,network) {
    try {
      const response = await this.client.withdraw(coin,address,amount,{network});
      return response.data;
    } catch (error) {

      throw error;
    }
  }

}

export default BinanceClient;
