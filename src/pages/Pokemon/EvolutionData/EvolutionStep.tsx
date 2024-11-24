import {Box, Stack, Typography} from "@mui/material";
import {TreeEdge} from "./types.ts";
import {FC} from "react";
import {PokemonBox, StepBox} from "./styles.ts";
import EastIcon from '@mui/icons-material/East';
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";

interface IEvolutionStepProps {
    edges: TreeEdge[]
}

const EvolutionStep: FC<IEvolutionStepProps> = ({edges}) => {
    return (
        <Stack spacing={1}>
            {
                edges.map((edge) => {

                    return(
                        <StepBox>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <EastIcon />
                                {
                                    edge.details.map((detail) =>
                                        (<Typography variant="caption" textAlign={"center"} sx={{width: '150px'}}>
                                            {detail}{edge.region ? ` in ${edge.region}` : "" }
                                        </Typography> ))
                                }
                            </Box>
                            <PokemonBox>
                                <PokemonImg id={edge.child.pokemonId} />
                                <Typography variant="h4" textAlign="center">{edge.child.pokemonName}</Typography>
                            </PokemonBox>
                            <EvolutionStep edges={edge.child.edges} />
                        </StepBox>
                    )
                })
            }
        </Stack>
    );
};

export default EvolutionStep;