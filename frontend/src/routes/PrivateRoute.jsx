import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) 
    return <p 
        className="text-center mt-10">
        <span className="loading loading-infinity loading-xl text-warning"></span> 
         Cargando...
        </p>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;