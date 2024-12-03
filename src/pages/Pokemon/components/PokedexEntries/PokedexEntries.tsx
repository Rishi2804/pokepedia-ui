import {Box, Grid2 as Grid, Stack, Typography} from "@mui/material";
import {FC} from "react";
import {IDexEntry, IDexNum} from "./types.ts";
import {categorizedDexEntries} from "./utils.ts";
import {PokemonType} from "../../../../global/enums.ts";
import {
    EmptyBox,
    EntriesContainer,
    GenEntriesContainer,
    UpperCardContainer,
    UpperCardText
} from "./styles.ts";
import GameTextEntry from "../../../../components/GameTextEntry/GameTextEntry.tsx";

interface IPokedexEntriesProps {
    gen: number
    dexEntries: IDexEntry[]
    dexNumbers: IDexNum[]
    type1: PokemonType
    type2: PokemonType | null;
}

const PokedexEntries: FC<IPokedexEntriesProps> = ({gen, dexEntries, dexNumbers, type1, type2}) => {

    const formattedDexEntries = categorizedDexEntries(gen, dexEntries, dexNumbers)

    return (
        <Grid size={12} id={"Pokedex Entries"}>
            <Typography variant="h2" sx={{marginBottom: 2}}>Pokedex Entries</Typography>
            <EntriesContainer type1={type1} type2={type2}>
                <Stack spacing={1}>
                    {
                        formattedDexEntries.map((group, index) => {
                            return (
                                <Box key={index}>
                                    <Box sx={{display: "flex"}}>
                                        <UpperCardContainer gen={gen+index}>
                                            <UpperCardText variant="caption">Generation {gen+index}</UpperCardText>
                                        </UpperCardContainer>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                            {
                                                group.numbers.map((numbers, index) => (
                                                    <UpperCardContainer region={numbers.name} key={index}>
                                                        <UpperCardText variant="caption">{numbers.name}</UpperCardText>
                                                        <UpperCardText variant="caption" ># {numbers.number ? numbers.number.toString().padStart(3, '0') :  "--"}</UpperCardText>
                                                    </UpperCardContainer>
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                    <GenEntriesContainer gen={gen + index}>
                                        <Stack spacing={0.5}>
                                            {
                                                group.entries.length ? group.entries.map((entry, index) => (
                                                    <GameTextEntry games={entry.games} entry={entry.entry} key={index}/>
                                                )) :
                                                    (
                                                        <EmptyBox>
                                                            <Typography>No Entries Available</Typography>
                                                        </EmptyBox>
                                                    )
                                            }
                                        </Stack>
                                    </GenEntriesContainer>
                                </Box>

                            )
                        })
                    }
                </Stack>
            </EntriesContainer>
        </Grid>
    );
};

export default PokedexEntries;