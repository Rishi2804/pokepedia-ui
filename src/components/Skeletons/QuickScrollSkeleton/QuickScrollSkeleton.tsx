import {Box, Skeleton} from "@mui/material";
import {FC} from "react";
import {Container} from "../../QuickScroll/styles.ts";
import TextSkeleton from "../TextSkeleton/TextSkeleton.tsx";

interface IQuickScrollSkeletonProps {
    count?: number;
}

const QuickScrollSkeleton: FC<IQuickScrollSkeletonProps> = ({count}) => {
    return (
        <Container>
            <TextSkeleton variant="h5" width={90}/>
            <Box sx={{display: "flex", gap: 2}}>
                {[...Array(count ?? 5)].map((_, i) => (
                    <Skeleton key={i} variant="rounded" width={96} height={36}/>
                ))}
            </Box>
        </Container>
    )
}

export default QuickScrollSkeleton
