import { useState, useEffect } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import useCommon from './useCommon';
import { okexAccountInfo,okexhNetworkList } from '/src/http/api/cex/okex/api';
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


  const [coins, setCoins] = useState([]);
  const [networkList,setNetworkList] = useState("")
  const [selectedCoin, setSelectedCoin] = useState(coins.length > 0 ? coins[0] : "");

  const changeCoins = (data)=>{
    const ccy = data.map(item=>item.ccy)
    setCoins(ccy)
 }



  const queryAccountInfo = async () => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("参数不全", 2);
      return;
    }
 

    try {
      const response = await okexAccountInfo({ apiKey, secretKey, passphrase });
   
      setAccountInfo(response);
      //获取coins
      changeCoins(response)

      if (open) {
        let oldData = localStorage.getItem("cexInfo")
        if(!oldData){
          oldData = "[]"
        }
        let jsonArray = JSON.parse(oldData);

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
      console.error('Error fetching account info:', error);
    }
  };

  const fetchNetworkList = async (value) => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("okx参数不全", 2);
      return;
    }


    try {
      const response = await okexhNetworkList({ apiKey, secretKey, passphrase,value });
      setNetworkList(response);
    } catch (error) {
      Toast.error('获取失败');
    }
  };

  useEffect(() => {
    if(coins.length > 0 ){
      const coin_ = selectedCoin ? selectedCoin : coin[0]
      fetchNetworkList(coin_);
    }
   
  }, [selectedCoin]);

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