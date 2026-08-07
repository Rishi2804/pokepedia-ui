import {Box, Grid2 as Grid, Skeleton} from "@mui/material";
import SkeletonScreen from "../../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import QuickScrollSkeleton from "../../../components/Skeletons/QuickScrollSkeleton/QuickScrollSkeleton.tsx";
import FiltersSkeleton from "../../../components/Skeletons/FiltersSkeleton/FiltersSkeleton.tsx";

const AbilityHomeSkeleton = () => {
    return (
        <SkeletonScreen label="Loading Abilities">
            <TextSkeleton variant="h1" width={440} align="center" sx={{paddingY: 5}}/>
            <QuickScrollSkeleton count={7}/>
            <FiltersSkeleton/>
            <Box sx={{width: '100%'}}>
                <TextSkeleton variant="h2" width={120} sx={{marginBottom: 2}}/>
                <Grid container spacing={2} sx={{marginBottom: 3}}>
                    {[...Array(20)].map((_, i) => (
                        <Grid size={3} key={i}>
                            <Skeleton variant="rounded" height={60}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </SkeletonScreen>
    )
}

export default AbilityHomeSkeleton
