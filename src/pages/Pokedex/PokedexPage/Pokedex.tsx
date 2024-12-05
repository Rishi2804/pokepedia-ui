import {useParams} from "react-router-dom";
import {PokemonType} from "../../../global/enums.ts";
import Header from "./Header/Header.tsx";
import PokemonList from "../../../components/PokemonList/PokemonList.tsx";
import {PokedexVersion} from "../enums.ts";
import {usePokedexDetails} from "../../../services/api/hooks/usePokedexData.ts";
import {useState} from "react";
import {Box} from "@mui/material";
import QuickScroll from "../../../components/QuickScroll/QuickScroll.tsx";
import Filters from "../../../components/Filters/Filters.tsx";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import {VersionToHeaderText} from "./utils.ts";
import Loading from "../../../containers/loading/Loading.tsx";

const Pokedex = () => {
    const { pokedexVersion: dex } =  useParams<{ pokedexVersion: PokedexVersion }>()
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [typefilters, settypefilters] = useState<PokemonType[]>([])

    const { data, loading } = usePokedexDetails({pokedex: dex ?? 'national'});



    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <MetaData pageTitle={`${dex ? VersionToHeaderText[dex] ?? "National" : ""} | PokePedia`} />
            <Header dex={dex as string !== "national" ? dex : undefined} />
            <QuickScroll items={data.map((item) => item.name)} heading={"Jump to:"}/>
            <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                typeFilters={typefilters}
                setTypeFilters={settypefilters}
            />
            {
                data.map(({name, pokemon}, index) => {
                    return (
                        <Box key={index} id={name}>
                            <PokemonList
                                key={index}
                                data={pokemon}
                                header={data.length > 1 ? name : undefined}
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