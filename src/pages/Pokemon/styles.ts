import {PokemonType} from "../../global/enums.ts";
import {styled} from "@mui/system";
import {Paper} from "@mui/material";
import {TypeToCardColor, TypeToCardBorder} from "../../global/utils.ts";

interface CardProps {
    type1: PokemonType,
    type2: PokemonType | null,
}

export const Card = styled(Paper)<CardProps>(({ type1, type2 }) => ({
    borderColor: type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1],
    backgroundColor: TypeToCardColor[type1],
    borderWidth: 10,
    borderRadius: 15,
    borderStyle: "solid",
    display: "flex",
    padding: 1,
    flexDirection: "column",
}));