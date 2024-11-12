import {Box, Typography} from "@mui/material";
import VersionGroupImg from "../../../components/VersionGroupImg/VersionGroupImg.tsx";
import {VersionGroup} from "../../../global/enums.ts";

const Header = ({group}: {group?: VersionGroup}) => {

    return (
        <Box style={{justifyContent: 'center', alignItems: 'center', display: "flex", flexDirection: 'column'}}>
            <VersionGroupImg group={group} />
            <Typography>{(group ?? "National") + " Pokedex"}</Typography>
        </Box>
    )
}

export default Header;