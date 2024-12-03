import {FC} from "react";
import {Stack, Typography} from "@mui/material";
import {InfoSection} from "../styles.tsx";
import TypeIcon from "../../../../../components/TypeIcon/TypeIcon.tsx";
import {PokemonType} from "../../../../../global/enums.ts";

interface IPTypesProps {
    type1: PokemonType;
    type2: PokemonType | null;
}

const PTypes: FC<IPTypesProps> = ({type1, type2}) => {

    return (
        <InfoSection>
            <Typography>Type</Typography>
            <Stack direction={"row"} spacing={1}>
                <TypeIcon type={type1} />
                {type2 && <TypeIcon type={type2}/>}
            </Stack>
        </InfoSection>
    )
}

export default PTypes