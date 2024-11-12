import {Box, styled} from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
    width: '95%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
    border: '1px solid',
    borderColor: 'black',
    paddingRight: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
}))