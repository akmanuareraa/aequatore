// PrivateRouteGuard.js
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./services/firebase.config"; // Your Firebase authentication provider

const PrivateRouteGuard = ({ children }) => {

  if (auth.currentUser) {
    return children;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default PrivateRouteGuard;
