import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {StatRow} from "./styles.tsx";

interface IDexNumberProps {
    bst: number;
}

const InfoSection: FC<IDexNumberProps> = ({bst}) => {
    return (
        <StatRow>
            <Typography minWidth={80}>Total</Typography>
            <Typography minWidth={20}>{bst}</Typography>
            <Box sx={{display: "flex", width: "100%"}} />
            <Typography>Min</Typography>
            <Typography minWidth={30} textAlign="end">Max</Typography>
        </StatRow>
    )
}

export default InfoSection