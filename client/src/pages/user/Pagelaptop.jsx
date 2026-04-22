import { Navigate } from "react-router-dom";

function Laptop() {
  return <Navigate to="/product?category=Laptop" replace />;
  return <Navigate to="/product" replace />;
}

export default Laptop;
