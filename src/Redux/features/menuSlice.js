import { createSlice } from "@reduxjs/toolkit";

const initialMenu = [
  { name: "Dashboard", path: "/", roles: ["admin", "superAdmin"] },
  { name: "Users", path: "/users", roles: ["admin", "superAdmin"] },
  { name: "Orders", path: "/orders", roles: ["admin", "superAdmin"] },
  { name: "Tracking", path: "/tracking", roles: ["admin", "superAdmin"] },
  { name: "Products", path: "/products", roles: ["superAdmin"] },
  { name: "Wishlist", path: "/wishlist", roles: ["superAdmin"] },
  { name: "Promotions", path: "/promotions", roles: ["superAdmin"] },
  { name: "Settings", path: "/settings", roles: ["admin", "superAdmin"] },
];

const initialState = {
  menu: initialMenu,
  filteredMenu: [],
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setFilteredMenu: (state, action) => {
      const user = action.payload;
      state.filteredMenu = state.menu.filter(
        (item) => user && item.roles.includes(user.role)
      );
    },
  },
});

export const { setFilteredMenu } = menuSlice.actions;
export default menuSlice.reducer;
