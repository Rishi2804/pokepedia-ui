import {createTheme, Theme} from "@mui/material";
import {createContext, FC, PropsWithChildren, useContext} from "react";
import {useColorTheme} from "./useColorTheme.ts";

interface ThemeContextProps {
    mode: "light" | "dark";
    toggleTheme: () => void;
    theme: Theme;
}

export const ThemeContext = createContext<ThemeContextProps>({
    mode: "light",
    toggleTheme: () => {},
    theme: createTheme()
})

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const value = useColorTheme()
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    return useContext(ThemeContext);
}