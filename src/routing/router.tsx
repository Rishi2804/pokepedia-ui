import {createBrowserRouter} from "react-router-dom";
import { Home } from "../pages/Home"
import {PokedexHome} from "../pages/PokedexHome.tsx";
import Layout from "../containers/layout/Layout.tsx";
import Pokedex from "../pages/Pokedex.tsx";

export const router = createBrowserRouter([{
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/pokedex",
                element: <PokedexHome/>
            },
            {
                path: "/pokedex/:versionGroup",
                element: <Pokedex />
            }
        ]
}])