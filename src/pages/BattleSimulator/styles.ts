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

export const BattleContainer = styled(Box)({
  minHeight: '100vh',
  backgroundColor: '#0d0f14',
  color: '#ddd',
  fontFamily: '"Rajdhani", sans-serif',
});

export const Header = styled(Box)({
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 16,
  paddingBottom: 16,
  backgroundColor: '#0a0c10',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const HeaderTitle = styled(Typography)({
  fontFamily: '"Rajdhani", sans-serif',
  fontWeight: 700,
  fontSize: '1.4rem',
  letterSpacing: 2,
  color: '#fff',
});

export const HeaderSubtitle = styled(Typography)({
  fontSize: '0.7rem',
  color: '#888',
  fontFamily: 'monospace',
  letterSpacing: 1,
});

export const ConnectionIndicator = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6.4,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 4,
  paddingBottom: 4,
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.07)',
});

export const StatusDot = styled(Box)<{ connected: boolean }>(({ connected }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: connected ? '#3dc83d' : '#ff4040',
  animation: connected ? 'none' : `${pulseAnimation} 1s infinite`,
}));

export const StatusText = styled(Typography)<{ connected: boolean }>(({ connected }) => ({
  fontSize: '0.7rem',
  fontFamily: 'monospace',
  color: connected ? '#3dc83d' : '#ff4040',
}));

export const MainLayout = styled(Box)({
  height: 'calc(100vh - 73px)',
});

export const WelcomeContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  flexDirection: 'column',
  gap: 24,
});

export const WelcomeTitle = styled(Typography)({
  fontFamily: '"Rajdhani", sans-serif',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  textAlign: 'center',
  letterSpacing: 3,
});

export const StartButton = styled(Button)({
  fontFamily: '"Rajdhani", sans-serif',
  fontWeight: 700,
  fontSize: '1rem',
  letterSpacing: 2,
  paddingLeft: 40,
  paddingRight: 40,
  paddingTop: 12,
  paddingBottom: 12,
  backgroundColor: '#4488ff',
  borderRadius: 8,
  '&:hover': {
    backgroundColor: '#5599ff',
  },
  '&:disabled': {
    backgroundColor: '#222',
    color: '#555',
  },
});

export const P1Panel = styled(Box)({
  borderRight: '1px solid rgba(255,255,255,0.07)',
  padding: 16,
  overflowY: 'auto',
  backgroundColor: '#0b0d12',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const P2Panel = styled(Box)({
  borderLeft: '1px solid rgba(255,255,255,0.07)',
  padding: 16,
  overflowY: 'auto',
  backgroundColor: '#0b0d12',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const CenterPanel = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export const TurnIndicator = styled(Box)({
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 12,
  paddingBottom: 12,
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#0c0e13',
});

export const TurnText = styled(Typography)({
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  color: '#666',
});

export const WinnerText = styled(Typography)({
  fontFamily: '"Rajdhani", sans-serif',
  fontWeight: 700,
  color: '#ffd700',
});

export const CurrentPlayerText = styled(Typography)<{ isP1: boolean }>(({ isP1 }) => ({
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  color: isP1 ? '#6699ff' : '#ff6666',
}));

export const LogContainer = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  gap: 2.4,
});

export const LogEmpty = styled(Typography)({
  color: '#444',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  textAlign: 'center',
  marginTop: 32,
});

export const LogEntry = styled(Typography)({
  fontSize: '0.8rem',
  fontFamily: '"Share Tech Mono", monospace',
  lineHeight: 1.6,
});

export const ControlsSection = styled(Box)({
  padding: 16,
  borderTop: '1px solid rgba(255,255,255,0.07)',
  backgroundColor: '#0b0d12',
});

export const ControlLabel = styled(Typography)({
  fontSize: '0.65rem',
  color: '#666',
  fontFamily: 'monospace',
  marginBottom: 8,
  letterSpacing: 1,
});

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

export const PlayerName = styled(Typography)<{ isOwn: boolean }>(({ isOwn }) => ({
  fontFamily: '"Rajdhani", sans-serif',
  fontWeight: 700,
  fontSize: '1rem',
  color: isOwn ? '#6699ff' : '#ff6666',
}));

export const SideConditionsBox = styled(Box)({
  display: 'flex',
  gap: 4,
  flexWrap: 'wrap',
  marginBottom: 8,
});

export const SideConditionTag = styled(Box)({
  paddingLeft: 6.4,
  paddingRight: 6.4,
  paddingTop: 1.6,
  paddingBottom: 1.6,
  borderRadius: 4,
  backgroundColor: 'rgba(255,200,50,0.15)',
  border: '1px solid rgba(255,200,50,0.3)',
  fontSize: '0.6rem',
  color: '#ffc832',
  fontFamily: 'monospace',
});

export const PokemonCardContainer = styled(Box)<{ isActive: boolean; isOwn?: boolean }>(({ isActive, isOwn }) => ({
  padding: 12,
  borderRadius: 8,
  backgroundColor: isActive ? (isOwn ? 'rgba(68,136,255,0.15)' : 'rgba(255,80,80,0.15)') : 'rgba(255,255,255,0.04)',
  border: `1px solid ${isActive ? (isOwn ? '#4488ff' : '#ff5050') : 'rgba(255,255,255,0.1)'}`,
  transition: 'all 0.3s',
  minWidth: 140,
  opacity: 1,
}));

export const PokemonName = styled(Typography)<{ fainted: boolean }>(({ fainted }) => ({
  fontFamily: '"Rajdhani", sans-serif',
  fontWeight: 700,
  fontSize: '0.85rem',
  color: fainted ? '#666' : '#eee',
}));

export const LevelBadge = styled(Typography)({
  fontSize: '0.6rem',
  color: '#888',
  fontFamily: 'monospace',
});

export const HPBarContainer = styled(Box)({
  width: '100%',
});

export const HPLabel = styled(Typography)({
  fontSize: '0.65rem',
  color: '#aaa',
  fontFamily: 'monospace',
  marginBottom: 2.4,
  display: 'flex',
  justifyContent: 'space-between',
});

export const HPBarTrack = styled(Box)({
  height: 6,
  borderRadius: 12,
  backgroundColor: '#333',
  overflow: 'hidden',
});

export const HPBarFill = styled(Box)<{ pct: number; color: string }>(({ pct, color }) => ({
  height: '100%',
  width: `${pct}%`,
  backgroundColor: color,
  borderRadius: 12,
  transition: 'width 0.4s ease, background-color 0.4s ease',
}));

export const FaintedText = styled(Typography)({
  fontSize: '0.7rem',
  color: '#f04030',
  fontFamily: 'monospace',
});

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

export const StatBoostBadge = styled(Box)<{ positive: boolean }>(({ positive }) => ({
  paddingLeft: 4,
  paddingRight: 4,
  paddingTop: 0.8,
  paddingBottom: 0.8,
  borderRadius: 4,
  backgroundColor: positive ? 'rgba(80,200,80,0.25)' : 'rgba(200,80,80,0.25)',
  fontSize: '0.55rem',
  fontFamily: 'monospace',
  color: positive ? '#80d080' : '#d08080',
}));

export const BadgesContainer = styled(Box)({
  display: 'flex',
  gap: 4,
  marginTop: 4,
  flexWrap: 'wrap',
});

export const ItemTag = styled(Typography)({
  fontSize: '0.6rem',
  color: '#aaa',
  marginTop: 2.4,
  fontStyle: 'italic',
});

export const MenuContainer = styled(Box)({
  display: 'flex',
  gap: 4,
  alignItems: 'center',
});

export const StatusIndicatorDot = styled(Box)<{ alive: boolean; isOwn: boolean }>(({ alive, isOwn }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: alive ? (isOwn ? '#6699ff' : '#ff6666') : '#333',
  border: '1px solid rgba(255,255,255,0.1)',
}));

export const MoveButtonStyled = styled(Button)<{ disabled: boolean }>(({ disabled }) => ({
  fontFamily: '"Rajdhani", sans-serif',
  fontWeight: 600,
  fontSize: '0.8rem',
  color: disabled ? '#555' : '#ddd',
  borderColor: disabled ? '#333' : 'rgba(100,150,255,0.4)',
  backgroundColor: disabled ? 'transparent' : 'rgba(100,150,255,0.06)',
  '&:hover': {
    backgroundColor: 'rgba(100,150,255,0.15)',
    borderColor: '#6699ff',
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

export const MovePPText = styled('div')({
  fontSize: '0.65rem',
  color: '#888',
  fontFamily: 'monospace',
});

export const SwitchButton = styled(Button)({
  fontFamily: '"Rajdhani", sans-serif',
  color: '#88ffaa',
  borderColor: 'rgba(136,255,170,0.25)',
  textTransform: 'none',
  fontSize: '0.75rem',
  '&:hover': {
    borderColor: '#88ffaa',
    backgroundColor: 'rgba(136,255,170,0.08)',
  },
});

export const TeamSizeIndicator = styled(Box)({
  display: 'flex',
  gap: 4,
});

export const BenchLabel = styled(Typography)({
  fontSize: '0.65rem',
  color: '#666',
  fontFamily: 'monospace',
  marginTop: 4,
  marginBottom: 6,
});

export const BenchContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  overflowY: 'auto',
  flex: 1,
});
