import {Box, styled} from "@mui/material";

export const SlotRow = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.primaryBorder}`,
    borderRadius: 8,
    cursor: 'grab',
}));

export const SlotThumb = styled(Box)({
    width: 40,
    height: 40,
    '& img': {width: '100%', height: '100%', objectFit: 'contain'},
});
