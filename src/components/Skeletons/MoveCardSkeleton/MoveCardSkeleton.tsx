import {Box, Skeleton} from "@mui/material";
import {CardShell, SectionColumn} from "./styles.ts";
import TextSkeleton from "../TextSkeleton/TextSkeleton.tsx";

const MoveCardSkeleton = () => {
    return (
        <CardShell>
            <Box sx={{display: 'flex', gap: 4, alignItems: "center"}}>
                <TextSkeleton variant="h5" width={150}/>
            </Box>
            <Box sx={{display: 'flex', gap: 6}}>
                <SectionColumn>
                    <TextSkeleton variant="h5" width={70}/>
                    <TextSkeleton variant="h5" width={40}/>
                </SectionColumn>
                <SectionColumn>
                    <TextSkeleton variant="h5" width={70}/>
                    <TextSkeleton variant="h5" width={40}/>
                </SectionColumn>
                <SectionColumn>
                    <TextSkeleton variant="h5" width={70}/>
                    <TextSkeleton variant="h5" width={40}/>
                </SectionColumn>
                <SectionColumn sx={{gap: 1}}>
                    <Skeleton variant="circular" width={25} height={25}/>
                    <Skeleton variant="circular" width={25} height={25}/>
                </SectionColumn>
            </Box>
        </CardShell>
    )
}

export default MoveCardSkeleton
