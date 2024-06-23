import { configureStore } from "@reduxjs/toolkit";
import headerReducer from './states/headerSlice';
export default configureStore({
  reducer: {
    header: headerReducer,
  },
});