import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  // React Strict Mode intentionally runs the render function twice to help identify any unexpected side effects.
  /*
  <StrictMode>
    <App />
  </StrictMode>
  */
  <App />
)
