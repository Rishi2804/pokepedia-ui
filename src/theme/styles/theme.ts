import {COLORS} from "./colors.ts";
import {PaletteMode} from "@mui/material";
import {typography} from "../mui/typescript.ts";

const lightpalette = {
    mode: 'light',
    background: {
        default: COLORS.GHOST_WHITE,
        paper: COLORS.WHITE,
        selected: COLORS.BLUE,
        info: COLORS.SKY_BLUE,
    },
    text: {
        primary: COLORS.DARK_GRAY,
        secondary: COLORS.MEDIUM_GRAY,
        active: COLORS.RED,
        selected: COLORS.BLUE,
    },
    primary: {
        main: COLORS.BLUE,
    },
    error: {
        light: COLORS.LIGHT_RED,
        main: COLORS.RED,
    },
    primaryBorder: COLORS.BLACK,
} as const

const darkpalette = {
    mode: 'dark',
    background: {
        default: COLORS.BLACK,
        paper: COLORS.SYSTEM_GRAY,
        selected: COLORS.BLUE,
        info: COLORS.SKY_BLUE,
    },
    text: {
        primary: COLORS.WHITE,
        secondary: COLORS.GHOST_WHITE,
        active: COLORS.RED,
        selected: COLORS.BLUE,
    },
    primary: {
        main: COLORS.BLUE,
    },
    error: {
        light: COLORS.LIGHT_RED,
        main: COLORS.RED,
    },
    primaryBorder: COLORS.WHITE,
} as const

const breakpoints = {
    xs: 720,
    sm: 1024,
    md: 1280,
    lg: 1440,
    xl: 1680,
    xxl: 1920,
} as const

export const theme = {
    palette: lightpalette,
    breakpoints: {
        values: breakpoints
    },
    typography,
    components: {

    }
}

export const getTheme = (mode: PaletteMode) => ({
    palette: mode === 'light' ? lightpalette : darkpalette,
    breakpoints: {
        values: breakpoints
    },
    typography,
    components: {

    },
});