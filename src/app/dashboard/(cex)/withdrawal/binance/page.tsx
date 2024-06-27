'use client';
import React, {useState, useEffect} from 'react';
import { Switch, Input, Typography, Button, List, Tooltip, Select, Toast } from '@douyinfe/semi-ui';
import useBinanceComponent from '/src/hooks/cex/useBinanceAccountinfo.ts'; 
import CustomTextArea from '/src/components/custom/CustomTextArea';
import Modal from '/src/components/cex/Modal';
import Icon from '/src/components/custom/Icon';
import Styles from '../cex.module.css';
import { binanceWithDrawal } from '/src/http/api/cex/binance/api.ts';

const BinanceComponent = () => {
  const {
    apiKey,
    secretKey,
    textAreaValue,
    setTextAreaVal,
    open,
    modalOpen,
    setOpenModal,
    accountInfo,
    handleApiKeyChange,
    handleSecretKeyChange,
    handleSwitchChange,
    clearDataHandle,
    queryAccountInfo,
    networkList,
    coins
  } = useBinanceComponent();

  const [selectedCoin, setSelectedCoin] = useState(coins.length > 0 ? coins[0] : "");
  const [activeIndex, setActiveIndex] = useState(null);
  const [drawSuccess, setDrawSuccess] = useState(null);
  const [drawFail, setDrawFail] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index); 
  };

  useEffect(() => {
    if (coins.length > 0) {
      handleCoinChange(coins[0]);
    }
  }, [coins]);

  const handleCoinChange = (value) => {
    setSelectedCoin(value);
  };

  const withDrawalHandle = async () => {
    let successDraw = "";
    let failDraw = "";
    if (!textAreaValue || !selectedCoin || activeIndex === null) {
      Toast.error("参数不全", 2);
      return;
    }

    const lines = textAreaValue.split('\n');
    for (const line of lines) {
      const [address, amount] = line.split(",");
      if (!address || !amount) {
        Toast.error("地址或数量格式不正确", 2);
        continue;
      }
      try {
        const coin = selectedCoin;
        const network = activeIndex;
        await binanceWithDrawal({ apiKey, secretKey, coin, address, amount, network });
        successDraw += `${address} > 提币成功\n`;
      } catch (error) {
        failDraw += `${address} > 提币失败\n`;
      }
    }

    setDrawSuccess(successDraw);
    setDrawFail(failDraw);
  };

  return (
    <div className="flex flex-col mt-10 space-x-5 space-y-10">
      <div className="flex space-x-5">
        <Input
          prefix="Api_key"
          showClear
          value={apiKey}
          onChange={handleApiKeyChange}
        />
        <Input
          prefix="Secret_key"
          showClear
          value={secretKey}
          onChange={handleSecretKeyChange}
        />
      </div>

      <div className="flex space-x-5">
        <div className="flex items-center">
          <Switch checked={open} onChange={handleSwitchChange} aria-label="a switch for demo" />
          <Typography.Title heading={6} className="m-8">
            {open ? '已开启本地存储信息' : '已关闭本地存储信息'}
          </Typography.Title>
          <Tooltip
            content='数据保存在本地localStorage,以便下次使用,建议每次使用完后清理,数据不会上传。'
            arrowPointAtCenter={false}
            position='topLeft'
          >
            <div className="cursor-help">
              <Icon type="icon-yihuo" sizq={2} />
            </div>
          </Tooltip>
        </div>
        <div className="pl-48">
          <Button
            className="mr-8"
            onClick={clearDataHandle}
            style={{ backgroundColor: '#42b983' }}
            theme="solid"
          >
            清理本地缓存
          </Button>
        </div>
      </div>

      <div className="pl-50 flex flex-col">
        <Button
          className="mr-8"
          onClick={queryAccountInfo}
          style={{ backgroundColor: '#42b983' }}
          theme="solid"
        >
          查询资产
        </Button>
        {accountInfo.length > 0 && (
          <div className="mt-10">
            <List
              header={<div>现货账户信息</div>}
              bordered
              dataSource={accountInfo}
              renderItem={(item) => (
                <List.Item key={item.asset}>
                  {item.asset}: {`[可用] ${item.free} ---- [锁仓] ${item.locked} ---- [冻结] ${item.freeze}`}
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
      {coins.length > 0 && coins[0] !== "" && (
        <div>
          <div className="mt-3 mb-3 flex flex-col space-y-10">
            <div className="flex flex-col space-y-3">
              <span>选择币种</span>
              <Select defaultValue={coins[0]} style={{ width: 240 }} onChange={handleCoinChange}>
                {coins.map(item => (
                  <Select.Option value={item} key={item}>{item}</Select.Option>
                ))}
              </Select>
            </div>
            <div>
              {networkList[selectedCoin] && (
                <ul className="grid grid-cols-2 gap-6">
                  {networkList[selectedCoin].map(network => (
                    <li key={network.network}>
                      <div
                        className={`flex space-x-1 w-[17vw] h-16 rounded-lg pl-2 pt-1
                          ${Styles.netw} ${activeIndex === network.network ? Styles.active : ''}`}
                        onClick={() => handleClick(network.network)}
                      >
                        <div className="flex flex-col space-y-1 text-xs">
                          <span>{network.name}</span>
                          <span>手续费：{network.withdrawFee} {network.coin}</span>
                          <span>最小提取金额：{network.withdrawMin} {network.coin}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-between items-center">
          <span>地址和数量列表</span>
          <span className="text-gray-500 text-sm underline cursor-pointer" onClick={() => { setOpenModal(true) }}>随机生成提现数量</span>
          <Modal
            textVal={textAreaValue}
            setTextVal={setTextAreaVal}
            modalOpen={modalOpen}
            setModalVisible={() => { setOpenModal(false) }}
          ></Modal>
        </div>
        <CustomTextArea value={textAreaValue} onChange={setTextAreaVal} />
        <span className="text-sm text-gray-300">每一行包括地址和数量，两者使用英文逗号(,)隔开</span>
        <div className="flex flex-col space-y-5 mt-4">
          <Button
            className="mr-8"
            onClick={withDrawalHandle}
            style={{ backgroundColor: '#42b983' }}
            theme="solid"
          >
            提币
          </Button>
        </div>
        <div className={`mt-5 p-2 w-[35vw] ${!drawSuccess && !drawFail ? "hidden" : ""} ${Styles.draw}`}>
          {drawSuccess && <pre>{drawSuccess}</pre>}
          {drawFail && <pre>{drawFail}</pre>}
        </div>
      </div>
    </div>
  );
};

export default BinanceComponent;
