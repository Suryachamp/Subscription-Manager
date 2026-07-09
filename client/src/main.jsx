import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/**
 * Entry Point (main.jsx)
 * 
 * This is the very first file that runs in our React application.
 * It grabs the `<div id="root">` from our index.html file and "renders" (draws)
 * our <App /> component inside of it.
 * 
 * We wrap our App in <BrowserRouter> so that we can have multiple pages and URLs.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* We did BrowserRouter we can so that everything inside it can use the routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
