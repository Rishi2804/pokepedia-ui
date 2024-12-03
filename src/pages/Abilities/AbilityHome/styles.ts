import {styled} from "@mui/system";
import {Paper, Typography} from "@mui/material";

export const AbilityContainer = styled(Paper)({
    padding: `15px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

export const AbilityText = styled(Typography)({
    '&:hover': {
        textDecoration: 'underline',
        transition: 'color 0.2s ease, text-decoration 0.2s ease',
    },

    '&:active': {
        transform: 'scale(0.98)',
        transition: 'transform 0.1s ease',
    },
})