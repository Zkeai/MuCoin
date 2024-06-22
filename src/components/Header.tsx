'use client';

import React from 'react'
import {useRouter} from 'next/navigation'
import {useState} from "react"

import Icon from '../components/Icon';
import Style from './components.module.css'
import { Popover } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';


interface MenuItem {
  name: string;
  path?: string;
  click?: boolean;
  icon?: string;
  item: MenuItem[];
}

interface HeaderProps {
  T: string;
  item: MenuItem[];
}
  
  const renderSubMenu = (items) => {
    return (

       <ul className="flex space-x-10 min-w-[200px] w-auto  py-8 px-8 ">
        <div className="flex space-x-10 min-w-[200px] w-auto  justify-center">
        {items.map((subItem, index) => (
         
            <li key={index} className="mr-4 min-w-[100px]  ">
     
                <div className="flex items-center space-x-2  text-black cursor-default pl-4 font-semibold">
                  <Icon type={subItem.icon} size={20} color="blue"/>
                  <span>{subItem.name}</span>
                </div>
                <Divider className="pt-3" />
                {
                subItem.item && subItem.item.length > 0 && (
                  <div className="mt-8 flex flex-col space-y-6 items-center justify-center">
                    {subItem.item.map((item, index) => (
                      <a key={index} className="hover:text-amber-500 " href={item.path || '#'}>
                      <span >{item.name}</span>
                      </a>
                    ))}
                  </div>)
              }
  

     
  
            </li>
        ))}
        </div>
        </ul>

    );
  };


const Header: React.FC<HeaderProps> = (menuData) => {
  const router = useRouter();
  const [menu, setMenu] = useState(menuData.menuData.item[0].item);
  const { address, isConnected } = useAccount();
  const titleClickHandle = ()=>{
    router.push("/")
  }


  return (
    <div className={`fixed top-0 left-0 right-0 flex items-center shadow-md font-bold h-16 p-4 z-100 backdrop-blur`}>
        <div className={`flex flex-none w-40 space-x-10 justify-center text-center`}>
            <Icon className={Style.headLeftIcon}  type="icon-gedian" size={28}  />
            <div className={Style.title} onClick={titleClickHandle}>
            <span className={Style.text}>MuCoin</span>
              <Icon className={Style.zhuye}  type="icon-zhuye" size={28}  />
            </div>
        </div>
        <div className={`flex-grow flex justify-center`}>
          <nav>
            <ul className="flex space-x-8 ">
            {menu.map((menuItem, index) => (
            <li key={index} className="relative group">
              <Popover
              spacing={15}
              content={renderSubMenu(menuItem.item)}
              >
              <button className="flex items-center px-2 py-1 rounded-lg text-lg  hover:bg-amber-500 hover:text-white ">
                {menuItem.icon && <span className={`iconfont ${menuItem.icon} mr-2`}></span>}
                {menuItem.name}
              </button>
              </Popover>

 
            </li>
          ))}
            </ul>
          </nav>
        </div>
        <div className="relative w-1/4 space-x-30 flex-none flex pb-10" >
          <div className="absolute right-0 ">
          <ConnectButton />
          </div>
          
        </div>
    </div>
  )
}

export default Header