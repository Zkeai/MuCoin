import { RestClient } from 'okx-api';

// 定义接口用于请求参数
interface OkexCommonQuery {
  apiKey: string;
  secretKey: string;
  passphrase?: string;
}

interface OkexWithdrawalQuery extends OkexCommonQuery {
  coin: string;
  address: string;
  amount: string;
  network: string;
  minFee: string;
}



// 提币请求函数
export const okexWithdrawal = async ({
  apiKey,
  secretKey,
  passphrase = "",
  coin,
  address,
  amount,
  network,
  minFee,
}: OkexWithdrawalQuery): Promise<any> => {
  const client = new RestClient({ apiKey, apiSecret: secretKey, apiPass: passphrase });

  try {
    const response: any = await client.submitWithdraw({
      dest: "4",
      fee: minFee,
      ccy: coin,
      toAddr: address,
      amt: amount,
      chain: network,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.msg || error.toString());
  }
};

// 查询账户信息函数
export const okexAccountInfo = async ({
  apiKey,
  secretKey,
  passphrase = "",
}: OkexCommonQuery): Promise<any> => {
  const client = new RestClient({ apiKey, apiSecret: secretKey, apiPass: passphrase });

  try {
    const response = await client.getBalances();
    return response;
  } catch (error: any) {
    throw new Error(error?.msg || error.toString());
  }
};

// 获取网络列表函数
export const okexhNetworkList = async ({
  apiKey,
  secretKey,
  passphrase = "",
  value,
}: OkexCommonQuery & { value: string }): Promise<any> => {
  const client = new RestClient({ apiKey, apiSecret: secretKey, apiPass: passphrase });

  try {
    const response = await client.getCurrencies(value);
    return response;
  } catch (error: any) {
    throw new Error(error?.msg || error.toString());
  }
};