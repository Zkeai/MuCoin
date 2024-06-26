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
          const credentials = [{ ["binance"]: { apiKey, secretKey } }];
          localStorage.setItem('cexInfo', JSON.stringify(credentials));
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
