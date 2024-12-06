import {PokemonType} from "../../../global/enums.ts";
import {styled} from "@mui/system";
import {Paper} from "@mui/material";
import {TypeToCardColor, TypeToCardBorder} from "../../../global/utils.ts";

interface CardProps {
    type1: PokemonType | null,
    type2: PokemonType | null
}

export const Card = styled(Paper)<CardProps>(({ type1, type2 }) => ({
    borderColor: type2 ? TypeToCardBorder[type2] : type1 ? TypeToCardBorder[type1] : "#67A090",
    backgroundColor: type1 ? TypeToCardColor[type1] : "#67A090",
    borderWidth: 3,
    borderRadius: 5,
    borderStyle: "solid",
    display: "flex",
    padding: 1,
    flexDirection: "column",
    textAlign: "center",
}));