import {Paper, styled} from "@mui/material";
import {COLORS} from "../../../../theme/colors.ts";

export const Selector = styled(Paper)(() => ({
    borderColor: COLORS.BLACK,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "solid",
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    height: 120,
    align:'center',
    display: "flex",
    justifyContent:'center',
    padding: 2,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",

    "&:active": {
        transform: "scale(0.95)",
        boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.5)',
    },
}))