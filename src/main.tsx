import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './theme/styles/fonts.css'
import {ThemeContextProvider} from "./theme/context/ThemeContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
  </StrictMode>,
)
