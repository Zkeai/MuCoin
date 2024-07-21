import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import useCommon from './useCommon';
import { getBitgetAccountInfo, bitgetNetworkList, bitgetWithDrawa } from '@/http/api/cex/bitget/api';

// 定义网络链类型
interface NetworkChain {
  chain: string;
  withdrawFee: string;
  minWithdrawAmount: string;
  withdrawable: boolean;
}

// 定义网络列表类型
interface Network {
  chains: NetworkChain[];
}

// 定义币种信息类型
interface AccountInfo {
  coin: string;
  available: string;
  locked: string;
  frozen: string;
}

// 定义接口用于描述 localStorage 中的对象
interface CexInfo {
  bitget?: {
    apiKey: string;
    secretKey: string;
    passphrase: string;
  };
}

// 定义 hook 返回的对象
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

// 定义 bitget 的接口
interface BitgetWithDrawal {
  apiKey: string;
  secretKey: string;
  passphrase: string;
  coin: string;
  chain: string;
  amount: string;
  address: string;
}

const useBitgetComponent = () => {
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
  const [activeIndex, setActiveIndex] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const filterData = useCallback((data: Network[], coins: string[]) => {
    return data
      .flatMap(network => network.chains) // 获取所有的 NetworkChain
      .filter(chain => coins.includes(chain.chain)); // 按 chain 过滤
  }, []);

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
      setAccountInfo(response.data); // 这里的 response.data 应该是 AccountInfo[]
      changeCoins(response.data);

      if (open) {
        let oldData = localStorage.getItem("cexInfo");
        if (!oldData) {
          oldData = "[]";
        }

        // 明确解析为 CexInfo[]
        let jsonArray: CexInfo[] = JSON.parse(oldData);

        const credentials: CexInfo = { bitget: { apiKey, secretKey, passphrase } };
        const index = jsonArray.findIndex((item: CexInfo) => item.bitget);

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
      const response = await bitgetNetworkList({ apiKey, secretKey, passphrase });
      const networklist = filterData(response.data, [selectedCoin]);
      setNetworkList(networklist.length > 0 ? networklist : []);
    } catch (error) {
      Toast.error('获取失败');
    }
  }, [apiKey, secretKey, passphrase, selectedCoin, filterData]);

  useEffect(() => {
    if (coins.length > 0 && selectedCoin) {
      fetchNetworkList(selectedCoin);
    }
  }, [selectedCoin, coins, fetchNetworkList]);

  const performWithdrawal = async () => {
    const coin: string = selectedCoin || '';
    const chain: string = activeIndex || '';
    const addressValue: string = address || '';
    const amountValue: string = amount || '';

    if (!apiKey || !secretKey || !passphrase || !coin || !chain || !addressValue || !amountValue) {
      Toast.error('所有必填字段必须填写');
      return;
    }

    try {
      await bitgetWithDrawa({ apiKey, secretKey, passphrase, coin, address: addressValue, amount: amountValue, chain });
      Toast.success('提现成功');
    } catch (error) {
      console.error('执行提现时出错:', error);
      Toast.error('执行提现时出错');
    }
  };

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
    fetchNetworkList,
    performWithdrawal
    };
    };
    
    export default useBitgetComponent;