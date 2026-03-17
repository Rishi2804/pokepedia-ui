import {styled} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";

export const Header = styled(Box)(({ theme }) => ({
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: theme.palette.mode === 'light'
        ? theme.palette.background.paper
        : theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.mode === 'light'
        ? 'rgba(0,0,0,0.12)'
        : 'rgba(255,255,255,0.12)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.4rem',
    letterSpacing: 2,
    color: theme.palette.text.primary,
}));

export const HeaderSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.7rem',
    color: theme.palette.text.secondary,
    fontFamily: 'monospace',
    letterSpacing: 1,
}));

export const ConnectionIndicator = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 6.4,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 8,
    border: `1px solid ${theme.palette.mode === 'light'
        ? 'rgba(0,0,0,0.12)'
        : 'rgba(255,255,255,0.12)'}`,
}));

export const StatusDot = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'connected',
})<{ connected: boolean }>(({ theme, connected }) => ({
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: connected ? '#4caf50' : theme.palette.error.main,
}));

export const StatusText = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'connected',
})<{ connected: boolean }>(({ theme, connected }) => ({
    fontSize: '0.7rem',
    fontFamily: 'monospace',
    color: connected ? '#4caf50' : theme.palette.error.main,
}));
