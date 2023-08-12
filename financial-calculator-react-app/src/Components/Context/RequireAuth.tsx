import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  var tokenExist = sessionStorage.getItem("JWT");
  return tokenExist ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
