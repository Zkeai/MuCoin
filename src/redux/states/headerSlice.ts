import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 Tab 类型
interface Tab {
  path: string;
  title: string;
}

// 定义 HeaderState 类型
interface HeaderState {
  tabsData: Tab[];
  activeTab: string;
}

// 初始状态
const initialState: HeaderState = {
  tabsData: [{ path: '/dashboard', title: '首页' }],
  activeTab: "首页",
};

// 创建切片
export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    // 添加标签
    addTab: (state, action: PayloadAction<Tab>) => {
      if (!state.tabsData.some(tab => tab.path === action.payload.path)) {
        state.tabsData.push(action.payload);
      }
    },
    // 删除标签
    removeTab: (state, action: PayloadAction<string>) => {
      state.tabsData = state.tabsData.filter(tab => tab.path !== action.payload);
    },
    // 改变活跃的标签
    changeActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

// 导出 actions
export const { addTab, removeTab, changeActiveTab } = headerSlice.actions;

// 导出 reducer
export default headerSlice.reducer;