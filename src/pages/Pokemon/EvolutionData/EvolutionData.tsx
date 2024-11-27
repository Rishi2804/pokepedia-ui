import {FC} from "react";
import {EvolutionLine} from "./types.ts";
import {Grid2 as Grid, Stack, Typography} from "@mui/material";
import {getEvolutionTree} from "./utils.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import {LinesContainer, PokemonBox} from "./styles.ts";
import EvolutionStep from "./EvolutionStep.tsx";
import {useNavigate} from "react-router-dom";

interface IEvolutionDataProps {
    lines: EvolutionLine[];
}

const EvolutionData: FC<IEvolutionDataProps> = ({lines})  => {
    const navigate = useNavigate()

    if (!lines.length) return null

    const roots = getEvolutionTree(lines)
    if (!roots.length) return null

    return (
        <Grid sx={{width: "100%"}}>
            <Typography variant="h2">Evolution Data</Typography>
            <LinesContainer>
                {
                    roots.map((root, index) => {
                        const handleClick = () => {
                            navigate(`/pokemon/${root.pokemonId}`)
                            window.scroll(0, 0)
                        }

                        return (
                            <Stack direction="row" alignItems="center" justifyContent={"center"} key={index}>
                                <PokemonBox onClick={handleClick}>
                                    <PokemonImg id={root.pokemonId} />
                                    <Typography variant="h4" textAlign="center">{root.pokemonName}</Typography>
                                </PokemonBox>
                                <EvolutionStep edges={root.edges} />
                            </Stack>
                        )
                    })
                }
            </LinesContainer>
        </Grid>
    )
}

export default EvolutionData;