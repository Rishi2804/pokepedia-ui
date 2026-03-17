import React from 'react';
import { Box, Chip, useTheme } from '@mui/material';
import { BattleState } from '../../types.ts';
import * as S from './styles.ts';

interface BattleHeaderProps {
  battleState: BattleState;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
}

const BattleHeader: React.FC<BattleHeaderProps> = ({ battleState, connectionStatus }) => {
  const theme = useTheme();

  return (
    <S.Header>
      <Box>
        <S.HeaderTitle>BATTLE SIMULATOR</S.HeaderTitle>
        {battleState.tier && <S.HeaderSubtitle>{battleState.tier} · Gen {battleState.gen}</S.HeaderSubtitle>}
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {battleState.weather && (
          <Chip
            label={battleState.weather}
            size="small"
            sx={{
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(25,118,210,0.12)'
                : 'rgba(25,118,210,0.25)',
              color: theme.palette.primary.main,
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              height: 22,
            }}
          />
        )}
        {battleState.fieldConditions.map(c => (
          <Chip
            key={c}
            label={c.replace('move: ', '')}
            size="small"
            sx={{
              backgroundColor: theme.palette.mode === 'light'
                ? 'rgba(255,152,0,0.12)'
                : 'rgba(255,152,0,0.25)',
              color: theme.palette.mode === 'light' ? '#ff9800' : '#ffb74d',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              height: 22,
            }}
          />
        ))}
        <S.ConnectionIndicator
          sx={{
            backgroundColor: connectionStatus === 'connected' 
              ? (theme.palette.mode === 'light' 
                ? 'rgba(76,175,80,0.12)' 
                : 'rgba(76,175,80,0.25)')
              : (theme.palette.mode === 'light'
                ? 'rgba(211,47,47,0.12)'
                : 'rgba(211,47,47,0.25)'),
            borderColor: connectionStatus === 'connected'
              ? (theme.palette.mode === 'light'
                ? 'rgba(76,175,80,0.3)'
                : 'rgba(76,175,80,0.4)')
              : (theme.palette.mode === 'light'
                ? 'rgba(211,47,47,0.3)'
                : 'rgba(211,47,47,0.4)'),
          }}
        >
          <S.StatusDot connected={connectionStatus === 'connected'} />
          <S.StatusText connected={connectionStatus === 'connected'}>{connectionStatus}</S.StatusText>
        </S.ConnectionIndicator>
      </Box>
    </S.Header>
  );
};

export default BattleHeader;
