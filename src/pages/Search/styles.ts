import {styled} from "@mui/system";
import {Box, Typography} from "@mui/material";

export const GroupSection = styled(Box)({
    marginBottom: 40,
});

export const HitRow = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: 8,
    cursor: "pointer",
    border: `1px solid ${theme.palette.primaryBorder}20`,
    transition: "background-color 0.15s ease",
    "&:hover": {
        backgroundColor: `${theme.palette.background.info}30`,
    },
}));

export const HitMeta = styled(Typography)(({theme}) => ({
    color: theme.palette.text.secondary,
}));

export const ShowAllLink = styled(Typography)(({theme}) => ({
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontWeight: 600,
    padding: "12px 16px",
    "&:hover": {textDecoration: "underline"},
}));
