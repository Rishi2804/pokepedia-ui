import {VersionGroup} from "../global/enums.ts";
import PokedexSelector from "../components/PokedexSelector/PokedexSelector.tsx";
import {VersionToImage} from "../global/utils.ts";
import {Grid2 as Grid} from "@mui/material";

export const Pokedex = () => {
    return (
        <>
            <h1>Select a Game</h1>
            <Grid container spacing={2}>
                <Grid size={{xs: 3, sm: 4, lg: 4.5}}></Grid>
                <Grid size={{xs: 6, sm: 4, lg: 3}}>
                    <PokedexSelector />
                </Grid>
                <Grid size={{xs: 3, sm: 4, lg: 4.5}}></Grid>
                {
                    Object.values(VersionGroup).map((key) => {
                        if (!VersionToImage[key as VersionGroup]) {
                            return (<></>)
                        }

                        return(
                            <Grid size={{xs: 6, sm: 4, lg: 3}}>
                                <PokedexSelector group={key as VersionGroup} key={key} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}