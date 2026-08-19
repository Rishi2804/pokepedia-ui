import {Box, Skeleton, Stack} from "@mui/material";
import {FC} from "react";
import SkeletonScreen from "../../components/Skeletons/SkeletonScreen/SkeletonScreen.tsx";
import TextSkeleton from "../../components/Skeletons/TextSkeleton/TextSkeleton.tsx";
import {ButtonGrid} from "./components/Controls/styles.ts";
import {FormPaper} from "./styles.ts";

// Shaped like the real BattleRoom (room header, field, controls, log) rather
// than a spinner, matching the rest of the site's page-loading convention -
// see pages/Pokemon/PokemonSkeleton.tsx for the pattern this follows.
const BattleRoomSkeleton: FC = () => (
    <SkeletonScreen label="Loading battle">
        <Box sx={{paddingY: 3}}>
            <TextSkeleton variant="h1" width={220} align="center" sx={{marginBottom: 1}}/>
            <TextSkeleton variant="body2" width={140} align="center" sx={{marginBottom: 3}}/>

            <FormPaper sx={{marginBottom: 3}}>
                <Skeleton variant="text" width={160} height={40} sx={{marginX: 'auto'}}/>
            </FormPaper>

            <FormPaper sx={{marginBottom: 3}}>
                <Stack direction="row" spacing={0.75} sx={{marginBottom: 1, justifyContent: 'flex-end'}}>
                    {[0, 1].map(i => <Skeleton key={i} variant="circular" width={32} height={32}/>)}
                </Stack>
                <Skeleton variant="rounded" height={280} sx={{marginBottom: 1.5}}/>
                <Stack direction="row" spacing={0.75}>
                    {[0, 1].map(i => <Skeleton key={i} variant="circular" width={32} height={32}/>)}
                </Stack>
            </FormPaper>

            <FormPaper sx={{marginBottom: 3}}>
                <ButtonGrid>
                    {[0, 1, 2, 3].map(i => <Skeleton key={i} variant="rounded" height={56}/>)}
                </ButtonGrid>
            </FormPaper>

            <FormPaper>
                <Skeleton variant="rounded" height={220}/>
            </FormPaper>
        </Box>
    </SkeletonScreen>
);

export default BattleRoomSkeleton;
