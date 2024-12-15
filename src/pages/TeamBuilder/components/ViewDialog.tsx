import {Box, Grid2 as Grid, Modal, Typography} from "@mui/material";
import {FC, ReactNode, useState} from "react";
import {PokemonTeam} from "../../../global/types.ts";
import {useTeamStore} from "../../../store/teamStore.ts";
import {DialogBox, MoveCard, PokemonCard} from "./styles.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import TypeIcon from "../../../components/TypeIcon/TypeIcon.tsx";
import MoveClassIcon from "../../../components/MoveClassIcon/MoveClassIcon.tsx";

interface IViewDialogProps {
    id: number;
    trigger: ReactNode;
    teamToView?: PokemonTeam
}

const ViewDialog: FC<IViewDialogProps> = ({id, trigger, teamToView}) => {
    const [open, setOpen] = useState<boolean>(false)
    const { teams } = useTeamStore()
    const team = teamToView ?? teams.find(team => team.id === id)
    if (!team) return null

    return (
        <>
            <Box onClick={() => setOpen(true)}>
                {trigger}
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <DialogBox>
                    <Grid container spacing={1} sx={{width: '100%', height: '100%'}}>
                        <Typography variant="h2" sx={{width: '100%', textAlign: 'center'}}>{team.name}</Typography>
                        {
                            team.pokemon.map(pokemon => {
                                return (
                                    <Grid size={4}>
                                        <PokemonCard type1={pokemon.teraType ?? pokemon.type1} type2={pokemon.teraType ?? pokemon.type2}>
                                            <Box sx={{width: '40%', display: 'flex', flexDirection: 'column'}}>
                                                <PokemonImg id={pokemon.id} shiny={pokemon.shiny} female={pokemon.gender === 'female'}/>
                                            </Box>
                                            <Typography variant="h4">{pokemon.name}</Typography>
                                            <Box sx={{display: 'flex', gap: 1}}>
                                                <TypeIcon type={pokemon.type1} variant="circular" size={30} />
                                                {pokemon.type2 && <TypeIcon type={pokemon.type2} variant="circular" size={30}/>}
                                                {pokemon.teraType && <TypeIcon type={pokemon.teraType} variant="circular" size={30}/>}
                                            </Box>
                                            <Grid container spacing={1} sx={{width: '100%'}}>
                                                {
                                                    pokemon.moves.map(move => {
                                                        if (!move) return null

                                                        return (
                                                            <Grid size={6}>
                                                                <MoveCard type1={move.type}>
                                                                    <Typography variant={"body2"}>{move.name}</Typography>
                                                                    <Box sx={{display: 'flex', gap: 1, flexDirection: 'column'}}>
                                                                        <TypeIcon type={move.type} size={20} variant="circular" />
                                                                        <MoveClassIcon mClass={move.moveClass} size={20} />
                                                                    </Box>
                                                                </MoveCard>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </PokemonCard>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </DialogBox>
            </Modal>
        </>
    );
};

export default ViewDialog;