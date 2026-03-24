import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BattleState, Pokemon } from '../../types.ts';

interface TeamPreviewProps {
    battleState: BattleState;
    currentPlayer: 'p1' | 'p2';
    /**
     * Called once per player with their chosen slot order string e.g. "123456".
     * The parent sends `>p1 team 123456` then `>p2 team 123456` to the server.
     */
    onConfirm: (player: 'p1' | 'p2', order: string) => void;
}

/**
 * Single-client team preview: p1 picks their order, confirms, then p2 does the
 * same. Both submissions must reach the server before the battle advances.
 */
const TeamPreview: React.FC<TeamPreviewProps> = ({ battleState, onConfirm }) => {
    const theme = useTheme();

    const [confirmedPlayers, setConfirmedPlayers] = useState<Set<'p1' | 'p2'>>(new Set());
    const [pickingPlayer, setPickingPlayer] = useState<'p1' | 'p2'>('p1');
    const [order, setOrder] = useState<number[]>(
        battleState.p1.team.map((_, i) => i + 1)
    );

    const moveToFront = (slotIndex: number) => {
        setOrder(prev => [slotIndex, ...prev.filter(s => s !== slotIndex)]);
    };

    const handleConfirm = () => {
        const orderStr = order.join('');
        onConfirm(pickingPlayer, orderStr);

        const nextConfirmed = new Set(confirmedPlayers).add(pickingPlayer);
        setConfirmedPlayers(nextConfirmed);

        if (pickingPlayer === 'p1' && !nextConfirmed.has('p2')) {
            setPickingPlayer('p2');
            setOrder(battleState.p2.team.map((_, i) => i + 1));
        }
    };

    const bothConfirmed = confirmedPlayers.size >= 2;

    const renderTeamGrid = (
        team: Pokemon[],
        label: string,
        interactive: boolean,
        confirmed: boolean,
    ) => (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Typography
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: confirmed
                            ? '#4caf50'
                            : interactive
                                ? theme.palette.primary.main
                                : theme.palette.text.secondary,
                        letterSpacing: 2,
                        textAlign: 'center',
                    }}
                >
                    {label}
                </Typography>
                {confirmed && (
                    <Typography sx={{ fontSize: '0.75rem', color: '#4caf50' }}>
                        ✓ READY
                    </Typography>
                )}
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
                {team.map((poke, i) => {
                    const slot = i + 1;
                    const leadIndex = interactive ? order.indexOf(slot) : -1;
                    const isLead = leadIndex === 0;

                    return (
                        <Box
                            key={i}
                            onClick={() => interactive && !confirmed && moveToFront(slot)}
                            sx={{
                                border: `1px solid ${
                                    isLead && interactive
                                        ? theme.palette.primary.main
                                        : theme.palette.mode === 'light'
                                            ? 'rgba(0,0,0,0.15)'
                                            : 'rgba(255,255,255,0.15)'
                                }`,
                                borderRadius: 2,
                                p: 1.5,
                                cursor: interactive && !confirmed ? 'pointer' : 'default',
                                backgroundColor:
                                    isLead && interactive
                                        ? theme.palette.mode === 'light'
                                            ? 'rgba(25,118,210,0.08)'
                                            : 'rgba(25,118,210,0.18)'
                                        : theme.palette.background.paper,
                                transition: 'all 0.15s ease',
                                position: 'relative',
                                opacity: confirmed ? 0.6 : 1,
                                '&:hover':
                                    interactive && !confirmed
                                        ? {
                                            borderColor: theme.palette.primary.main,
                                            backgroundColor:
                                                theme.palette.mode === 'light'
                                                    ? 'rgba(25,118,210,0.05)'
                                                    : 'rgba(25,118,210,0.12)',
                                        }
                                        : {},
                            }}
                        >
                            {interactive && leadIndex >= 0 && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 4,
                                        right: 6,
                                        fontSize: '0.6rem',
                                        fontFamily: 'monospace',
                                        color: isLead ? theme.palette.primary.main : theme.palette.text.secondary,
                                        fontWeight: 700,
                                    }}
                                >
                                    #{leadIndex + 1}
                                </Box>
                            )}
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                    color: theme.palette.text.primary,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {poke.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.65rem',
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                Lv{poke.level}
                                {poke.gender === 'M' ? ' ♂' : poke.gender === 'F' ? ' ♀' : ''}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 73px)',
                gap: 4,
                p: 4,
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    letterSpacing: 3,
                    color: theme.palette.text.primary,
                }}
            >
                TEAM PREVIEW
            </Typography>

            {!bothConfirmed && (
                <Typography
                    sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        color: theme.palette.primary.main,
                        textAlign: 'center',
                    }}
                >
                    {pickingPlayer.toUpperCase()} — click a Pokémon to set your lead order, then confirm.
                </Typography>
            )}

            <Box sx={{ display: 'flex', gap: 6, width: '100%', maxWidth: 800, alignItems: 'flex-start' }}>
                {renderTeamGrid(
                    battleState.p1.team,
                    `${battleState.p1.name} (P1)`,
                    pickingPlayer === 'p1',
                    confirmedPlayers.has('p1'),
                )}
                <Box
                    sx={{
                        width: 1,
                        alignSelf: 'stretch',
                        backgroundColor:
                            theme.palette.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                    }}
                />
                {renderTeamGrid(
                    battleState.p2.team,
                    `${battleState.p2.name} (P2)`,
                    pickingPlayer === 'p2',
                    confirmedPlayers.has('p2'),
                )}
            </Box>

            {!bothConfirmed && (
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleConfirm}
                    sx={{ fontWeight: 700, letterSpacing: 2, px: 5, py: 1.5, fontSize: '0.95rem' }}
                >
                    CONFIRM {pickingPlayer.toUpperCase()} ORDER
                </Button>
            )}

            {bothConfirmed && (
                <Typography
                    sx={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#4caf50', letterSpacing: 1 }}
                >
                    ✓ Both players ready — starting battle...
                </Typography>
            )}
        </Box>
    );
};

export default TeamPreview;