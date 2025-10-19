import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Auth/Login";
import OrdersPage from "../pages/Orders/Orders";
import Products from "../pages/Products/Products";

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
        path: "/orders",
        element: <OrdersPage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/promotions",
        element: <h1 className="text-3xl font-bold">Promotions Page</h1>,
      },
      {
        path: "/settings",
        element: <h1 className="text-3xl font-bold">Settings Page</h1>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
