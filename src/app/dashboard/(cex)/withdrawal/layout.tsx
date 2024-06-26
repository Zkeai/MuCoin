'use client';
import React from 'react';
import Link from "next/link";
import { Button } from '@douyinfe/semi-ui';
import Icon from '/src/components/custom/Icon';
import { useRouter,usePathname } from 'next/navigation';
import CexWithDrawal from '/src/components/cex/CexWithDrawal';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({children}:LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
    // 获取路径中的交易所名称部分
    const getExchangeName = () => {
      const parts = pathname.split('/');
      const exchange = `${parts[parts.length - 1]} 交易所` || '交易所'
      return exchange.charAt(0).toUpperCase() + exchange.slice(1);
    };
    const exchangeName = getExchangeName();
   

  return (
    <div className="flex flex-col justify-center items-center space-y-12 bg-[#f4f7fa] min-h-screen">
      <div className="space-y-5 flex flex-col items-center mt-10">
        <span className="text-2xl font-[500]">{exchangeName}批量提币</span>
        <div className="flex text-sm">
          <Icon type="icon-shuoming" size={18}></Icon>
          <Link className="underline text-amber-500 ml-1" href={`/dashboard/doc`}>使用教程</Link>
        </div>
      </div>
      <div className="flex flex-col  items-center w-[40vw]  shadow-2xl bg-[#ffffff] rounded-lg p-5">
        <div className="text-[#8895a7] space-y-2 w-full">
          <span className="text-md font-[500]">MuCoin</span>
          <ul className="text-[12px] space-y-1 list-disc ml-4">
            <li>安全免责声明</li>
            <li>功能需获取您的交易所 API Key 和 Secret Key。在使用完此功能后，请及时删除相关信息。</li>
            <li>请放心，API Key 仅在服务器与交易所进行通信时使用，MuCoin 不会收集您的任何信息。</li>
            <li>如在使用过程中出现资产被盗，MuCoin 不承担任何相关责任。</li>
          </ul>
        </div>
        <div className="mt-8">
          <CexWithDrawal />
        </div>
        <div className="mt-8">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;
