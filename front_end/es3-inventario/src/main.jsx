import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AutheProvider } from './context/AutheContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AutheProvider>
        <App />
      </AutheProvider>
    </BrowserRouter>
  </StrictMode>,
)
