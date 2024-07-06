"use client";
import React, { useState, useEffect } from 'react';
import { Select, Input,Toast } from '@douyinfe/semi-ui';
import SvgIcon from '/src/components/custom/Icon';
import jsonData from '/src/config/evm.json';
import Style from './wallet.module.css';
import { createWallets } from '/src/lib/wallet.ts'
import CustomTextArea from '/src/components/custom/CustomTextArea';
import { networkTest } from '/src/http/api/network/api.ts'

const Wallet = () => {
  const [label, setLabel] = useState({ value: 'ETH', label: 'ETH', otherKey: 0, icon: '' });
  const [num, setNum] = useState(null);
  const [textAreaValue,setTextAreaVal] =useState("")
  const [network,setNetwork] = useState(true)


  useEffect(() => {
    setNetwork(navigator.onLine)
  }, []);

  const handleClick = () => {
    if(num === null){
      Toast.error("请输入你要创建的钱包数量")
      return
    }
    if(network){
      Toast.error("为保证你钱包的安全，请断开网络并在浏览器中的无痕模式运行")
      return
    }
    const walletArr = createWallets(num);
    const result = walletArr.map(wallet => `${wallet.address},${wallet.privateKey}`).join('\n');
    setTextAreaVal(result)
  };

  const onChangeInput = (e) => {
    setNum(e);
  };

  const onChange = (value) => {
    setLabel(value);
  };

  const list = [
    { value: 'ETH', label: 'ETH', otherKey: 0, icon: 'icon-ETH' },
    { value: 'BSC', label: 'BSC', otherKey: 1, icon: 'icon-bnb-bnb-logo' },
    { value: 'Optimism', label: 'Optimism', otherKey: 3, icon: 'icon-optimism-ethereum-op-logo' },
    { value: 'Arbitrum', label: 'Arbitrum', otherKey: 4, icon: 'icon-arbitrum-arb-logo' },
    { value: 'Polygon', label: 'Polygon', otherKey: 5, icon: 'icon-polygon-matic-logo' },
    { value: 'TRX', label: 'TRX', otherKey: 6, icon: 'icon-tron-trx-logo' },
    { value: 'AVAX', label: 'AVAX', otherKey: 7, icon: 'icon-avalanche-avax-logo' },
  ];

  return (
    <div className="flex flex-col justify-center items-center space-y-12 bg-[#f4f7fa] h-[81vh]">
      <div className="flex flex-col items-center w-[40vw]  p-5">
        <SvgIcon type="icon-ETH" size={96} />
        <div className="w-[50vw]">
          <Select
            onChangeWithObject
            onChange={onChange}
            size="large"
            value={label}
            className="w-full mt-5"
            optionList={list.map((item) => ({
              ...item,
              label: (
                <div className="flex justify-between items-center w-full">
                  <span>{item.label}</span>
                  {item.icon && (
                    <SvgIcon type={item.icon} size={24} className="ml-2" />
                  )}
                </div>
              ),
            }))}
          />
          <Input
            onEnterPress={handleClick}
            value={num}
            onChange={onChangeInput}
            className="w-3/5 mt-5"
            placeholder="请输入你要创建的钱包的数量"
            size="large"
            suffix={
              <SvgIcon
                className={Style.icon}
                type="icon-youjiantou"
                size={24}
                onClick={handleClick}
              />
            }
          />
           <div className="text-[#ff4949] bg-[#ffeded] text-xs mt-5 p-3 rounded-md">
            <span>
            提示:钱包生成过程均在本地环境完成，我们无法获取到钱包的任何信息！此Dapp在本地运行，为了安全，请断开网络并在无痕浏览器上执行此Dapp！此Dapp生成的钱包仅供测试使用，勿用于存放大额资金！
            </span>
            </div>
            <div className="text-sky-500 mt-2 text-xs ">
              联网状态：{network?"[已连接]，请断开网络后使用无痕模式，防止钱包私钥泄漏。":"[已断开],请使用无痕模式，防止钱包私钥泄漏"}
            </div>
        </div>
        <div className={ !textAreaValue?"hidden" :" mt-10"}>
          
          <CustomTextArea customStyle="flex w-[50vw] max-h-[212px] " value={textAreaValue} onChange={setTextAreaVal}></CustomTextArea>
          <span className="text-sky-500 text-sm">钱包生成完毕：格式【钱包地址】,【私钥】</span>
        </div>
        
      </div>
    </div>
  );
};

export default Wallet;