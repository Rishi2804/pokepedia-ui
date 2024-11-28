import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useSpeciesDetails} from "../../services/api/hooks/useSpeciesData.ts";
import {Grid2 as Grid, Typography} from "@mui/material";
import {Card} from "./styles.ts";
import {useEffect, useState} from "react";
import PokemonImg from "../../components/PokemonImg/PokemonImg.tsx";
import {formatText} from "../../global/utils.ts";
import MetaData from "../../components/MetaData/MetaData.tsx";
import FormTabs from "./FormTabs/FormTabs.tsx";
import PokedexData from "./PokedexData/PokedexData.tsx";
import BaseStats from "./BaseStats/BaseStats.tsx";
import TypeDefenses from "./TypeDefenses/TypeDefenses.tsx";
import EvolutionData from "./EvolutionData/EvolutionData.tsx";
import PokedexEntries from "./PokedexEntries/PokedexEntries.tsx";
import Learnset from "./Learnset/Learnset.tsx";

const Pokemon = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useSpeciesDetails({speciesIdOrName: id ?? 0})
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

    if (!data) {
        return null
    }

    return (
        <>
            <MetaData pageTitle={`${formatText(data.name)} | PokePedia`} />

            <Typography variant="h1" textAlign={"center"} sx={{marginTop: 3}}>{formatText(data.name)}</Typography>
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
            </Grid>
        </>
    )
}

export default Pokemon