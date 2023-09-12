import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: true,
};
export const darkModeSlice = createSlice({
  initialState,
  name: 'mode',
  reducers: {
    changeMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { changeMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
