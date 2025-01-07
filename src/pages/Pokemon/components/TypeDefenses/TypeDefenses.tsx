import {FC, useEffect, useState} from "react";
import {PokemonType} from "../../../../global/enums.ts";
import {abilityImmunities, getTypeDefenses} from "../../../../global/utils.ts";
import {Box, Grid2 as Grid, Stack, Typography} from "@mui/material";
import MultRow from "../../../../components/TypeMultRow/MultRow.tsx";
import {TypeDefences} from "../../../../global/types.ts";
import FormTabs from "../FormTabs/FormTabs.tsx";

interface IDexNumberProps {
    type1: PokemonType;
    type2: PokemonType | null;
    abilities: {
        id: number;
        name: string;
    }[];
}

const TypeDefenses: FC<IDexNumberProps> = ({type1, type2, abilities}) => {
    const [list, setList] = useState([{id: 0, name: "Regular"}]);
    const [i, setI] = useState<number>(0)
    const [defences, setDefences] = useState<TypeDefences>(getTypeDefenses(type1, type2, list[i].id))

    useEffect(() => {
        const filteredList = abilities.filter(ability => {
            return Object.keys(abilityImmunities).includes(String(ability.id));
        });
        if (filteredList.length < abilities.length) {
            filteredList.unshift({id: 0, name: "Regular"});
        }
        setI(0);
        setList(filteredList);
    }, [abilities]);

    useEffect(() => {
        setDefences(getTypeDefenses(type1, type2, list[i].id))
    }, [i, list]);

    return (
        <Grid size={{xs: 12, sm: 5}} id={"Type Defenses"}>
            <Typography variant="h2">Type Defenses</Typography>
            <Box sx={{marginTop: 2}}>
                <FormTabs
                    condensed
                    forms={list.map(ability => ability.name)}
                    i={i}
                    setI={setI}
                />
            </Box>
            <Stack spacing={1} sx={{marginTop: 2}}>
                <MultRow mult={"2"} types={defences.x2}/>
                <MultRow mult={"4"} types={defences.x4}/>
                <MultRow mult={"0"} types={defences.x0}/>
                <MultRow mult={"1/2"} types={defences.x1_2}/>
                <MultRow mult={"1/4"} types={defences.x1_4}/>
            </Stack>
        </Grid>
    )
}

export default TypeDefenses