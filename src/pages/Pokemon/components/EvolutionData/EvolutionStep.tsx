import {Box, Stack, Typography} from "@mui/material";
import {TreeEdge} from "./types.ts";
import {FC} from "react";
import {PokemonBox, StepBox} from "./styles.ts";
import EastIcon from '@mui/icons-material/East';
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import {useNavigate} from "react-router-dom";

interface IEvolutionStepProps {
    edges: TreeEdge[]
}

const EvolutionStep: FC<IEvolutionStepProps> = ({edges}) => {
    const navigate = useNavigate()

    return (
        <Stack spacing={1}>
            {
                edges.map((edge, index) => {
                    const handleClick = () => {
                        navigate(`/pokemon/${edge.child.pokemonId}`)
                        window.scroll(0, 0)
                    }

                    return(
                        <StepBox key={index}>
                            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <EastIcon />
                                {
                                    edge.details.map((detail, index) =>
                                        (<Typography variant="caption" textAlign={"center"} sx={{width: '150px'}} key={index}>
                                            {detail}{edge.region ? ` in ${edge.region}` : "" }
                                        </Typography> ))
                                }
                            </Box>
                            <PokemonBox onClick={handleClick}>
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