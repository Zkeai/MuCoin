import React, { useRef, useEffect, ChangeEvent } from 'react';
import Style from '../components.module.css';

interface MyComponentProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties; 
}

const LineNumberedTextarea: React.FC<MyComponentProps> = ({ value, onChange, style }) => {
  const lineNumbersRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (lineNumbersRef.current) {
      const lineCount = value ? value.split('\n').length : 0;
      const maxDigits = lineCount.toString().length;
      lineNumbersRef.current.value = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
      lineNumbersRef.current.style.width = `${maxDigits + 1.5}ch`;
    }
  }, [value]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
    <div className={`flex`} style={style}>
      <textarea
        ref={lineNumbersRef}
        className={`bg-gray-100 text-right p-2 ${Style.lineNumbers}`}
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