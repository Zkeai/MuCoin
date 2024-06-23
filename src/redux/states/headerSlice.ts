import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
    name:"header",
    initialState: {
        tabsData: [
            { path: '/dashboard', title: '首页' }
        ],
        activeTab:"首页"
      },
    reducers: {
        // 添加标签
        addTab: (state, action) => {
            if (!state.tabsData.some(tab => tab.path === action.payload.path)) {
                state.tabsData.push(action.payload);
            }
        },
        // 删除标签
        removeTab: (state, action) => {
            state.tabsData = state.tabsData.filter(tab => tab.path !== action.payload);
        },
        //改变活跃的标签
        changeActiveTab:( state, action)=>{state.activeTab = action.payload},
    }
})

export const { addTab, removeTab, changeActiveTab} = headerSlice.actions;

export default headerSlice.reducer;