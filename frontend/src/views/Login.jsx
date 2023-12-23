import React, { useState } from "react";
import { Link } from "react-router-dom";
import devLinkLogoLarge from "../assets/images/logo-devlinks-large.svg";
import emailIcon from "../assets/images/icon-email.svg";
import lockIcon from "../assets/images/icon-password.svg";
import '../assets/css/auth.css'

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-from-wrapper">
        <div className="header">
          <img src={devLinkLogoLarge} alt="" />
        </div>
      <div className="login-form">
        <div className="login-header">
          <div className="text">Login</div>
          <div className="desc">
            Add your details below to get back into the app
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-label">Email</div>
            <div className="input-with-icon">
              <span className="input-icon">
                <img src={emailIcon} alt="" />
              </span>
              <input
                  type="email"
                id="email"
                value={email}
                placeholder="e.g. alex@email.com"
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-label">Password</div>
            <div className="input-with-icon">
              <span className="input-icon">
                <img src={lockIcon} alt="" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={handlePasswordChange}
                required
              />
            </div>
          </div>
          <div className="login-btn">
          <button className="submit-btn" type="submit">
            Login
          </button>
          </div>
          <div className="register">Don't have an account? <Link to="/register">Create account</Link></div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
