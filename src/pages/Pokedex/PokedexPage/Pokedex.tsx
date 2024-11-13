import {useParams} from "react-router-dom";
import {PokedexRegion} from "../../../global/enums.ts";
import Header from "./Header/Header.tsx";
import PokemonList from "./PokemonList/PokemonList.tsx";
import {VersionToRegion} from "../utils.ts";
import {PokedexVersion} from "../enums.ts";

const Pokedex = () => {
    const { pokedexVersion: dex } =  useParams<{ pokedexVersion: PokedexVersion }>()
    let dexes: PokedexRegion[] = []

    if (dex) {
        if (dex as string === "national") {
            dexes.push(PokedexRegion.NATIONAL)
        }
        else dexes = VersionToRegion[dex];
    }

    return (
        <>
            <Header dex={dex as string !== "national" ? dex : undefined} />
            {
                dexes.map((dex, index) => <PokemonList pokedex={dex} key={index}/>)
            }
        </>
    )
}

export default Pokedex