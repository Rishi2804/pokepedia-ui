import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const BattlefieldContainer = styled(Box)({
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    transition: 'background 1s ease',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
});

export const WeatherChipsRow = styled(Box)({
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 8,
});

export const WeatherChip = styled(Box)(({ theme }) => ({
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 99,
    fontSize: '0.65rem',
    fontFamily: 'monospace',
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
}));

export const FieldConditionChip = styled(Box)(({ theme }) => ({
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 99,
    fontSize: '0.65rem',
    fontFamily: 'monospace',
    border: `1px solid ${theme.palette.warning.main}`,
    backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(255,152,0,0.08)'
        : 'rgba(255,152,0,0.15)',
    color: theme.palette.warning.main,
}));

export const SpriteBox = styled(Box)<{ size: number }>(({ size }) => ({
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'filter 0.3s',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
}));

export const SpriteLabel = styled(Box)(({ theme }) => ({
    fontSize: '0.6rem',
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
    textAlign: 'center',
    marginTop: 4,
}));

export const FallbackSpriteBox = styled(Box)(({ theme }) => ({
    borderRadius: '50%',
    border: `2px dashed ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const TurnIndicatorBox = styled(Box)(({ theme }) => ({
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    opacity: 0.9,
    textAlign: 'center',
}));

export const TurnText = styled(Box)(({ theme }) => ({
    fontFamily: 'monospace',
    fontSize: '0.7rem',
    color: theme.palette.text.secondary,
}));

export const WinnerText = styled(Box)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '0.85rem',
    color: theme.palette.primary.main,
}));