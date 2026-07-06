import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* We did BrowserRouter we can so that everything inside it can use the routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
