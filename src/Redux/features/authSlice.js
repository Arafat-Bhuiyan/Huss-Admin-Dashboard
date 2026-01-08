import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  const userJson = localStorage.getItem("user");
  // If the item doesn't exist or is the string "undefined", return null.
  if (!userJson || userJson === "undefined") {
    return null;
  }
  try {
    // Otherwise, try to parse it.
    return JSON.parse(userJson);
  } catch (e) {
    // If parsing fails, return null.
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  access: localStorage.getItem("access"),
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload.user.role)
      state.user = action.payload.user;
      state.access = action.payload.access;
      state.role = action.payload.user.role;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("access", action.payload.access);
    },
    logout: (state) => {
      state.user = null;
      state.access = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;