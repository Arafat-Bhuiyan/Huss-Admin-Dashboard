import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Auth/Login";
import OrdersTable from "../pages/Orders/Orders";
import OrdersPage from "../pages/Orders/Orders";
import { Promotions } from "../pages/Promotions/Promotions";

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
        element: <h1 className="text-3xl font-bold">Products Page</h1>,
      },
      {
        path: "/promotions",
        element: <Promotions />,
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
