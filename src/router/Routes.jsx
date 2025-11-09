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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/promotions",
        element: <Promotions />,
      },
      {
        path: "/settings",
        element: <TermsAndPolicies />,
      },
      {
        path: "/profile",
        element: <AdminProfileSettings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
