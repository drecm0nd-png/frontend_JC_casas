import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './Pages/main(inicio)/Main'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
