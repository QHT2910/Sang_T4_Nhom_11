import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  
   const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); 

   if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

   
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
 
  return children;
};

export default ProtectedRoute;