import {styled} from "@mui/system";
import {Box} from "@mui/material";
import {TypeToColor} from "../../global/utils.ts";
import {PokemonType} from "../../global/enums.ts";

interface IContainerProps {
    size?: number;
    type: PokemonType;
    circular: boolean;
}

export const IconContainer = styled(Box)<IContainerProps>(({size, type, circular}) => ({
    justifyContent: 'space-between',
    width: size ?? 50,
    height: size ?? 50,
    backgroundColor: TypeToColor[type],
    borderRadius: circular ? (size ?? 50) : 10,
    alignItems: 'center'
}))