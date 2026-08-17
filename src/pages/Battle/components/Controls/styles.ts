import {Box, styled} from "@mui/material";

export const ButtonGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 8,
});
