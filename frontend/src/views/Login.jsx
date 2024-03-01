/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import devLinkLogoLarge from '../assets/images/logo-devlinks-large.svg'
import emailIcon from '../assets/images/icon-email.svg'
import lockIcon from '../assets/images/icon-password.svg'
import '../assets/css/auth.css'
import { useAuth } from '../services/authContext'

function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const { login } = useAuth() // Access the login function from the context

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API}/login`,
        {
          email_address: email,
          password: password,
        }
      )
      if (response.data.token) {
        login(response.data.token, response.data.email_address) // Use the login function from the context
        navigate('/home')
      } else {
        console.log('API Response:', response.data)
        // Handle other cases as needed
      }
    } catch (error) {
      console.error('API Error:', error.message)
      setError(true)
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
            <div className={`form-label ${error ? 'error-font-styling' : ''}`}>
              Email
            </div>
            <div className={`input-with-icon ${error ? 'error-styling' : ''}`}>
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
            <div className={`form-label ${error ? 'error-font-styling' : ''}`}>
              Password
            </div>
            <div className={`input-with-icon ${error ? 'error-styling' : ''}`}>
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
