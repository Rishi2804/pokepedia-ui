import {useMemo, useState} from "react";
import {createTheme, PaletteMode} from "@mui/material";
import {getTheme} from "../styles/theme.ts";

export const useColorTheme = () => {
    const [mode, setMode] = useState<PaletteMode>("light");

    const toggleTheme = () =>
        setMode((prev) => prev === "light" ? "dark" : "light");

    const theme = useMemo(
        () => {
            console.log("here")
            return createTheme(getTheme(mode))
        },
    [mode])

    return {
        theme,
        mode,
        toggleTheme,
    }
}