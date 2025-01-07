import {Stack} from "@mui/material";
import MultiplierBox from "../../../../components/MultiplierBox/MultiplierBox.tsx";
import {FC} from "react";
import {PokemonType} from "../../../../global/enums.ts";
import TypeIcon from "../../../../components/TypeIcon/TypeIcon.tsx";

interface IDefenseRowProps {
    mult: '0' | '2' | '4' | '1/2' | '1/4';
    types: PokemonType[];
}

const DefenseRow: FC<IDefenseRowProps> = ({mult, types}) => {
    if (!types.length) return null;

    return (
        <Stack direction="row" spacing={3}>
            <MultiplierBox mult={mult} />
            <Stack direction="row" spacing={0.5} sx={{flexWrap: "wrap"}}>
                {
                    types.map((type, index) => <TypeIcon variant={"filled"} type={type} size={45} key={index}/>)
                }
            </Stack>
        </Stack>
    )
}

export default DefenseRow;