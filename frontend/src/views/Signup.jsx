/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import devLinkLogoLarge from '../assets/images/logo-devlinks-large.svg'
import emailIcon from '../assets/images/icon-email.svg'
import lockIcon from '../assets/images/icon-password.svg'
import '../assets/css/auth.css'

function SignupForm() {
  const history = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const emailValue = emailRef.current.value
    const passwordValue = passwordRef.current.value

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API}/signup`,
        {
          email_address: emailValue,
          password: passwordValue,
          confirmPassword: passwordValue,
        }
      )
      // Check if the API response has a passwordHash (replace 'passwordHash' with the actual key from your API response)
      if (response.data.passwordHash) {
        // Redirect to login page on successful registration
        history('/login')
      } else {
        console.log('API Response:', response.data)
        // Handle other cases as needed
      }
    } catch (error) {
      // Handle errors
      console.error('API Error:', error.message)
      setError(true)
    }
    // You can add your validation logic here
    // eslint-disable-next-line no-undef
    console.log(`Email: ${emailValue}, Password: ${passwordValue}`)
  }

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
            <div className={`form-label ${error ? 'error-font-styling' : ''}`}>
              Email
            </div>
            <div className={`input-with-icon ${error ? 'error-styling' : ''}`}>
              <span className="input-icon">
                <img src={emailIcon} alt="" />
              </span>
              <input
                type="text"
                id="name"
                ref={emailRef}
                placeholder="e.g. numan@email.com"
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
                ref={passwordRef}
                placeholder="At least 8 characters"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-label">Confirm password</div>
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
          <span className="font-validation">
            Password must contains at least 8 characters
          </span>
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
  )
}

export default SignupForm
