import {styled} from "@mui/system";
import {Paper} from "@mui/material";
import {PokemonType} from "../../../global/enums.ts";
import {TypeToCardBorder, TypeToCardColor} from "../../../global/utils.ts";

export const TeamContainer = styled(Paper)(({ theme }) => ({
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    textAlign: 'center',
    border: `0.5px solid ${theme.palette.primaryBorder}`
}));

interface MemberContainerProps {
    type1: PokemonType
    type2: PokemonType | null
}

export const MemberContainer = styled(Paper)<MemberContainerProps>(({type1, type2}) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 1,
    border: '3px solid',
    borderColor: `${type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1]}70`,
    backgroundColor: `${ TypeToCardColor[type1]}70`,
}))

export const EmptyContainer = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.background.default,
    height: '100%',
}))