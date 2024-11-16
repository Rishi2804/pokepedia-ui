import {Box, SelectChangeEvent, TextField} from "@mui/material";
import {FC} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import {PokemonType} from "../../../../global/enums.ts";

interface IFilterProps {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    typeFilters: PokemonType[];
    setTypeFilters: (types: PokemonType[]) => void;
}

const Filters: FC<IFilterProps> = ({searchTerm, setSearchTerm, handleKeyDown, typeFilters, setTypeFilters}) => {

    const handleChange = (event: SelectChangeEvent<typeof typeFilters>) => {
        const {
            target: { value },
        } = event;
        setTypeFilters(
            typeof value === 'string' ? value.split(',') as PokemonType[] : value as PokemonType[],
        );
    };

    return (
        <Box sx={{flexDirection: 'row', display: 'flex', gap: 2}}>
            <TextField
                label="Search Pokémon"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
                sx={{marginBottom: 2, marginTop: 1}}
            />
            <FormControl sx={{m: 1, width: '40%'}}>
                <InputLabel id="demo-multiple-chip-label">Types</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={typeFilters}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                >
                    {Object.values(PokemonType).map((type) => (
                        <MenuItem
                            key={type}
                            value={type}
                        >
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
)
}

export default Filters
