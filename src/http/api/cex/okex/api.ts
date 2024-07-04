import { RestClient } from 'okx-api';

export const okexWithdrawal = async ({ apiKey, secretKey, passphrase, coin, address, amount, network,minFee }) => {
  const client = new RestClient({ apiKey, apiSecret:secretKey, apiPass:passphrase });

  try {
    const response = await client.submitWithdraw({
      dest:"4",
      fee:minFee,
      ccy:coin,
      toAddr: address,
      amt:amount,
      chain:network,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.msg);
  }
};

export const okexAccountInfo  = async ({ apiKey, secretKey, passphrase}) => {
  const client = new RestClient({apiKey, apiSecret:secretKey, apiPass:passphrase });

  try {
    const response = await client.getBalances();
    return response;
  } catch (error) {
    throw new Error(error.msg);
  }
};

export const okexhNetworkList = async ({ apiKey, secretKey, passphrase,value}) => {
  const client = new RestClient({ apiKey, apiSecret:secretKey, apiPass:passphrase});

  try {
    const response = await client.getCurrencies(value);
    return response;
  } catch (error) {
    throw new Error(error.msg);
  }
};