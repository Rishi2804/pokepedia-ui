import {Typography} from "@mui/material";
import VersionGroupImg from "../../../../components/VersionGroupImg/VersionGroupImg.tsx";
import {PokedexVersion} from "../../enums.ts";
import {VersionToHeaderText} from "../utils.ts";
import {DexHeader} from "./styles.ts";

const Header = ({dex}: {dex?: PokedexVersion}) => {

    return (
        <DexHeader>
            <VersionGroupImg dex={dex} />
            <Typography variant="h1">{(dex ? VersionToHeaderText[dex] : "National") + " Pokedex"}</Typography>
        </DexHeader>
    )
}

export default Header;