"use client";

import React from 'react';
import { Button } from '@douyinfe/semi-ui';

const VipButton = ({ text, buttonColor, badgeContent, showBadge }) => {
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
