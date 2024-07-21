'use client';
import React, { useState, useEffect, ChangeEvent } from "react";
import { Input, Select, Tooltip, Toast } from "@douyinfe/semi-ui";
import { useAccount } from 'wagmi';
import Update from '@/components/custom/upload';
import SvgIcon from "@/components/custom/Icon";

interface Option {
  value: string;
  label: string;
  icon?: string;
}

interface Group {
  label: string;
  children: Option[];
}

const list: Group[] = [
  {
    label: "EVM",
    children: [
      { value: "https://rpc.ankr.com/eth", label: "ETH", icon: "icon-ETH" },
      { value: "https://rpc.ankr.com/bsc", label: "BSC", icon: "icon-bnb-bnb-logo" },
      { value: "https://rpc.ankr.com/optimism", label: "Optimism", icon: "icon-optimism-ethereum-op-logo" },
      { value: "https://rpc.ankr.com/arbitrum", label: "Arbitrum", icon: "icon-arbitrum-arb-logo" },
      { value: "https://rpc.ankr.com/polygon", label: "Polygon", icon: "icon-polygon-matic-logo" },
      { value: "https://avalanche.drpc.org", label: "AVAX", icon: "icon-avalanche-avax-logo" },
      { value: "https://scroll.drpc.org", label: "SCROLL", icon: "icon-scroll" },
      { value: "https://opbnb.drpc.org", label: "OPBNB", icon: "icon-opbnb" },
    ],
  },
  {
    label: "SOL",
    children: [{ value: "https://s.1b.tc/888/solana", label: "SOL", icon: "icon-solana" }],
  },
];

const Trance: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');
  const { address: connectedAddress, isConnected } = useAccount();
  const [label, setLabel] = useState<Option>({ value: "https://rpc.ankr.com/eth", label: "ETH", icon: "icon-ETH" });
  const [rpcValue, setRpcValue] = useState<string>("https://rpc.ankr.com/eth");

  useEffect(() => {
    if (!isConnected) {
      Toast.warning("请连接归集的钱包");
    }
  }, [isConnected]);

  const onChange = (value: string | number | any[] | Record<string, any> | undefined) => {
    if (typeof value === 'string') {
      const selected = list
        .flatMap((group) => group.children)
        .find((option) => option.value === value);
      if (selected) {
        setLabel(selected);
        setRpcValue(selected.value);
      }
    }
  };

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
            size="large"
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
              content={"请输入代币合约地址"}
              arrowPointAtCenter={false}
              position="topLeft"
            >
              <div>
                <SvgIcon type="icon-yihuo" size={20} className="ml-2" />
              </div>
            </Tooltip>
          </div>
          <Input placeholder="请输入代币地址"></Input>
        </div>

      </div>

      <div>
        <div className="flex">
          <span className="text-sm font-medium">RPC节点</span>
          <Tooltip
            content={"自动获取链rpc"}
            arrowPointAtCenter={false}
            position="topLeft"
          >
            <div>
              <SvgIcon type="icon-yihuo" size={20} className="ml-2" />
            </div>
          </Tooltip>
        </div>
        <Input value={rpcValue} placeholder="请输入RPC"></Input>
      </div>
      <Update
        fileContent={fileContent}
        setFileContent={setFileContent}
        title="私钥列表"
      />
    </div>
  );
};

export default Trance;