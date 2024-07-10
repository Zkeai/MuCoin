"use client";
import React, { useState,useEffect } from "react";
import { Input, Select, Tooltip,Toast } from "@douyinfe/semi-ui";
import { useAccount } from 'wagmi';
import Update  from '/src/components/custom/upload'
import SvgIcon from "/src/components/custom/Icon";
import oklink from '/src/lib/oklink/oklink.ts'

import config from '/src/config/oklink.json'



const list = [
  {
    label: "EVM",
    children: [
      { value: "ETH", label: "ETH", icon: "icon-ETH" },
      { value: "BSC", label: "BSC", icon: "icon-bnb-bnb-logo" },
      {
        value: "Optimism",
        label: "Optimism",
        icon: "icon-optimism-ethereum-op-logo",
      },
      {
        value: "Arbitrum",
        label: "Arbitrum",
        icon: "icon-arbitrum-arb-logo",
      },
      { value: "Polygon", label: "Polygon", icon: "icon-polygon-matic-logo" },
      { value: "AVAXC", label: "AVAX", icon: "icon-avalanche-avax-logo" },
      { value: "TRON", label: "TRON", icon: "icon-tron-trx-logo" },
      { value: "SCROLL", label: "SCROLL", icon: "icon-scroll" },
      { value: "OPBNB", label: "OPBNB", icon: "icon-opbnb" },
      
    ],
  },
  {
    label: "SOL",
    children: [{ value: "SOL", label: "SOL", icon: "icon-solana" }],
  },
];

const Trance = () => {
  const [fileContent, setFileContent] = useState('');
  const { connectedAddress, isConnected } = useAccount();


  const [label, setLabel] = useState({
    value: "ETH",
    label: "ETH",
    icon: "icon-ETH",
  });

  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenList,setTokenList] = useState([])
  const [selectedToken,setSelectedToken] = useState()
  const oklink_ = new oklink(config.oklink_api_key);

  useEffect(()=>{
    if(!isConnected){
      Toast.warning("请连接归集的钱包",2)
    }

    if(label.value !== "SOL"){
      getTokenLIst()
    }else{
      setTokenList(null)
    }
    
  },[label,isConnected])


  const onChange = (value) => {
    const selected = list
      .flatMap((group) => group.children)
      .find((option) => option.value === value);
    setLabel(selected);
    
  };
  const tokenOnchange = (value) => {
    console.log(value)
    setSelectedToken(value)
  }

  const tokenChange = (value)=>{
    setTokenAddress(value)
  }

  const getTokenLIst = ()=>{
    const params = {
      chainShortName: label.value,  
      address: connectedAddress,
      protocolType:"token_20"
    };
    oklink_.getAddressSummary("address/token-balance",params)
    .then((data)=>{ 
      const output = data.data[0].tokenList
      .filter(item => item.symbol !== null && item.symbol !== "")
      .map(item => ({
        value: item.tokenContractAddress,
        label: `[${item.symbol}] ${item.tokenContractAddress}`
      }));
      setTokenList(output)
    })
    .catch(error => Toast.error(error))
  }
  return (
    <div className="flex flex-col px-96 py-5 space-y-12 bg-[#f4f7fa] h-[81vh]">
      <div className="flex space-x-10 justify-between">
        <div className="flex flex-col w-[16vw] space-y-2">
          <div className="flex">
            <span className="text-sm font-medium">公链</span>
            <Tooltip
              content={"选择公链,如果您想添加自定义公链,更改RPC地址即可!"}
              arrowPointAtCenter={false}
              position="topLeft"
            >
              <div>
                <SvgIcon type="icon-yihuo" size={20} className="ml-2" />
              </div>
            </Tooltip>
          </div>

          <Select
            onChange={onChange}
            size="modal"
            value={label.value}
            className="w-full"
            placeholder=""
            filter
          >
            {list.map((group, index) => (
              <Select.OptGroup
                label={group.label}
                key={`${index}-${group.label}`}
              >
                {group.children.map((option, index2) => (
                  <Select.Option
                    value={option.value}
                    key={`${index2}-${option.value}`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span>{option.label}</span>
                      {option.icon && (
                        <SvgIcon
                          type={option.icon}
                          size={24}
                          className="ml-2"
                        />
                      )}
                    </div>
                  </Select.Option>
                ))}
              </Select.OptGroup>
            ))}
          </Select>
        </div>

        <div className="flex flex-col w-[16vw] space-y-2">
          <div className="flex">
            <span className="text-sm font-medium">代币地址</span>
            <Tooltip
              content={"选择代币或粘贴代币地址"}
              arrowPointAtCenter={false}
              position="topLeft"
            >
              <div>
                <SvgIcon type="icon-yihuo" size={20} className="ml-2" />
              </div>
            </Tooltip>
          </div>

          <Select filter       onSearch={(searchText) => {console.log('User is typing:', searchText);}}  placeholder="请选择代币"  optionList={tokenList} onChange={tokenOnchange}></Select>
        
        </div>


      </div>
      <Update
        fileContent={fileContent}
        setFileContent={setFileContent}
        title="文件上传"
      />
    </div>
  );
};

export default Trance;
