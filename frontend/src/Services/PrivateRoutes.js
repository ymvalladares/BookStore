import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ conponent: component, ...rest }) => {
  const token = localStorage.getItem("TOKEN_KEY");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
