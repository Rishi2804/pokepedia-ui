import { styled, keyframes } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

export const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
`;

export const BattleContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
}));

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

export const StatusDot = styled(Box)<{ connected: boolean }>(({ theme, connected }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: connected ? '#4caf50' : theme.palette.error.main,
  animation: connected ? 'none' : `${pulseAnimation} 1s infinite`,
}));

export const StatusText = styled(Typography)<{ connected: boolean }>(({ theme, connected }) => ({
  fontSize: '0.7rem',
  fontFamily: 'monospace',
  color: connected ? '#4caf50' : theme.palette.error.main,
}));

export const MainLayout = styled(Box)({
  height: 'calc(100vh - 73px)',
});

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

export const LogContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 2.4,
  backgroundColor: theme.palette.background.paper,
}));

export const LogEmpty = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  textAlign: 'center',
  marginTop: 32,
}));

export const LogEntry = styled(Typography)({
  fontSize: '0.8rem',
  fontFamily: '"Share Tech Mono", monospace',
  lineHeight: 1.6,
});

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

export const MenuContainer = styled(Box)({
  display: 'flex',
  gap: 4,
  alignItems: 'center',
});

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

export const MoveButtonStyled = styled(Button)<{ disabled: boolean }>(({ theme, disabled }) => ({
  fontWeight: 600,
  fontSize: '0.8rem',
  color: disabled ? theme.palette.text.secondary : theme.palette.text.primary,
  borderColor: disabled 
    ? (theme.palette.mode === 'light'
      ? 'rgba(0,0,0,0.12)'
      : 'rgba(255,255,255,0.12)')
    : theme.palette.primary.main,
  backgroundColor: disabled 
    ? 'transparent'
    : (theme.palette.mode === 'light'
      ? 'rgba(25,118,210,0.05)'
      : 'rgba(25,118,210,0.15)'),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light'
      ? 'rgba(25,118,210,0.12)'
      : 'rgba(25,118,210,0.25)',
    borderColor: theme.palette.primary.main,
  },
  textTransform: 'none',
  flex: 1,
  paddingTop: 8,
  paddingBottom: 8,
  textAlign: 'left',
}));

export const MoveButtonContent = styled(Box)({
  width: '100%',
  textAlign: 'left',
});

export const MoveNameText = styled('div')({
  fontSize: 'inherit',
});

export const MovePPText = styled('div')(({ theme }) => ({
  fontSize: '0.65rem',
  color: theme.palette.text.secondary,
  fontFamily: 'monospace',
}));

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
