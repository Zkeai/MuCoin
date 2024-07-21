"use client";

import React from 'react';
import { Button } from '@douyinfe/semi-ui';

// 定义组件的 props 类型
interface VipButtonProps {
  text: string;          // 按钮文本
  buttonColor: string;   // 按钮颜色
  badgeContent?: string; // 徽章内容（可选）
  showBadge?: boolean;   // 是否显示徽章（可选）
}

const VipButton: React.FC<VipButtonProps> = ({ text, buttonColor, badgeContent, showBadge }) => {
  return (
    <div className="relative inline-block">
      <Button style={{ backgroundColor: buttonColor, position: 'relative' }} theme='solid'>
        {text}
        {showBadge && (
          <div style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 5px',
            fontSize: '8px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {badgeContent}
          </div>
        )}
      </Button>
    </div>
  );
}

export default VipButton;