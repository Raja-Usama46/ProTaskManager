import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    users: userReducer,
  },
});

export default store;
