import {Grid2 as Grid} from "@mui/material";
import {FC} from "react";
import MoveCardSkeleton from "../MoveCardSkeleton/MoveCardSkeleton.tsx";
import TextSkeleton from "../TextSkeleton/TextSkeleton.tsx";

interface IMoveListSkeletonProps {
    count?: number;
    title?: boolean;
}

const MoveListSkeleton: FC<IMoveListSkeletonProps> = ({count, title}) => {
    return (
        <>
            {(title ?? true) && <TextSkeleton variant="h2" width={200} sx={{marginBottom: 2}}/>}
            <Grid container spacing={2} sx={{marginBottom: 3}}>
                {[...Array(count ?? 10)].map((_, i) => (
                    <Grid size={{xs: 12, md: 6}} key={i}>
                        <MoveCardSkeleton/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default MoveListSkeleton
