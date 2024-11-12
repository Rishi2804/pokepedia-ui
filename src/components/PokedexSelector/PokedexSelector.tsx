import VersionGroupImg from "../VersionGroupImg/VersionGroupImg.tsx";
import {VersionGroup} from "../../global/enums.ts";
import {Selector} from "./styles.ts";

interface IPokedexSelectorProps {
    group?: VersionGroup;
}

const PokedexSelector = ({group}: IPokedexSelectorProps) => {
    return (
        <Selector>
            <VersionGroupImg group={group} />
        </Selector>
    )
}

export default PokedexSelector