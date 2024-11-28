import {styled} from "@mui/system";
import {Box, Paper} from "@mui/material";
import {TypeToCardBorder, TypeToCardColor} from "../../global/utils.ts"
import {PokemonType} from "../../global/enums.ts";

interface CardProps {
    type1: PokemonType,
    type2: PokemonType | null,
}

export const Card = styled(Paper)<CardProps>(({ type1, type2 }) => ({
    borderColor: type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1],
    backgroundColor: TypeToCardColor[type1],
    borderWidth: 6,
    borderRadius: 15,
    borderStyle: "solid",
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    display: "flex",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    "&:active": {
        transform: "scale(0.98)",
        boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.3)',
    },
}));

export const SectionContainer = styled(Box)(() => ({
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    display: "flex",
    flexDirection: "column",
}))