import React from "react";
import {Grid2 as Grid, Typography} from "@mui/material";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard.tsx";
import {PokemonSnapshot} from "../../../../global/types.ts";

interface IPokemonListProps {
    data: PokemonSnapshot[],
    header?: string,
    searchTerm?: string,
}

const PokemonList: React.FC<IPokemonListProps> = ({data, header, searchTerm}) => {

    return (
        <>
            <Typography variant="h2" sx={{paddingBottom: header ? 1.5 : 0}}>
                {header}
            </Typography>
            <Grid container spacing={2} sx={{paddingBottom: 6}}>
                {
                    data?.map((pokemon, index) => {
                        if (searchTerm) {
                            const regex = new RegExp(searchTerm, "i");
                            if (!regex.test(pokemon.name)) {
                                return null;
                            }
                        }
                        return (
                            <Grid size={{xs: 3, sm: 2, md: 1.5}} key={index}>
                                <PokemonCard data={pokemon}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export default PokemonList