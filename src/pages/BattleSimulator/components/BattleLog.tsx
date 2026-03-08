import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { LogEntry } from '../types';
import * as S from '../styles';

interface BattleLogProps {
  logs: LogEntry[];
}

const BattleLog: React.FC<BattleLogProps> = ({ logs }) => {
  const theme = useTheme();
  const logEndRef = useRef<HTMLDivElement>(null);

  const LOG_STYLES: Record<string, React.CSSProperties> = {
    turn: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      borderTop: `1px solid ${theme.palette.mode === 'light' 
        ? 'rgba(25,118,210,0.2)' 
        : 'rgba(25,118,210,0.3)'}`,
      paddingTop: 6,
      marginTop: 4,
    },
    move: {
      color: theme.palette.primary.main,
    },
    damage: {
      color: '#ff6b6b',
    },
    faint: {
      color: theme.palette.error.main,
      fontWeight: 600,
    },
    win: {
      color: theme.palette.primary.main,
      fontWeight: 700,
      fontSize: '1rem',
    },
    system: {
      color: theme.palette.text.secondary,
    },
    status: {
      color: theme.palette.mode === 'light' ? '#8e24aa' : '#ba68c8',
    },
    switch: {
      color: '#4caf50',
    },
    boost: {
      color: '#ff9800',
    },
    weather: {
      color: '#29b6f6',
    },
  };

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <>
      <S.LogContainer>
        {logs.length === 0 && (
          <S.LogEmpty>
            Battle log will appear here...
          </S.LogEmpty>
        )}
        {logs.map((entry, i) => (
          <S.LogEntry key={i} sx={LOG_STYLES[entry.type] || {}}>
            {entry.text}
          </S.LogEntry>
        ))}
        <div ref={logEndRef} />
      </S.LogContainer>
    </>
  );
};

export default BattleLog;
