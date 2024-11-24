import {FC} from "react";
import {EvolutionLine} from "./types.ts";
import {Box, Stack, Typography} from "@mui/material";
import {getEvolutionTree} from "./utils.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import {PokemonBox} from "./styles.ts";
import EvolutionStep from "./EvolutionStep.tsx";

interface IEvolutionDataProps {
    lines: EvolutionLine[];
}

const EvolutionData: FC<IEvolutionDataProps> = ({lines})  => {

    if (!lines.length) return null

    const roots = getEvolutionTree(lines)

    if (!roots.length) return null

    return (
        <Box sx={{width: "100%"}}>
            <Typography variant="h2">Evolution Data</Typography>
            {
                roots.map((root) => {

                    return (
                        <Stack direction="row" alignItems="center" justifyContent={"center"}>
                            <PokemonBox>
                                <PokemonImg id={root.pokemonId} />
                                <Typography variant="h4" textAlign="center">{root.pokemonName}</Typography>
                            </PokemonBox>
                            <EvolutionStep edges={root.edges} />
                        </Stack>
                    )
                })
            }
        </Box>
    )
}

export default EvolutionData;