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


    const roots = getEvolutionTree(lines)

    return (
        <Grid sx={{width: "100%"}} id={"Evolution Data"}>
            <Typography variant="h2">Evolution Data</Typography>
            <LinesContainer>
                {
                    roots.length ? (
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
                    ) : (
                        <Typography sx={{marginTop: 2}}>Pokemon doesn't evolve</Typography>
                    )
                }
            </LinesContainer>
        </Grid>
    )
}

export default EvolutionData;