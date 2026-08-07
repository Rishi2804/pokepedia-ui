import {VersionGroup} from "../../../../../global/enums.ts";
import {versionGroupGames} from "../../../../../global/labels.ts";
import {FC} from "react";
import {Grid2 as Grid, Paper, Stack, Typography} from "@mui/material";
import GameTextEntry from "../../../../../components/GameTextEntry/GameTextEntry.tsx";

interface IAbilityDescriptionsProps {
    entries: {
        versionGroups: VersionGroup[];
        description: string;
    }[]
}

const AbilityDescriptions: FC<IAbilityDescriptionsProps> = ({entries}) => {
    console.log(entries)
    return (
        <Grid size={12}>
            <Typography variant="h2" sx={{marginBottom: 2}} id={"Descriptions"}>Descriptions</Typography>
            <Paper sx={{padding: 2}}>
                <Stack spacing={2}>
                    {
                        entries.map(entry => {
                            const games = entry.versionGroups.flatMap(group => group ? versionGroupGames[group] : [])
                            return (
                                <GameTextEntry games={games} entry={entry.description} />
                            )
                        })
                    }
                </Stack>
            </Paper>
        </Grid>
    );
};

export default AbilityDescriptions;