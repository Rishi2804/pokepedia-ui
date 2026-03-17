import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

export const PokemonCardContainer = styled(Box)<{ isActive: boolean; isOwn?: boolean }>(({ theme, isActive, isOwn }) => ({
    padding: 12,
    borderRadius: 8,
    backgroundColor: isActive
        ? (isOwn
            ? (theme.palette.mode === 'light'
                ? 'rgba(25,118,210,0.12)'
                : 'rgba(25,118,210,0.25)')
            : (theme.palette.mode === 'light'
                ? 'rgba(211,47,47,0.12)'
                : 'rgba(211,47,47,0.25)'))
        : (theme.palette.mode === 'light'
            ? 'rgba(0,0,0,0.04)'
            : 'rgba(255,255,255,0.04)'),
    border: `1px solid ${isActive
        ? (isOwn
            ? theme.palette.primary.main
            : theme.palette.error.main)
        : (theme.palette.mode === 'light'
            ? 'rgba(0,0,0,0.12)'
            : 'rgba(255,255,255,0.12)')}`,
    transition: 'all 0.3s',
    minWidth: 140,
    opacity: 1,
}));

export const PokemonName = styled(Typography)<{ fainted: boolean }>(({ theme, fainted }) => ({
    fontWeight: 700,
    fontSize: '0.85rem',
    color: fainted ? theme.palette.text.secondary : theme.palette.text.primary,
}));

export const LevelBadge = styled(Typography)(({ theme }) => ({
    fontSize: '0.6rem',
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
}));

export const HPBarContainer = styled(Box)({
    width: '100%',
});

export const HPLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.65rem',
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
    marginBottom: 2.4,
    display: 'flex',
    justifyContent: 'space-between',
}));

export const HPBarTrack = styled(Box)(({ theme }) => ({
    height: 6,
    borderRadius: 12,
    backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(0,0,0,0.12)'
        : 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
}));

export const HPBarFill = styled(Box)<{ pct: number; color: string }>(({ pct, color }) => ({
    height: '100%',
    width: `${pct}%`,
    backgroundColor: color,
    borderRadius: 12,
    transition: 'width 0.4s ease, background-color 0.4s ease',
}));

export const FaintedText = styled(Typography)(({ theme }) => ({
    fontSize: '0.7rem',
    color: theme.palette.error.main,
    fontFamily: 'monospace',
}));

export const StatusBadge = styled(Box)<{ color: string }>(({ color }) => ({
    paddingLeft: 5.6,
    paddingRight: 5.6,
    paddingTop: 0.8,
    paddingBottom: 0.8,
    borderRadius: 4,
    backgroundColor: color,
    fontSize: '0.55rem',
    fontFamily: 'monospace',
    fontWeight: 700,
    color: '#fff',
}));

export const StatBoostBadge = styled(Box)<{ positive: boolean }>(({ theme, positive }) => ({
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 0.8,
    paddingBottom: 0.8,
    borderRadius: 4,
    backgroundColor: positive
        ? (theme.palette.mode === 'light'
            ? 'rgba(76,175,80,0.15)'
            : 'rgba(76,175,80,0.25)')
        : (theme.palette.mode === 'light'
            ? 'rgba(211,47,47,0.15)'
            : 'rgba(211,47,47,0.25)'),
    fontSize: '0.55rem',
    fontFamily: 'monospace',
    color: positive
        ? (theme.palette.mode === 'light' ? '#2e7d32' : '#66bb6a')
        : (theme.palette.mode === 'light' ? '#c62828' : '#ef5350'),
}));

export const BadgesContainer = styled(Box)({
    display: 'flex',
    gap: 4,
    marginTop: 4,
    flexWrap: 'wrap',
});

export const ItemTag = styled(Typography)(({ theme }) => ({
    fontSize: '0.6rem',
    color: theme.palette.text.secondary,
    marginTop: 2.4,
    fontStyle: 'italic',
}));