import React, { useState, useEffect, useRef, useCallback } from 'react';
import {Button, Grid2 as Grid, Typography} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BattleState, LogEntry } from './types';
import * as S from './styles';
import {makeInitialBattleState} from './utils';
import BattleHeader from './components/BattleHeader/BattleHeader.tsx';
import PlayerPanel from './components/PlayerPanel/PlayerPanel.tsx';
import BattleLog from './components/BattleLog/BattleLog.tsx';
import ControlsPanel from './components/ControlsPanel/ControlsPanel.tsx';
import {PokemonTeam} from "../../global/types.ts";
import {useTeamStore} from "../../store/teamStore.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {makeShowdownTeam} from "../../services/battle/transformers/showdownTransformer.ts";
import {useBattleWebSocket} from "../../services/battle/hooks/useBattleWebSocket.ts";

const BattleSimulator: React.FC = () => {
  const [battleStarted, setBattleStarted] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'p1' | 'p2'>('p1');
  const [battleState, setBattleState] = useState<BattleState>(makeInitialBattleState());
  const battleStateRef = useRef<BattleState>(battleState);
  const [battleGen, setBattleGen] = useState("9")
  const [p1TeamId, setP1TeamId] = useState('');
  const [p2TeamId, setP2TeamId] = useState('');

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
    onPlayerChange: setCurrentPlayer,
  });

  const startBattle = () => {
    const p1Team = teams.find(t => t.id === Number(p1TeamId));
    const p2Team = teams.find(t => t.id === Number(p2TeamId));
    if (!p1Team || !p2Team) return;
    send({ type: 'start-battle', format: `gen${battleGen}anythinggoes`, team1: makeShowdownTeam(p1Team), team2: makeShowdownTeam(p2Team) });
    setBattleStarted(true);
    setBattleState(makeInitialBattleState());
    setLogs([]);
  };

  const makeMove = (choice: string) => {
    send({ type: 'move', player: currentPlayer, choice });
    setCurrentPlayer(prev => (prev === 'p1' ? 'p2' : 'p1'));
  };

  const validateTeam = (team: PokemonTeam) => {
    send({ type: 'validate-team', team: makeShowdownTeam(team) });
  }

  const theme = useTheme();
  const { teams } = useTeamStore();
  const activeMoves = battleState.requestData?.active?.[0]?.moves;
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
              <Typography sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace', fontSize: '0.8rem', textAlign: 'center' }}>
                Gen 7 Random Battle Format
              </Typography>
              <FormControl>
                <InputLabel>Select a Gen</InputLabel>
                <Select
                    type={'number'}
                    label={"Select a Gen"}
                    value={battleGen}
                    onChange={(e) => setBattleGen(e.target.value)}
                >
                  {
                    [...Array(9)].map((_, i) => {
                      const gen = (i + 1).toString()
                      return (
                          <MenuItem value={gen} key={i}>Gen {gen}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>P1: Select a Team</InputLabel>
                <Select
                    type={'number'}
                    label={"Select"}
                    value={p1TeamId.toString()}
                    onChange={(e) => setP1TeamId(e.target.value)}
                >
                  {
                    teams.map((p) => {
                      return (
                          <MenuItem value={p.id} key={p.id}>{p.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>P2: Select a Team</InputLabel>
                <Select
                    type={'number'}
                    label={"Select"}
                    value={p2TeamId.toString()}
                    onChange={(e) => setP2TeamId(e.target.value)}
                >
                  {
                    teams.map((p) => {
                      return (
                          <MenuItem value={p.id} key={p.id}>{p.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
              <S.StartButton
                  variant="contained"
                  onClick={startBattle}
                  disabled={connectionStatus !== 'connected'}
              >
                START RANDOM BATTLE
              </S.StartButton>
              <Button
                  onClick={() => validateTeam(teams[0])}
              >
                Test Validate
              </Button>
            </S.WelcomeContainer>
        ) : (
            <Grid container sx={{ height: 'calc(100vh - 73px)' }}>
              {/* P1 Panel */}
              <Grid size={{ xs: 2.5 }} component={S.P1Panel}>
                <PlayerPanel player={battleState.p1} isOwn={true} />
              </Grid>

              {/* Center: Log + Controls */}
              <Grid size={{ xs: 7 }} component={S.CenterPanel}>
                {/* Turn indicator */}
                <S.TurnIndicator>
                  <S.TurnText>TURN {battleState.turn || '—'}</S.TurnText>
                  {battleState.winner ? (
                      <S.WinnerText>
                        🏆 {battleState.winner === 'tie' ? 'TIE GAME' : `${battleState.winner} WINS`}
                      </S.WinnerText>
                  ) : (
                      <S.CurrentPlayerText isP1={currentPlayer === 'p1'}>
                        {currentPlayer.toUpperCase()} to move
                      </S.CurrentPlayerText>
                  )}
                </S.TurnIndicator>

                {/* Battle Log */}
                <BattleLog logs={logs} />

                {/* Controls */}
                {!battleState.winner && (
                    <ControlsPanel
                        activeMoves={activeMoves}
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