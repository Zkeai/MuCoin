"use client";

import React from 'react';
import { Nav } from '@douyinfe/semi-ui';
import { IconSemiLogo } from '@douyinfe/semi-icons';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector} from 'react-redux';
import { addTab, changeActiveTab } from "../redux/states/headerSlice";
import jsonData from '/src/config/nav.json';
import Icon from '../components/Nav-Icon';

const NavNode = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const activeTab = useSelector(state => state.header.activeTab);

    const handleSelect = (data) => {
        const selectedItem = data.selectedItems[0];
        let path = "";

        if (selectedItem.text === "首页") {
            path = "/";
        } else {
            // 构建新的路径
            if (pathname.startsWith("/dashboard")) {
                // 如果当前路径已经包含 "dashboard"，替换其后续部分
                const basePath = "/dashboard";
                const newPath = data.itemKey.startsWith("dashboard/") ? data.itemKey.replace("dashboard/", "") : data.itemKey;
                path = `${basePath}/${newPath}`;
            } else {
                // 如果当前路径不包含 "dashboard"，添加 "dashboard" 前缀
                path = `dashboard/${data.itemKey}`;
            }

            dispatch(addTab({ path, title: selectedItem.text }));
        }

        dispatch(changeActiveTab(selectedItem.text));
        router.push(path);
    };

    return (
        <Nav 
        mode = "vertical"
        onSelect={handleSelect}
        selectedKeys={[activeTab]}
        >
            <Nav.Header logo={<IconSemiLogo style={{ height: '30px', fontSize: 30 }} />} text="Mucoin" />
            {jsonData.map(item => (
                item.items ? (
                    <Nav.Sub key={item.itemKey} itemKey={item.itemKey} text={item.text} icon={<Icon type={item.icon} />}>
                        {item.items.map(subItem => (
                            <Nav.Item key={subItem.itemKey} itemKey={subItem.itemKey} text={subItem.text} icon={<Icon type={subItem.icon} />} />
                        ))}
                    </Nav.Sub>
                ) : (
                    <Nav.Item key={item.itemKey} itemKey={item.itemKey} text={item.text} icon={<Icon type={item.icon} />} />
                )
            ))}
            <Nav.Footer collapseButton={true} />
        </Nav>
    );
};

export default NavNode;
