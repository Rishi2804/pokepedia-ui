import {useEffect} from "react";
import {usePokedexDetails} from "../../../services/api/hooks/usePokedexData.ts";
import {Grid2 as Grid} from "@mui/material";
import PokemonCard from "../../../components/PokemonCard/PokemonCard.tsx";

const PokemonList = ({pokedex}) => {
    const { data, loading } = usePokedexDetails({pokedex: pokedex})
    useEffect(() => {
        if (!loading) console.log(data)
    }, [loading])


    return (
        <Grid container spacing={2}>
            {
                data?.map((pokemon, index) => {
                    return (
                        <Grid size={{xs: 1.5}} key={index}>
                            <PokemonCard pokemon={pokemon}/>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default PokemonList