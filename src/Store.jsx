import { configureStore } from "@reduxjs/toolkit";
import reducerAuth from "./features/auth/authSplic";

const store = configureStore({
  reducer: {
    Auth: reducerAuth,
  },
});

export default store;
