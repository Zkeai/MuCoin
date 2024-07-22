import { useState, useEffect } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import useCommon from './useCommon';
import { okexAccountInfo, okexhNetworkList } from '@/http/api/cex/okex/api';

// 定义网络链类型
interface Network {
  chain: string;
  minFee: string;
  ccy: string;
  minWd: string;
}

// 定义账户信息类型
interface AccountInfo {
  ccy: string;
}

const useOkexComponent = () => {
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
  } = useCommon('okx', false);

  const [coins, setCoins] = useState<string[]>([]);
  const [networkList, setNetworkList] = useState<Network[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>(coins.length > 0 ? coins[0] : "");

  const changeCoins = (data: AccountInfo[]) => {
    const ccy = data.map(item => item.ccy);
    setCoins(ccy);
    setSelectedCoin(ccy.length > 0 ? ccy[0] : "");
  };

  const queryAccountInfo = async () => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("参数不全");
      return;
    }

    try {
      const response = await okexAccountInfo({ apiKey, secretKey, passphrase });

      setAccountInfo(response);
      // 获取 coins
      changeCoins(response);

      if (open) {
        let oldData = localStorage.getItem("cexInfo");
        if (!oldData) {
          oldData = "[]";
        }
        let jsonArray: any[] = JSON.parse(oldData);

        // 定义新的 credentials
        const credentials = { "okx": { apiKey, secretKey, passphrase } };
        // 检查是否已经存在 okx 对象
        const index = jsonArray.findIndex(item => item.okx);
        // 如果已经存在，则替换
        if (index !== -1) {
          jsonArray[index] = credentials;
        } else {
          // 如果不存在，则添加新的对象
          jsonArray.push(credentials);
        }

        const newJsonString = JSON.stringify(jsonArray, null, 2);
        localStorage.setItem('cexInfo', newJsonString);
      }
    } catch (error) {

    }
  };

  const fetchNetworkList = async (value: string) => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("okx参数不全");
      return;
    }

    try {
      const response = await okexhNetworkList({ apiKey, secretKey, passphrase, value });
      setNetworkList(response);
    } catch (error) {
      Toast.error('获取失败');
    }
  };

  useEffect(() => {
    if (coins.length > 0) {
      const coin_ = selectedCoin ? selectedCoin : coins[0];
      fetchNetworkList(coin_);
    }
  }, [selectedCoin, coins]);

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

export default useOkexComponent;