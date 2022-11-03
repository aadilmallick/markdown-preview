import { configureStore } from "@reduxjs/toolkit";
import { fontReducer } from "./features/font/fontSlice";

export const store = configureStore({
  reducer: {
    font: fontReducer,
  },
});
