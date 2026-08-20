import {Box, styled} from "@mui/material";

interface PipProps {
    ringColor: string | null;
    fainted: boolean;
}

export const Pip = styled(Box, {
    shouldForwardProp: prop => prop !== 'ringColor' && prop !== 'fainted',
})<PipProps>(({theme, ringColor, fainted}) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: `2px solid ${ringColor ?? theme.palette.primaryBorder}`,
    opacity: fainted ? 0.35 : 1,
    filter: fainted ? 'grayscale(1)' : 'none',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    '& img': {width: '100%', height: '100%', objectFit: 'contain'},
}));

export const BlankPip = styled(Box)(({theme}) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    flexShrink: 0,
    border: `2px dashed ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'}`,
}));
