import {Box, styled} from "@mui/material";

interface SpriteFrameProps {
    size: number;
    fainted: boolean;
    flip: boolean;
}

// Remounted by the parent (keyed on the active Pokemon's ident) whenever a
// switch happens, so this animation replays on every switch-in for free -
// no imperative animation triggering needed.
export const SpriteFrame = styled(Box, {
    shouldForwardProp: prop => prop !== 'size' && prop !== 'fainted' && prop !== 'flip',
})<SpriteFrameProps>(({size, fainted, flip}) => ({
    width: size,
    height: size,
    animation: 'battle-sprite-in 0.35s ease-out',
    transition: 'opacity 0.4s ease, filter 0.4s ease',
    opacity: fainted ? 0.35 : 1,
    filter: fainted ? 'grayscale(1)' : 'none',
    '@keyframes battle-sprite-in': {
        from: {opacity: 0, transform: 'translateY(12px) scale(0.85)'},
        to: {opacity: 1, transform: 'translateY(0) scale(1)'},
    },
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        transform: flip ? 'scaleX(-1)' : 'none',
    },
}));
