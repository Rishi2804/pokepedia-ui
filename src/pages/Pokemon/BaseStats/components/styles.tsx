import {styled} from "@mui/system";
import {Box, Stack} from "@mui/material";
import {PokemonType} from "../../../../global/enums.ts";
import {TypeToCardBorder, TypeToCardColor} from "../../../../global/utils.ts";

interface StatRowProps {
    children?: React.ReactNode;
}

export const StatRow = styled((props: StatRowProps) =>
    <Stack direction="row" spacing={4} {...props} />
)({
    borderTop: '1px solid',
    alignItems: "center"
});

interface StatBarProps {
    type1: PokemonType;
    type2: PokemonType | null;
    stat: number;
}

export const StatBar = styled(Box)<StatBarProps>(({type1, type2, stat}) => ({
    backgroundColor: TypeToCardColor[type1],
    display: 'flex',
    border: `3px solid ${type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1]}`,
    borderRadius: '4px',
    width: `${(stat / 252 * 100).toFixed(2)}%`,
    height: '20px',
}))