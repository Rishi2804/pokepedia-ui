import {Box} from "@mui/material";
import {styled} from "@mui/system";

export const CardShell = styled(Box)(({theme}) => ({
    borderColor: theme.palette.divider,
    borderWidth: 6,
    borderRadius: 15,
    borderStyle: "solid",
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    display: "flex",
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}))

export const SectionColumn = styled(Box)(() => ({
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
    display: "flex",
    flexDirection: "column",
}))
