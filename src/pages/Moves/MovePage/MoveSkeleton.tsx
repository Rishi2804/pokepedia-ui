import {Box, Grid2 as Grid} from "@mui/material";
import SkeletonScreen from "../../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import QuickScrollSkeleton from "../../../components/Skeletons/QuickScrollSkeleton/QuickScrollSkeleton.tsx";
import RowsSkeleton from "../../../components/Skeletons/RowsSkeleton/RowsSkeleton.tsx";
import EntriesSkeleton from "../../../components/Skeletons/EntriesSkeleton/EntriesSkeleton.tsx";
import PokemonListSkeleton from "../../../components/Skeletons/PokemonListSkeleton/PokemonListSkeleton.tsx";

const MoveSkeleton = () => {
    return (
        <SkeletonScreen label="Loading Move">
            <TextSkeleton variant="h1" width={300} align="center" sx={{marginTop: 3, marginBottom: 3}}/>
            <QuickScrollSkeleton count={4}/>
            <Grid container spacing={4} sx={{paddingTop: 4}}>
                <Grid size={{xs: 12, sm: 4}}>
                    <RowsSkeleton rows={5}/>
                </Grid>
                <Grid size={{xs: 12, sm: 8}}>
                    <TextSkeleton variant="h2" width={140} sx={{marginBottom: 1}}/>
                    <TextSkeleton width="100%"/>
                    <TextSkeleton width="100%"/>
                    <TextSkeleton width="62%" sx={{marginBottom: 2}}/>
                </Grid>
                <Grid size={{xs: 12}}>
                    <TextSkeleton variant="h2" width={200} sx={{marginBottom: 2}}/>
                    <EntriesSkeleton rows={4}/>
                </Grid>
                <Box sx={{width: '100%'}}>
                    <TextSkeleton variant="h2" width={280}/>
                    <TextSkeleton variant="subtitle1" width={260} sx={{marginBottom: 2}}/>
                    <PokemonListSkeleton count={12} header={false}/>
                </Box>
            </Grid>
        </SkeletonScreen>
    )
}

export default MoveSkeleton
