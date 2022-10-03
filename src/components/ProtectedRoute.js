import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const ProtectedRoute = () => {
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.user);

  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
