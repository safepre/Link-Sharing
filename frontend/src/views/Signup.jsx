import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import devLinkLogoLarge from "../assets/images/logo-devlinks-large.svg";
import emailIcon from "../assets/images/icon-email.svg";
import lockIcon from "../assets/images/icon-password.svg";
import '../assets/css/auth.css'


function SignupForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameValue = nameRef.current.value;
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(`${import.meta.env.VITE_BASE_API}/signup`, {
        name: nameValue,
        username: emailValue,
        password: passwordValue,
      });

     // Check if the API response has a passwordHash (replace 'passwordHash' with the actual key from your API response)
     if (response.data.passwordHash) {
      // Redirect to login page on successful registration
      history.push('/login');
    } else {
      console.log('API Response:', response.data);
      // Handle other cases as needed
    }
    
    } catch (error) {
      // Handle errors
      console.error('API Error:', error.message);
    }
    // You can add your validation logic here
    console.log(`Email: ${emailValue}, Password: ${passwordValue}, Numan: ${nameValue}`);
  };

  return (
    <div className="login-from-wrapper">
      <div className="header">
        <img src={devLinkLogoLarge} alt="" />
      </div>
      <div className="login-form">
        <div className="login-header">
          <div className="text">Create account</div>
          <div className="desc">Let's get you started sharing your links!</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-label">Name</div>
            <div className="input-with-icon">
              <span className="input-icon">
                <img src={emailIcon} alt="" />
              </span>
              <input
                type="text"
                id="name"
                ref={nameRef}
                placeholder="e.g. Numan"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-label">Username</div>
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
            <div className="form-label">Create password</div>
            <div className="input-with-icon">
              <span className="input-icon">
                <img src={lockIcon} alt="" />
              </span>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                placeholder="At least 8 characters"
                required
              />
            </div>
          </div>
          {/* <div className="form-group">
            <div className="form-label">Confirm password</div>
            <div className="input-with-icon">
              <span className="input-icon">
                <img src={lockIcon} alt="" />
              </span>
              <input
                type="password"
                id="confirm-password"
                ref={nameRef}
                placeholder="At least 8 characters"
                required
              />
            </div>
          </div> */}
          <div className="login-btn">
            <button className="submit-btn" type="submit">
              Create new account
            </button>
          </div>
          <div className="register">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}


export default SignupForm;
