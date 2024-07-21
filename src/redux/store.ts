import { configureStore } from "@reduxjs/toolkit";
import headerReducer from './states/headerSlice';
const store =  configureStore({
  reducer: {
    header: headerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;