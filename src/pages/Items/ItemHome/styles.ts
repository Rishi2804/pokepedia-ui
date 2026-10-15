import {styled} from "@mui/system";
import {Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export const ItemLink = styled(Link)({
    display: "block",
    height: "100%",
    textDecoration: "none",
    color: "inherit",
    '&:hover .item-name': {
        textDecoration: 'underline',
    },
    '&:active': {
        transform: 'scale(0.98)',
        transition: 'transform 0.1s ease',
    },
})

export const ItemContainer = styled(Paper)({
    padding: `10px 15px`,
    display: "flex",
    alignItems: "center",
    gap: 12,
    height: "100%",
    boxSizing: "border-box",
})

export const ItemText = styled(Typography)({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
})
