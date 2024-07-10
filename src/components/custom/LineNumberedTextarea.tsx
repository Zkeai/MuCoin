import React, { useRef, useEffect } from 'react';
import Style from '../components.module.css';

const LineNumberedTextarea = ({ value, onChange, style }) => {
  const lineNumbersRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (lineNumbersRef.current) {
      const lineCount = value? value.split('\n').length: 0;
      const maxDigits = lineCount.toString().length;
      lineNumbersRef.current.value = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
      lineNumbersRef.current.style.width = `${maxDigits + 1.5}ch`;
    }
  }, [value]);

  const handleScroll = (e) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  return (
    <div className={`flex ${style}`}>
      <textarea
        ref={lineNumbersRef}
        className={` bg-gray-100 text-right p-2 ${Style.lineNumbers}` }
        readOnly
        style={{ resize: 'none' }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onScroll={handleScroll}
        className="flex-1 p-2 border"
        style={{ resize: 'none' }}
      />
    </div>
  );
};

export default LineNumberedTextarea;