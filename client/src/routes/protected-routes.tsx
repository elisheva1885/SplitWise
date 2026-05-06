import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../store/use-user.context";

const ProtectedRoutes = () => {
    const {user} = useUserContext()
	// TODO: Use authentication token

	return user ? <Outlet /> : <Navigate to="/"  replace />;
};

export default ProtectedRoutes;