import {Description} from "../../../../../global/types.ts";
import {FC} from "react";
import {Grid2 as Grid, Paper, Stack, Typography} from "@mui/material";
import GameTextEntry from "../../../../../components/GameTextEntry/GameTextEntry.tsx";

interface IAbilityDescriptionsProps {
    entries: Description[];
}

const AbilityDescriptions: FC<IAbilityDescriptionsProps> = ({entries}) => {
    return (
        <Grid size={12}>
            <Typography variant="h2" sx={{marginBottom: 2}} id={"Descriptions"}>Descriptions</Typography>
            <Paper sx={{padding: 2}}>
                <Stack spacing={2}>
                    {
                        // The API already groups identical text across games, so the
                        // entries map straight onto GameTextEntry.
                        entries.map((entry, i) => (
                            <GameTextEntry key={i} games={entry.games} entry={entry.text} />
                        ))
                    }
                </Stack>
            </Paper>
        </Grid>
    );
};

export default AbilityDescriptions;
