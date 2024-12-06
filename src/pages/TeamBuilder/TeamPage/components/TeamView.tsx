import {Grid2 as Grid, Paper, Typography} from "@mui/material";
import {Card} from "../styles.ts";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";

const TeamView = () => {
    return (
        <Paper sx={{padding: 4, marginBottom: 3}}>
            <Grid container spacing={0.5}>
                {
                    [...Array(6)].map((_, i) => {
                        return (
                            <Grid size={{xs: 2}} key={i}>
                                <Card type1={null} type2={null}>
                                    <PokemonImg id={0} />
                                </Card>
                                <Card type1={null} type2={null}>
                                    <Typography variant="h3" color={"#fff"}>???</Typography>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Paper>
    );
};

export default TeamView;