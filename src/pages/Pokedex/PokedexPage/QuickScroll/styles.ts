import {styled} from "@mui/system";
import {Box} from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    marginBottom: 25,
    backgroundColor: `${theme.palette.background.info}60`,
    padding: 20,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    borderRadius: 10
}))