import {Box, styled} from "@mui/material";

interface PillProps {
    bg: string;
}

// Shared small colored badge - StatBar's status/boost/item/tera chips and
// SideBar's side-condition chips are visually the same element.
export const Pill = styled(Box, {
    shouldForwardProp: prop => prop !== 'bg',
})<PillProps>(({bg}) => ({
    display: 'inline-flex',
    alignItems: 'center',
    padding: '1px 6px',
    borderRadius: 8,
    fontSize: 11,
    lineHeight: '16px',
    fontWeight: 700,
    color: '#fff',
    backgroundColor: bg,
    whiteSpace: 'nowrap',
}));
