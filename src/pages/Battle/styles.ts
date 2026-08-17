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
