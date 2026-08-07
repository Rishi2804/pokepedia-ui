import {Box} from "@mui/material";
import {FC, ReactNode} from "react";
import {VisuallyHidden} from "./styles.ts";

interface ISkeletonScreenProps {
    children: ReactNode;
    label?: string;
}

const SkeletonScreen: FC<ISkeletonScreenProps> = ({children, label}) => {
    return (
        <Box role="status" aria-live="polite" aria-busy="true" sx={{width: '100%'}}>
            <VisuallyHidden>{label ?? "Loading"}</VisuallyHidden>
            <Box aria-hidden="true">
                {children}
            </Box>
        </Box>
    )
}

export default SkeletonScreen
