import VersionGroupImg from "../VersionGroupImg/VersionGroupImg.tsx";
import {VersionGroup} from "../../global/enums.ts";
import {Selector} from "./styles.ts";
import {getFormattedVersion} from "../../global/utils.ts";
import {useNavigate} from "react-router-dom";

interface IPokedexSelectorProps {
    group?: VersionGroup;
}

const PokedexSelector = ({group}: IPokedexSelectorProps) => {
    const naviagate = useNavigate()
    const handleNavigate = () => {
        naviagate(`/pokedex/${getFormattedVersion(group as VersionGroup)}`)
    }

    return (
        <Selector onClick={handleNavigate}>
            <VersionGroupImg group={group} />
        </Selector>
    )
}

export default PokedexSelector