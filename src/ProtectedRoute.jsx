import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./helpers/authContext";
import { Spinner } from "reactstrap";

function ProtectedRoute() {
  const { isLogin, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  // Proceed to the protected component
  return <Outlet />;
}

export default ProtectedRoute;
