import {Box} from "@mui/material";
import {styled} from "@mui/system";

interface CardShellProps {
    borderWidth: number;
    borderRadius: number;
}

export const CardShell = styled(Box)<CardShellProps>(({theme, borderWidth, borderRadius}) => ({
    borderColor: theme.palette.divider,
    borderWidth,
    borderRadius,
    borderStyle: "solid",
    padding: 1,
    display: "flex",
    flexDirection: "column",
}))
