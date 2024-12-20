import {Box, Checkbox, FormControlLabel, FormGroup, Grid2 as Grid, Modal, Stack, Typography} from "@mui/material";
import {FC, ReactNode, useState} from "react";
import {PokemonTeam} from "../../../global/types.ts";
import {useTeamStore} from "../../../store/teamStore.ts";
import {DialogBox, MoveCard, PokemonCard} from "./styles.ts";
import PokemonImg from "../../../components/PokemonImg/PokemonImg.tsx";
import TypeIcon from "../../../components/TypeIcon/TypeIcon.tsx";
import MoveClassIcon from "../../../components/MoveClassIcon/MoveClassIcon.tsx";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import {COLORS} from "../../../theme/styles/colors.ts";

interface IViewDialogProps {
    id: number;
    trigger: ReactNode;
    teamToView?: PokemonTeam
}

const ViewDialog: FC<IViewDialogProps> = ({id, trigger, teamToView}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean[]>([false, false, false, false])
    const {teams} = useTeamStore()
    const team = teamToView ?? teams.find(team => team.id === id)
    if (!team) return null

    const handleChange = (i: number, isChecked: boolean) => {
        setChecked((prevChecked) => {
            const updatedChecked = [...prevChecked];
            updatedChecked[i] = isChecked;
            if (i === 0 && !isChecked) updatedChecked[1] = false
            return updatedChecked;
        })
    }

    return (
        <>
            <Box onClick={() => setOpen(true)}>
                {trigger}
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
                <DialogBox>
                    <FormGroup sx={{display: 'flex', flexDirection: 'row', gap: 3, marginTop: -5, marginBottom: 2}}>
                        <FormControlLabel
                            label="Show Names"
                            control={
                                <Checkbox
                                    checked={checked[0]}
                                    onChange={(event) => handleChange(0, event.target.checked)}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Show Gender"
                            control={
                                <Checkbox
                                    disabled={!checked[0]}
                                    checked={checked[1]}
                                    onChange={(event) => handleChange(1, event.target.checked)}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Show Types"
                            control={
                                <Checkbox
                                    checked={checked[2]}
                                    onChange={(event) => handleChange(2, event.target.checked)}
                                />
                            }
                        />
                        <FormControlLabel
                            label="Show Moves"
                            control={
                                <Checkbox
                                    checked={checked[3]}
                                    onChange={(event) => handleChange(3, event.target.checked)}
                                />
                            }
                        />
                    </FormGroup>
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Grid container spacing={1} sx={{width: '100%', height: '100%'}}>
                        <Typography variant="h2" sx={{width: '100%', textAlign: 'center'}}>{team.name}</Typography>
                        {
                            team.pokemon.map(pokemon => {
                                return (
                                    <Grid size={2}>
                                        <PokemonCard type1={pokemon.teraType ?? pokemon.type1}
                                                     type2={pokemon.teraType ?? pokemon.type2}>
                                            <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                                                <PokemonImg id={pokemon.id} shiny={pokemon.shiny}
                                                            female={pokemon.gender === 'female'}/>
                                            </Box>
                                            <Typography variant="h4" sx={{display: checked[0] ? 'flex' : 'none', color: COLORS.WHITE}}>
                                                {pokemon.name}
                                                {
                                                    checked[1] && (pokemon.gender === 'male' ?
                                                    <MaleIcon sx={{width: 20, height: 20}}/>
                                                    : pokemon.gender === 'female' ?
                                                    <FemaleIcon sx={{width: 20, height: 20}}/> : null)
                                                }
                                            </Typography>
                                            <Box sx={{display: checked[2] ? 'flex' : 'none', gap: 1}}>
                                                <TypeIcon type={pokemon.type1} variant="circular" size={25} />
                                                {pokemon.type2 && <TypeIcon type={pokemon.type2} variant="circular" size={25}/>}
                                                {pokemon.teraType && <TypeIcon type={pokemon.teraType} variant="circular" size={25}/>}
                                            </Box>
                                            <Stack spacing={1} width={"100%"} display={checked[3] ? '' : 'none'}>
                                                {pokemon.moves.map(move => {
                                                    if (!move) {
                                                        return (
                                                            <Box sx={{height: '46px', border: '1px solid white', borderRadius: 2}}/>
                                                        )
                                                    }
                                                    return (
                                                        <MoveCard type1={move.type}>
                                                            <Typography variant="body2" sx={{color: COLORS.WHITE}}>{move.name}</Typography>
                                                            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                                                <TypeIcon type={move.type} variant="empty" size={20} />
                                                                <MoveClassIcon mClass={move.moveClass} size={20}/>
                                                            </Box>
                                                        </MoveCard>
                                                    )
                                                })}
                                            </Stack>
                                        </PokemonCard>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    </Box>
                </DialogBox>
            </Modal>
        </>
    );
};

export default ViewDialog;