import React from "react";
import {usePokedexDetails} from "../../../../services/api/hooks/usePokedexData.ts";
import {Grid2 as Grid, Typography} from "@mui/material";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard.tsx";
import {PokedexRegion} from "../../../../global/enums.ts";
import {PokemonSnapshot} from "../../../../global/types.ts";

interface PokemonGridProps {
    data?: PokemonSnapshot[] | null
}

const PokemonGrid: React.FC<PokemonGridProps> = ({data}) => {
    return (
        <Grid container spacing={2} sx={{paddingBottom: 6}}>
            {
                data?.map((pokemon, index) => {
                    return (
                        <Grid size={{xs: 3, sm: 2, md: 1.5}} key={index}>
                            <PokemonCard data={pokemon}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
};


interface IPokemonListProps {
    pokedex: PokedexRegion
}

const PokemonList: React.FC<IPokemonListProps> = ({pokedex}) => {
    const {data} = usePokedexDetails({pokedex: pokedex})

    if (pokedex === PokedexRegion.EXTENDED_SINNOH) {
        const seperator = data?.findIndex(pokemon => pokemon.dexNumber === 152);
        const originalSinnoh = data?.slice(0, seperator);
        const platinumExpansion = data?.slice(seperator);
        return (
            <>
                <Typography variant="h2" sx={{paddingBottom: 1.5}}>
                    {"Original Sinnoh"}
                </Typography>
                <PokemonGrid data={originalSinnoh}/>
                <Typography variant="h2" sx={{paddingBottom: 1.5}}>
                    {"Platinum Expansion"}
                </Typography>
                <PokemonGrid data={platinumExpansion}/>
            </>
        )
    }

    return (
        <PokemonGrid data={data}/>
    )
}

export default PokemonList