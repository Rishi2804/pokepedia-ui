import {Box} from "@mui/material";
import {styled} from "@mui/system";

export const CardShell = styled(Box)(({theme}) => ({
    borderColor: theme.palette.divider,
    borderWidth: 6,
    borderRadius: 15,
    borderStyle: "solid",
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    display: "flex",
    padding: 1,
    flexDirection: "column",
    justifyContent: "center",
}))

export const IconRow = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    gap: 1,
    paddingBottom: 5,
    paddingTop: 3
}))
