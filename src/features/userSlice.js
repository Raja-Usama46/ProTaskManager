import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: { blockedUsers: [] },
  reducers: {
    toggleBlock: (state, action) => {
      const id = action.payload;
      if (state.blockedUsers.includes(id)) {
        state.blockedUsers = state.blockedUsers.filter((uid) => uid !== id);
      } else {
        state.blockedUsers.push(id);
      }
    },
  },
});

export const { toggleBlock } = userSlice.actions;
export default userSlice.reducer;
