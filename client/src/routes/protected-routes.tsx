import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../store/use-user.context";

const ProtectedRoutes = () => {
  const { user } = useUserContext();
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
