import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useSpeciesDetails} from "../../services/api/hooks/useSpeciesData.ts";
import {Box, Grid2 as Grid, Typography} from "@mui/material";
import {Card} from "./styles.ts";
import {useEffect, useState} from "react";
import PokemonImg from "../../components/PokemonImg/PokemonImg.tsx";
import {formatText} from "../../global/utils.ts";
import MetaData from "../../components/MetaData/MetaData.tsx";
import FormTabs from "./components/FormTabs/FormTabs.tsx";
import PokedexData from "./components/PokedexData/PokedexData.tsx";
import BaseStats from "./components/BaseStats/BaseStats.tsx";
import TypeDefenses from "./components/TypeDefenses/TypeDefenses.tsx";
import EvolutionData from "./components/EvolutionData/EvolutionData.tsx";
import PokedexEntries from "./components/PokedexEntries/PokedexEntries.tsx";
import Learnset from "./components/Learnset/Learnset.tsx";
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import QuickScroll from "../../components/QuickScroll/QuickScroll.tsx";
import PokemonImages from "./components/PokemonImages/PokemonImages.tsx";
import Loading from "../../containers/loading/Loading.tsx";

const Pokemon = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, loading, error } = useSpeciesDetails({speciesIdOrName: id ?? 0})
    const [i, setI] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (id && !isNaN(Number(id))) {
            setSearchParams({ id: id }, {replace: true});
        } else {
            setSearchParams({}, {replace: true});
        }
    }, [id, searchParams]);

    // Effect to handle navigation based on species data
    useEffect(() => {
        if (id && !isNaN(Number(id)) && data?.pokemon && data?.name) {
            setI(0);
            const pokemonId = Number(id);
            const pokemonExists = data.pokemon.some(mon => mon.id === pokemonId);

            if (pokemonExists) {
                const pokemonIndex = data.pokemon.findIndex(pokemon => pokemon.id === pokemonId);
                setI(pokemonIndex);
                navigate(`/pokemon/${data.name}`, { replace: true });
            }
        }
    }, [id, data, navigate]);

    const handleNavigate = (id: number) => {
        navigate(`/pokemon/${id}`);
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        throw new Error(error)
    }


    if (!data) {
        return null
    }

    const sections = ["Data", "Base Stats", "Type Defenses", "Evolution Data", "Pokedex Entries", "Learnset", "Images"]

    return (
        <>
            <MetaData pageTitle={`${formatText(data.name)} | PokePedia`} />
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2}}>
                {data.id > 1 ? <ArrowBack onClick={() => handleNavigate(data.id - 1)}/> : <Box></Box>}
                <Typography variant="h1" textAlign={"center"} sx={{marginTop: 3}}>{formatText(data.name)}</Typography>
                {data.id < 1025 ? <ArrowForward onClick={() => handleNavigate(data.id + 1)}/> : <Box></Box>}
            </Box>
            <QuickScroll items={sections} heading={"Content"} />
            <FormTabs forms={data.pokemon.map((pokemon) => (pokemon.name))} i={i} setI={setI} />

            <Grid container spacing={4} sx={{paddingTop: 4}}>
                <Grid size={{xs: 7, sm: 4}}>
                    <Card type1={data.pokemon[i].type1} type2={data.pokemon[i].type2}>
                        <PokemonImg id={data.pokemon[i].id} />
                    </Card>
                </Grid>
                <PokedexData
                    id={data.id}
                    type1={data.pokemon[i].type1}
                    type2={data.pokemon[i].type2}
                    genderRatio={data.pokemon[i].genderRate}
                    height={data.pokemon[i].height}
                    weight={data.pokemon[i].weight}
                    abilities={data.pokemon[i].abilities}
                />
                <BaseStats
                    {...data.pokemon[i].stats}
                    type1={data.pokemon[i].type1}
                    type2={data.pokemon[i].type2}
                />
                <TypeDefenses
                    type1={data.pokemon[i].type1}
                    type2={data.pokemon[i].type2}
                />
                <EvolutionData lines={data.pokemon[i].evolutionChain} />
                <PokedexEntries
                    gen={data.pokemon[i].gen}
                    dexEntries={data.pokemon[i].dexEntries}
                    dexNumbers={data.pokemon[i].dexNumbers}
                    type1={data.pokemon[i].type1}
                    type2={data.pokemon[i].type2}
                />
                {
                    !!data.pokemon[i].movesets.length &&

                    <Learnset
                        learnset={data.pokemon[i].movesets}
                    />
                }
                <PokemonImages id={data.pokemon[i].id} />
            </Grid>
        </>
    )
}

export default Pokemon