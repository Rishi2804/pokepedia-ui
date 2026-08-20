import {Box, styled} from "@mui/material";

interface SceneProps {
    gradient: string | null;
    terrainColor: string | null;
}

export const Scene = styled(Box, {
    shouldForwardProp: prop => prop !== 'gradient' && prop !== 'terrainColor',
})<SceneProps>(({theme, gradient, terrainColor}) => {
    const base = theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg, #1b2735 0%, #0d1117 100%)'
        : 'linear-gradient(180deg, #cfe8f7 0%, #eef6fb 100%)';

    return {
        position: 'relative',
        width: '100%',
        minHeight: 280,
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.primaryBorder}`,
        backgroundImage: gradient ? `${gradient}, ${base}` : base,
        // Only swap in the thicker terrain accent when a terrain is active -
        // falling back to 'transparent' here (instead of matching the other
        // three sides' border color) made the bottom edge look cut off.
        borderBottom: terrainColor ? `6px solid ${terrainColor}` : `1px solid ${theme.palette.primaryBorder}`,
        transition: 'background-image 0.6s ease, border-bottom-color 0.6s ease',
    };
});

interface SlotAreaProps {
    corner: 'top-right' | 'bottom-left';
}

export const SlotArea = styled(Box, {
    shouldForwardProp: prop => prop !== 'corner',
})<SlotAreaProps>(({corner}) => ({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    ...(corner === 'top-right'
        ? {top: 16, right: 16, alignItems: 'flex-end'}
        : {bottom: 16, left: 16, alignItems: 'flex-start'}),
}));
