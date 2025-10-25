import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("PrivateRoute: setting up auth listener");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase user:", currentUser);
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("Redirecting to /admin/login");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;
