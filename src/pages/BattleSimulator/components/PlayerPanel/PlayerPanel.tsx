import React, { useState } from 'react';
import { Box, Collapse, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PlayerState } from '../../types.ts';
import * as S from './styles.ts';
import PokemonCard from '../PokemonCard/PokemonCard.tsx';
import { LogEntry } from '../../types.ts';
import BattleLog from '../BattleLog/BattleLog.tsx';

interface PlayerPanelProps {
    player: PlayerState;
    isOwn: boolean;
    logs?: LogEntry[];
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ player, isOwn, logs }) => {
    const theme = useTheme();
    const [logsOpen, setLogsOpen] = useState(true);
    const faintedCount = player.team.filter(p => p.fainted || p.status === 'fnt').length;
    const aliveCount = player.teamSize - faintedCount;

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1, minHeight: 0 }}>
            <S.PlayerHeader>
                <S.PlayerName isOwn={isOwn}>{player.name}</S.PlayerName>
                <S.TeamSizeIndicator>
                    {Array.from({ length: player.teamSize }).map((_, i) => (
                        <S.StatusIndicatorDot key={i} alive={i < aliveCount} isOwn={isOwn} />
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

            {/* ── Collapsible log (only shown when logs are provided) ── */}
            {logs && (
                <Box sx={{ mt: 'auto', borderTop: `1px solid ${theme.palette.divider}`, pt: 0.5, flexShrink: 0 }}>
                    <Box
                        onClick={() => setLogsOpen(o => !o)}
                        sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            cursor: 'pointer', px: 0.5, py: 0.25,
                            userSelect: 'none',
                            '&:hover': { opacity: 0.8 },
                        }}
                    >
                        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.65rem', color: 'text.secondary', letterSpacing: 1 }}>
                            BATTLE LOG {logs.length > 0 ? `(${logs.length})` : ''}
                        </Typography>
                        <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                            {logsOpen ? '▲' : '▼'}
                        </Typography>
                    </Box>
                    <Collapse in={logsOpen}>
                        <Box sx={{ maxHeight: 180, overflowY: 'auto' }}>
                            <BattleLog logs={logs} />
                        </Box>
                    </Collapse>
                </Box>
            )}
        </Box>
    );
};

export default PlayerPanel;