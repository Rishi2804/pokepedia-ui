import {Box, Typography} from "@mui/material";
import {InfoSection} from "../../../styles.tsx";
// import {FC} from "react";
import {PokemonType} from "../../../../../../global/enums.ts";
import TypeIcon from "../../../../../../components/TypeIcon/TypeIcon.tsx";

const MType = ({type}: {type: PokemonType}) => {
    return (
        <InfoSection>
            <Box sx={{width:'25%'}}>
                <Typography textAlign="right">Type</Typography>
            </Box>
            <TypeIcon type={type} />
        </InfoSection>
    );
};

export default MType;