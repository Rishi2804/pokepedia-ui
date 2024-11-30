import {Typography} from "@mui/material";
import {InfoSection} from "../../../styles.tsx";
// import {FC} from "react";
import {PokemonType} from "../../../../../../global/enums.ts";
import TypeIcon from "../../../../../../components/TypeIcon/TypeIcon.tsx";

const MType = ({type}: {type: PokemonType}) => {
    return (
        <InfoSection>
            <Typography>Type</Typography>
            <TypeIcon type={type} />
        </InfoSection>
    );
};

export default MType;