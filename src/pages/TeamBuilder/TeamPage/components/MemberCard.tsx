import {FC, MouseEvent} from 'react';
import {Box, Chip, Grid2 as Grid, IconButton, Typography} from "@mui/material";
import {Card, GenderButton, MemberInfo, ShinyButton} from "../styles.ts";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import TypeIcon from "../../../../components/TypeIcon/TypeIcon.tsx";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import GenderlessIcon from "@mui/icons-material/Transgender";
import ShinyIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import TeraTypeMenu from "./TeraTypeDropdown/TeraTypeMenu.tsx";
import {PokemonType} from "../../../../global/enums.ts";
import {PokemonTeamMember} from "../../../../global/types.ts";
import {useTeamStore} from "../../../../store/teamStore.ts";
import {NATURES} from "../../../../global/data/natures.ts";
import {PLACEHOLDER_ITEMS} from "../../../../global/data/items.ts";

interface IMemberCardProps {
    i: number;
    editMode: boolean;
    selectedSlot: number | null;
    setSelectedSlot: (slot: number | null) => void;
}

const MemberCard: FC<IMemberCardProps> = ({i, editMode, selectedSlot, setSelectedSlot}) => {

    const { currentTeam, editPokemon, removePokemon } = useTeamStore()
    const pokemon = currentTeam?.pokemon[i];
    if (!pokemon) return null;

    const toggleShiny = (index: number, mon: PokemonTeamMember, shiny: boolean) => {
        editPokemon(index, {...mon, shiny})
    }

    const toggleGender = (index: number, mon: PokemonTeamMember)=> {
        editPokemon(index, {...mon, gender: mon.gender === 'male' ? 'female' : 'male'})
    }

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

    const handleRemove = (event: MouseEvent) => {
        event.stopPropagation();
        removePokemon(i);
        if (selectedSlot !== null && selectedSlot >= i) setSelectedSlot(null);
    }

    const selected = selectedSlot === i;
    const itemName = pokemon.item ? PLACEHOLDER_ITEMS.find(item => item.slug === pokemon.item)?.name : null;

    return (
        <Grid size={{xs: 2}}>
            <Box sx={{position: 'relative', marginBottom: 1, '&:hover .member-remove-btn': {opacity: 1}}}>
                <Card
                    type1={pokemon.teraType ?? pokemon.type1}
                    type2={pokemon.teraType ?? pokemon.type2}
                    member
                    selected={selected}
                    elevation={selected ? 8 : 1}
                    onClick={() => setSelectedSlot(selected ? null : i)}
                >
                    <PokemonImg id={pokemon.id} shiny={pokemon.shiny} female={pokemon.gender === 'female'}/>
                </Card>
                {
                    editMode && (
                        <IconButton
                            className="member-remove-btn"
                            size="small"
                            onClick={handleRemove}
                            sx={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                opacity: 0,
                                transition: 'opacity 0.15s',
                                backgroundColor: 'background.paper',
                                '&:hover': {backgroundColor: 'background.paper'}
                            }}
                        >
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    )
                }
            </Box>
            <MemberInfo type1={pokemon.teraType ?? pokemon.type1} type2={pokemon.teraType ?? pokemon.type2}>
                <Typography variant="h4" color={"#fff"}>{pokemon.nickname ?? pokemon.name}</Typography>
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
                        <ShinyIcon sx={{width: 20, height: 20}}/>
                    </ShinyButton>
                    <TeraTypeMenu teraType={pokemon.teraType} changeTeraType={(tera?: PokemonType) => handleTeraTypeChange(i, pokemon, tera)} disabled={!editMode}/>
                </Box>
                <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center'}}>
                    {pokemon.ability && <Chip label={pokemon.ability.name} size="small"/>}
                    <Chip label={NATURES[pokemon.nature].name} size="small"/>
                    {itemName && <Chip label={itemName} size="small"/>}
                </Box>
            </MemberInfo>
        </Grid>
    )
};

export default MemberCard;
