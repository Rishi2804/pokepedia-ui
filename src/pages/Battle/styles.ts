import {Box, Paper, styled} from "@mui/material";

export const FormPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(3),
    borderRadius: 12,
    border: `1px solid ${theme.palette.primaryBorder}`,
    maxWidth: 640,
    marginLeft: 'auto',
    marginRight: 'auto',
}));

export const ModeToggleRow = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 24,
});

// Same look as FormPaper but without its maxWidth/centering - used as a
// BattleLayout grid cell, where the surrounding grid (not this paper)
// already controls how wide the column is.
export const WideFormPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(3),
    borderRadius: 12,
    border: `1px solid ${theme.palette.primaryBorder}`,
}));

// Field / controls / log side by side on wide screens, stacked in that same
// order below the `sm` breakpoint.
export const BattleLayout = styled(Box)(({theme}) => ({
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: '3fr 2fr 2fr',
    },
}));
