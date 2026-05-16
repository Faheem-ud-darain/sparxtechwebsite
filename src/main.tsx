import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

// Handle chunk loading errors (happens after new deployments)
window.addEventListener('error', (e) => {
  if (e.message.includes('Failed to fetch dynamically imported module') || 
      e.message.includes('importing a module script failed')) {
    window.location.reload();
  }
}, true);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
