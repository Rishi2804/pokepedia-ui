import {COLORS} from "./colors.ts";
import {createTheme} from "@mui/material";
import {typography} from "../mui/typescript.ts";

const palette = {
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

const darkpallete = {
    mode: 'dark',
    background: {
        default: COLORS.DARK_GRAY,
        paper: COLORS.BLACK,
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

const theme = createTheme({
    palette,
    breakpoints: {
        values: breakpoints
    },
    typography,
    components: {

    }
})

export const getTheme = () => {
    return theme;
}