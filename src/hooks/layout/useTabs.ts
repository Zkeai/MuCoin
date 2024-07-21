import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // 确保你有定义 RootState 类型
import { addTab, removeTab, changeActiveTab } from '@/redux/states/headerSlice';
import useIsClient from './useIsClient';

// 定义 Tabs 数据项的类型
interface TabItem {
  path: string;
  title: string;
}

const useTabs = () => {
  const router = useRouter();
  const pathname = usePathname(); // 获取当前路径
  const dispatch = useDispatch();

  // 从 Redux store 中获取状态
  const tabsData = useSelector((state: RootState) => state.header.tabsData) as TabItem[];
  const activeTab = useSelector((state: RootState) => state.header.activeTab) as string;
  const isClient = useIsClient();

  useEffect(() => {
    if (isClient) {
      const currentPath = pathname; // 使用 pathname
      const initialTab = tabsData.find((item) => item.path === currentPath);

      if (initialTab) {
        dispatch(changeActiveTab(initialTab.title));
      }
    }
  }, [pathname, tabsData, isClient, dispatch]);

  const handleItemClick = (item: TabItem) => {
    dispatch(changeActiveTab(item.title));
    router.push(item.path);
  };

  const handleItemClose = (item: TabItem, index: number) => {
    dispatch(removeTab(item.path));
    if (activeTab === item.title) {
      const newTabs = tabsData.filter(tab => tab.path !== item.path);
      const newIndex = Math.max(index - 1, 0);
      const newItem = newTabs[newIndex];
      if (newItem) {
        dispatch(changeActiveTab(newItem.title));
        router.push(newItem.path);
      }
    }
  };

  return {
    tabsData,
    activeTab,
    handleItemClick,
    handleItemClose,
    isClient
  };
};

export default useTabs;