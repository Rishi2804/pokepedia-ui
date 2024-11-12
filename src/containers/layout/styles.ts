import {Box, styled} from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
    width: '95%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    border: '1px solid',
    borderColor: 'black',
}))