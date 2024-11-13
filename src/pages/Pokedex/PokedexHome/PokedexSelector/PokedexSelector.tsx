import VersionGroupImg from "../../../../components/VersionGroupImg/VersionGroupImg.tsx";
import {Selector} from "./styles.ts";
import {useNavigate} from "react-router-dom";
import {PokedexVersion} from "../../enums.ts";

interface IPokedexSelectorProps {
    dex?: PokedexVersion;
}

const PokedexSelector = ({dex}: IPokedexSelectorProps) => {
    const naviagate = useNavigate()
    const handleNavigate = () => {
        naviagate(`/pokedex/${dex ?? 'national'}`)
    }

    return (
        <Selector onClick={handleNavigate}>
            <VersionGroupImg dex={dex} />
        </Selector>
    )
}

export default PokedexSelector