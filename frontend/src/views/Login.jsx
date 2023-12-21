import React, { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import devLinkLogoLarge from "../assets/images/logo-devlinks-large.svg";
import emailIcon from "../assets/images/icon-email.svg";
import lockIcon from "../assets/images/icon-password.svg";
import "../assets/css/auth.css";

function LoginForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API}/login`, {
        email_address: email,
        password: password,
      });

      // Handle the response as needed (e.g., redirect, show a message)
      console.log(response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error(error);
    }
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
                ref={emailRef}
                placeholder="e.g. alex@email.com"
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
                ref={passwordRef}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="login-btn">
            <button className="submit-btn" type="submit">
              Login
            </button>
          </div>
          <div className="register">
            Don't have an account? <Link to="/register">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
