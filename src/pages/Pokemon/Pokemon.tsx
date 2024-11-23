import {useParams} from "react-router-dom";
import {useSpeciesDetails} from "../../services/api/hooks/useSpeciesData.ts";
import {Box, Grid2 as Grid, Stack, Typography} from "@mui/material";
import {Card} from "./styles.ts";
import {useState} from "react";
import PokemonImg from "../../components/PokemonImg/PokemonImg.tsx";
import {formatText} from "../../global/utils.ts";
import MetaData from "../../components/MetaData/MetaData.tsx";
import TypeIcon from "../../components/TypeIcon/TypeIcon.tsx";
import FormTabs from "./FormTabs/FormTabs.tsx";

const Pokemon = () => {
    const { id } = useParams();
    const { data } = useSpeciesDetails({speciesIdOrName: id ?? 0})
    const [i, setI] = useState<number>(0)

    if (!data) {
        return null
    }

    return (
        <>
            <MetaData pageTitle={`${formatText(data.name)} | PokePedia`} />

            <Typography variant="h1" textAlign={"center"} sx={{marginTop: 3}}>{formatText(data.name)}</Typography>
            <FormTabs forms={data.pokemon.map((pokemon) => (pokemon.name))} i={i} setI={setI} />

            <Grid container spacing={4} sx={{paddingTop: 4}}>
                <Grid size={{xs: 4}}>
                    <Card type1={data.pokemon[i].type1} type2={data.pokemon[i].type2}>
                        <PokemonImg id={data.pokemon[i].id} />
                    </Card>
                </Grid>
                <Grid size={{xs: 8}}>
                    <Stack>
                        <Typography variant="h2">Data</Typography>
                        <Box>
                            <Typography variant="h4">Type</Typography>
                            <TypeIcon type={data.pokemon[i].type1} />
                            {data.pokemon[i].type2 && <TypeIcon type={data.pokemon[i].type2}/>}
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default Pokemon