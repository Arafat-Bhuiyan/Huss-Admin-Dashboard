import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Auth/Login";
import OrdersPage from "../pages/Orders/Orders";

import { Promotions } from "../pages/Promotions/Promotions";

import Products from "../pages/Products/Products";
import TermsAndPolicies from "../pages/Settings/TermsAndPolicies";
import AdminProfileSettings from "../pages/Profile/AdminProfileSettings";
import { Users } from "../pages/User/Users";
import { Wishlist } from "../pages/Wishlist/Wishlist";
import RequireRole from "./RequireRole";
import { Tracking } from "../pages/Tracking/Tracking";
import WishlistUserListTable from "../pages/Wishlist/WishlistUserListTable";
import { Category } from "../pages/Category/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      /* ================= ADMIN + SUPER ADMIN (COMMON) ================= */
      {
        element: <RequireRole allowedRoles={["Admin", "Super Admin"]} />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "users", element: <Users /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "tracking", element: <Tracking /> },
          { path: "settings", element: <TermsAndPolicies /> },
          { path: "profile", element: <AdminProfileSettings /> },
        ],
      },

      /* ================= SUPER ADMIN ONLY ================= */
      {
        element: <RequireRole allowedRoles={["Super Admin"]} />,
        children: [
          { path: "category", element: <Category /> },
          { path: "products", element: <Products /> },
          { path: "wishlist", element: <Wishlist /> },
          {
            path: "wishlistUserListTable/:orderId",
            element: <WishlistUserListTable />,
          },
          { path: "promotions", element: <Promotions /> },
        ],
      },
    ],
  },

  /* ================= PUBLIC ================= */
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
