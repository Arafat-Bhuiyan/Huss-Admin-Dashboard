import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Auth/Login";

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
        element: <h1 className="text-3xl font-bold">Orders Page</h1>,
      },
      {
        path: "/products",
        element: <h1 className="text-3xl font-bold">Products Page</h1>,
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
