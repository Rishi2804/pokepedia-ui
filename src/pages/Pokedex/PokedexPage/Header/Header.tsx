import {Box, Typography} from "@mui/material";
import VersionGroupImg from "../../../../components/VersionGroupImg/VersionGroupImg.tsx";
import {PokedexVersion} from "../../enums.ts";
import {VersionToHeaderText} from "../utils.ts";

const Header = ({dex}: {dex?: PokedexVersion}) => {

    return (
        <Box style={{justifyContent: 'center', alignItems: 'center', display: "flex", flexDirection: 'column'}}>
            <VersionGroupImg dex={dex} />
            <Typography>{(dex ? VersionToHeaderText[dex] : "National") + " Pokedex"}</Typography>
        </Box>
    )
}

export default Header;