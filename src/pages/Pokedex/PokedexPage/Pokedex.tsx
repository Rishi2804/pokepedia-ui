import {useParams} from "react-router-dom";
import {PokedexRegion} from "../../../global/enums.ts";
import Header from "./Header/Header.tsx";
import PokemonList from "./PokemonList/PokemonList.tsx";
import {VersionToRegion} from "../utils.ts";
import {PokedexVersion} from "../enums.ts";
import {usePokedexDetails} from "../../../services/api/hooks/usePokedexData.ts";
import {useEffect, useState} from "react";
import {Box, TextField} from "@mui/material";
import QuickScroll from "./QuickScroll/QuickScroll.tsx";

const Pokedex = () => {
    const { pokedexVersion: dex } =  useParams<{ pokedexVersion: PokedexVersion }>()
    const [dexes, setDexes] = useState<PokedexRegion[]>([])
    const [searchTerm, setSearchTerm] = useState<string>("");

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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            setSearchTerm(event.currentTarget.value);
        }
    };

    useEffect(() => {
        console.log(searchTerm);
    }, [searchTerm]);

    return (
        <>
            <Header dex={dex as string !== "national" ? dex : undefined} />
            <QuickScroll dexes={data.map((item) => item.dex)} />
            <TextField
                label="Search Pokémon"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
                sx={{ marginBottom: 2 }}
            />
            {
                data.map(({dex, data: dexData}, index) => {
                    return (
                        <Box key={index} id={dex}>
                            <PokemonList key={index} data={dexData} header={data.length > 1 ? dex : undefined} searchTerm={searchTerm}/>
                        </Box>
                    )
                })
            }
        </>
    )
}

export default Pokedex