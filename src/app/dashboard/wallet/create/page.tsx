'use client';

import React, { useState, useEffect, ChangeEvent } from "react";
import { Select, Input, Toast, Switch } from "@douyinfe/semi-ui";
import SvgIcon from "@/components/custom/Icon";
import Style from "../wallet.module.css";
import { createWallets, createSolWallets } from "@/lib/wallet";
import CustomTextArea from "@/components/custom/CustomTextArea";

// Define the types for options and groups
interface OptionType {
  value: string;
  label: string;
  icon?: string;
}

interface GroupType {
  label: string;
  children: OptionType[];
}

const list: GroupType[] = [
  {
    label: "EVM",
    children: [
      { value: "ETH", label: "ETH", icon: "icon-ETH" },
      { value: "BSC", label: "BSC", icon: "icon-bnb-bnb-logo" },
      // More options...
    ],
  },
  {
    label: "SOL",
    children: [{ value: "SOL", label: "SOL", icon: "icon-solana" }],
  },
];

const Wallet: React.FC = () => {
  const [label, setLabel] = useState<OptionType>({ value: "ETH", label: "ETH", icon: "icon-ETH" });
  const [num, setNum] = useState<number | null>(null);
  const [textAreaValue, setTextAreaVal] = useState<string>("");
  const [network, setNetwork] = useState<boolean>(true);
  const [generatePrivateKeyOnly, setGeneratePrivateKeyOnly] = useState<boolean>(false);

  useEffect(() => {
    const updateNetworkStatus = () => setNetwork(navigator.onLine);

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    updateNetworkStatus();

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  const handleClick = async () => {
    if (num === null) {
      Toast.error("请输入你要创建的钱包数量");
      return;
    }
    if (network) {
      Toast.error("为保证你钱包的安全，请断开网络并在浏览器中的无痕模式运行");
      return;
    }

    try {
      switch (label.value) {
        case "SOL":
          if (generatePrivateKeyOnly) {
            const solWalletArr = await createSolWallets(num);
            const solRes = solWalletArr.map((wallet: { privateKey: string }) => `${wallet.privateKey}`).join("\n");
            setTextAreaVal(solRes);
          } else {
            const solWalletArr = await createSolWallets(num);
            const solRes = solWalletArr.map((wallet: { address: string, privateKey: string }) => `${wallet.address},${wallet.privateKey}`).join("\n");
            setTextAreaVal(solRes);
          }
          break;
        default:
          if (generatePrivateKeyOnly) {
            const evmWalletArr = await createWallets(num);
            const evmRes = evmWalletArr.map((wallet: { privateKey: string }) => `${wallet.privateKey}`).join("\n");
            setTextAreaVal(evmRes);
          } else {
            const evmWalletArr = await createWallets(num);
            const evmRes = evmWalletArr.map((wallet: { address: string, privateKey: string }) => `${wallet.address},${wallet.privateKey}`).join("\n");
            setTextAreaVal(evmRes);
          }
          break;
      }
    } catch (error) {
      Toast.error("生成钱包时出错，请重试");
    }
  };

  const onChangeInput = (value: string) => {
    setNum(Number(value));
  };

  const onChange = (value: string | number | any[] | Record<string, any> | undefined) => {
    // Adjusting based on possible types
    if (typeof value === 'string') {
      const selected = list.flatMap(group => group.children).find(option => option.value === value);
      if (selected) {
        setLabel(selected);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-12 bg-[#f4f7fa] h-[81vh]">
      <div className="flex flex-col items-center w-[40vw] p-5">
        <SvgIcon type="icon-ETH" size={96} />
        <div className="w-[60vw]">
          <Select
            onChange={onChange}
            size="large"
            value={label.value}
            className="w-full mt-5"
            placeholder=""
            filter
          >
            {list.map((group, index) => (
              <Select.OptGroup label={group.label} key={`${index}-${group.label}`}>
                {group.children.map((option, index2) => (
                  <Select.Option value={option.value} key={`${index2}-${option.value}`}>
                    <div className="flex justify-between items-center w-full">
                      <span>{option.label}</span>
                      {option.icon && <SvgIcon type={option.icon} size={24} className="ml-2" />}
                    </div>
                  </Select.Option>
                ))}
              </Select.OptGroup>
            ))}
          </Select>
          <Input
            onEnterPress={handleClick}
            value={num !== null ? num.toString() : ''}
            onChange={(e: string) => onChangeInput(e)}
            className="w-3/5 mt-5"
            placeholder="请输入你要创建的钱包的数量"
            size="large"
            suffix={
              <div onClick={handleClick} className="cursor-pointer">
                <SvgIcon className={Style.icon} type="icon-youjiantou" size={24} />
              </div>
            }
          />
          <div className="text-[#ff4949] bg-[#ffeded] text-xs mt-5 p-3 rounded-md">
            <span>
              提示:钱包生成过程均在本地环境完成，我们无法获取到钱包的任何信息！此Dapp在本地运行，为了安全，请断开网络并在无痕浏览器上执行此Dapp！此Dapp生成的钱包仅供测试使用，勿用于存放大额资金！
            </span>
          </div>
          <div className="text-sky-500 mt-2 text-xs flex justify-between">
            <div>
              联网状态：
              {network ? "[已连接]，请断开网络后使用无痕模式，防止钱包私钥泄漏。" : "[已断开],请使用无痕模式，防止钱包私钥泄漏"}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>{generatePrivateKeyOnly ? '私钥模式' : '私钥地址模式'}</span>
              <Switch
                checked={generatePrivateKeyOnly}
                onChange={(checked: boolean) => setGeneratePrivateKeyOnly(checked)}
              />
            </div>
          </div>
        </div>
        <div className={!textAreaValue ? "hidden" : "mt-5"}>
          <CustomTextArea customStyle="flex w-[60vw] max-h-[212px]" value={textAreaValue} onChange={setTextAreaVal} />
          <span className="text-sky-500 text-sm">钱包生成完毕：格式【钱包地址】,【私钥】</span>
        </div>
      </div>
    </div>
  );
};

export default Wallet;