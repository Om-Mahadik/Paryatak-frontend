import React, { useState } from "react";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword, getIdTokenResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import LogoIcon from "../../imgs/logo-icon.jpg";
import LockIcon from "../../imgs/icons/lock.svg";
import SupportIcon from "../../imgs/icons/support.svg";
import SendIcon from "../../imgs/icons/send.svg"; // Send icon for submit

const WHATSAPP_NUMBER = "917841805093"; // your WhatsApp number

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSupport, setShowSupport] = useState(false);
  const [customIssue, setCustomIssue] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const tokenResult = await getIdTokenResult(user);
      if (tokenResult.claims.isAdmin || true) {
        navigate("/admin/dashboard");
      } else {
        setError("Access denied. Not an admin.");
      }
    } catch (err) {
      console.error(err);
      setError("Incorrect email or password.");
    }
  };

  const predefinedIssues = [
    "Unable to login",
    "Forgot password",
    "Dashboard not loading",
    "Other technical issue"
  ];

  const sendWhatsAppMessage = (message) => {
    if (!message.trim()) return;
    const draft = `Hello Paryatak Team, I am facing the following issue: "${message}"`;
    const encodedMessage = encodeURIComponent(draft);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, "_blank");
    setCustomIssue("");
    setShowSupport(false);
  };

  const handleIssueClick = (issue) => {
    setCustomIssue(issue); // insert into input instead of sending immediately
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        {/* Logo Circle */}
        <div className="logoo-container">
          <img src={LogoIcon} alt="Logo" />
        </div>

        <h2 className="login-title">Hey, Welcome Back!</h2>
        <p className="login-subtitle">Sign in to access your admin dashboard</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleEmailLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            <img src={LockIcon} alt="Lock" className="btn-icon-img" />
            Sign In
          </button>
        </form>

        <div className="divider"></div>

        {/* Support Button */}
        <div className="support-section">
          <button
            className="support-btn"
            onClick={() => setShowSupport(true)}
          >
            <img src={SupportIcon} alt="Support" className="btn-icon-img" />
            Support
          </button>
          <p className="support-subline">
            In case any issue or query, you can reach out to us via Support
          </p>
        </div>
      </div>

      {/* Support Popup Modal */}
      {showSupport && (
        <div className="support-modal-overlay">
          <div className="support-modal">
            <h3>General Issue / Support</h3>


            <div className="predefined-issues">
              {predefinedIssues.map((issue, idx) => (
                <button
                  key={idx}
                  className="issue-btn"
                  onClick={() => handleIssueClick(issue)}
                >
                  {issue}
                </button>
              ))}
            </div>

            <p className="or-text">Or type your issue:</p>
            <div className="custom-issue">
              <input
                type="text"
                placeholder="Describe your issue..."
                value={customIssue}
                onChange={(e) => setCustomIssue(e.target.value)}
              />
              <button onClick={() => sendWhatsAppMessage(customIssue)}>
                <img src={SendIcon} alt="Send" className="btn-icon-img" />
              </button>
            </div>

            <button
              className="close-btn"
              onClick={() => setShowSupport(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
