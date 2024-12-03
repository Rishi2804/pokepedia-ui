import {useParams} from "react-router-dom";
import {useAbilityDetails} from "../../../services/api/hooks/useAbilityData.ts";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import {Typography, Grid2 as Grid, Box} from "@mui/material";
import AbilityEffects from "./components/AbilityEffects/AbilityEffects.tsx";
import AbilityDescriptions from "./components/AbilityDescriptions/AbilityDescriptions.tsx";
import PokemonList from "../../../components/PokemonList/PokemonList.tsx";
import QuickScroll from "../../../components/QuickScroll/QuickScroll.tsx";
import Loading from "../../../containers/loading/Loading.tsx";

const Ability = () => {
    const { id } = useParams();
    const { data, loading, error } = useAbilityDetails({abilityIdOrName: id ?? 0})

    if (loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        throw new Error(error)
    }


    if (!data) return null

    const sections = ["Effects", "Descriptions", "Pokemon with Ability"]

    return (
        <>
            <MetaData pageTitle={`${data.name} | PokePedia`} />
            <Typography variant="h1" textAlign={"center"} sx={{marginTop: 3, marginBottom: 3}}>{data.name}</Typography>
            <QuickScroll items={sections} heading={"Content"} />
            <Grid container spacing={4} sx={{paddingTop: 4}}>
                <AbilityEffects effect={data.effect} />
                <AbilityDescriptions entries={data.descriptions} />
                <Box sx={{width: "100%"}} id={"Pokemon with Ability"}>
                    <PokemonList
                        data={data.pokemon}
                        header={"Pokemon with Ability"}
                    />
                </Box>
            </Grid>
        </>
    );
};

export default Ability;