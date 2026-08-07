import {Box, Grid2 as Grid, Paper, Skeleton} from "@mui/material";
import SkeletonScreen from "../../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import FiltersSkeleton from "../../../components/Skeletons/FiltersSkeleton/FiltersSkeleton.tsx";
import SpriteCardSkeleton from "../../../components/Skeletons/SpriteCardSkeleton/SpriteCardSkeleton.tsx";

const TeamSelectionSkeleton = () => {
    return (
        <SkeletonScreen label="Loading Team">
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Skeleton variant="circular" width={24} height={24}/>
                <TextSkeleton variant="h1" width={360} align="center" sx={{padding: '10px'}}/>
                <Box sx={{display: 'flex', gap: 1}}>
                    <Skeleton variant="rounded" width={140} height={36}/>
                    <Skeleton variant="rounded" width={140} height={36}/>
                </Box>
            </Box>
            <Paper sx={{padding: 4, marginBottom: 3}}>
                <Grid container spacing={0.5}>
                    {[...Array(6)].map((_, i) => (
                        <Grid size={{xs: 2}} key={i}>
                            <SpriteCardSkeleton borderWidth={3} borderRadius={5}/>
                            <Skeleton variant="rounded" height={35} sx={{marginTop: 1}}/>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 3}}>
                    <Box sx={{display: 'flex', gap: 2}}>
                        <Skeleton variant="rounded" width={200} height={36}/>
                        <Skeleton variant="rounded" width={150} height={36}/>
                    </Box>
                    <Skeleton variant="rounded" width={110} height={36}/>
                </Box>
            </Paper>
            <Paper sx={{px: 4, py: 2}}>
                <FiltersSkeleton types gens/>
                <Box sx={{width: '100%', paddingBottom: 2}}>
                    <TextSkeleton variant="h2" width={220}/>
                    <Grid container spacing={1}>
                        {[...Array(30)].map((_, i) => (
                            <Grid size={{xs: 1, sm: 12 / 15}} key={i}>
                                <SpriteCardSkeleton borderWidth={3} borderRadius={5}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </SkeletonScreen>
    )
}

export default TeamSelectionSkeleton
