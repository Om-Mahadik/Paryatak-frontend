import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/config";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // You can render a spinner or blank page while checking auth
    return <div>Loading...</div>;
  }

  if (!user) {
    // Not logged in → redirect to login page
    return <Navigate to="/admin" replace />;
  }

  // Logged in → render child component
  return children;
};

export default PrivateRoute;
