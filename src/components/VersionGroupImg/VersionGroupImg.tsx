
import {PokedexVersion} from "../../pages/Pokedex/enums.ts";
import {VersionToImage} from "../../pages/Pokedex/utils.ts";
import React from "react";

interface IVersionGroupImgProps {
    dex?: PokedexVersion
    sx?: React.CSSProperties
}

const VersionGroupImg: React.FC<IVersionGroupImgProps> = ({dex, sx}) => {
    function getImg() {
        if (!dex) return new URL(`./assets/home.png`, import.meta.url).href

        return new URL(`./assets/${VersionToImage[dex]}`, import.meta.url).href
    }


    return (
        <img src={getImg()} style={{objectFit: "contain", ...sx}}/>
    )
}

export default VersionGroupImg