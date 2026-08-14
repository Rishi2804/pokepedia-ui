import {styled} from "@mui/system";
import {Box, Paper} from "@mui/material";
import {PokemonType} from "../../../../../global/enums.ts";
import {TypeToCardBorder, TypeToCardColor} from "../../../../../global/utils.ts";

interface HeaderProps {
    type1: PokemonType;
    type2: PokemonType | null;
}

// PokemonImg renders a bare <img> and takes no size prop — every caller bounds it
// through its container. This header is a flex row, so without an explicit size the
// sprite renders at its natural (very large) size and the type colour fills the page.
export const EditorHeader = styled(Box)<HeaderProps>(({type1, type2}) => ({
    backgroundColor: TypeToCardColor[type1],
    borderColor: type2 ? TypeToCardBorder[type2] : TypeToCardBorder[type1],
    borderWidth: 5,
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '8px 24px',
    marginBottom: 16,
    '& img': {
        width: 88,
        height: 88,
        objectFit: 'contain',
    },
}));

export const ColumnPaper = styled(Paper)({
    padding: 16,
    height: '100%',
});
