import MetaData from "../../../components/MetaData/MetaData.tsx";
import {Box, Grid2 as Grid, Typography} from "@mui/material";
import VersionGroupDialog from "./components/VersionGroupDialog.tsx";
import {useTeamStore} from "../../../store/teamStore.ts";
import {EmptyContainer, MemberContainer, TeamContainer} from "./styles.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import TeamOptions from "./components/TeamOptions.tsx";

const TeamsHome = () => {
    const { teams } = useTeamStore()

    return (
        <>
            <MetaData pageTitle={`Team Builder | PokePedia`} />
            <Typography variant="h1" sx={{padding: 3, textAlign: "center"}}>Team Builder</Typography>
            <VersionGroupDialog />
            <Typography variant="h2" sx={{marginY: 3}}>My Teams</Typography>
            <Grid container spacing={2}>
                {
                    teams.map((team, index) => (
                        <Grid size={{xs: 12, sm: 6}} key={index}>
                            <TeamContainer>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Box />
                                    <Typography variant="h5" textAlign="center">{team.name}</Typography>
                                    <TeamOptions id={team.id}/>
                                </Box>
                                <Grid container spacing={1} sx={{marginTop: 2}}>
                                    {
                                        [...Array(6)].map((_, i) => (
                                            <Grid size={2}>
                                                {(i < team.pokemon.length) ? (
                                                    <MemberContainer
                                                        type1={team.pokemon[i].teraType ?? team.pokemon[i].type1}
                                                        type2={team.pokemon[i].teraType ?? team.pokemon[i].type2}
                                                    >
                                                        <PokemonImg
                                                            id={team.pokemon[i].id}
                                                            shiny={team.pokemon[i].shiny}
                                                            female={team.pokemon[i].gender === 'female'}
                                                        />
                                                    </MemberContainer>
                                                ) : (<EmptyContainer />)}
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </TeamContainer>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
};

export default TeamsHome;