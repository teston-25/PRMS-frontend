import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    signup(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { login, signup, logout, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
