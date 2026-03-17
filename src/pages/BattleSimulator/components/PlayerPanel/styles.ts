import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

export const LogEmpty = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
    fontSize: '0.75rem',
    textAlign: 'center',
    marginTop: 32,
}));

export const PlayerHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
});

export const PlayerName = styled(Typography)<{ isOwn: boolean }>(({ theme, isOwn }) => ({
    fontWeight: 700,
    fontSize: '1rem',
    color: isOwn ? theme.palette.primary.main : theme.palette.error.main,
}));

export const StatusIndicatorDot = styled(Box)<{ alive: boolean; isOwn: boolean }>(({ theme, alive, isOwn }) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: alive
        ? (isOwn ? theme.palette.primary.main : theme.palette.error.main)
        : (theme.palette.mode === 'light'
            ? 'rgba(0,0,0,0.12)'
            : 'rgba(255,255,255,0.12)'),
    border: `1px solid ${theme.palette.mode === 'light'
        ? 'rgba(0,0,0,0.12)'
        : 'rgba(255,255,255,0.12)'}`,
}));

export const SideConditionsBox = styled(Box)({
    display: 'flex',
    gap: 4,
    flexWrap: 'wrap',
    marginBottom: 8,
});

export const SideConditionTag = styled(Box)(({ theme }) => ({
    paddingLeft: 6.4,
    paddingRight: 6.4,
    paddingTop: 1.6,
    paddingBottom: 1.6,
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light'
        ? 'rgba(255,152,0,0.15)'
        : 'rgba(255,152,0,0.20)',
    border: `1px solid ${theme.palette.mode === 'light'
        ? 'rgba(255,152,0,0.3)'
        : 'rgba(255,152,0,0.4)'}`,
    fontSize: '0.6rem',
    color: theme.palette.mode === 'light' ? '#ff9800' : '#ffb74d',
    fontFamily: 'monospace',
}));

export const TeamSizeIndicator = styled(Box)({
    display: 'flex',
    gap: 4,
});

export const BenchLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.65rem',
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
    marginTop: 4,
    marginBottom: 6,
}));

export const BenchContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    overflowY: 'auto',
    flex: 1,
});