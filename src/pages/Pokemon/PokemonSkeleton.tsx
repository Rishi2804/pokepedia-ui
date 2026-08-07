import {Box, Grid2 as Grid, Skeleton, Stack} from "@mui/material";
import SkeletonScreen from "../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import QuickScrollSkeleton from "../../components/Skeletons/QuickScrollSkeleton/QuickScrollSkeleton.tsx";
import SpriteCardSkeleton from "../../components/Skeletons/SpriteCardSkeleton/SpriteCardSkeleton.tsx";
import RowsSkeleton from "../../components/Skeletons/RowsSkeleton/RowsSkeleton.tsx";
import EntriesSkeleton from "../../components/Skeletons/EntriesSkeleton/EntriesSkeleton.tsx";
import MoveListSkeleton from "../../components/Skeletons/MoveListSkeleton/MoveListSkeleton.tsx";

const PokemonSkeleton = () => {
    return (
        <SkeletonScreen label="Loading Pokemon">
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2}}>
                <Skeleton variant="circular" width={24} height={24}/>
                <TextSkeleton variant="h1" width={320} align="center" sx={{marginTop: 3}}/>
                <Skeleton variant="circular" width={24} height={24}/>
            </Box>
            <QuickScrollSkeleton count={7}/>

            <Grid container spacing={4} sx={{paddingTop: 4}}>
                <Grid size={{xs: 7, sm: 4}}>
                    <SpriteCardSkeleton borderWidth={10}/>
                </Grid>

                <Grid size={{xs: 12, sm: 8}}>
                    <RowsSkeleton rows={5}/>
                </Grid>

                <Grid size={{xs: 12, sm: 7}}>
                    <RowsSkeleton rows={7}/>
                    <Stack sx={{marginTop: 2}}>
                        <TextSkeleton variant="caption" width={340}/>
                        <TextSkeleton variant="caption" width={320}/>
                        <TextSkeleton variant="caption" width={300}/>
                    </Stack>
                </Grid>

                <Grid size={{xs: 12, sm: 5}}>
                    <TextSkeleton variant="h2" width={220}/>
                    <Skeleton variant="rounded" height={36} sx={{marginTop: 2, width: '100%'}}/>
                    <Stack spacing={1} sx={{marginTop: 2}}>
                        {[...Array(3)].map((_, i) => (
                            <Stack direction="row" spacing={3} key={i}>
                                <Skeleton variant="rounded" width={45} height={45}/>
                                <Skeleton variant="circular" width={45} height={45}/>
                                <Skeleton variant="circular" width={45} height={45}/>
                            </Stack>
                        ))}
                    </Stack>
                </Grid>

                <Grid sx={{width: "100%"}}>
                    <TextSkeleton variant="h2" width={240}/>
                    <Stack direction="row" alignItems="center" justifyContent="center">
                        {[...Array(3)].map((_, i) => (
                            <Box sx={{display: 'flex', width: '150px', flexDirection: 'column'}} key={i}>
                                <Skeleton variant="rectangular" sx={{width: '100%', height: 'auto', aspectRatio: '1 / 1'}}/>
                                <TextSkeleton variant="h4" align="center"/>
                            </Box>
                        ))}
                    </Stack>
                </Grid>

                <Grid size={12}>
                    <TextSkeleton variant="h2" width={220} sx={{marginBottom: 2}}/>
                    <Box sx={{border: '4px solid', borderColor: 'divider', borderRadius: '5px', padding: 1}}>
                        <EntriesSkeleton rows={3} spacing={1}/>
                    </Box>
                </Grid>

                <Grid size={{xs: 12}}>
                    <TextSkeleton variant="h2" width={160} sx={{marginBottom: 2}}/>
                    <Skeleton variant="rounded" height={56} sx={{marginBottom: 2, width: '100%'}}/>
                    <MoveListSkeleton count={6} title={false}/>
                </Grid>

                <Grid size={12}>
                    <TextSkeleton variant="h2" width={140}/>
                </Grid>
                <Grid size={{xs: 0, sm: 3}}/>
                <Grid size={{xs: 5, sm: 3}}>
                    <Skeleton variant="rectangular" sx={{width: '100%', height: 'auto', aspectRatio: '1 / 1'}}/>
                    <TextSkeleton variant="body2" align="center"/>
                </Grid>
                <Grid size={{xs: 5, sm: 3}}>
                    <Skeleton variant="rectangular" sx={{width: '100%', height: 'auto', aspectRatio: '1 / 1'}}/>
                    <TextSkeleton variant="body2" align="center"/>
                </Grid>
                <Grid size={{xs: 0, sm: 3}}/>
            </Grid>
        </SkeletonScreen>
    )
}

export default PokemonSkeleton
