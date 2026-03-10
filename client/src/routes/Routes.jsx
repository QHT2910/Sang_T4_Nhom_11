import { createBrowserRouter } from 'react-router-dom';
import Home from "../pages/user/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Default from "../layout/Default.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
]);