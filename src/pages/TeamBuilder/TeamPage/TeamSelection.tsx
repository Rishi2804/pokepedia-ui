import {useTeamCandidatesDetails} from "../../../services/api/hooks/useTeamCandidatesData.ts";
import {useParams} from "react-router-dom";
import Loading from "../../../containers/loading/Loading.tsx";
import {Box, Grid2 as Grid, Paper, Typography} from "@mui/material";
import {Card} from "./styles.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import TeamView from "./components/TeamView.tsx";

const TeamSelection = () => {
    const { versionGroup } = useParams();
    const { data, loading, error } = useTeamCandidatesDetails({versionString: versionGroup ?? ''});

    if (loading && !data.length) {
        return (<Loading />);
    }

    if (error) {
        throw new Error(error)
    }

    return (
        <>
                <Typography variant="h1" sx={{textAlign: "center", padding: 2}}>My Team</Typography>
                <TeamView />
                <Paper sx={{ px: 4, py: 2 }}>
                {
                    data.map((list, index) => {
                        return (
                            <Box sx={{width: '100%', paddingBottom: 2}} key={index}>
                                <Typography variant="h2">{list.listName}</Typography>
                                <Grid container spacing={1}>
                                {
                                    list.pokemon.map(mon => {
                                        return (
                                            <Grid size={{xs: 1, sm: (12 / 15)}} key={mon.id}>
                                                <Card type1={mon.type1} type2={mon.type2}>
                                                    <PokemonImg id={mon.id} />
                                                </Card>
                                            </Grid>
                                        )
                                    })
                                }
                                </Grid>
                            </Box>
                        )
                    })
                }
                </Paper>
        </>
    );
};

export default TeamSelection;