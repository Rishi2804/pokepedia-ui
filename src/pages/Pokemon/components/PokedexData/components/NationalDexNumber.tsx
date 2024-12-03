import {FC} from "react";
import {Typography} from "@mui/material";
import {InfoSection} from "../styles.tsx";

interface IDexNumberProps {
    id: number;
}

const NationalDexNumber: FC<IDexNumberProps> = ({id}) => {

    return (
        <InfoSection>
            <Typography sx={{fontWeight: 600}}>National Dex Number</Typography>
            <Typography sx={{fontWeight: 600}}>{id}</Typography>
        </InfoSection>
    )
}

export default NationalDexNumber