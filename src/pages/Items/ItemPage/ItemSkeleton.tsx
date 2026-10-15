import {Box, Grid2 as Grid, Paper} from "@mui/material";
import SkeletonScreen from "../../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import QuickScrollSkeleton from "../../../components/Skeletons/QuickScrollSkeleton/QuickScrollSkeleton.tsx";
import EntriesSkeleton from "../../../components/Skeletons/EntriesSkeleton/EntriesSkeleton.tsx";
import PokemonListSkeleton from "../../../components/Skeletons/PokemonListSkeleton/PokemonListSkeleton.tsx";

const ItemSkeleton = () => {
    return (
        <SkeletonScreen label="Loading Item">
            <TextSkeleton variant="h1" width={300} align="center" sx={{marginTop: 3, marginBottom: 3}}/>
            <QuickScrollSkeleton count={4}/>
            <Grid container spacing={4} sx={{paddingTop: 4}}>
                <Grid size={12}>
                    <TextSkeleton variant="h2" width={140} sx={{marginBottom: 1}}/>
                    <TextSkeleton width="100%" sx={{marginBottom: 2}}/>
                </Grid>
                <Grid size={12}>
                    <TextSkeleton variant="h2" width={140} sx={{marginBottom: 2}}/>
                    <Paper sx={{padding: 2}}>
                        <EntriesSkeleton rows={2}/>
                    </Paper>
                </Grid>
                <Grid size={12}>
                    <TextSkeleton variant="h2" width={200} sx={{marginBottom: 2}}/>
                    <Paper sx={{padding: 2}}>
                        <EntriesSkeleton rows={4}/>
                    </Paper>
                </Grid>
                <Box sx={{width: '100%'}}>
                    <PokemonListSkeleton count={6}/>
                </Box>
            </Grid>
        </SkeletonScreen>
    )
}

export default ItemSkeleton
