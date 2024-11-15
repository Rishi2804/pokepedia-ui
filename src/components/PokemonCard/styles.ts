import {Box, Paper} from "@mui/material";
import { styled } from "@mui/system";
import {PokemonType} from "../../global/enums.ts";
import {TypeToCardBorder, TypeToCardColor} from "../../global/utils.ts";

// Define the types for the custom props
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
    padding: 1,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    flexDirection: "column",
    justifyContent: "center",

    "&:active": {
        transform: "scale(0.95)",
        boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)',
    },
}));

export const TypeIconContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: 1,
    paddingBottom: 5,
    paddingTop: 3
}))