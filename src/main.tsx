import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {getTheme} from "./theme/styles/theme.ts";
import './theme/styles/fonts.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        <App />
      </ThemeProvider>
  </StrictMode>,
)
