import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

export const BattleContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
}));

export const WelcomeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  flexDirection: 'column',
  gap: 24,
  backgroundColor: theme.palette.background.default,
}));

export const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  textAlign: 'center',
  letterSpacing: 3,
}));

export const StartButton = styled(Button)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: 2,
  paddingLeft: 40,
  paddingRight: 40,
  paddingTop: 12,
  paddingBottom: 12,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 8,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark || theme.palette.primary.main,
  },
  '&:disabled': {
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(0,0,0,0.12)' 
      : 'rgba(255,255,255,0.12)',
    color: theme.palette.text.secondary,
  },
}));

export const P1Panel = styled(Box)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.mode === 'light' 
    ? 'rgba(0,0,0,0.12)' 
    : 'rgba(255,255,255,0.12)'}`,
  padding: 16,
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

export const P2Panel = styled(Box)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.mode === 'light' 
    ? 'rgba(0,0,0,0.12)' 
    : 'rgba(255,255,255,0.12)'}`,
  padding: 16,
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));

export const CenterPanel = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const TurnIndicator = styled(Box)(({ theme }) => ({
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 12,
  paddingBottom: 12,
  borderBottom: `1px solid ${theme.palette.mode === 'light' 
    ? 'rgba(0,0,0,0.12)' 
    : 'rgba(255,255,255,0.12)'}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const TurnText = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

export const WinnerText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

export const CurrentPlayerText = styled(Typography)<{ isP1: boolean }>(({ theme, isP1 }) => ({
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  color: isP1 ? theme.palette.primary.main : theme.palette.error.main,
}));
