"use client";

import React from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconSemiLogo } from '@douyinfe/semi-icons';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, changeActiveTab } from "@/redux/states/headerSlice";
import jsonData from '@/config/nav.json';
import Icon from '@/components/layout/header/Nav-Icon';
import { RootState } from '@/redux/store';

// Define JSON data type
interface NavItem {
  itemKey: string;
  text: string;
  icon: string;
  items?: NavItem[];
}

// Define NavSelectData type based on the structure of the onSelect data
interface NavSelectData {
  selectedItems: { text: string }[];
  itemKey: string;
}

// Assuming jsonData is in the format of NavItem[]
const navData: NavItem[] = jsonData;

const NavNode: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = useSelector((state: RootState) => state.header.activeTab);

  const handleSelect = (data: any) => { // Temporarily use `any` to check
    const selectedItem = data.selectedItems[0];
    if (!selectedItem || typeof selectedItem.text !== 'string') {
      return;
    }
    
    let path = "";

    if (selectedItem.text === "首页") {
      path = "/";
    } else {
      // Construct new path
      if (pathname.startsWith("/dashboard")) {
        // If current path includes "dashboard", replace the rest part
        const basePath = "/dashboard";
        const newPath = data.itemKey.startsWith("dashboard/") ? data.itemKey.replace("dashboard/", "") : data.itemKey;
        path = `${basePath}/${newPath}`;
      } else {
        // If current path does not include "dashboard", add "dashboard" prefix
        path = `dashboard/${data.itemKey}`;
      }

      dispatch(addTab({ path, title: selectedItem.text }));
    }

    dispatch(changeActiveTab(selectedItem.text));
    router.push(path);
  };

  return (
    <Nav mode="vertical" onSelect={handleSelect} selectedKeys={[activeTab]}>
      <Nav.Header logo={<IconSemiLogo style={{ height: '30px', fontSize: 30 }} />} text="Mucoin" />
      {navData.map(item => (
        item.items ? (
          <Nav.Sub 
            key={item.itemKey} 
            itemKey={item.itemKey} 
            text={item.text} 
            icon={<Icon type={item.icon} className="nav-icon" />} // Provide className here
          >
            {item.items.map(subItem => (
              <Nav.Item
                style={{ paddingLeft: '40px' }}
                key={subItem.itemKey}
                itemKey={subItem.itemKey}
                text={subItem.text}
                icon={<Icon type={subItem.icon} className="nav-icon" />} // Provide className here
              />
            ))}
          </Nav.Sub>
        ) : (
          <Nav.Item 
            key={item.itemKey} 
            itemKey={item.itemKey} 
            text={item.text} 
            icon={<Icon type={item.icon} className="nav-icon" />} // Provide className here
          />
        )
      ))}
      <Nav.Footer collapseButton={true} />
    </Nav>
  );
};

export default NavNode;