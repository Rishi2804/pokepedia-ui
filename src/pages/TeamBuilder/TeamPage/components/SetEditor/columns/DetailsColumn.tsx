import {FC} from "react";
import {Box, Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {AbilityInput, GenderButton, ShinyButton, StaticLabel} from "../../../styles.ts";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import GenderlessIcon from "@mui/icons-material/Transgender";
import ShinyIcon from "@mui/icons-material/AutoAwesome";
import TeraTypeMenu from "../../TeraTypeDropdown/TeraTypeMenu.tsx";
import {ColumnPaper} from "../styles.ts";
import {PokemonTeamMember, TeamCandidate} from "../../../../../../global/types.ts";
import {PokemonType} from "../../../../../../global/enums.ts";
import {GenRules} from "../../../../genRules.ts";
import {itemsForGen} from "../../../../../../global/data/items.ts";
import {useTeamStore} from "../../../../../../store/teamStore.ts";

interface DetailsColumnProps {
    slot: number;
    member: PokemonTeamMember;
    candidate: TeamCandidate;
    rules: GenRules;
    editMode: boolean;
    itemGen: number;
}

const DetailsColumn: FC<DetailsColumnProps> = ({slot, member, candidate, rules, editMode, itemGen}) => {
    const {editPokemon} = useTeamStore();
    const update = (patch: Partial<PokemonTeamMember>) => editPokemon(slot, {...member, ...patch});

    const handleAbilityChange = (event: SelectChangeEvent<number>) => {
        const ability = candidate.abilities.find(a => a.id === event.target.value);
        if (ability) update({ability});
    };

    const handleTeraTypeChange = (tera?: PokemonType) => {
        const moves = member.moves.map(move =>
            move?.id === 851 ? {...move, type: tera ?? PokemonType.NORMAL} : move
        );
        update({teraType: tera, moves});
    };

    const items = itemsForGen(itemGen);

    return (
        <ColumnPaper elevation={2}>
            <Typography variant="h4" sx={{marginBottom: 2}}>Details</Typography>

            <TextField
                fullWidth
                label="Nickname"
                placeholder={member.name}
                value={member.nickname ?? ''}
                onChange={e => update({nickname: e.target.value || null})}
                disabled={!editMode}
                sx={{marginBottom: 2}}
            />

            <TextField
                fullWidth
                type="number"
                label="Level"
                value={member.level}
                onChange={e => update({level: Math.min(100, Math.max(1, Number(e.target.value) || 1))})}
                disabled={!editMode}
                slotProps={{htmlInput: {min: 1, max: 100}}}
                sx={{marginBottom: 2}}
            />

            <Box sx={{display: 'flex', gap: 1, alignItems: 'center', marginBottom: 2}}>
                <GenderButton
                    gender={member.gender}
                    onChange={() => update({gender: member.gender === 'male' ? 'female' : 'male'})}
                    value="gender"
                    disabled={member.genderLock || !editMode}
                >
                    {member.gender === 'male' ? <MaleIcon/> : member.gender === 'female' ? <FemaleIcon/> : <GenderlessIcon/>}
                </GenderButton>
                <ShinyButton
                    selected={member.shiny}
                    onChange={() => update({shiny: !member.shiny})}
                    value="shiny"
                    disabled={!editMode}
                >
                    <ShinyIcon sx={{width: 20, height: 20}}/>
                </ShinyButton>
                {rules.tera && (
                    <TeraTypeMenu teraType={member.teraType} changeTeraType={handleTeraTypeChange} disabled={!editMode}/>
                )}
            </Box>

            {rules.items && (
                <FormControl fullWidth sx={{marginBottom: 2}}>
                    <StaticLabel>Held Item</StaticLabel>
                    <Select
                        variant="outlined"
                        value={member.item ?? ''}
                        onChange={e => update({item: e.target.value || null})}
                        input={<AbilityInput/>}
                        disabled={!editMode}
                    >
                        <MenuItem value="">None</MenuItem>
                        {items.map(item => (
                            <MenuItem value={item.slug} key={item.slug}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {rules.abilities && (
                <FormControl fullWidth sx={{marginBottom: 2}}>
                    <StaticLabel>Ability</StaticLabel>
                    <Select
                        variant="outlined"
                        value={member.ability?.id ?? ''}
                        onChange={handleAbilityChange}
                        input={<AbilityInput/>}
                        disabled={!editMode}
                    >
                        {candidate.abilities.map(ability => (
                            <MenuItem value={ability.id} key={ability.id}>{ability.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {rules.happiness && (
                <TextField
                    fullWidth
                    type="number"
                    label="Happiness"
                    value={member.happiness}
                    onChange={e => update({happiness: Math.min(255, Math.max(0, Number(e.target.value) || 0))})}
                    disabled={!editMode}
                    slotProps={{htmlInput: {min: 0, max: 255}}}
                    sx={{marginBottom: 2}}
                />
            )}

            {rules.pokeball && (
                <TextField
                    fullWidth
                    label="Poké Ball"
                    value={member.pokeball}
                    onChange={e => update({pokeball: e.target.value})}
                    disabled={!editMode}
                    sx={{marginBottom: 2}}
                />
            )}

            {rules.dynamax && (
                <>
                    <TextField
                        fullWidth
                        type="number"
                        label="Dynamax Level"
                        value={member.dynamaxLevel}
                        onChange={e => update({dynamaxLevel: Math.min(10, Math.max(0, Number(e.target.value) || 0))})}
                        disabled={!editMode}
                        slotProps={{htmlInput: {min: 0, max: 10}}}
                        sx={{marginBottom: 1}}
                    />
                    <FormControlLabel
                        label="Gigantamax"
                        control={
                            <Checkbox
                                checked={member.gigantamax}
                                onChange={e => update({gigantamax: e.target.checked})}
                                disabled={!editMode}
                            />
                        }
                    />
                </>
            )}
        </ColumnPaper>
    );
};

export default DetailsColumn;
