'use client';

import React from 'react';
import Style from '@/components/components.module.css';
import Icon from '@/components/custom/Icon';
import useTabs from '@/hooks/layout/useTabs';

// 定义每个 tab 的数据结构类型
interface TabsDataItem {
  path: string;
  title: string;
}

// 定义 useTabs hook 返回的数据类型
interface UseTabsReturn {
  tabsData: TabsDataItem[];
  activeTab: string;
  handleItemClick: (item: TabsDataItem) => void;
  handleItemClose: (item: TabsDataItem, index: number) => void;
  isClient: boolean;
}

const Tabs: React.FC = () => {
  const { tabsData, activeTab, handleItemClick, handleItemClose, isClient } = useTabs() as UseTabsReturn;

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center">
      <ul className="flex space-x-1 h-6 ml-5 leading-4 text-sm">
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
                onClick={(e: React.MouseEvent<SVGSVGElement>) => {
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