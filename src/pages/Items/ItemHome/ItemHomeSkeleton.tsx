import {Box, Grid2 as Grid, Skeleton} from "@mui/material";
import SkeletonScreen from "../../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import QuickScrollSkeleton from "../../../components/Skeletons/QuickScrollSkeleton/QuickScrollSkeleton.tsx";
import FiltersSkeleton from "../../../components/Skeletons/FiltersSkeleton/FiltersSkeleton.tsx";

const ItemHomeSkeleton = () => {
    return (
        <SkeletonScreen label="Loading Items">
            <TextSkeleton variant="h1" width={200} align="center" sx={{paddingY: 5}}/>
            <QuickScrollSkeleton count={7}/>
            <FiltersSkeleton/>
            <Box sx={{width: '100%'}}>
                <TextSkeleton variant="h2" width={160} sx={{marginBottom: 2}}/>
                <Grid container spacing={2} sx={{marginBottom: 3}}>
                    {[...Array(20)].map((_, i) => (
                        <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={i}>
                            <Skeleton variant="rounded" height={56}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </SkeletonScreen>
    )
}

export default ItemHomeSkeleton
