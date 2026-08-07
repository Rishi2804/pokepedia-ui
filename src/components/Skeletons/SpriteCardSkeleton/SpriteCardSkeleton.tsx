import {Skeleton} from "@mui/material";
import {FC} from "react";
import {CardShell} from "./styles.ts";

interface ISpriteCardSkeletonProps {
    borderWidth?: number;
    borderRadius?: number;
}

const SpriteCardSkeleton: FC<ISpriteCardSkeletonProps> = ({borderWidth, borderRadius}) => {
    return (
        <CardShell borderWidth={borderWidth ?? 6} borderRadius={borderRadius ?? 15}>
            <Skeleton variant="rectangular" sx={{width: '100%', height: 'auto', aspectRatio: '1 / 1'}}/>
        </CardShell>
    )
}

export default SpriteCardSkeleton
