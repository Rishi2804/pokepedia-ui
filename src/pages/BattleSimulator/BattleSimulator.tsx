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
import type { ValidationState } from '../../services/battle/types.ts';

const BattleSimulator: React.FC = () => {
  const [battleStarted, setBattleStarted] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'p1' | 'p2'>('p1');
  const [battleState, setBattleState] = useState<BattleState>(makeInitialBattleState());
  const battleStateRef = useRef<BattleState>(battleState);
  const [battleGen, setBattleGen] = useState('9');
  const [p1TeamId, setP1TeamId] = useState('');
  const [p2TeamId, setP2TeamId] = useState('');
  const [validation, setValidation] = useState<ValidationState>({ status: 'idle', p1Error: null, p2Error: null });

  const { teams } = useTeamStore();
  const theme = useTheme();

  // Keep refs in sync with state
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

  const onValidateResultRef = useRef<(player: 'p1' | 'p2', error: string | null) => void>(() => {});

  const { connectionStatus, send } = useBattleWebSocket({
    getBattleState,
    onStateChange,
    onLogsChange,
    onPlayerChange: setCurrentPlayer,
    onValidateResult: (player, error) => onValidateResultRef.current(player, error),
  });

  const p1Team = teams.find(t => t.id === Number(p1TeamId));
  const p2Team = teams.find(t => t.id === Number(p2TeamId));

  // Keep the ref in sync so useBattleWebSocket always calls the latest version
  const { validateAndStart, makeMove, onValidateResult } = useBattleActions({
    send,
    battleGen,
    p1Team,
    p2Team,
    currentPlayer,
    setCurrentPlayer,
    setBattleStarted,
    setBattleState,
    setLogs,
    setValidation,
  });

  onValidateResultRef.current = onValidateResult;

  // Always read from the current player's own request — never from the other player's
  const currentRequestData = currentPlayer === 'p1' ? battleState.p1RequestData : battleState.p2RequestData;
  const activeMoves = currentRequestData?.active?.[0]?.moves;
  const isForceSwitch = !!(currentRequestData?.forceSwitch?.[0]);
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

              {validation.status === 'error' && (
                  <>
                    {validation.p1Error && (
                        <Typography sx={{ color: 'error.main', fontFamily: 'monospace', fontSize: '0.75rem', maxWidth: 400, textAlign: 'center' }}>
                          P1 team invalid: {validation.p1Error}
                        </Typography>
                    )}
                    {validation.p2Error && (
                        <Typography sx={{ color: 'error.main', fontFamily: 'monospace', fontSize: '0.75rem', maxWidth: 400, textAlign: 'center' }}>
                          P2 team invalid: {validation.p2Error}
                        </Typography>
                    )}
                  </>
              )}
              <S.StartButton
                  variant="contained"
                  onClick={validateAndStart}
                  disabled={connectionStatus !== 'connected' || !p1Team || !p2Team || validation.status === 'validating'}
              >
                {validation.status === 'validating' ? 'VALIDATING...' : 'START BATTLE'}
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