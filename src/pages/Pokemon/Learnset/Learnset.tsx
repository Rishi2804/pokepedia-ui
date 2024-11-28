import {Box, Grid2 as Grid, SelectChangeEvent, Typography} from "@mui/material";
import {Moveset} from "../../../global/types.ts";
import {FC, useEffect, useState} from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {VersionGroup} from "../../../global/enums.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MoveList from "./MoveList.tsx";

interface ILearnsetProps {
    learnset: Moveset[];
}

const Learnset: FC<ILearnsetProps> = ({learnset}) => {
    const [currentVG, setCurrentVG] = useState<VersionGroup>(learnset[learnset.length-1].versionGroup)

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentVG(event.target.value as VersionGroup);
    };

    useEffect(() => {
        setCurrentVG(learnset[learnset.length-1].versionGroup)
    }, [learnset]);

    return (
        <Grid size={{xs: 12}}>
            <Typography variant="h2" sx={{marginBottom: 2}}>Learnset</Typography>
            <FormControl fullWidth sx={{marginBottom: 2}}>
                <InputLabel>Version Group</InputLabel>
                <Select
                    label="Version Group"
                    value={currentVG}
                    onChange={handleChange}
                >
                    {
                        learnset.map((set) => set.versionGroup).map((group) => (
                            <MenuItem value={group}>{group}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <Box sx={{display: 'flex', gap: 3, flexWrap: 'wrap'}}>
            {
                learnset.find(set => set.versionGroup === currentVG)?.learnMethodSets.map((set, index) => {
                    return (
                        <Box key={index}>
                            <MoveList moves={set.moves} title={set.method}/>
                        </Box>
                    )
                })
            }
            </Box>
        </Grid>

    );
};

export default Learnset;