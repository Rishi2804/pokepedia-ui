import {COLORS} from "../styles/colors.ts";
import {PaletteMode} from "@mui/material";

export const typography = (mode: PaletteMode) => {
    const isLight = mode === "light";
    return {
        fontSize: 14,
        fontFamily: ['Whitney', 'Arial', 'sans-serif'].join(", "),
        h1: {
            fontSize: '40px',
            color: isLight ? COLORS.BLACK_PEARL : COLORS.OFF_WHITE,
            fontWeight: 600,
        },
        h2: {
            fontSize: '33px',
            color: isLight ? COLORS.BLACK_PEARL : COLORS.OFF_WHITE,
            fontWeight: 600,
        },
        h3: {
            fontSize: '28px',
            color: isLight ? COLORS.BLACK_PEARL : COLORS.OFF_WHITE,
            fontWeight: 700,
        },
        h4: {
            fontSize: '22px',
            color: isLight ? COLORS.BLACK_PEARL : COLORS.OFF_WHITE,
            fontWeight: 600,
        },
        h5: {
            fontSize: '20px',
            color: isLight ? COLORS.BLACK_PEARL : COLORS.OFF_WHITE,
            fontWeight: 600,
        },
        body1: {
            fontSize: '20px',
            fontWeight: 500,
        },
        body2: {
            fontSize: '18px',
            fontWeight: 500,
        }
    }
}