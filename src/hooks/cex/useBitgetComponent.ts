import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import useCommon from './useCommon';
import { getBitgetAccountInfo, bitgetNetworkList } from '@/http/api/cex/bitget/api';

interface NetworkChain {
  chain: string;
  withdrawFee: string;
  minWithdrawAmount: string;
  withdrawable: boolean;
}

interface Network {
  coin: string;
  chains: NetworkChain[];
}

interface AccountInfo {
  coin: string;
  available: string;
  locked: string;
  frozen: string;
}

interface CexInfo {
  bitget?: {
    apiKey: string;
    secretKey: string;
    passphrase: string;
  };
}

interface UseCommon {
  apiKey: string;
  secretKey: string;
  passphrase: string;
  open: boolean;
  modalOpen: boolean;
  setOpenModal: (open: boolean) => void;
  accountInfo: AccountInfo[];
  textAreaValue: string;
  setTextAreaVal: (value: string) => void;
  handleApiKeyChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  handleSecretKeyChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  handlePassphraseChange: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
  handleSwitchChange: (checked: boolean) => void;
  clearDataHandle: () => void;
  setAccountInfo: (info: AccountInfo[]) => void;
}

interface BitgetCommonQuery {
  apiKey: string;
  secretKey: string;
  passphrase: string;
  coin?: string; // 添加 coin 属性，假设它是可选的
}

const useBitgetComponent = () => {
  const filterData = useCallback((data: Network[], coin: string) => {
    return data.filter(item => coin === item.coin);
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
  } = useCommon('bitget', false) as UseCommon;

  const [coins, setCoins] = useState<string[]>([]);
  const [networkList, setNetworkList] = useState<NetworkChain[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>("");

  const changeCoins = (data: AccountInfo[]) => {
    const ccy = data.map(item => item.coin);
    setCoins(ccy);
    setSelectedCoin(ccy.length > 0 ? ccy[0] : "");
  };

  const queryAccountInfo = async () => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("参数不全");
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
        let jsonArray: CexInfo[] = JSON.parse(oldData);

        const credentials: CexInfo = { bitget: { apiKey, secretKey, passphrase } };
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

  const fetchNetworkList = useCallback(async (value: string) => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("bitget参数不全");
      return;
    }

    try {
      const response = await bitgetNetworkList({ apiKey, secretKey, passphrase, coin: value } as BitgetCommonQuery);
      const networklist = filterData(response.data.data, selectedCoin);
      setNetworkList(networklist.length > 0 ? networklist[0].chains : []);
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