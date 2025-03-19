import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'slick-carousel/slick/slick.css';  // Import slick carousel styles
import 'slick-carousel/slick/slick-theme.css';  // Import slick carousel theme styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
