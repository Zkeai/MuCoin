import { useState,useEffect} from 'react';
import useCommon from './useCommon';
import { Toast } from '@douyinfe/semi-ui';
import { getBinanceAccountInfo,getBinanceAssetDetail, getBinanceAllCoinInfo } from '/src/http/api/cex/binance/api'

const useBinanceComponent = () => {
    const [coins, setCoins] = useState([])
    const [networkList, setNetworkList] = useState([])
    
    const changeCoins = (data)=>{
       const assets = data.map(item=>item.asset)
       setCoins(assets)
    }


    
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
    setAccountInfo
  } = useCommon('binance', false);

  const getNetworkList = async({apiKey, secretKey,coins}) =>{
    const res = await getBinanceAllCoinInfo({apiKey, secretKey,coins})
    const networkData = res.data
   setNetworkList(networkData)
  }
  
  useEffect(()=>{
    if(coins.length > 0 ){
      getNetworkList({apiKey, secretKey,coins})
    }
  },[coins])

  const queryAccountInfo = async () => {
    if (!apiKey || !secretKey ) {
      Toast.error("API Key、Secret Key为空");
      return;
    }

    try {
      const response = await getBinanceAccountInfo({apiKey, secretKey})
      if (response.status === 200) {
        const data = response.data;
        setAccountInfo(data);
        //获取coins
        changeCoins(data)
      
        if (open) {
           // 定义新的 credentials
          const credentials = { "binance": { apiKey, secretKey } };
          let oldData = localStorage.getItem("cexInfo")
          if(!oldData){
            oldData = "[]"
          }
          let jsonArray = JSON.parse(oldData);
  
          // 检查是否已经存在 binance 对象
          const index = jsonArray.findIndex(item => item.binance);
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


      } else {
        Toast.error("查询资产信息失败");
      }
    } catch (error) {
      Toast.error("查询资产信息出错");
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
