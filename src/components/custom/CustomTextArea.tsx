import { useState, useRef,useEffect } from 'react';
import { TextArea } from '@douyinfe/semi-ui';
import '/src/components/components.module.css'

import useCexComponent from '/src/hooks/cex/useBinanceAccountinfo.ts'


const LineNumberedTextArea = ({ value, onChange,customStyle }) => {
  const {textAreaRef}  = useCexComponent()
  const lineNumbersRef = useRef(null);

  const handleChange = (val) => {
    setValue(val);
  };

  // 计算行号的函数
  const calculateLineNumbers = () => {
    // 将文本内容按行分割
    const lines = value.split('\n');
    // 返回行数
    return lines.length;
  };

    // 监听内容变化，自动滚动到底部
    useEffect(() => {
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = lineNumbersRef.current.scrollHeight- 18;
        }
      }, [value]);

  return (
    <div className= { !customStyle ? "flex w-[36vw] max-h-[212px]" :customStyle}>
      <div
        id="line-numbers"
        ref={lineNumbersRef}
        className=" overflow-y-hidden mr-[-21px] text-slate-300 text-[14px] leading-3  pt-[10px]  border-r  flex flex-col justify-start items-center text-center  "
      >
        {/* 根据文本框内容计算行号 */}
        {Array.from(Array(calculateLineNumbers()), (_, index) => (
          <div key={index} className="mb-2">{index + 1}</div>
        ))}
      </div>
      <div className="flex-grow relative">
        <TextArea
          value={value}
          onChange={(e) => onChange(e)}
          rows={10}
          className="w-full pl-4 h-full outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default LineNumberedTextArea;
