import {Box, Divider, Skeleton, Stack} from "@mui/material";
import {FC} from "react";
import TextSkeleton from "../TextSkeleton/TextSkeleton.tsx";

interface IRowsSkeletonProps {
    rows?: number;
    rowHeight?: number;
    heading?: boolean;
    headingWidth?: number | string;
    widths?: (number | string)[];
}

const defaultWidths = ['85%', '60%', '75%', '55%', '80%', '65%', '70%'];

const RowsSkeleton: FC<IRowsSkeletonProps> = ({rows, rowHeight, heading, headingWidth, widths}) => {
    const rowCount = rows ?? 5;
    const rowWidths = widths ?? defaultWidths;

    return (
        <Stack divider={<Divider flexItem/>}>
            {(heading ?? true) && <TextSkeleton variant="h2" width={headingWidth ?? 180} sx={{marginBottom: 2}}/>}
            {[...Array(rowCount)].map((_, i) => (
                <Box key={i} sx={{display: 'flex', alignItems: 'center', height: rowHeight ?? 44}}>
                    <Skeleton variant="text" width={rowWidths[i % rowWidths.length]} sx={{fontSize: '20px'}}/>
                </Box>
            ))}
        </Stack>
    )
}

export default RowsSkeleton
