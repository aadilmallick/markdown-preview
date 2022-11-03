import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  font: "normal",
};

const fontslice = createSlice({
  name: "font",
  initialState: initialState,
  reducers: {
    changeFont: (state, action) => {
      const font = action.payload;
      state.font = font;
    },
  },
});

export const fontReducer = fontslice.reducer;
export const { changeFont } = fontslice.actions;
