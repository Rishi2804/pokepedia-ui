import {createBrowserRouter} from "react-router-dom";
import { Home } from "../pages/Home"
import {Pokedex} from "../pages/Pokedex.tsx";
import Layout from "../containers/layout/Layout.tsx";

export const router = createBrowserRouter([{
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/pokedex",
                element: <Pokedex/>
            }
        ]
}])