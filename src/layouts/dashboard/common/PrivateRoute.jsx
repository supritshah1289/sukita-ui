import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "src/hooks/AuthProvider";

const PrivateRoute = () => {
    console.log("Private route======")
  const user = useAuth();
  console.log("Private route====== auth" + JSON.stringify(user.authenticated) )


  if (!user.authenticated) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;