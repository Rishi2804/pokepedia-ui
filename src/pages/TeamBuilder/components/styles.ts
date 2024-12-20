import {styled} from "@mui/system";
import {Paper} from "@mui/material";
import {PokemonType} from "../../../global/enums.ts";
import {TypeToCardBorder, TypeToCardColor} from "../../../global/utils.ts";

export const DialogBox = styled(Paper)(({theme}) => ({
    width: '85%',
    minHeight: '85%',
    backgroundColor: theme.palette.background.default,
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: 20,
    border: `1px solid ${theme.palette.primaryBorder}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 60,
}))

interface TypeProps {
    type1: PokemonType,
    type2?: PokemonType | null,
}

export const PokemonCard = styled(Paper)<TypeProps>(({ type1, type2 }) => ({
    borderColor: `${type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1]}80`,
    backgroundColor: `${TypeToCardColor[type1]}80`,
    borderWidth: 5,
    borderRadius: 5,
    borderStyle: "solid",
    display: "flex",
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: '100%',
}));

export const MoveCard = styled(Paper)<TypeProps>(({ type1 }) => ({
    borderColor: `${TypeToCardBorder[type1]}60`,
    backgroundColor: `${TypeToCardColor[type1]}60`,
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: "solid",
    display: "flex",
    padding: 1,
    alignItems: "center",
    justifyContent: "space-between",
}));