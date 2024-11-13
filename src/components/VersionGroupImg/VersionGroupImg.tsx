
import {PokedexVersion} from "../../pages/Pokedex/enums.ts";
import {VersionToImage} from "../../pages/Pokedex/utils.ts";

interface IVersionGroupImgProps {
    dex?: PokedexVersion
}

const VersionGroupImg = ({dex}: IVersionGroupImgProps) => {
    function getImg() {
        if (!dex) return new URL(`./assets/home.png`, import.meta.url).href

        return new URL(`./assets/${VersionToImage[dex]}`, import.meta.url).href
    }


    return (
        <img src={getImg()} style={{objectFit: "contain"}}/>
    )
}

export default VersionGroupImg