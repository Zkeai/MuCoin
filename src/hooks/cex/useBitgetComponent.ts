import { useState, useEffect } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import useCommon from './useCommon';
import { getBitgetAccountInfo,bitgetNetworkList } from '/src/http/api/cex/bitget/api';

const useBitgetComponent = () => {

    function filterData(data, coins) {

        return data.filter(item =>  coins === item.coin);
    }

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
    const [networkList,setNetworkList] = useState("")
    const [selectedCoin, setSelectedCoin] = useState(coins.length > 0 ? coins[0] : "");

    const changeCoins = (data)=>{
        const ccy = data.map(item=>item.coin)
        setCoins(ccy)
    }



  const queryAccountInfo = async () => {
    if (!apiKey || !secretKey || !passphrase) {
      Toast.error("参数不全", 2);
      return;
    }
 

    try {
      const response = await getBitgetAccountInfo({ apiKey, secretKey, passphrase });
      setAccountInfo(response.data.data);
      //获取coins
      changeCoins(response.data.data)

      if (open) {
        let oldData = localStorage.getItem("cexInfo")
        if(!oldData){
          oldData = "[]"
        }
        let jsonArray = JSON.parse(oldData);

        // 定义新的 credentials
        const credentials = { "bitget": { apiKey, secretKey, passphrase } };
        // 检查是否已经存在 okx 对象
        const index = jsonArray.findIndex(item => item.bitget);
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
      Toast.error("bitget参数不全", 2);
      return;
    }


    try {
      const response = await bitgetNetworkList({ apiKey, secretKey, passphrase,value });
      const networklist = filterData(response.data.data,selectedCoin)
      setNetworkList(networklist[0].chains);
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

export default useBitgetComponent;