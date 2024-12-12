import {FC} from 'react';
import {Box, Grid2 as Grid, SelectChangeEvent, Typography} from "@mui/material";
import {AbilityInput, Card, GenderButton, MemberInfo, ShinyButton, StaticLabel} from "../styles.ts";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import TypeIcon from "../../../../components/TypeIcon/TypeIcon.tsx";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import GenderlessIcon from "@mui/icons-material/Transgender";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TeraTypeMenu from "./TeraTypeDropdown/TeraTypeMenu.tsx";
import {PokemonType} from "../../../../global/enums.ts";
import FormControl from "@mui/material/FormControl";
import {NoAbilities} from "./constants.ts";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MoveAutoComplete from "./MoveAutoComplete.tsx";
import {PokemonTeamMember, TeamMove} from "../../../../global/types.ts";
import {useTeamStore} from "../../../../store/teamStore.ts";

interface IMemberCardProps {
    i: number;
    editMode: boolean;
    advancedOptions: boolean;
}

const MemberCard: FC<IMemberCardProps> = ({i, editMode, advancedOptions}) => {

    const { currentTeam, editPokemon, removePokemon } = useTeamStore()
    const pokemon = currentTeam?.pokemon[i];
    if (!pokemon) return null;

    const toggleShiny = (index: number, mon: PokemonTeamMember, shiny: boolean) => {
        editPokemon(index, {...mon, shiny})
    }

    const toggleGender = (index: number, mon: PokemonTeamMember)=> {
        editPokemon(index, {...mon, gender: mon.gender === 'male' ? 'female' : 'male'})
    }

    const handleAbilityChange = (event: SelectChangeEvent<number>, index: number, mon: PokemonTeamMember) => {
        const newAbility = mon.abilityCandidates.find(ability => ability.id === event.target.value);
        if (newAbility) {
            editPokemon(index, {
                ...mon,
                ability: newAbility,
            })
        }
    };

    const handleTeraTypeChange = (index: number, mon: PokemonTeamMember, tera?: PokemonType)=> {
        const updatedMoves = mon.moves.map(move => {
            if (move?.id === 851) {
                return {
                    ...move,
                    type: tera ?? PokemonType.NORMAL
                }
            }
            return move
        })

        editPokemon(index, {
            ...mon,
            teraType: tera,
            moves: updatedMoves
        })
    }

    const handleRemove = (index: number) => {
        if (editMode) removePokemon(index)
    }

    const handleMoveChange = (monI: number, mon: PokemonTeamMember, moveI: number, move: TeamMove | null) => {
        if (move?.id === 851) move.type = mon.teraType ?? PokemonType.NORMAL
        let updatedMoves = [...mon.moves];
        updatedMoves[moveI] = move;
        const nonNullMoves = updatedMoves.filter(move => move !== null);
        const nullMoves = updatedMoves.filter(move => move === null);
        updatedMoves = [...nonNullMoves, ...nullMoves];
        editPokemon(monI, {
            ...mon,
            moves: updatedMoves
        })
    }

    return (
        <Grid size={{xs: 2}}>
            <Card type1={pokemon.teraType ?? pokemon.type1} type2={pokemon.teraType ?? pokemon.type2} member onClick={() => handleRemove(i)} sx={{marginBottom: 1}}>
                <PokemonImg id={pokemon.id} shiny={pokemon.shiny} female={pokemon.gender === 'female'}/>
            </Card>
            <MemberInfo type1={pokemon.teraType ?? pokemon.type1} type2={pokemon.teraType ?? pokemon.type2} onClick={() => handleRemove(i)}>
                <Typography variant="h4" color={"#fff"}>{pokemon.name}</Typography>
                <Box sx={{display: 'flex', gap: 1}}>
                    <TypeIcon type={pokemon.type1} size={32} variant={"circular"}/>
                    {pokemon.type2 && <TypeIcon type={pokemon.type2} size={32} variant={"circular"}/>}
                </Box>
                <Box sx={{display: 'flex', gap: 1}}>
                    <GenderButton
                        gender={pokemon.gender}
                        onChange={() => toggleGender(i, pokemon)}
                        value="gender"
                        disabled={pokemon.genderLock || !editMode}
                    >
                        {
                            pokemon.gender === 'male' ? (<MaleIcon />) :
                                pokemon.gender === 'female' ? (<FemaleIcon />) :(<GenderlessIcon />)
                        }
                    </GenderButton>
                    <ShinyButton
                        selected={pokemon.shiny}
                        onChange={() => toggleShiny(i, pokemon, !pokemon.shiny)}
                        value="shiny"
                        disabled={!editMode}
                    >
                        <AutoAwesomeIcon sx={{width: 20, height: 20}}/>
                    </ShinyButton>
                    <TeraTypeMenu teraType={pokemon.teraType} changeTeraType={(tera?: PokemonType) => handleTeraTypeChange(i, pokemon, tera)} disabled={!editMode}/>
                </Box>
                {
                    advancedOptions &&
                    <>
                        <FormControl fullWidth sx={{display: NoAbilities.includes(currentTeam.versionGroup) ? 'none' : ''}}>
                            <StaticLabel>Ability</StaticLabel>
                            <Select
                                variant="outlined"
                                value={pokemon.ability.id}
                                onChange={(event) => handleAbilityChange(event, i, pokemon)}
                                input={<AbilityInput />}
                                disabled={!editMode}
                            >
                                {
                                    pokemon.abilityCandidates.map((ability) => (
                                        <MenuItem value={ability.id} key={ability.id}>{ability.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        {
                            [...Array(4)].map((_, mI) => {
                                return (
                                    <MoveAutoComplete
                                        editMode={editMode}
                                        movesList={pokemon.moveCandidates}
                                        label={`Move ${mI+1}`}
                                        currentMove={pokemon.moves[mI]}
                                        updateMove={(move: TeamMove | null) => handleMoveChange(i, pokemon, mI, move)}
                                    />
                                )
                            })
                        }
                    </>
                }
            </MemberInfo>
        </Grid>
    )
};

export default MemberCard;