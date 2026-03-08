import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PlayerState } from '../types';
import * as S from '../styles';
import PokemonCard from './PokemonCard';

interface PlayerPanelProps {
  player: PlayerState;
  isOwn: boolean;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ player, isOwn }) => {
  const theme = useTheme();
  const faintedCount = player.team.filter(p => p.fainted || p.status === 'fnt').length;
  const aliveCount = player.teamSize - faintedCount;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <S.PlayerHeader>
        <S.PlayerName isOwn={isOwn}>{player.name}</S.PlayerName>
        <S.TeamSizeIndicator>
          {Array.from({ length: player.teamSize }).map((_, i) => (
            <S.StatusIndicatorDot
              key={i}
              alive={i < aliveCount}
              isOwn={isOwn}
            />
          ))}
        </S.TeamSizeIndicator>
      </S.PlayerHeader>

      {player.sideConditions.length > 0 && (
        <S.SideConditionsBox>
          {player.sideConditions.map(c => (
            <S.SideConditionTag key={c}>{c.replace('move: ', '')}</S.SideConditionTag>
          ))}
        </S.SideConditionsBox>
      )}

      {player.active ? (
        <PokemonCard pokemon={player.active} isActive={true} isOwn={isOwn} />
      ) : (
        <Box sx={{ p: 2, borderRadius: 2, border: `1px dashed ${theme.palette.mode === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'}`, textAlign: 'center' }}>
          <S.LogEmpty>No active Pokémon</S.LogEmpty>
        </Box>
      )}

      <S.BenchLabel>BENCH</S.BenchLabel>
      <S.BenchContainer>
        {player.team.filter(p => !p.active).map((poke, i) => (
          <PokemonCard key={i} pokemon={poke} isActive={false} isOwn={isOwn} />
        ))}
      </S.BenchContainer>
    </Box>
  );
};

export default PlayerPanel;
