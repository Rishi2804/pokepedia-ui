import {Grid2 as Grid, Paper, SelectChangeEvent, Typography} from "@mui/material";
import {Card, ShinyButton, MemberInfo, AbilityInput, StaticLabel} from "../styles.ts";
import PokemonImg from "../../../../components/PokemonImg/PokemonImg.tsx";
import {useTeamStore} from "../../../../store/teamStore.ts";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {PokemonTeamMember, TeamMove} from "../../../../global/types.ts";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MoveAutoComplete from "./MoveAutoComplete.tsx";

const TeamView = () => {
    const { currentSelection, currentTeam, removePokemon, editPokemon } = useTeamStore();

    const toggleShiny = (index: number, mon: PokemonTeamMember, shiny: boolean) => {
        editPokemon(index, {...mon, shiny})
    }

    const handleAbilityChange = (event: SelectChangeEvent<number>, index: number, mon: PokemonTeamMember) => {
        const newAbility = currentSelection[index].abilities.find(ability => ability.id === event.target.value);
        if (newAbility) {
            editPokemon(index, {
                ...mon,
                ability: newAbility,
            })
        }
    };

    const handleMoveChange = (monI: number, mon: PokemonTeamMember, moveI: number, move: TeamMove | null) => {
        let updatedMoves = [...mon.moves];
        updatedMoves[moveI] = move;
        const nonNullMoves = updatedMoves.filter(move => move !== null); // Filter out non-null values
        const nullMoves = updatedMoves.filter(move => move === null);
        updatedMoves = [...nonNullMoves, ...nullMoves];
        editPokemon(monI, {
            ...mon,
            moves: updatedMoves
        })
    }

    return (
        <Paper sx={{padding: 4, marginBottom: 3}}>
            <Grid container spacing={0.5}>
                {
                    [...Array(6)].map((_, i) => {
                        if (currentSelection.length >= i + 1) {
                            const pokemon = currentTeam.pokemon[i];
                            const selection = currentSelection[i];

                            return (
                                <Grid size={{xs: 2}} key={i}>
                                    <Card type1={pokemon.type1} type2={pokemon.type2} member onClick={() => removePokemon(i)} sx={{marginBottom: 1}}>
                                        <PokemonImg id={pokemon.id} shiny={pokemon.shiny}/>
                                    </Card>
                                    <MemberInfo type1={pokemon.type1} type2={pokemon.type2}>
                                        <Typography variant="h4" color={"#fff"}>{pokemon.name}</Typography>
                                        <ShinyButton
                                            selected={pokemon.shiny}
                                            onChange={() => toggleShiny(i, pokemon, !pokemon.shiny)}
                                            value="shiny"
                                        >
                                            <AutoAwesomeIcon />
                                        </ShinyButton>
                                        <FormControl fullWidth>
                                            <StaticLabel>Ability</StaticLabel>
                                            <Select
                                                variant="outlined"
                                                value={pokemon.ability.id}
                                                onChange={(event) => handleAbilityChange(event, i, pokemon)}
                                                input={<AbilityInput />}
                                            >
                                                {
                                                    selection.abilities.map((ability) => (
                                                        <MenuItem value={ability.id} key={ability.id}>{ability.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        {
                                            [...Array(4)].map((_, mI) => {
                                                return (
                                                    <MoveAutoComplete
                                                        movesList={selection.moves}
                                                        label={`Move ${mI+1}`}
                                                        currentMove={pokemon.moves[mI]}
                                                        updateMove={(move: TeamMove | null) => handleMoveChange(i, pokemon, mI, move)}
                                                    />
                                                )
                                            })
                                        }
                                    </MemberInfo>
                                </Grid>
                            )
                        }

                        return (
                            <Grid size={{xs: 2}} key={i}>
                                <Card type1={null} type2={null} sx={{marginBottom: 1}}>
                                    <PokemonImg id={0} />
                                </Card>
                                <Card type1={null} type2={null}>
                                    <Typography variant="h4" color={"#fff"}>???</Typography>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Paper>
    );
};

export default TeamView;