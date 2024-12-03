import {useParams} from "react-router-dom";
import {PokedexRegion, PokemonType} from "../../../global/enums.ts";
import Header from "./Header/Header.tsx";
import PokemonList from "../../../components/PokemonList/PokemonList.tsx";
import {VersionToRegion} from "../utils.ts";
import {PokedexVersion} from "../enums.ts";
import {usePokedexDetails} from "../../../services/api/hooks/usePokedexData.ts";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";
import QuickScroll from "../../../components/QuickScroll/QuickScroll.tsx";
import Filters from "../../../components/Filters/Filters.tsx";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import {VersionToHeaderText} from "./utils.ts";
import Loading from "../../../containers/loading/Loading.tsx";

const Pokedex = () => {
    const { pokedexVersion: dex } =  useParams<{ pokedexVersion: PokedexVersion }>()
    const [dexes, setDexes] = useState<PokedexRegion[]>([])
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [typefilters, settypefilters] = useState<PokemonType[]>([])

    useEffect(() => {
        if (dex) {
            if (dex as string !== "national") {
                setDexes(VersionToRegion[dex]);
            } else {
                setDexes([PokedexRegion.NATIONAL])
            }
        }
    }, [])

    const { data, loading } = usePokedexDetails({pokedexes: dexes});



    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <MetaData pageTitle={`${dex ? VersionToHeaderText[dex] ?? "National" : ""} | PokePedia`} />
            <Header dex={dex as string !== "national" ? dex : undefined} />
            <QuickScroll items={data.map((item) => item.dex)} heading={"Jump to:"}/>
            <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                typeFilters={typefilters}
                setTypeFilters={settypefilters}
            />
            {
                data.map(({dex, data: dexData}, index) => {
                    return (
                        <Box key={index} id={dex}>
                            <PokemonList
                                key={index}
                                data={dexData}
                                header={data.length > 1 ? dex : undefined}
                                searchTerm={searchTerm}
                                typeFilters={typefilters}
                            />
                        </Box>
                    )
                })
            }
        </>
    )
}

export default Pokedex