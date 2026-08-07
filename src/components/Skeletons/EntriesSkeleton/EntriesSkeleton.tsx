import {Skeleton, Stack} from "@mui/material";
import {FC} from "react";

interface IEntriesSkeletonProps {
    rows?: number;
    spacing?: number;
}

const EntriesSkeleton: FC<IEntriesSkeletonProps> = ({rows, spacing}) => {
    return (
        <Stack spacing={spacing ?? 2}>
            {[...Array(rows ?? 4)].map((_, i) => (
                <Skeleton key={i} variant="rounded" height={44} sx={{borderRadius: '13px'}}/>
            ))}
        </Stack>
    )
}

export default EntriesSkeleton
