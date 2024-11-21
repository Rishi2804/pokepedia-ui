import {RouterProvider} from "react-router-dom";
import {router} from "./routing/router.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useThemeContext} from "./theme/context/ThemeContext.tsx";
function App() {

  const { theme } = useThemeContext();

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
  )
}

export default App
