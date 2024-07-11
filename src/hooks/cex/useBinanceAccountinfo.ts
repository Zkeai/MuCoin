'use client';
import { useState, useEffect } from 'react';
import useCommon from './useCommon';
import { Toast } from '@douyinfe/semi-ui';
import { getBinanceAccountInfo, getBinanceAllCoinInfo } from '/src/http/api/cex/binance/api';

const useBinanceComponent = () => {
  const [coins, setCoins] = useState([]);
  const [networkList, setNetworkList] = useState([]);

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

  const changeCoins = (data) => {
    const assets = data.map(item => item.asset);
    setCoins(assets);
  };

  const getNetworkList = async ({ apiKey, secretKey, coins }) => {
    try {
      const res = await getBinanceAllCoinInfo({ apiKey, secretKey, coins });
      const networkData = res.data;
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
          const index = jsonArray.findIndex(item => item.binance);
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