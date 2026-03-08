import React from 'react';
import { Box, Chip } from '@mui/material';
import { BattleState } from '../types';
import * as S from '../styles';

interface BattleHeaderProps {
  battleState: BattleState;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
}

const BattleHeader: React.FC<BattleHeaderProps> = ({ battleState, connectionStatus }) => {
  return (
    <S.Header>
      <Box>
        <S.HeaderTitle>⚔ BATTLE SIMULATOR</S.HeaderTitle>
        {battleState.tier && <S.HeaderSubtitle>{battleState.tier} · Gen {battleState.gen}</S.HeaderSubtitle>}
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {battleState.weather && (
          <Chip
            label={battleState.weather}
            size="small"
            sx={{
              backgroundColor: 'rgba(100,180,255,0.15)',
              color: '#88ccff',
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
              backgroundColor: 'rgba(255,200,50,0.12)',
              color: '#ffcc44',
              fontFamily: 'monospace',
              fontSize: '0.65rem',
              height: 22,
            }}
          />
        ))}
        <S.ConnectionIndicator
          sx={{
            backgroundColor: connectionStatus === 'connected' ? 'rgba(60,200,60,0.1)' : 'rgba(255,60,60,0.1)',
            borderColor: connectionStatus === 'connected' ? 'rgba(60,200,60,0.3)' : 'rgba(255,60,60,0.3)',
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
