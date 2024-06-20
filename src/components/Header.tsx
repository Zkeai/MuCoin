'use client';

import React from 'react'
import {useState} from "react"
import Icon from '../components/Icon';
import { Popover } from '@douyinfe/semi-ui';

  const menuData = {
    "T": "模块",
    "item": [
      {
        "name": "head",
        "item": [
          {
            "name": "监控",
            "item": [
              {
                "name": "交易所",
                "icon": "icon-jiaoyisuo",
                "item": [
                  {
                    "name": "币安",
                    "path": "/monitor/binance",
                    "click": true,
                    "item": []
                  },
                  {
                    "name": "欧易",
                    "path": "/monitor/okx",
                    "click": true,
                    "item": []
                  }
                ]
              },
              {
                "name": "链上",
                "icon": "icon-lianshangzichan",
                "item": [
                  {
                    "name": "Evm链",
                    "path": "/dex/evm",
                    "click": true,
                    "item": []
                  },
                  {
                    "name": "Solana",
                    "path": "/dex/sol",
                    "click": false,
                    "item": []
                  }
                ]
              },
              {
                "name": "其他",
                "icon": "icon-qita",
                "item": [
                  {
                    "name": "discord",
                    "path": "/monitor/discord",
                    "click": true,
                    "item": []
                  }
                ]
              }
            ]
          },
          {
            "name": "工具",
            "item": [
              {
                "name": "钱包",
                "icon": "icon-qianbao2",
                "item": [
                  {
                    "name": "批量创建钱包",
                    "path": "/wallet/create",
                    "click": true,
                    "item": []
                  },
                  {
                    "name": "创建靓号钱包",
                    "path": "/wallet/beauty",
                    "click": true,
                    "item": []
                  },
                  {
                    "name": "钱包授权",
                    "path": "/wallet/authorization",
                    "click": true,
                    "item": []
                  }
                ]
              }
            ]
          },
          {
            "name": "空投",
            "item": [
              {
                "name": "空投查询",
                "icon": "icon-kongtou",
                "item": []
              }
            ]
          }
        ]
      }
    ]
  };
  const renderSubMenu = (items) => {
    return (
      <ul className="flex space-x-10 min-w-[150px] w-auto m-4 p-4  justify-center ">
        {items.map((subItem, index) => (
          <li key={index} className="mr-4">
            <div className="flex items-center text-black">
              <Icon type={subItem.icon} size={20} color="blue"/>
              {subItem.name}
            </div>
          {subItem.item && subItem.item.length > 0 && (
            <div className="mt-8 flex flex-col space-y-6 items-center">
              {subItem.item.map((item, index) => (
                <a className="hover:text-cyan-400 " href={item.path || '#'}>
                <span key={index}>{item.name}</span>
                </a>
              ))}
            </div>
          )}
          </li>
        ))}
      </ul>
    );
  };

const Header = () => {

  const [menu, setMenu] = useState(menuData.item[0].item);
  return (
    <div className={`fixed top-0 left-0 right-0 flex items-center shadow-md h-16 p-4`}>
        <div className="flex-none w-40">
          01
        </div>
        <div className="flex-grow flex justify-center  ">
          <nav>
            <ul className="flex space-x-8">
            {menu.map((menuItem, index) => (
            <li key={index} className="relative group">
              <Popover
              content={renderSubMenu(menuItem.item)}
              >
              <button className="flex items-center">
                {menuItem.icon && <span className={`iconfont ${menuItem.icon} mr-2`}></span>}
                {menuItem.name}
              </button>
              </Popover>

 
            </li>
          ))}
            </ul>
          </nav>
        </div>
        <div className="flex-none w-40">
          03
        </div>
    </div>
  )
}

export default Header