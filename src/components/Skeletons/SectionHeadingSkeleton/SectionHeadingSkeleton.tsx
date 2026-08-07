import {SxProps, Theme} from "@mui/material";
import {FC} from "react";
import TextSkeleton from "../TextSkeleton/TextSkeleton.tsx";

interface ISectionHeadingSkeletonProps {
    width?: number | string;
    subtitle?: boolean;
    sx?: SxProps<Theme>;
}

const SectionHeadingSkeleton: FC<ISectionHeadingSkeletonProps> = ({width, subtitle, sx}) => {
    return (
        <>
            <TextSkeleton variant="h2" width={width ?? 260} sx={sx}/>
            {subtitle && <TextSkeleton variant="subtitle1" width={220} sx={{marginBottom: 2}}/>}
        </>
    )
}

export default SectionHeadingSkeleton
