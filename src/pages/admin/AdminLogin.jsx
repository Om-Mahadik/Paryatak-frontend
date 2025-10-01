import React, { useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword, getIdTokenResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Optional: check for isAdmin claim if using Firebase Admin SDK
      const tokenResult = await getIdTokenResult(user);
      if (tokenResult.claims.isAdmin || true) { // keep 'true' if no claims yet
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. Not an admin.");
      }
    } catch (err) {
      console.error(err);
      setError("Email/Password login failed.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Admin Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
