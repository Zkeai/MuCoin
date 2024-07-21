'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Style from '@/components/components.module.css';
import Icon from '@/components/custom/Icon';
import items from '@/config/cex.json';

const CexWithDrawal = () => {
  const router = useRouter();
  const pathname = usePathname();

  // 为 data 参数指定类型
  const dumpHandle = (data: string) => {
    let path = "";
    if (pathname.startsWith("/dashboard")) {
      const basePath = "/dashboard";
      const newPath = data.startsWith("dashboard/") ? data.replace("dashboard/", "") : data;
      path = `${basePath}/${newPath}`;
    } else {
      path = `dashboard/${data}`;
    }
    router.push(path);
  };

  return (
    <ul className="flex space-x-6 text-[14px]">
      {items.map(cex => (
        <li
          key={cex.name}
          className={`${Style.cex} ${pathname.includes(cex.path) ? Style.active : ''}`}
        >
          <div
            className="w-16 h-16 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => dumpHandle(cex.path)}
          >
            <Icon type={cex.icon} size={36} />
            <span>{cex.name}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CexWithDrawal;