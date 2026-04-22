import { Navigate } from "react-router-dom";

function Laptop() {
  return <Navigate to="/product?category=Laptop" replace />;
}

export default Laptop;
