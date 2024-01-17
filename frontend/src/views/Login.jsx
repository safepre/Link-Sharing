/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import devLinkLogoLarge from '../assets/images/logo-devlinks-large.svg'
import emailIcon from '../assets/images/icon-email.svg'
import lockIcon from '../assets/images/icon-password.svg'
import '../assets/css/auth.css'

function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API}/login`,
        {
          email_address: email,
          password: password,
        }
      )
      // Check if the response contains a token
      if (response.data.token) {
        // Save the token to local storage or a state for later use
        localStorage.setItem('token', response.data.token)

        // Redirect to the home page
        navigate('/home')
      } else {
        console.log('API Response:', response.data)
        // Handle other cases as needed
      }
    } catch (error) {
      // Handle errors
      console.error('API Error:', error.message)
    }
  }

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
          <div className="register">
            Don't have an account? <Link to="/">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
