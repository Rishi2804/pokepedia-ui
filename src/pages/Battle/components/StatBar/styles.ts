import {Box, styled} from "@mui/material";

export const HpTrack = styled(Box)(({theme}) => ({
    position: 'relative',
    width: '100%',
    height: 10,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)',
}));

interface HpFillProps {
    percent: number;
    color: 'green' | 'yellow' | 'red';
}

export const HpFill = styled(Box, {
    shouldForwardProp: prop => prop !== 'percent' && prop !== 'color',
})<HpFillProps>(({theme, percent, color}) => ({
    position: 'absolute',
    inset: 0,
    width: `${percent}%`,
    backgroundColor: color === 'green' ? theme.palette.success.main : color === 'yellow' ? theme.palette.warning.main : theme.palette.error.main,
    transition: 'width 0.4s ease, background-color 0.4s ease',
}));
