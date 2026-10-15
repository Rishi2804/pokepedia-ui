import {useParams} from "react-router-dom";
import {Box, Chip, Grid2 as Grid, Typography} from "@mui/material";
import {useItemDetails} from "../../../services/api/hooks/useItemData.ts";
import MetaData from "../../../components/MetaData/MetaData.tsx";
import PokemonList from "../../../components/PokemonList/PokemonList.tsx";
import QuickScroll from "../../../components/QuickScroll/QuickScroll.tsx";
import ItemImage from "../../../components/ItemImage/ItemImage.tsx";
import ItemEffects from "./components/ItemEffects/ItemEffects.tsx";
import ItemDetails from "./components/ItemDetails/ItemDetails.tsx";
import ItemDescriptions from "./components/ItemDescriptions/ItemDescriptions.tsx";
import ItemSkeleton from "./ItemSkeleton.tsx";

const Item = () => {
    const {id} = useParams();
    const {data, isPending, error} = useItemDetails(id ?? 0);

    if (isPending) {
        return <ItemSkeleton/>;
    }

    if (error) {
        throw error;
    }

    const hasDescriptions = data.descriptions.length > 0;
    const hasHolders = data.pokemon.length > 0;
    const sections = [
        "Effects",
        "Details",
        ...(hasDescriptions ? ["Descriptions"] : []),
        ...(hasHolders ? ["Pokemon Holding Item"] : []),
    ];

    return (
        <>
            <MetaData pageTitle={`${data.name} | PokePedia`}/>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: 2, marginTop: 3, marginBottom: 1}}>
                <ItemImage image={data.image} name={data.name} size={64}/>
                <Typography variant="h1" textAlign={"center"}>{data.name}</Typography>
            </Box>
            {data.holdable && (
                <Box sx={{display: "flex", justifyContent: "center", marginBottom: 3}}>
                    <Chip label="Holdable" color="primary" size="small"/>
                </Box>
            )}
            <QuickScroll items={sections} heading={"Content"}/>
            <Grid container spacing={4} sx={{paddingTop: 4}}>
                <ItemEffects effect={data.effect} shortEffect={data.shortEffect}/>
                <ItemDetails item={data}/>
                {hasDescriptions && <ItemDescriptions entries={data.descriptions}/>}
                {hasHolders && (
                    <Box sx={{width: "100%"}} id={"Pokemon Holding Item"}>
                        <PokemonList
                            data={data.pokemon}
                            header={"Pokemon Holding Item"}
                        />
                    </Box>
                )}
            </Grid>
        </>
    );
};

export default Item;
