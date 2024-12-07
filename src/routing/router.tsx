import {createBrowserRouter} from "react-router-dom";
import { Home } from "../pages/Home"
import {PokedexHome} from "../pages/Pokedex/PokedexHome/PokedexHome.tsx";
import Layout from "../containers/layout/Layout.tsx";
import Pokedex from "../pages/Pokedex/PokedexPage/Pokedex.tsx";
import Pokemon from "../pages/Pokemon/Pokemon.tsx";
import MoveHome from "../pages/Moves/MoveHome/MoveHome.tsx";
import Move from "../pages/Moves/MovePage/Move.tsx";
import AbilityHome from "../pages/Abilities/AbilityHome/AbilityHome.tsx";
import Ability from "../pages/Abilities/AbilityPage/Ability.tsx";
import ErrorPage from "../containers/error/ErrorPage.tsx";
import TeamsHome from "../pages/TeamBuilder/TeamsHome/TeamsHome.tsx";
import TeamSelection from "../pages/TeamBuilder/TeamPage/TeamSelection.tsx";

export const router = createBrowserRouter([{
        element: <Layout/>,
        children: [
            {
                path: "/",
                errorElement: <ErrorPage />,
                element: <Home/>
            },
            {
                path: "/pokedex",
                errorElement: <ErrorPage />,
                element: <PokedexHome/>
            },
            {
                path: "/pokedex/:pokedexVersion",
                errorElement: <ErrorPage />,
                element: <Pokedex />
            },
            {
                path: "/pokemon/:id",
                errorElement: <ErrorPage />,
                element: <Pokemon />
            },
            {
                path: "/attackdex",
                errorElement: <ErrorPage />,
                element: <MoveHome />
            },
            {
                path: "/move/:id",
                errorElement: <ErrorPage />,
                element: <Move />
            },
            {
                path: "/ability",
                errorElement: <ErrorPage />,
                element: <AbilityHome />
            },
            {
                path: "/ability/:id",
                errorElement: <ErrorPage />,
                element: <Ability />
            },
            {
                path: "/team-builder",
                errorElement: <ErrorPage />,
                element: <TeamsHome />
            },
            {
                path: "/team-builder/new/:versionGroup",
                errorElement: <ErrorPage />,
                element: <TeamSelection isEditMode isCreateFlow />
            }
        ]
}])