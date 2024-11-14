import {COLORS} from "../styles/colors.ts";

export const typography = {
    fontSize: 14,
    fontFamily: ['Whitney', 'Arial', 'sans-serif'].join(", "),
    h1: {
        fontSize: '40px',
        color: COLORS.BLACK_PEARL,
        fontWeight: 600,
    },
    h2: {
        fontSize: '33px',
        color: COLORS.BLACK_PEARL,
        fontWeight: 600,
    },
    h3: {
        fontSize: '28px',
        color: COLORS.BLACK_PEARL,
        fontWeight: 700,
    },
    h4: {
        fontSize: '22px',
        color: COLORS.BLACK_PEARL,
        fontWeight: 600,
    },
    h5: {
        fontSize: '20px',
        color: COLORS.BLACK_PEARL,
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