import React, { useState } from 'react';
import { Modal, Button } from '@douyinfe/semi-ui';
import { InputNumber, Switch, Toast } from '@douyinfe/semi-ui';
import useModal from '/src/hooks/cex/useModal.ts'; 
import useCexComponent from '/src/hooks/cex/useBinanceAccountinfo.ts'


const ModalDemo = ({modalOpen, setModalVisible,textVal,setTextVal}) => {
    const [visible,setvisible] = useState("visible") 
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
        if (textVal === ""){
            Toast.error("最少输入一个地址",2)
            return
        }

    
        const lines= textVal.split('\n')

        if(visible === "visible"){
            lines.forEach((line, index) => {

                const random = (Math.random() * (maxNum - minNum) + minNum).toFixed(pointNum);
                if (index === lines.length - 1) {
                  customVal += `${line},${random}`;
                } else {
                  customVal += `${line},${random}\n`;
                }
              });

        }else{

             lines.forEach((line, index) => {
                const random = (Math.random() * (maxNum - minNum) + minNum).toFixed(pointNum);
                if (index === lines.length - 1) {
                  customVal += `${line},${num}`
                } else {
                  customVal += `${line},${num}\n`
                }
              });
            
        }

        setTextAreaVal(customVal)
        setTextVal(customVal)
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false)
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
                        <Switch defaultChecked={true} onChange={(v, e) => v? setvisible("visible") : setvisible("hidden")} aria-label="a switch for semi demo"></Switch>随机数量
                     </div>
                    </div>
                   <div className={`${visible}`} >
                    <div className="flex   justify-between">       
                        <InputNumber
                        value={minNum}
                        onChange={setMinNum}
                        min={0}   step={1} /> 

                        <span className="text-2xl text-lime-400 font-bold">-</span>

                        <InputNumber
                        value={maxNum}
                        onChange={setMaxNum}
                         min={1}   step={1} /> 
                    </div>
                        <br />
                        <div className="felx flex-col space-y-2">
                            <span>小数点位</span>
                           
                        </div>
                        <br />
                        <InputNumber
                        value={pointNum}
                        onChange={setPointNum}                        
                        min={0}   step={1} /> 
                   </div>

                   <div className={visible === "visible" ? "hidden" : "visible"}>
                    <InputNumber
                    value={num}
                    onChange={setNum}                    
                    min={0}  
                    step={0.1} /> 
                   </div>
 
                    
                </div>

            </Modal>
        </>
    );
};

export default ModalDemo;
