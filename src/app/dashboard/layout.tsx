"use client";
import React,{ReactNode} from 'react';
import "./index.css"
import Nav from '@/components/layout/main/Nav'
import Tab from '@/components/layout/header/Tabs'
import { BackTop } from '@douyinfe/semi-ui';

import { Provider } from 'react-redux'
import store from "@/redux/store"

type DashboardLayoutProps = {
    children: ReactNode;
  };

const Page = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="mt-16 flex h-[85vh]">
      <Provider store={store}>
        <Nav></Nav>
        <div className="flex-1 flex flex-col">
          <div className=" flex items-center h-8 w-full shadow-sm"><Tab></Tab></div>
          <div className=" body flex-1 overflow-y-auto ">
            <div className=" flex flex-col space-y-8  ">
                {children}
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
}

export default Page;
