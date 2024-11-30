import {PokemonType} from "../../../../../global/enums.ts";
import {styled} from "@mui/system";
import {Box} from "@mui/material";
import {TypeToCardBorder, TypeToCardColor} from "../../../../../global/utils.ts";

interface ContainerProps {
    type: PokemonType;
}

export const EntriesContainer = styled(Box)<ContainerProps>(({type}) => ({
    backgroundColor: TypeToCardColor[type],
    border: `4px solid ${TypeToCardBorder[type]}`,
    borderRadius: '5px',
    padding: 8,
}))