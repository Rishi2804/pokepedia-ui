import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import * as S from '../styles';

interface BattleLogProps {
  logs: LogEntry[];
}

const LOG_STYLES: Record<string, React.CSSProperties> = {
  turn: {
    color: '#ffd700',
    fontWeight: 700,
    borderTop: '1px solid rgba(255,215,0,0.2)',
    paddingTop: 6,
    marginTop: 4,
  },
  move: {
    color: '#88ccff',
  },
  damage: {
    color: '#ff8866',
  },
  faint: {
    color: '#ff4444',
    fontWeight: 600,
  },
  win: {
    color: '#ffd700',
    fontWeight: 700,
    fontSize: '1rem',
  },
  system: {
    color: '#999',
  },
  status: {
    color: '#cc88ff',
  },
  switch: {
    color: '#88ffaa',
  },
  boost: {
    color: '#ffbb44',
  },
  weather: {
    color: '#66ccff',
  },
};

const BattleLog: React.FC<BattleLogProps> = ({ logs }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

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
