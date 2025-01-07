import MetaData from "../../components/MetaData/MetaData.tsx";
import {Box, Grid2, Grid2 as Grid, Stack, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {PokemonType} from "../../global/enums.ts";
import TypeIcon from "../../components/TypeIcon/TypeIcon.tsx";
import {TypeCoverage, TypeDefences} from "../../global/types.ts";
import {getTypeDefenses, getTypeStrengths} from "../../global/utils.ts";
import MultRow from "../../components/TypeMultRow/MultRow.tsx";

const Types = () => {
    const theme = useTheme()
    const [types, setTypes] = useState<PokemonType[]>([])
    const [defences, setDefences] = useState<TypeDefences | null>(types.length ? getTypeDefenses(types[0], types[1]) : null)
    const [offense1, setOffense1] = useState<TypeCoverage | null>(types.length ? getTypeStrengths(types[0]) : null)
    const [offense2, setOffense2] = useState<TypeCoverage | null>(types.length > 1 ? getTypeStrengths(types[1]) : null)

    const handleTypeChange = (type: PokemonType) => {
        if (types.includes(type)) {
            setTypes((prev) => prev.filter((t) => t !== type))
        } else if (types.length < 2) {
            setTypes([...types, type])
        } else {
            setTypes([types[1], type])
        }
    }

    useEffect(() => {
        setDefences(types.length ? getTypeDefenses(types[0], types[1]) : null)
        setOffense1(types.length ? getTypeStrengths(types[0]) : null)
        setOffense2(types.length > 1 ? getTypeStrengths(types[1]) : null)
    }, [types])

    return (
        <>
            <MetaData pageTitle={'Types | PokePedia'} />
            <Typography variant="h1" sx={{padding: 3, textAlign: "center"}}>Types</Typography>
            <Grid container spacing={2} sx={{flexWrap: 'wrap'}}>
                {
                    Object.values(PokemonType).map((type) => (
                        <Grid size={{xs: (12/9), sm: (12/18)}} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Box
                                onClick={() => handleTypeChange(type)}
                                sx={{
                                    padding: '1px',
                                    borderRadius: 1,
                                    border: types.includes(type) ? `1.5px solid ${theme.palette.primaryBorder}` : ''
                                }}
                            >
                                <TypeIcon type={type} variant={"filled"} size={50} />
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
            {defences &&
                <>
                    <Typography variant="h2" sx={{marginTop: 2}}>Damage Taken</Typography>
                    <Stack spacing={2} sx={{marginTop: 1}}>
                        <MultRow mult={"2"} types={defences.x2}/>
                        <MultRow mult={"4"} types={defences.x4}/>
                        <MultRow mult={"0"} types={defences.x0}/>
                        <MultRow mult={"1/2"} types={defences.x1_2}/>
                        <MultRow mult={"1/4"} types={defences.x1_4}/>
                    </Stack>
                </>}
            <Grid2 container>
                {offense1 &&
                    <Grid2 size={{xs: 12, sm: 6}}>
                        <Typography variant="h2" sx={{marginTop: 2}}>Damage Dealt: {types[0]}</Typography>
                        <Stack spacing={2} sx={{marginTop: 1}}>
                            <MultRow mult={"2"} types={offense1.x2}/>
                            <MultRow mult={"1/2"} types={offense1.x1_2}/>
                            <MultRow mult={"0"} types={offense1.x0}/>
                        </Stack>
                    </Grid2>}
                {offense2 &&
                    <Grid2 size={{xs: 12, sm: 6}}>
                        <Typography variant="h2" sx={{marginTop: 2}}>Damage Dealt: {types[1]}</Typography>
                        <Stack spacing={2} sx={{marginTop: 1}}>
                            <MultRow mult={"2"} types={offense2.x2}/>
                            <MultRow mult={"1/2"} types={offense2.x1_2}/>
                            <MultRow mult={"0"} types={offense2.x0}/>
                        </Stack>
                    </Grid2>}
            </Grid2>
        </>
    );
};

export default Types;