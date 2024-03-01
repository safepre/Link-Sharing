import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import LoginForm from './views/Login'
import SignupForm from './views/Signup'
import Home from './views/Home'
import Preview from './views/Preview'
import GeneratedLinkPage from './views/GeneratedLinkPage'
import { AuthProvider } from './services/authContext'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: <SignupForm />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/preview',
    element: <Preview />,
  },
  {
    path: '/generated-link/:generatedParam',
    element: <GeneratedLinkPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
