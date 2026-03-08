import React, { useState, useEffect, useRef } from 'react';
import { Grid2 as Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BattleState, LogEntry } from './types';
import * as S from './styles';
import { makeInitialBattleState, processMessage } from './utils';
import BattleHeader from './components/BattleHeader';
import PlayerPanel from './components/PlayerPanel';
import BattleLog from './components/BattleLog';
import ControlsPanel from './components/ControlsPanel';

const BattleSimulator: React.FC = () => {
  const [battleStarted, setBattleStarted] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'p1' | 'p2'>('p1');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [battleState, setBattleState] = useState<BattleState>(makeInitialBattleState());
  const wsRef = useRef<WebSocket | null>(null);
  const battleStateRef = useRef<BattleState>(battleState);

  // Keep ref in sync
  useEffect(() => {
    battleStateRef.current = battleState;
  }, [battleState]);

  // WebSocket connection
  useEffect(() => {
    if (wsRef.current) return;
    setConnectionStatus('connecting');
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus('connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'update' || data.type === 'sideupdate') {
        const { state: nextState, logs: newLogs } = processMessage(
          battleStateRef.current,
          data.message
        );
        battleStateRef.current = nextState;
        setBattleState(nextState);
        if (newLogs.length) setLogs(prev => [...prev, ...newLogs]);

        // Update current player based on requests
        if (data.type === 'sideupdate' && data.player && nextState.requestData) {
          setCurrentPlayer(data.player);
        }
      }
    };

    ws.onerror = () => {
      setConnectionStatus('disconnected');
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      wsRef.current = null;
    };

    return () => {
      if (wsRef.current === ws && ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, []);

  const send = (msg: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const startBattle = () => {
    send({ type: 'start-battle', format: 'gen7randombattle' });
    setBattleStarted(true);
    setBattleState(makeInitialBattleState());
    setLogs([]);
  };

  const makeMove = (choice: string) => {
    send({ type: 'move', player: currentPlayer, choice });
    setCurrentPlayer(prev => (prev === 'p1' ? 'p2' : 'p1'));
  };

  const theme = useTheme();
  const activeMoves = battleState.requestData?.active?.[0]?.moves;
  const currentPlayerState = battleState[currentPlayer];
  const availableSwitches = currentPlayerState.team.filter(
    p => !p.active && !p.fainted && p.status !== 'fnt'
  );

  return (
    <S.BattleContainer>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)'};
          border-radius: 2px;
        }
      `}</style>

      <BattleHeader battleState={battleState} connectionStatus={connectionStatus} />

      {!battleStarted ? (
        <S.WelcomeContainer>
          <S.WelcomeTitle>READY FOR BATTLE?</S.WelcomeTitle>
          <Typography sx={{ color: theme.palette.text.secondary, fontFamily: 'monospace', fontSize: '0.8rem', textAlign: 'center' }}>
            Gen 7 Random Battle Format
          </Typography>
          <S.StartButton
            variant="contained"
            onClick={startBattle}
            disabled={connectionStatus !== 'connected'}
          >
            START RANDOM BATTLE
          </S.StartButton>
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
