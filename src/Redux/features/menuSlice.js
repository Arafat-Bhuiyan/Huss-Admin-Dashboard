import { createSlice } from "@reduxjs/toolkit";

const initialMenu = [
  { name: "Dashboard", path: "/", roles: ["Admin", "Super Admin"] },
  { name: "Users", path: "/users", roles: ["Admin", "Super Admin"] },
  { name: "Return Request", path: "/return-request", roles: ["Admin", "Super Admin"] },
  { name: "Orders", path: "/orders", roles: ["Admin", "Super Admin"] },
  { name: "Tracking", path: "/tracking", roles: ["Admin", "Super Admin"] },
  { name: "Products", path: "/products", roles: ["Super Admin"] },
  { name: "Categories", path: "/category", roles: ["Super Admin"] },
  { name: "Wishlist", path: "/wishlist", roles: ["Super Admin"] },
  { name: "Promotions", path: "/promotions", roles: ["Super Admin"] },
  { name: "Settings", path: "/settings", roles: ["Admin", "Super Admin"] },
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
        (item) => user && item.roles.includes(user.role),
      );
    },
  },
});

export const { setFilteredMenu } = menuSlice.actions;
export default menuSlice.reducer;
