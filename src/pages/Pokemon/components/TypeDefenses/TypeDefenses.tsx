import {FC} from "react";
import {PokemonType} from "../../../../global/enums.ts";
import {getTypeDefenses} from "../../../../global/utils.ts";
import {Grid2 as Grid, Stack, Typography} from "@mui/material";
import DefenseRow from "./DefenseRow.tsx";

interface IDexNumberProps {
    type1: PokemonType;
    type2: PokemonType | null;
}

const TypeDefenses: FC<IDexNumberProps> = ({type1, type2}) => {
    const defences = getTypeDefenses(type1, type2)

    return (
        <Grid size={{xs: 12, sm: 5}} id={"Type Defenses"}>
            <Typography variant="h2" marginBottom={2}>Type Defenses</Typography>
            <Stack spacing={1}>
                <DefenseRow mult={"2"} types={defences.x2}/>
                <DefenseRow mult={"4"} types={defences.x4}/>
                <DefenseRow mult={"0"} types={defences.x0}/>
                <DefenseRow mult={"1/2"} types={defences.x1_2}/>
                <DefenseRow mult={"1/4"} types={defences.x1_4}/>
            </Stack>
        </Grid>
    )
}

export default TypeDefenses