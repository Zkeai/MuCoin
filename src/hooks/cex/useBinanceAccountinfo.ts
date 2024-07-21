'use client';
import { useState, useEffect } from 'react';
import useCommon from './useCommon';
import { Toast } from '@douyinfe/semi-ui';
import { getBinanceAccountInfo, getBinanceAllCoinInfo } from '@/http/api/cex/binance/api';

// Define the types for network list
interface Network {
  network: string;
  name: string;
  withdrawFee: string;
  coin: string;
  withdrawMin: string;
}

// Define the type for network list as an object where keys are coin symbols and values are arrays of Network
interface NetworkList {
  [coin: string]: Network[];
}

const useBinanceComponent = () => {
  const [coins, setCoins] = useState<string[]>([]); // Specify that coins is an array of strings
  const [networkList, setNetworkList] = useState<NetworkList>({}); // Initialize with an empty object

  const {
    apiKey,
    secretKey,
    open,
    modalOpen,
    setOpenModal,
    accountInfo,
    textAreaValue,
    setTextAreaVal,
    handleApiKeyChange,
    handleSecretKeyChange,
    handleSwitchChange,
    clearDataHandle,
    setAccountInfo,
  } = useCommon('binance', false);

  const changeCoins = (data: any) => {
    const assets = data.map((item: { asset: string }) => item.asset);
    setCoins(assets);
  };

  const getNetworkList = async ({ apiKey, secretKey, coins }: { apiKey: string; secretKey: string; coins: string[] }) => {
    try {
      const res = await getBinanceAllCoinInfo({ apiKey, secretKey, coins });
      const networkData: NetworkList = res.data; // Ensure the response data matches NetworkList type
      setNetworkList(networkData);
    } catch (error) {
      console.error('获取网络列表出错:', error);
      Toast.error('获取网络列表出错');
    }
  };

  useEffect(() => {
    if (coins.length > 0) {
      getNetworkList({ apiKey, secretKey, coins });
    }
  }, [apiKey, secretKey, coins]);

  const queryAccountInfo = async () => {
    if (!apiKey || !secretKey) {
      Toast.error('API Key、Secret Key为空');
      return;
    }

    try {
      const response = await getBinanceAccountInfo({ apiKey, secretKey });
      if (response.status === 200) {
        const data = response.data;
        setAccountInfo(data);
        changeCoins(data);

        if (open) {
          const credentials = { binance: { apiKey, secretKey } };
          let jsonArray = JSON.parse(localStorage.getItem('cexInfo') || '[]');
          const index = jsonArray.findIndex((item: any) => item.binance);
          if (index !== -1) {
            jsonArray[index] = credentials;
          } else {
            jsonArray.push(credentials);
          }
          localStorage.setItem('cexInfo', JSON.stringify(jsonArray, null, 2));
        }
      } else {
        Toast.error('查询资产信息失败');
      }
    } catch (error) {
      console.error('查询资产信息出错:', error);
      Toast.error('查询资产信息出错');
    }
  };

  return {
    apiKey,
    secretKey,
    open,
    modalOpen,
    setOpenModal,
    accountInfo,
    textAreaValue,
    setTextAreaVal,
    handleApiKeyChange,
    handleSecretKeyChange,
    handleSwitchChange,
    clearDataHandle,
    queryAccountInfo,
    coins,
    networkList,
  };
};

export default useBinanceComponent;