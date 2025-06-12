import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: { name: "User", email: "raja@gmail.com" },
  isAuthenticated: true,
  blockedUsers: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    toggleBlockUser: (state, action) => {
      if (state.blockedUsers.includes(action.payload)) {
        state.blockedUsers = state.blockedUsers.filter(
          (id) => id !== action.payload
        );
      } else {
        state.blockedUsers.push(action.payload);
      }
    },
  },
});

export const { login, logout, toggleBlockUser } = authSlice.actions;
export default authSlice.reducer;
