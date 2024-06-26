'use client';

import React from 'react';
import Style from '/src/components/components.module.css';
import Icon from '/src/components/custom/Icon';
import useTabs from '/src/hooks/layout/useTabs';

const Tabs = () => {
  const { tabsData, activeTab, handleItemClick, handleItemClose, isClient } = useTabs();

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center">
      <ul className="flex space-x-1">
        {tabsData.map((item, index) => (
          <li
            key={item.path}
            className={`${Style.tabBt} ${activeTab === item.title ? Style.active : Style.noactive}`}
            onClick={() => handleItemClick(item)}
          >
            <div className={`${activeTab === item.title ? Style.circle : ''}`} />
            {item.title}
            {item.title !== '首页' && (
              <Icon
                className={Style.tab}
                type="icon-guanbi"
                size={7}
                onClick={(e) => {
                  e.stopPropagation(); // 防止触发 handleItemClick
                  handleItemClose(item, index);
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
