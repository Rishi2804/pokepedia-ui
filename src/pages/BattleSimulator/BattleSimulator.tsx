import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BattleState, LogEntry } from './types';
import * as S from './styles';
import { makeInitialBattleState } from './utils';
import BattleHeader from './components/BattleHeader/BattleHeader.tsx';
import PlayerPanel from './components/PlayerPanel/PlayerPanel.tsx';
import BattleLog from './components/BattleLog/BattleLog.tsx';
import ControlsPanel from './components/ControlsPanel/ControlsPanel.tsx';
import TeamPreview from './components/TeamPreview/TeamPreview.tsx';
import { useTeamStore } from '../../store/teamStore.ts';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useBattleWebSocket } from '../../services/battle/hooks/useBattleWebSocket.ts';
import { useBattleActions } from '../../services/battle/hooks/useBattleActions.ts';

const BattleSimulator: React.FC = () => {
  const [battleStarted, setBattleStarted] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'p1' | 'p2'>('p1');
  const [battleState, setBattleState] = useState<BattleState>(makeInitialBattleState());
  const battleStateRef = useRef<BattleState>(battleState);
  const [battleGen, setBattleGen] = useState('9');
  const [p1TeamId, setP1TeamId] = useState('');
  const [p2TeamId, setP2TeamId] = useState('');

  const { teams } = useTeamStore();
  const theme = useTheme();

  // Keep ref in sync
  useEffect(() => {
    battleStateRef.current = battleState;
  }, [battleState]);

  const getBattleState = useCallback(() => battleStateRef.current, []);

  const onStateChange = useCallback((nextState: BattleState) => {
    battleStateRef.current = nextState;
    setBattleState(nextState);
  }, []);

  const onLogsChange = useCallback((newLogs: LogEntry[]) => {
    setLogs(prev => [...prev, ...newLogs]);
  }, []);

  const { connectionStatus, send } = useBattleWebSocket({
    getBattleState,
    onStateChange,
    onLogsChange,
    // currentPlayer is now driven purely by sideupdate from server
    onPlayerChange: setCurrentPlayer,
  });

  const p1Team = teams.find(t => t.id === Number(p1TeamId));
  const p2Team = teams.find(t => t.id === Number(p2TeamId));

  const { startBattle, makeMove, validateTeam } = useBattleActions({
    send,
    battleGen,
    p1Team,
    p2Team,
    currentPlayer,
    setCurrentPlayer,
    setBattleStarted,
    setBattleState,
    setLogs,
  });

  const activeMoves = battleState.requestData?.active?.[0]?.moves;
  const isForceSwitch = !!(battleState.requestData?.forceSwitch?.[0]);
  const currentPlayerState = battleState[currentPlayer];
  const availableSwitches = currentPlayerState.team.filter(
      p => !p.active && !p.fainted && p.status !== 'fnt'
  );

  return (
      <S.BattleContainer>
        <BattleHeader battleState={battleState} connectionStatus={connectionStatus} />

        {!battleStarted ? (
            <S.WelcomeContainer>
              <S.WelcomeTitle>READY FOR BATTLE?</S.WelcomeTitle>
              <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                  }}
              >
                Anything Goes Format
              </Typography>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Select a Gen</InputLabel>
                <Select
                    label="Select a Gen"
                    value={battleGen}
                    onChange={e => setBattleGen(e.target.value)}
                >
                  {[...Array(9)].map((_, i) => {
                    const gen = (i + 1).toString();
                    return (
                        <MenuItem value={gen} key={i}>
                          Gen {gen}
                        </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>P1: Select a Team</InputLabel>
                <Select
                    label="P1: Select a Team"
                    value={p1TeamId}
                    onChange={e => setP1TeamId(e.target.value)}
                >
                  {teams.map(t => (
                      <MenuItem value={String(t.id)} key={t.id}>
                        {t.name}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>P2: Select a Team</InputLabel>
                <Select
                    label="P2: Select a Team"
                    value={p2TeamId}
                    onChange={e => setP2TeamId(e.target.value)}
                >
                  {teams.map(t => (
                      <MenuItem value={String(t.id)} key={t.id}>
                        {t.name}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <S.StartButton
                  variant="contained"
                  onClick={startBattle}
                  disabled={connectionStatus !== 'connected' || !p1Team || !p2Team}
              >
                START BATTLE
              </S.StartButton>
            </S.WelcomeContainer>
        ) : battleState.phase === 'teampreview' ? (
            // ── Team Preview ──────────────────────────────────────────────────────
            <TeamPreview
                battleState={battleState}
                currentPlayer={currentPlayer}
                onConfirm={(player, order) => send({ type: 'move', player, choice: `team ${order}` })}
            />
        ) : (
            // ── Battle ────────────────────────────────────────────────────────────
            <Grid container sx={{ height: 'calc(100vh - 73px)' }}>
              {/* P1 Panel */}
              <Grid size={{ xs: 2.5 }} component={S.P1Panel}>
                <PlayerPanel player={battleState.p1} isOwn={true} />
              </Grid>

              {/* Center: Log + Controls */}
              <Grid size={{ xs: 7 }} component={S.CenterPanel}>
                <S.TurnIndicator>
                  <S.TurnText>TURN {battleState.turn || '—'}</S.TurnText>
                  {battleState.winner ? (
                      <S.WinnerText>
                        🏆 {battleState.winner === 'tie' ? 'TIE GAME' : `${battleState.winner} WINS`}
                      </S.WinnerText>
                  ) : (
                      <S.CurrentPlayerText isP1={currentPlayer === 'p1'}>
                        {currentPlayer.toUpperCase()} to move
                        {isForceSwitch ? ' — choose a switch!' : ''}
                      </S.CurrentPlayerText>
                  )}
                </S.TurnIndicator>

                <BattleLog logs={logs} />

                {!battleState.winner && (
                    <ControlsPanel
                        activeMoves={isForceSwitch ? undefined : activeMoves}
                        isForceSwitch={isForceSwitch}
                        currentPlayer={currentPlayer}
                        currentPlayerState={currentPlayerState}
                        availableSwitches={availableSwitches}
                        onMoveClick={makeMove}
                    />
                )}
              </Grid>

              {/* P2 Panel */}
              <Grid size={{ xs: 2.5 }} component={S.P2Panel}>
                <PlayerPanel player={battleState.p2} isOwn={false} />
              </Grid>
            </Grid>
        )}
      </S.BattleContainer>
  );
};

export default BattleSimulator;