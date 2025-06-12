import { createSlice } from '@reduxjs/toolkit';

const initialState = 'light'; // default theme
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return state === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      return action.payload;
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;