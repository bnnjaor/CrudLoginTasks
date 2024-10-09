import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, isAuthenticated,loading} = useAuth();

  if(loading) return <h1>Loagind...</h1>

  if (!loading && !isAuthenticated) return <Navigate to={"/login"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
