import {useParams} from "react-router-dom";
import {PokedexRegion} from "../../../global/enums.ts";
import Header from "./Header/Header.tsx";
import PokemonList from "./PokemonList/PokemonList.tsx";
import {VersionToRegion} from "../utils.ts";
import {PokedexVersion} from "../enums.ts";
import {usePokedexDetails} from "../../../services/api/hooks/usePokedexData.ts";
import {useEffect, useState} from "react";

const Pokedex = () => {
    const { pokedexVersion: dex } =  useParams<{ pokedexVersion: PokedexVersion }>()
    const [dexes, setDexes] = useState<PokedexRegion[]>([])

    useEffect(() => {
        if (dex) {
            if (dex as string !== "national") {
                setDexes(VersionToRegion[dex]);
            } else {
                setDexes([PokedexRegion.NATIONAL])
            }
        }
    }, [])

    const { data } = usePokedexDetails({pokedexes: dexes});

    return (
        <>
            <Header dex={dex as string !== "national" ? dex : undefined} />
            {/*<Typography variant="h2">Test</Typography>*/}
            {
                data.map(({dex, data: dexData}, index) => {
                    return (
                        <PokemonList key={index} data={dexData} header={data.length > 1 ? dex : undefined}/>
                    )
                })
            }
        </>
    )
}

export default Pokedex