import {Paper} from "@mui/material";
import VersionGroupImg from "../VersionGroupImg/VersionGroupImg.tsx";
import {VersionGroup} from "../../global/enums.ts";

interface IPokedexSelectorProps {
    group: VersionGroup;
}

const PokedexSelector = ({group}: IPokedexSelectorProps) => {

    return (
        <Paper sx={{width: 330, height: 120, align:'center', display: "flex", justifyContent:'center', padding: 2}}>
            <VersionGroupImg group={group} />
        </Paper>
    )
}

export default PokedexSelector