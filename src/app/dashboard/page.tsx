"use client";
import React from 'react';
import { Space, Button } from '@douyinfe/semi-ui';
import Image from 'next/image'; // 使用 Next.js 的 Image 组件

const Page = () => {

  const handleButtonClick = () => {
    window.open("https://github.com/Zkeai", "_blank"); // 打开一个新的标签页
  };

  return (
    <div className="h-[80vh] flex flex-col p-28">
      <title>首页</title>
      <div className="flex">
        <div className="flex flex-col max-w-2xl">
          <div className="text-[24px] leading-[38px] lg:text-[40px] lg:leading-[54px] font-semibold font_l">
            MuCoin｜让每一次交互都值得信赖
          </div>
          <div className="text-[18px] lg:text-[24px] lg:leading-10 leading-7 text_desc font-semibold my-[24px] mb-[35px] font_l">
            信赖木鱼社区，使用WEB3链上工具解锁无限可能！我们将复杂的区块链技术简化，为您集成一系列WEB3工具，提供完整脚本支持。
          </div>
          <div >
            <Space spacing={40}>
            <Button size="large" theme='solid' type='warning' style={{ marginRight: 8 }}>开始使用</Button>
            <Button size="large"  onClick={handleButtonClick}>木鱼代码库</Button>
            </Space>
          </div>
        </div>
        <div className="mt-[-100px] ml-28">
          <Image src="/svg/Crypto.svg" alt="Crypto" width={500} height={500} />
        </div>
      </div>
      <div>

      </div>
    </div>
  );
};

export default Page;