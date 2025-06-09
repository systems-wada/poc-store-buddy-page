import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import Moc from './store-buddy-dashboard.tsx'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Moc />
  </StrictMode>,
)
