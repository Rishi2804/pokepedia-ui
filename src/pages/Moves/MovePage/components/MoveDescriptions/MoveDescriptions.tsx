import {Game, PokemonType, VersionGroup} from "../../../../../global/enums.ts";
import {FC} from "react";
import {Grid2 as Grid, Stack, Typography} from "@mui/material";
import {EntriesContainer} from "./styles.ts";
import GameTextEntry from "../../../../../components/GameTextEntry/GameTextEntry.tsx";

interface IMoveDescriptionsProps {
    type: PokemonType;
    entries: {
        versionGroups: VersionGroup[];
        description: string;
    }[]
}

const MoveDescriptions: FC<IMoveDescriptionsProps> = ({type, entries}) => {
    return (
        <Grid size={{xs: 12}}>
            <Typography variant="h2" sx={{marginBottom: 2}} id={"Descriptions"}>Descriptions</Typography>
            <EntriesContainer type={type}>
                <Stack spacing={2}>
                {
                    entries.map(entry => {
                        const games: Game[] = entry.versionGroups
                            .flatMap(group => group.split("/"))
                            .map(game => game as Game)
                        return (
                            <GameTextEntry games={games} entry={entry.description} />
                        )
                    })
                }
                </Stack>
            </EntriesContainer>
        </Grid>
    );
};

export default MoveDescriptions;