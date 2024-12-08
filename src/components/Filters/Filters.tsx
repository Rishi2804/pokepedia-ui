import {Box, SelectChangeEvent, TextField} from "@mui/material";
import {FC} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import {PokemonType} from "../../global/enums.ts";

interface IFilterProps {
    searchBoxText?: string;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    typeFilters?: PokemonType[];
    setTypeFilters?: (types: PokemonType[]) => void;
    genFilters?: number[];
    setGenFilters?: (types: number[]) => void;
}

const Filters: FC<IFilterProps> = ({searchBoxText, searchTerm, setSearchTerm, typeFilters, setTypeFilters, genFilters, setGenFilters}) => {

    const handleTypeChange = (event: SelectChangeEvent<typeof typeFilters>) => {
        const {
            target: { value },
        } = event;
        setTypeFilters?.(
            typeof value === 'string' ? value.split(',') as PokemonType[] : value as PokemonType[],
        );
    };

    const handleGenChange = (event: SelectChangeEvent<string | number[]>) => {
        const { value } = event.target;
        setGenFilters?.(
            Array.isArray(value)
                ? value.map((v) => (typeof v === 'string' ? Number(v) : v)) // Convert string values to numbers
                : [Number(value)] // Convert single string value to a number and wrap it in an array
        );
    };

    return (
        <Box sx={{flexDirection: 'row', display: 'flex', gap: 2}}>
            <TextField
                label={searchBoxText ?? "Search Pokémon"}
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                sx={{marginBottom: 2, marginTop: 1}}
            />
            {
                typeFilters && setTypeFilters && (
                    <FormControl sx={{m: 1, width: '40%'}}>
                        <InputLabel id="demo-multiple-chip-label">Types</InputLabel>
                        <Select
                            multiple
                            value={typeFilters}
                            onChange={handleTypeChange}
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
                )
            }
            {
                genFilters && setGenFilters && (
                    <FormControl sx={{m: 1, width: '20%'}}>
                        <InputLabel>Gen</InputLabel>
                        <Select
                            multiple
                            value={genFilters}
                            onChange={handleGenChange}
                            input={<OutlinedInput label="Chip"/>}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value}/>
                                    ))}
                                </Box>
                            )}
                        >
                            {[...Array(9)].map((_, i) => (
                                <MenuItem
                                    key={i}
                                    value={i+1}
                                >
                                    {`Gen ${i+1}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )
            }
        </Box>
)
}

export default Filters
