import {styled} from "@mui/system";
import {Box} from "@mui/material";

export const Container = styled(Box)(({theme}) => ({
    position: "relative",
    width: 320,
    [theme.breakpoints.down('md')]: {
        width: 200,
    },
    [theme.breakpoints.down('xs')]: {
        width: 140,
    },
}));

export const SearchInput = styled("input")(({theme}) => ({
    width: "100%",
    height: 40,
    borderRadius: 20,
    border: "none",
    padding: "0 16px",
    fontSize: 15,
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));

export const Dropdown = styled("ul")(({theme}) => ({
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    margin: 0,
    padding: 8,
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    boxShadow: "0px 8px 24px rgba(0,0,0,0.3)",
    zIndex: 20,
    maxHeight: 360,
    overflowY: "auto",
}));

export const DropdownOption = styled("li")(({theme}) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer",
    color: theme.palette.text.primary,
    '&[aria-selected="true"]': {
        backgroundColor: `${theme.palette.background.info}40`,
    },
    "&:hover": {
        backgroundColor: `${theme.palette.background.info}30`,
    },
}));

export const OptionType = styled("span")(({theme}) => ({
    fontSize: 12,
    color: theme.palette.text.secondary,
}));
