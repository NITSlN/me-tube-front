import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { LoginProvider } from './context/LoginContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <LoginProvider>
      <App />
  </LoginProvider>,
)
