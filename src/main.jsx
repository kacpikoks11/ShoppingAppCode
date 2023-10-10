import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginForm from './Login'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <LoginForm />
  </React.StrictMode>,
)
