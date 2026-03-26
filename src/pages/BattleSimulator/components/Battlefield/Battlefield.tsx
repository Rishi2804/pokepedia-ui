import React from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { PlayerState } from '../../types.ts';
import PokemonImg from '../../../../components/PokemonImg/PokemonImg.tsx';
import * as S from './styles.ts';

interface BattlefieldProps {
    p1: PlayerState;
    p2: PlayerState;
    weather: string | null;
    fieldConditions: string[];
}

const WEATHER_BG: Record<string, string> = {
    RainDance:  'radial-gradient(ellipse at top, rgba(40,80,160,0.35) 0%, transparent 70%)',
    Sandstorm:  'radial-gradient(ellipse at top, rgba(180,140,60,0.35) 0%, transparent 70%)',
    SunnyDay:   'radial-gradient(ellipse at top, rgba(255,200,50,0.25) 0%, transparent 70%)',
    Hail:       'radial-gradient(ellipse at top, rgba(160,210,255,0.3) 0%, transparent 70%)',
    Snow:       'radial-gradient(ellipse at top, rgba(200,230,255,0.3) 0%, transparent 70%)',
};

const WEATHER_EMOJI: Record<string, string> = {
    RainDance: '🌧', Sandstorm: '🌪', SunnyDay: '☀️', Hail: '🌨', Snow: '❄️',
};

const FallbackSprite: React.FC<{ name: string; size: number }> = ({ name, size }) => {
    return (
        <S.FallbackSpriteBox sx={{ width: size, height: size }}>
            <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', textAlign: 'center', px: 0.5 }}>
                {name}
            </Typography>
        </S.FallbackSpriteBox>
    );
};

const SpriteSlot: React.FC<{
    pokemon: PlayerState['active'];
    size: number;
    label: string;
}> = ({ pokemon, size, label }) => {
    if (!pokemon || pokemon.fainted) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <FallbackSprite name={pokemon?.fainted ? `${pokemon.name} ✗` : '—'} size={size} />
                <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', fontFamily: 'monospace' }}>
                    {label}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {pokemon.pokedexId ? (
                <S.SpriteBox
                    size={size}
                    sx={{ filter: pokemon.fainted ? 'grayscale(1) opacity(0.4)' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                >
                    <PokemonImg
                        id={pokemon.pokedexId}
                        shiny={pokemon.shiny}
                        female={pokemon.gender === 'F'}
                    />
                </S.SpriteBox>
            ) : (
                <FallbackSprite name={pokemon.name} size={size} />
            )}
            <S.SpriteLabel>{label}</S.SpriteLabel>
        </Box>
    );
};

const Battlefield: React.FC<BattlefieldProps> = ({
                                                     p1, p2, weather, fieldConditions,
                                                 }) => {
    const weatherBg = weather ? WEATHER_BG[weather] : undefined;

    return (
        <S.BattlefieldContainer sx={{ background: weatherBg }}>

            {/* ── Weather + field chips ─────────────────────────────── */}
            {(weather || fieldConditions.length > 0) && (
                <S.WeatherChipsRow>
                    {weather && (
                        <S.WeatherChip>{WEATHER_EMOJI[weather] ?? '🌤'} {weather}</S.WeatherChip>
                    )}
                    {fieldConditions.map(c => (
                        <S.FieldConditionChip key={c}>{c.replace('move: ', '')}</S.FieldConditionChip>
                    ))}
                </S.WeatherChipsRow>
            )}

            {/* ── Sprite rows ──────────────────────────────────────── */}
            <Grid2 container sx={{ width: '100%' }}>
                {/* P2 top-right */}
                <Grid2 size={{ xs: 6 }} />
                <Grid2 size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end', pr: 4 }}>
                    <SpriteSlot pokemon={p2.active} size={180} label={p2.name} />
                </Grid2>
            </Grid2>

            <Grid2 container sx={{ width: '100%' }}>
                {/* P1 bottom-left */}
                <Grid2 size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'flex-start', pl: 4 }}>
                    <SpriteSlot pokemon={p1.active} size={200} label={p1.name} />
                </Grid2>
                <Grid2 size={{ xs: 6 }} />
            </Grid2>
        </S.BattlefieldContainer>
    );
};

export default Battlefield;