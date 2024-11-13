import {createBrowserRouter} from "react-router-dom";
import { Home } from "../pages/Home"
import {PokedexHome} from "../pages/Pokedex/PokedexHome/PokedexHome.tsx";
import Layout from "../containers/layout/Layout.tsx";
import Pokedex from "../pages/Pokedex/PokedexPage/Pokedex.tsx";

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
                path: "/pokedex/:pokedexVersion",
                element: <Pokedex />
            }
        ]
}])