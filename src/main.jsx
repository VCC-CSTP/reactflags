import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* We need this so that our routing paradigm works under the App component */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
