import MetaData from "../../components/MetaData/MetaData.tsx";
import {Box, Grid2 as Grid, Typography, useTheme} from "@mui/material";
import {useEffect, useState} from "react";
import {PokemonType} from "../../global/enums.ts";
import TypeIcon from "../../components/TypeIcon/TypeIcon.tsx";
import {TypeDefences} from "../../global/types.ts";
import {getTypeDefenses} from "../../global/utils.ts";

const Types = () => {
    const theme = useTheme()
    const [types, setTypes] = useState<PokemonType[]>([])
    const [defences, setDefences] = useState<TypeDefences | null>(types.length ? getTypeDefenses(types[0], types[1]) : null)

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

        </>
    );
};

export default Types;