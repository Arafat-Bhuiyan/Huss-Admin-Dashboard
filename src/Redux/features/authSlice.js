import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    roll: null,
  },
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  isAuthenticated: !!localStorage.getItem("access"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh, user } = action.payload;

      // Update Redux state
      state.access = access;
      state.refresh = refresh;
      state.user = user;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.access = null;
      state.refresh = null;
      state.user = { id: null, name: null, email: null, roll: null };

      // Clear from localStorage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
