import {useParams} from "react-router-dom";
import {useSpeciesDetails} from "../../services/api/hooks/useSpeciesData.ts";
import {Grid2 as Grid, Typography} from "@mui/material";
import {Card} from "./styles.ts";
import {useState} from "react";
import PokemonImg from "../../components/PokemonImg/PokemonImg.tsx";
import {formatText} from "../../global/utils.ts";
import {StyledTab, StyledTabs} from "./FormTabs/styles.tsx";
import MetaData from "../../components/MetaData/MetaData.tsx";

const Pokemon = () => {
    const { id } = useParams();
    const { data } = useSpeciesDetails({speciesIdOrName: id ?? 0})
    const [i, setI] = useState<number>(0)

    if (!data) {
        return null
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setI(newValue)
    }

    return (
        <>
            <MetaData pageTitle={`${formatText(data.name)} | PokePedia`} />
            <Typography variant="h1" textAlign={"center"}>{formatText(data.name)}</Typography>
            <StyledTabs value={i} onChange={handleChange}>
                {
                    data.pokemon.map((pokemon) => (
                        <StyledTab label={pokemon.name} key={pokemon.name} />
                    ))
                }
            </StyledTabs>
            <Grid container spacing={1} sx={{paddingTop: 4}}>
                <Grid size={{xs: 4}}>
                    <Card type1={data.pokemon[i].type1} type2={data.pokemon[i].type2}>
                        <PokemonImg id={data.pokemon[i].id} />
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Pokemon