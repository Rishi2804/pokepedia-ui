import {useAbilitiesDetails} from "../../../services/api/hooks/useAbilitiesData.ts";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import {Box, Grid2 as Grid, Typography} from "@mui/material";
import {AbilityContainer, AbilityText} from "./styles.ts";
import QuickScroll from "../../../components/QuickScroll/QuickScroll.tsx";
import Filters from "../../../components/Filters/Filters.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {navName} from "../../../global/utils.ts";
import Loading from "../../../containers/loading/Loading.tsx";

const AbilityHome = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { data, loading, error } = useAbilitiesDetails();
    const navigate = useNavigate();

    const handleNavigate = (ability: string) => {
        navigate(`/ability/${navName(ability)}`)
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        throw new Error(error)
    }


    return (
        <>
            <MetaData pageTitle={`Abilities | PokePedia`} />
            <Typography variant="h1" sx={{paddingY: 5, textAlign: "center"}}>Pokemon Abilities</Typography>
            <QuickScroll items={data.map((_, index) => `Gen ${index+3}`)} heading={"Jump to:"} />
            <Filters searchBoxText={"Search Abilities"} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {
                data.map((abilityList, index) => (
                    <Box sx={{width:'100%'}} id={`Gen ${index+3}`}>
                        <Typography variant="h2" sx={{marginBottom: 2}}>{`Gen ${index+3}`}</Typography>
                        <Grid container spacing={2} sx={{marginBottom: 3}}>
                            {
                                abilityList.map((ability, index) => {
                                    const regex = new RegExp(searchTerm, "i");
                                    if (!regex.test(ability.name)) {
                                        return null;
                                    }

                                    return (
                                        <Grid size={3}>
                                            <AbilityContainer>
                                                <AbilityText onClick={() => handleNavigate(ability.name)} key={index}>{ability.name}</AbilityText>
                                            </AbilityContainer>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                ))
            }
        </>
    );
};

export default AbilityHome;