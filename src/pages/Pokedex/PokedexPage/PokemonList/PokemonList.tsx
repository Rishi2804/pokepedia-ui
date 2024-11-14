import React, {useEffect} from "react";
import {usePokedexDetails} from "../../../../services/api/hooks/usePokedexData.ts";
import {Grid2 as Grid} from "@mui/material";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard.tsx";

interface IPokemonListProps {
    pokedex: string
}

const PokemonList: React.FC<IPokemonListProps> = ({pokedex}) => {
    const { data, loading } = usePokedexDetails({pokedex: pokedex})
    useEffect(() => {
        if (!loading) console.log(data)
    }, [loading])


    return (
        <Grid container spacing={2}>
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