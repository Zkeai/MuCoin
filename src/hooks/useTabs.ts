// hooks/useTabs.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, removeTab, changeActiveTab } from "../redux/states/headerSlice";
import useIsClient from './useIsClient'

const useTabs = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const tabsData = useSelector(state => state.header.tabsData);
  const activeTab = useSelector(state => state.header.activeTab);
  const isClient = useIsClient();

  useEffect(() => {
    if (isClient) {
      const currentPath = router.pathname;
      const initialTab = tabsData.find((item) => item.path === currentPath);

      if (initialTab) {
        dispatch(changeActiveTab(initialTab.title));
      }
    }
  }, [router.pathname, tabsData, isClient, dispatch]);

  const handleItemClick = (item) => {
    dispatch(changeActiveTab(item.title));
    router.push(item.path);
  };

  const handleItemClose = (item, index) => {
    dispatch(removeTab(item.path));
    if (activeTab === item.title) {
      const newTabs = tabsData.filter(tab => tab.path !== item.path);
      const newIndex = Math.max(index - 1, 0);
      const newItem = newTabs[newIndex];
      dispatch(changeActiveTab(newItem.title));
      router.push(newItem.path);
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
