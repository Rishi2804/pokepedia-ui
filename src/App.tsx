import {RouterProvider} from "react-router-dom";
import {router} from "./routing/router.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useThemeContext} from "./theme/context/ThemeContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,       // reference data is immutable for the session
      gcTime: 1000 * 60 * 60,    // keep the 4 MB team payload cached across navigations
      retry: 1,                  // don't retry a multi-MB request three times
    },
  },
})

function App() {

  const { theme } = useThemeContext();

  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  )
}

export default App
