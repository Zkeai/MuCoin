"use client";
import React from 'react';
import "./index.css"
import Nav from '/src/components/Nav'
import Tab from '/src/components/Tabs'
import { BackTop } from '@douyinfe/semi-ui';

import { Provider } from 'react-redux'
import store from "/src/redux/store.ts"

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
