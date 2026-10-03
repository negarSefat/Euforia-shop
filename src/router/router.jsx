import { createBrowserRouter } from "react-router-dom";
import AboutUs from "../features/about-us/About";
import Cart from "../features/cart/Cart";
import NotFound from "../features/not-found/NotFound";
import Layout from "../assets/component/Layout";
import Products from "../features/products/Products";
import SingleProduct from "../features/single-product/SingleProduct";
import ProtectedRoute from "./protected-route";
import AdminPanel from "../features/admin-panel/adminPanel";
import Homepage from "../features/homepage/HomePage";
import Login from "../features/login/Login";

const isAuthenticated = true;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />, //will be Home page
      },

      {
        path: "products",
        element: <Products />,
      },
      { path: "/products/:id", element: <SingleProduct /> },
      { path: "aboutUs", element: <AboutUs /> },
      { path: "cart", element: <Cart /> },

      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "login", element: <Login /> },
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
    children: [{ path: "admin", element: <AdminPanel /> }],
  },
]);

export default router;
