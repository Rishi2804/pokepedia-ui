import {PokemonType} from "../../../../../global/enums.ts";
import {Description} from "../../../../../global/types.ts";
import {FC} from "react";
import {Grid2 as Grid, Stack, Typography} from "@mui/material";
import {EntriesContainer} from "./styles.ts";
import GameTextEntry from "../../../../../components/GameTextEntry/GameTextEntry.tsx";

interface IMoveDescriptionsProps {
    type: PokemonType;
    entries: Description[];
}

const MoveDescriptions: FC<IMoveDescriptionsProps> = ({type, entries}) => {
    return (
        <Grid size={{xs: 12}}>
            <Typography variant="h2" sx={{marginBottom: 2}} id={"Descriptions"}>Descriptions</Typography>
            <EntriesContainer type={type}>
                <Stack spacing={2}>
                {
                    // The API already groups identical text across games, so the
                    // entries map straight onto GameTextEntry.
                    entries.map((entry, i) => (
                        <GameTextEntry key={i} games={entry.games} entry={entry.text} />
                    ))
                }
                </Stack>
            </EntriesContainer>
        </Grid>
    );
};

export default MoveDescriptions;
