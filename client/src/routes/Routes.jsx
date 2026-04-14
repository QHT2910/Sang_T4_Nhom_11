import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/user/Home.jsx";
import Login from "../pages/user/Login.jsx";
import Register from "../pages/user/Register.jsx";
import UserInfo from "../pages/user/UserInfo.jsx";
import AdminUsers from "../pages/admin/AdminUsers.jsx";
import About from "../pages/about.jsx";
import Contact from "../pages/Contact.jsx";
import NotFound from "../pages/NotFound.jsx";
import Default from "../layout/Default.jsx";
import Admindefault from "../layout/Admindefault.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";
import AdminProduct from "../pages/admin/AdminProducts.jsx";
import Product from "../pages/user/Product.jsx";
import ProductDetail from "../pages/user/ProductDetail.jsx";
import Laptop from "../pages/user/Pagelaptop.jsx";
import Pc from "../pages/user/Pagepc.jsx";
import Cart from "../pages/user/Cart.jsx";
import Tracking from "../pages/user/Tracking.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/user", element: <UserInfo /> },

      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/product", element: <Product /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/product/laptop", element: <Laptop /> },
      { path: "/product/pc", element: <Pc /> },
      {path: "/Cart", element: <Cart />},
      {path: "/Tracking ", element: <Tracking />},
    ],
  },
  {
    path: "/admin",

    element: <Admindefault />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <AdminUsers /> },
      { path: "products", element: <AdminProduct /> },
    ],
  },
]);
