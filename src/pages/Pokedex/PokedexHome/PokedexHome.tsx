import PokedexSelector from "./PokedexSelector/PokedexSelector.tsx";
import {Grid2 as Grid, Typography} from "@mui/material";
import {PokedexVersion} from "../enums.ts";

export const PokedexHome = () => {
    return (
        <>
            <Typography variant="h1" sx={{paddingTop: 3}}>Select a Game</Typography>
            <Grid container spacing={2}>
                <Grid size={{xs: 3, sm: 4, lg: 4.5}}></Grid>
                <Grid size={{xs: 6, sm: 4, lg: 3}}>
                    <PokedexSelector />
                </Grid>
                <Grid size={{xs: 3, sm: 4, lg: 4.5}}></Grid>
                {
                    Object.values(PokedexVersion).map((key, index) => {
                        return(
                            <Grid size={{xs: 6, sm: 4, lg: 3}}>
                                <PokedexSelector dex={key} key={index} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}