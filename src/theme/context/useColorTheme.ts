import {useMemo, useState} from "react";
import {createTheme, PaletteMode} from "@mui/material";
import {getTheme} from "../styles/theme.ts";

export const useColorTheme = () => {
    const storedMode = localStorage.getItem("themeMode") as PaletteMode;
    const initialMode: PaletteMode = storedMode ? storedMode : "light";

    const [mode, setMode] = useState<PaletteMode>(initialMode);

    const toggleTheme = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("themeMode", newMode);
    };

    const theme = useMemo(
        () => createTheme(getTheme(mode)),
    [mode])

    return {
        theme,
        mode,
        toggleTheme,
    }
}