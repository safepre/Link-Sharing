/* eslint-disable react/prop-types */
// authContext.js
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null) // Add user state

  const login = (receivedToken, userDetails) => {
    localStorage.setItem('token', receivedToken)
    setToken(receivedToken)
    setUser(userDetails) // Set user details when logging in
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null) // Clear user details when logging out
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
