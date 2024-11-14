import React from "react";
import {usePokedexDetails} from "../../../../services/api/hooks/usePokedexData.ts";
import {Grid2 as Grid} from "@mui/material";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard.tsx";

interface IPokemonListProps {
    pokedex: string
}

const PokemonList: React.FC<IPokemonListProps> = ({pokedex}) => {
    const { data } = usePokedexDetails({pokedex: pokedex})

    return (
        <Grid container spacing={2} sx={{ paddingBottom: 6 }}>
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
    )
}

export default PokemonList