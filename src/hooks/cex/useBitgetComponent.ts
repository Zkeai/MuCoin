import { useState, useEffect, useCallback } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import useCommon from './useCommon';
import { getBitgetAccountInfo, bitgetNetworkList } from '/src/http/api/cex/bitget/api';

const useBitgetComponent = () => {

  const filterData = useCallback((data, coins) => {
    return data.filter(item => coins === item.coin);
  }, []);

  const {
    apiKey,
    secretKey,
    passphrase,
    open,
    modalOpen,
    setOpenModal,
    accountInfo,
    textAreaValue,
    setTextAreaVal,
    handleApiKeyChange,
    handleSecretKeyChange,
    handlePassphraseChange,
    handleSwitchChange,
    clearDataHandle,
    setAccountInfo
  } = useCommon('bitget', false);

  const [coins, setCoins] = useState([]);
  const [networkList, setNetworkList] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState("");

  const changeCoins = (data) => {
    const ccy = data.map(item => item.coin);
    setCoins(ccy);
    setSelectedCoin(ccy.length > 0 ? ccy[0] : "");
  };

  const queryAccountInfo = async () => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("参数不全", 2);
      return;
    }

    try {
      const response = await getBitgetAccountInfo({ apiKey, secretKey, passphrase });
      setAccountInfo(response.data.data);
      changeCoins(response.data.data);

      if (open) {
        let oldData = localStorage.getItem("cexInfo");
        if (!oldData) {
          oldData = "[]";
        }
        let jsonArray = JSON.parse(oldData);

        const credentials = { "bitget": { apiKey, secretKey, passphrase } };
        const index = jsonArray.findIndex(item => item.bitget);
        if (index !== -1) {
          jsonArray[index] = credentials;
        } else {
          jsonArray.push(credentials);
        }

        const newJsonString = JSON.stringify(jsonArray, null, 2);
        localStorage.setItem('cexInfo', newJsonString);
      }
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  const fetchNetworkList = useCallback(async (value) => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("bitget参数不全", 2);
      return;
    }

    try {
      const response = await bitgetNetworkList({ apiKey, secretKey, passphrase, value });
      const networklist = filterData(response.data.data, selectedCoin);
      setNetworkList(networklist[0].chains);
    } catch (error) {
      Toast.error('获取失败');
    }
  }, [apiKey, secretKey, passphrase, selectedCoin, filterData]);

  useEffect(() => {
    if (coins.length > 0 && selectedCoin) {
      fetchNetworkList(selectedCoin);
    }
  }, [selectedCoin, coins, fetchNetworkList]);

  return {
    apiKey,
    secretKey,
    passphrase,
    textAreaValue,
    setTextAreaVal,
    open,
    modalOpen,
    setOpenModal,
    accountInfo,
    handleApiKeyChange,
    handleSecretKeyChange,
    handlePassphraseChange,
    handleSwitchChange,
    clearDataHandle,
    queryAccountInfo,
    networkList,
    coins,
    selectedCoin,
    setSelectedCoin,
    fetchNetworkList
  };
};

export default useBitgetComponent;