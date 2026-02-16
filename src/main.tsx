import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Handle redirect from 404.html for direct URL access
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== '') {
  history.replaceState(null, '', redirect);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
