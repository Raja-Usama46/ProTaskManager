import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const blockedUsersSlice = createSlice({
  name: "blockedUsers",
  initialState,
  reducers: {
    toggleUserBlock: (state, action) => {
      const userId = action.payload;
      if (state.includes(userId)) {
        return state.filter((id) => id !== userId);
      } else {
        state.push(userId);
      }
    },
  },
});

export const { toggleUserBlock } = blockedUsersSlice.actions;
export default blockedUsersSlice.reducer;
