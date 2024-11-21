import {alpha, Paper, styled} from "@mui/material";

export const Selector = styled(Paper)(({theme}) => ({
    borderColor: theme.palette.primaryBorder,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "solid",
    boxShadow: `0px 4px 20px ${alpha(theme.palette.primaryBorder, 0.2)}`,
    height: 120,
    align:'center',
    display: "flex",
    justifyContent:'center',
    padding: 2,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",

    "&:active": {
        transform: "scale(0.95)",
        boxShadow: `0px 6px 25px ${alpha(theme.palette.primaryBorder, 0.5)}`,
        borderColor: theme.palette.background.selected
    },
}))