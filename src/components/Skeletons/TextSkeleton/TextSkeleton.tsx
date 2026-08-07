import {Skeleton, SxProps, Theme, Typography, TypographyProps} from "@mui/material";
import {FC} from "react";

interface ITextSkeletonProps {
    variant?: TypographyProps['variant'];
    width?: number | string;
    align?: 'left' | 'center';
    sx?: SxProps<Theme>;
}

const TextSkeleton: FC<ITextSkeletonProps> = ({variant, width, align, sx}) => {
    return (
        <Typography variant={variant ?? 'body1'} sx={sx}>
            <Skeleton width={width ?? '100%'} sx={{mx: align === 'center' ? 'auto' : undefined}}/>
        </Typography>
    )
}

export default TextSkeleton
