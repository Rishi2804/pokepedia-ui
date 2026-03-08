import React from 'react';
import { Box } from '@mui/material';
import { Pokemon } from '../types';
import * as S from '../styles';

interface PokemonCardProps {
  pokemon: Pokemon;
  isActive: boolean;
  isOwn?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  slp: '#9b8ed4',
  par: '#f0d060',
  brn: '#f05030',
  frz: '#98d8d8',
  psn: '#a060a8',
  tox: '#6030a0',
  fnt: '#888',
};

const STATUS_LABELS: Record<string, string> = {
  slp: 'SLP',
  par: 'PAR',
  brn: 'BRN',
  frz: 'FRZ',
  psn: 'PSN',
  tox: 'TOX',
  fnt: 'FNT',
};

function hpColor(pct: number): string {
  if (pct > 50) return '#48d048';
  if (pct > 20) return '#f8d030';
  return '#f04030';
}

const HPBar: React.FC<{ hp: number; maxHp: number; pct: number }> = ({ hp, maxHp, pct }) => (
  <S.HPBarContainer>
    <S.HPLabel>
      <span>HP</span>
      <span>
        {hp}/{maxHp} ({pct}%)
      </span>
    </S.HPLabel>
    <S.HPBarTrack>
      <S.HPBarFill pct={pct} color={hpColor(pct)} />
    </S.HPBarTrack>
  </S.HPBarContainer>
);

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isActive, isOwn = false }) => {
  const fainted = pokemon.fainted || pokemon.status === 'fnt';

  return (
    <S.PokemonCardContainer isActive={isActive} isOwn={isOwn} sx={{ opacity: fainted ? 0.4 : 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
        <S.PokemonName fainted={fainted}>
          {pokemon.name}
          {pokemon.gender && (
            <span style={{ color: pokemon.gender === 'M' ? '#88aaff' : '#ff88aa', marginLeft: 4 }}>
              {pokemon.gender === 'M' ? '♂' : '♀'}
            </span>
          )}
        </S.PokemonName>
        <S.LevelBadge>Lv{pokemon.level}</S.LevelBadge>
      </Box>

      {!fainted ? (
        <HPBar hp={pokemon.hp} maxHp={pokemon.maxHp} pct={pokemon.hpPercent} />
      ) : (
        <S.FaintedText>FAINTED</S.FaintedText>
      )}

      <S.BadgesContainer>
        {pokemon.status && !fainted && (
          <S.StatusBadge color={STATUS_COLORS[pokemon.status] || '#555'}>
            {STATUS_LABELS[pokemon.status] || pokemon.status.toUpperCase()}
          </S.StatusBadge>
        )}
        {isActive &&
          Object.entries(pokemon.boosts)
            .filter(([, v]) => v !== 0)
            .map(([stat, val]) => (
              <S.StatBoostBadge key={stat} positive={val > 0}>
                {stat}
                {val > 0 ? `+${val}` : val}
              </S.StatBoostBadge>
            ))}
      </S.BadgesContainer>

      {isActive && pokemon.item && <S.ItemTag>@ {pokemon.item}</S.ItemTag>}
    </S.PokemonCardContainer>
  );
};

export default PokemonCard;
