import React, { useState } from 'react';
import { Modal, Button, InputNumber, Switch, Toast } from '@douyinfe/semi-ui';
import useModal from '@/hooks/cex/useModal'; 
import useCexComponent from '@/hooks/cex/useBinanceAccountinfo';

interface ModalDemoProps {
  modalOpen: boolean;
  setModalVisible: (visible: boolean) => void;
  textVal: string;
  setTextVal: (value: string) => void;
}

const ModalDemo: React.FC<ModalDemoProps> = ({ modalOpen, setModalVisible, textVal, setTextVal }) => {
  const [visible, setVisible] = useState<string>("visible");
  let customVal = '';

  const {
    minNum,
    maxNum,
    pointNum,
    num,
    setMinNum,
    setMaxNum,
    setPointNum,
    setNum
  } = useModal();

  const {
    textAreaValue,
    setTextAreaVal,
  } = useCexComponent();

  const handleOk = () => {
    if (textVal === "") {
      Toast.error("最少输入一个地址");
      return;
    }

    const lines = textVal.split('\n');

    if (visible === "visible") {
      lines.forEach((line, index) => {
        const random = (Math.random() * (maxNum - minNum) + minNum).toFixed(pointNum);
        if (index === lines.length - 1) {
          customVal += `${line},${random}`;
        } else {
          customVal += `${line},${random}\n`;
        }
      });
    } else {
      lines.forEach((line, index) => {
        const random = (Math.random() * (maxNum - minNum) + minNum).toFixed(pointNum);
        if (index === lines.length - 1) {
          customVal += `${line},${num}`;
        } else {
          customVal += `${line},${num}\n`;
        }
      });
    }

    setTextAreaVal(customVal);
    setTextVal(customVal);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        title=""
        visible={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between">
            <span>数量</span>
            <div className="flex items-center">
              <Switch defaultChecked={true} onChange={(v) => setVisible(v ? "visible" : "hidden")} aria-label="a switch for semi demo" /> 随机数量
            </div>
          </div>
          <div className={visible}>
            <div className="flex justify-between">
              <InputNumber
                value={minNum}
                onChange={(value: string | number) => setMinNum(typeof value === 'number' ? value : parseFloat(value))} // 类型处理
                min={0} step={1}
              />
              <span className="text-2xl text-lime-400 font-bold">-</span>
              <InputNumber
                value={maxNum}
                onChange={(value: string | number) => setMaxNum(typeof value === 'number' ? value : parseFloat(value))} // 类型处理
                min={1} step={1}
              />
            </div>
            <br />
            <div className="flex flex-col space-y-2">
              <span>小数点位</span>
            </div>
            <br />
            <InputNumber
              value={pointNum}
              onChange={(value: string | number) => setPointNum(typeof value === 'number' ? value : parseFloat(value))} // 类型处理
              min={0} step={1}
            />
          </div>

          <div className={visible === "visible" ? "hidden" : "visible"}>
            <InputNumber
              value={num}
              onChange={(value: string | number) => setNum(typeof value === 'number' ? value : parseFloat(value))} // 类型处理
              min={0}
              step={0.1}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDemo;