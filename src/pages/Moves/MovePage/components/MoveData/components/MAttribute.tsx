import {InfoSection} from "../../../styles.tsx";
import {Box, Typography} from "@mui/material";
import {FC} from "react";

interface IMAttributeProps {
    title: string;
    value: number | null;
}

const MAttribute: FC<IMAttributeProps> = ({title, value}) => {
    return (
        <InfoSection>
            <Box sx={{width: '25%'}}>
                <Typography textAlign="right">{title}</Typography>
            </Box>
            <Typography>{value ? value : "--"}</Typography>
        </InfoSection>
    );
};

export default MAttribute;