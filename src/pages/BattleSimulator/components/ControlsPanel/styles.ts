import {styled} from "@mui/material/styles";
import {Box, Button, Typography} from "@mui/material";

export const ControlsSection = styled(Box)(({ theme }) => ({
    padding: 16,
    borderTop: `1px solid ${theme.palette.mode === 'light'
        ? 'rgba(0,0,0,0.12)'
        : 'rgba(255,255,255,0.12)'}`,
    backgroundColor: theme.palette.background.default,
}));

export const ControlLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.65rem',
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
    marginBottom: 8,
    letterSpacing: 1,
}));

export const MoveGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 8,
    marginBottom: 12,
});

export const SwitchesContainer = styled(Box)({
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
});

export const SwitchButton = styled(Button)(({ theme }) => ({
    color: theme.palette.success.main || '#66bb6a',
    borderColor: theme.palette.mode === 'light'
        ? 'rgba(76,175,80,0.3)'
        : 'rgba(76,175,80,0.4)',
    textTransform: 'none',
    fontSize: '0.75rem',
    '&:hover': {
        borderColor: theme.palette.success.main || '#66bb6a',
        backgroundColor: theme.palette.mode === 'light'
            ? 'rgba(76,175,80,0.08)'
            : 'rgba(76,175,80,0.15)',
    },
}));