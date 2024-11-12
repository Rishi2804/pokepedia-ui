import {Paper, styled} from "@mui/material";
import VersionGroupImg from "../VersionGroupImg/VersionGroupImg.tsx";
import {VersionGroup} from "../../global/enums.ts";
import {COLORS} from "../../theme/colors.ts";

interface IPokedexSelectorProps {
    group?: VersionGroup;
}

const Selector = styled(Paper)(() => ({
    borderColor: COLORS.BLACK,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "solid",
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    height: 120,
    align:'center',
    display: "flex",
    justifyContent:'center',
    padding: 2
}))

const PokedexSelector = ({group}: IPokedexSelectorProps) => {
    return (
        <Selector>
            <VersionGroupImg group={group} />
        </Selector>
    )
}

export default PokedexSelector