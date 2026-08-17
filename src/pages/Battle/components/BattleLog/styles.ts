import {Box, styled} from "@mui/material";

export const LogBox = styled(Box)(({theme}) => ({
    maxHeight: 320,
    overflowY: 'auto',
    fontFamily: 'monospace',
    fontSize: 13,
    border: `1px solid ${theme.palette.primaryBorder}`,
    borderRadius: 8,
    padding: theme.spacing(1.5),
}));
