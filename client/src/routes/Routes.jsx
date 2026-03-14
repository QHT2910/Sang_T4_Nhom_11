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
      { path: "/admin", element: <AdminUsers /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
