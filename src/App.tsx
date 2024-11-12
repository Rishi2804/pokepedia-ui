import {RouterProvider} from "react-router-dom";
import {router} from "./routing/router.tsx";
function App() {


  return (
      <RouterProvider router={router} />
  )
}

export default App
