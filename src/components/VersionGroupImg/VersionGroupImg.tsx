import {VersionGroup} from "../../global/enums.ts";
import {VersionToImage} from "../../global/utils.ts";

interface IVersionGroupImgProps {
    group?: VersionGroup
}

const VersionGroupImg = ({group}: IVersionGroupImgProps) => {
    function getImg() {
        if (!group) return new URL(`./assets/home.png`, import.meta.url).href

        return new URL(`./assets/${VersionToImage[group]}`, import.meta.url).href
    }


    return (
        <img src={getImg()} style={{objectFit: "contain"}}/>
    )
}

export default VersionGroupImg