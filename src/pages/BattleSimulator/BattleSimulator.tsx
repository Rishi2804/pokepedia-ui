import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Grid, Chip, } from '@mui/material';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pokemon {
  ident: string;         // e.g. "p1a: Pikachu"
  name: string;          // e.g. "Pikachu"
  details: string;       // e.g. "Pikachu, L59, F"
  species: string;
  level: number;
  gender: string;
  hp: number;            // current HP (percentage 0-100, or absolute)
  maxHp: number;
  hpPercent: number;     // 0-100
  status: string | null; // slp, par, brn, frz, psn, tox, fnt
  active: boolean;
  fainted: boolean;
  boosts: Record<string, number>;
  volatileStatuses: string[];
  moves: MoveInfo[];
  ability: string;
  item: string;
  stats: Record<string, number>;
  position: string; // 'a', 'b', etc.
}

interface MoveInfo {
  move: string;
  id: string;
  pp: number;
  maxpp: number;
  disabled: boolean;
  target: string;
}

interface PlayerState {
  id: 'p1' | 'p2';
  name: string;
  teamSize: number;
  active: Pokemon | null;
  team: Pokemon[];
  sideConditions: string[];
}

interface BattleState {
  turn: number;
  weather: string | null;
  fieldConditions: string[];
  p1: PlayerState;
  p2: PlayerState;
  winner: string | null;
  gameType: string;
  gen: number;
  tier: string;
  phase: 'init' | 'teampreview' | 'battle' | 'ended';
  waitingFor: 'p1' | 'p2' | 'both' | null;
  requestData: RequestData | null;
}

interface RequestData {
  player: 'p1' | 'p2';
  active?: Array<{ moves: MoveInfo[] }>;
  side?: {
    name: string;
    id: string;
    pokemon: Array<{
      ident: string;
      details: string;
      condition: string;
      active: boolean;
      moves: string[];
      ability: string;
      item: string;
      stats: Record<string, number>;
    }>;
  };
  forceSwitch?: boolean[];
  rqid?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDetails(details: string): { species: string; level: number; gender: string } {
  const parts = details.split(', ');
  const species = parts[0];
  let level = 100;
  let gender = '';
  for (const part of parts.slice(1)) {
    if (part.startsWith('L')) level = parseInt(part.slice(1));
    else if (part === 'M') gender = 'M';
    else if (part === 'F') gender = 'F';
  }
  return { species, level, gender };
}

function parseCondition(condition: string): { hp: number; maxHp: number; hpPercent: number; status: string | null } {
  if (condition === '0 fnt') return { hp: 0, maxHp: 100, hpPercent: 0, status: 'fnt' };
  const statusMatch = condition.match(/^(\d+)\/(\d+)(?:\s+(\w+))?/);
  if (statusMatch) {
    const hp = parseInt(statusMatch[1]);
    const maxHp = parseInt(statusMatch[2]);
    const status = statusMatch[3] || null;
    return { hp, maxHp, hpPercent: Math.round((hp / maxHp) * 100), status };
  }
  return { hp: 100, maxHp: 100, hpPercent: 100, status: null };
}

function parsePokemonIdent(ident: string): { player: string; position: string; name: string } {
  // e.g. "p1a: Pikachu" or "p1: Pikachu"
  const match = ident.match(/^(p\d)([a-z]?):\s*(.+)$/);
  if (match) return { player: match[1], position: match[2], name: match[3] };
  return { player: '', position: '', name: ident };
}

function makeInitialPlayer(id: 'p1' | 'p2'): PlayerState {
  return { id, name: id === 'p1' ? 'Player 1' : 'Player 2', teamSize: 6, active: null, team: [], sideConditions: [] };
}

function makeInitialBattleState(): BattleState {
  return {
    turn: 0,
    weather: null,
    fieldConditions: [],
    p1: makeInitialPlayer('p1'),
    p2: makeInitialPlayer('p2'),
    winner: null,
    gameType: 'singles',
    gen: 7,
    tier: '',
    phase: 'init',
    waitingFor: null,
    requestData: null,
  };
}

// ─── Protocol Parser ──────────────────────────────────────────────────────────

function applyProtocolLine(state: BattleState, line: string): { state: BattleState; logLine: string | null } {
  if (!line.startsWith('|')) return { state, logLine: line.trim() || null };

  const parts = line.split('|');
  // parts[0] is empty string before first '|'
  const cmd = parts[1];

  const newState = { ...state, p1: { ...state.p1 }, p2: { ...state.p2 } };
  let logLine: string | null = null;

  const getPlayer = (pid: string): 'p1' | 'p2' => pid.startsWith('p1') ? 'p1' : 'p2';
  const playerState = (pid: string) => pid.startsWith('p1') ? newState.p1 : newState.p2;

  const updatePokemon = (ident: string, updater: (p: Pokemon) => Pokemon) => {
    const { player, position, name } = parsePokemonIdent(ident);
    const pid = player as 'p1' | 'p2';
    const ps = pid === 'p1' ? newState.p1 : newState.p2;
    const updated = { ...ps };
    // Update in team
    updated.team = ps.team.map(poke => {
      if (poke.ident === ident || poke.name === name) return updater({ ...poke });
      return poke;
    });
    // Update active if matches
    if (updated.active && (updated.active.ident === ident || updated.active.name === name)) {
      updated.active = updater({ ...updated.active });
    }
    if (pid === 'p1') newState.p1 = updated;
    else newState.p2 = updated;
  };

  switch (cmd) {
    case 'player': {
      const pid = parts[2] as 'p1' | 'p2';
      const uname = parts[3];
      if (pid === 'p1') newState.p1 = { ...newState.p1, name: uname };
      else newState.p2 = { ...newState.p2, name: uname };
      break;
    }
    case 'teamsize': {
      const pid = parts[2] as 'p1' | 'p2';
      const size = parseInt(parts[3]);
      if (pid === 'p1') newState.p1 = { ...newState.p1, teamSize: size };
      else newState.p2 = { ...newState.p2, teamSize: size };
      break;
    }
    case 'gametype': newState.gameType = parts[2]; break;
    case 'gen': newState.gen = parseInt(parts[2]); break;
    case 'tier': newState.tier = parts[2]; break;
    case 'teampreview': newState.phase = 'teampreview'; break;
    case 'start': newState.phase = 'battle'; break;

    case 'poke': {
      // Team preview poke declaration
      const pid = parts[2] as 'p1' | 'p2';
      const details = parts[3];
      const { species, level, gender } = parseDetails(details);
      const poke: Pokemon = {
        ident: `${pid}: ${species}`,
        name: species,
        details,
        species,
        level,
        gender,
        hp: 100, maxHp: 100, hpPercent: 100,
        status: null, active: false, fainted: false,
        boosts: {}, volatileStatuses: [],
        moves: [], ability: '', item: '', stats: {},
        position: '',
      };
      const ps = pid === 'p1' ? newState.p1 : newState.p2;
      const updated = { ...ps, team: [...ps.team, poke] };
      if (pid === 'p1') newState.p1 = updated; else newState.p2 = updated;
      break;
    }

    case 'switch':
    case 'drag': {
      const ident = parts[2]; // e.g. "p1a: Pikachu"
      const details = parts[3];
      const condition = parts[4];
      const { player, position, name } = parsePokemonIdent(ident);
      const pid = player as 'p1' | 'p2';
      const { species, level, gender } = parseDetails(details);
      const { hp, maxHp, hpPercent, status } = parseCondition(condition);
      const ps = pid === 'p1' ? newState.p1 : newState.p2;

      // Deactivate previous active
      const updatedTeam = ps.team.map(p => ({ ...p, active: false }));

      // Find or create the pokemon
      const existing = updatedTeam.find(p => p.species === species || p.name === name);
      const newPoke: Pokemon = existing ? {
        ...existing,
        ident, name, details, species, level, gender,
        hp, maxHp, hpPercent, status, active: true, fainted: false,
        position, boosts: {}, volatileStatuses: [],
      } : {
        ident, name, details, species, level, gender,
        hp, maxHp, hpPercent, status, active: true, fainted: false,
        boosts: {}, volatileStatuses: [],
        moves: [], ability: '', item: '', stats: {}, position,
      };

      const finalTeam = existing
          ? updatedTeam.map(p => p.species === species || p.name === name ? newPoke : p)
          : [...updatedTeam, newPoke];

      const updatedPs = { ...ps, team: finalTeam, active: newPoke };
      if (pid === 'p1') newState.p1 = updatedPs; else newState.p2 = updatedPs;
      logLine = cmd === 'switch'
          ? `${ps.name} sent out ${name}!`
          : `${name} was dragged out!`;
      break;
    }

    case 'turn': {
      newState.turn = parseInt(parts[2]);
      logLine = `── Turn ${parts[2]} ──`;
      break;
    }

    case 'move': {
      const moverIdent = parts[2];
      const moveName = parts[3];
      const { name } = parsePokemonIdent(moverIdent);
      logLine = `${name} used ${moveName}!`;
      break;
    }

    case '-damage':
    case '-heal': {
      const ident = parts[2];
      const condition = parts[3];
      const { name } = parsePokemonIdent(ident);
      const { hp, maxHp, hpPercent, status } = parseCondition(condition);
      updatePokemon(ident, p => ({ ...p, hp, maxHp, hpPercent, status: status ?? p.status, fainted: hpPercent === 0 }));
      logLine = cmd === '-damage'
          ? `${name} took damage! (${hpPercent}% HP)`
          : `${name} restored HP! (${hpPercent}% HP)`;
      break;
    }

    case 'faint': {
      const ident = parts[2];
      const { name } = parsePokemonIdent(ident);
      updatePokemon(ident, p => ({ ...p, hp: 0, hpPercent: 0, status: 'fnt', fainted: true, active: false }));
      // Clear active if it's this pokemon
      const pid = getPlayer(ident);
      const ps = playerState(ident);
      if (ps.active?.ident === ident || ps.active?.name === name) {
        const updated = { ...ps, active: null };
        if (pid === 'p1') newState.p1 = updated; else newState.p2 = updated;
      }
      logLine = `${name} fainted!`;
      break;
    }

    case '-status': {
      const ident = parts[2];
      const status = parts[3];
      const { name } = parsePokemonIdent(ident);
      updatePokemon(ident, p => ({ ...p, status }));
      const statusNames: Record<string, string> = { slp: 'fell asleep', par: 'was paralyzed', brn: 'was burned', frz: 'was frozen', psn: 'was poisoned', tox: 'was badly poisoned' };
      logLine = `${name} ${statusNames[status] || status}!`;
      break;
    }

    case '-curestatus': {
      const ident = parts[2];
      const { name } = parsePokemonIdent(ident);
      updatePokemon(ident, p => ({ ...p, status: null }));
      logLine = `${name} was cured of its status!`;
      break;
    }

    case '-boost': {
      const ident = parts[2];
      const stat = parts[3];
      const amount = parseInt(parts[4]);
      const { name } = parsePokemonIdent(ident);
      updatePokemon(ident, p => ({
        ...p,
        boosts: { ...p.boosts, [stat]: Math.min(6, (p.boosts[stat] || 0) + amount) }
      }));
      logLine = `${name}'s ${stat} rose${amount > 1 ? ' sharply' : ''}!`;
      break;
    }

    case '-unboost': {
      const ident = parts[2];
      const stat = parts[3];
      const amount = parseInt(parts[4]);
      const { name } = parsePokemonIdent(ident);
      updatePokemon(ident, p => ({
        ...p,
        boosts: { ...p.boosts, [stat]: Math.max(-6, (p.boosts[stat] || 0) - amount) }
      }));
      logLine = `${name}'s ${stat} fell${amount > 1 ? ' sharply' : ''}!`;
      break;
    }

    case '-weather': {
      const weather = parts[2];
      newState.weather = weather === 'none' ? null : weather;
      const weatherNames: Record<string, string> = {
        RainDance: '🌧 Rain started falling!', Sandstorm: '🌪 A sandstorm kicked up!',
        SunnyDay: '☀️ The sunlight turned harsh!', Hail: '🌨 It started to hail!', Snow: '❄️ It started to snow!',
      };
      logLine = weather === 'none' ? 'The weather cleared up.' : (weatherNames[weather] || `Weather: ${weather}`);
      break;
    }

    case '-fieldstart': {
      const cond = parts[2];
      newState.fieldConditions = [...newState.fieldConditions, cond];
      logLine = `${cond} was set up!`;
      break;
    }

    case '-fieldend': {
      const cond = parts[2];
      newState.fieldConditions = newState.fieldConditions.filter(c => c !== cond);
      logLine = `${cond} ended!`;
      break;
    }

    case '-sidestart': {
      const pid = parts[2].split(': ')[0] as 'p1' | 'p2';
      const cond = parts[3];
      const ps = pid === 'p1' ? newState.p1 : newState.p2;
      const updated = { ...ps, sideConditions: [...ps.sideConditions, cond] };
      if (pid === 'p1') newState.p1 = updated; else newState.p2 = updated;
      logLine = `${cond} was set on ${ps.name}'s side!`;
      break;
    }

    case '-sideend': {
      const pid = parts[2].split(': ')[0] as 'p1' | 'p2';
      const cond = parts[3];
      const ps = pid === 'p1' ? newState.p1 : newState.p2;
      const updated = { ...ps, sideConditions: ps.sideConditions.filter(c => c !== cond) };
      if (pid === 'p1') newState.p1 = updated; else newState.p2 = updated;
      logLine = `${cond} ended on ${ps.name}'s side!`;
      break;
    }

    case '-start': {
      const ident = parts[2];
      const effect = parts[3];
      const { name } = parsePokemonIdent(ident);
      updatePokemon(ident, p => ({ ...p, volatileStatuses: [...p.volatileStatuses, effect] }));
      logLine = `${name}: ${effect} started!`;
      break;
    }

    case '-end': {
      const ident = parts[2];
      const effect = parts[3];
      const { name } = parsePokemonIdent(ident);
      updatePokemon(ident, p => ({ ...p, volatileStatuses: p.volatileStatuses.filter(v => v !== effect) }));
      logLine = `${name}: ${effect} ended.`;
      break;
    }

    case '-crit': {
      logLine = `A critical hit!`;
      break;
    }

    case '-supereffective': {
      logLine = `It's super effective!`;
      break;
    }

    case '-resisted': {
      logLine = `It's not very effective...`;
      break;
    }

    case '-immune': {
      const { name } = parsePokemonIdent(parts[2]);
      logLine = `It doesn't affect ${name}!`;
      break;
    }

    case '-miss': {
      const { name } = parsePokemonIdent(parts[2]);
      logLine = `${name}'s attack missed!`;
      break;
    }

    case '-fail': {
      logLine = `But it failed!`;
      break;
    }

    case '-mega': {
      const { name } = parsePokemonIdent(parts[2]);
      logLine = `${name} has Mega Evolved!`;
      break;
    }

    case '-zpower': {
      const { name } = parsePokemonIdent(parts[2]);
      logLine = `${name} is unleashing its full Z-Power!`;
      break;
    }

    case '-ability': {
      const { name } = parsePokemonIdent(parts[2]);
      const ability = parts[3];
      updatePokemon(parts[2], p => ({ ...p, ability }));
      logLine = `${name}'s ability: ${ability}`;
      break;
    }

    case '-item': {
      const { name } = parsePokemonIdent(parts[2]);
      const item = parts[3];
      updatePokemon(parts[2], p => ({ ...p, item }));
      logLine = `${name} is holding ${item}!`;
      break;
    }

    case '-enditem': {
      const { name } = parsePokemonIdent(parts[2]);
      const item = parts[3];
      updatePokemon(parts[2], p => ({ ...p, item: '' }));
      logLine = `${name} lost its ${item}!`;
      break;
    }

    case 'win': {
      newState.winner = parts[2];
      newState.phase = 'ended';
      logLine = `🏆 ${parts[2]} wins the battle!`;
      break;
    }

    case 'tie': {
      newState.winner = 'tie';
      newState.phase = 'ended';
      logLine = `The battle ended in a tie!`;
      break;
    }

    case 'cant': {
      const { name } = parsePokemonIdent(parts[2]);
      const reason = parts[3];
      logLine = `${name} can't move (${reason})!`;
      break;
    }

    case '-hitcount': {
      logLine = `Hit ${parts[3]} time(s)!`;
      break;
    }

    case 'inactive': logLine = `⏱ ${parts[2]}`; break;

    case 'request': {
      try {
        const reqData: RequestData = JSON.parse(parts.slice(2).join('|'));
        // Determine which player this is for (sideupdate context)
        newState.requestData = reqData;
        // Update team info from request
        if (reqData.side) {
          const pid = reqData.side.id as 'p1' | 'p2';
          const ps = pid === 'p1' ? newState.p1 : newState.p2;
          const updatedTeam = reqData.side.pokemon.map(p => {
            const { species, level, gender } = parseDetails(p.details);
            const { hp, maxHp, hpPercent, status } = parseCondition(p.condition);
            const existing = ps.team.find(t => t.ident === p.ident || t.name === p.ident.split(': ')[1]);
            return {
              ...(existing || {}),
              ident: p.ident,
              name: p.ident.split(': ')[1],
              details: p.details,
              species, level, gender,
              hp, maxHp, hpPercent, status,
              active: p.active,
              fainted: hpPercent === 0,
              moves: existing?.moves || [],
              ability: p.ability,
              item: p.item,
              stats: p.stats,
              boosts: existing?.boosts || {},
              volatileStatuses: existing?.volatileStatuses || [],
              position: existing?.position || '',
            } as Pokemon;
          });
          // Update active pokemon moves from request
          if (reqData.active && reqData.active[0]?.moves) {
            const activePoke = updatedTeam.find(p => p.active);
            if (activePoke) {
              activePoke.moves = reqData.active[0].moves;
            }
          }
          const updatedPs = { ...ps, team: updatedTeam, active: updatedTeam.find(p => p.active) || ps.active };
          if (pid === 'p1') newState.p1 = updatedPs; else newState.p2 = updatedPs;
        }
      } catch { /* ignore parse errors */ }
      break;
    }

    default:
      break;
  }

  return { state: newState, logLine };
}

// Process a full message block (multiple lines)
function processMessage(state: BattleState, message: string, sidePlayer?: 'p1' | 'p2'): { state: BattleState; logs: LogEntry[] } {
  const lines = message.split('\n');
  const logs: LogEntry[] = [];
  let currentState = state;

  for (const line of lines) {
    if (!line.trim()) continue;

    // Handle |split| blocks
    if (line.startsWith('|split|')) continue;

    const { state: nextState, logLine } = applyProtocolLine(currentState, line);
    currentState = nextState;
    if (logLine) {
      logs.push({ text: logLine, type: classifyLog(line) });
    }
  }

  return { state: currentState, logs };
}

type LogType = 'turn' | 'move' | 'damage' | 'faint' | 'win' | 'system' | 'status' | 'switch' | 'boost' | 'weather';

function classifyLog(line: string): LogType {
  if (!line.startsWith('|')) return 'system';
  const cmd = line.split('|')[1];
  if (cmd === 'turn') return 'turn';
  if (cmd === 'move') return 'move';
  if (cmd === '-damage' || cmd === '-heal') return 'damage';
  if (cmd === 'faint') return 'faint';
  if (cmd === 'win' || cmd === 'tie') return 'win';
  if (cmd === 'switch' || cmd === 'drag') return 'switch';
  if (cmd === '-status' || cmd === '-curestatus') return 'status';
  if (cmd === '-boost' || cmd === '-unboost') return 'boost';
  if (cmd === '-weather') return 'weather';
  return 'system';
}

interface LogEntry {
  text: string;
  type: LogType;
}

// ─── HP Bar Component ─────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  slp: '#9b8ed4', par: '#f0d060', brn: '#f05030', frz: '#98d8d8', psn: '#a060a8', tox: '#6030a0', fnt: '#888',
};
const STATUS_LABELS: Record<string, string> = {
  slp: 'SLP', par: 'PAR', brn: 'BRN', frz: 'FRZ', psn: 'PSN', tox: 'TOX', fnt: 'FNT',
};

function hpColor(pct: number): string {
  if (pct > 50) return '#48d048';
  if (pct > 20) return '#f8d030';
  return '#f04030';
}

const HPBar: React.FC<{ hp: number; maxHp: number; pct: number }> = ({ hp, maxHp, pct }) => (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
        <Typography sx={{ fontSize: '0.65rem', color: '#aaa', fontFamily: 'monospace' }}>HP</Typography>
        <Typography sx={{ fontSize: '0.65rem', color: '#ccc', fontFamily: 'monospace' }}>
          {hp}/{maxHp} ({pct}%)
        </Typography>
      </Box>
      <Box sx={{ height: 6, borderRadius: 3, bgcolor: '#333', overflow: 'hidden' }}>
        <Box sx={{
          height: '100%',
          width: `${pct}%`,
          bgcolor: hpColor(pct),
          borderRadius: 3,
          transition: 'width 0.4s ease, background-color 0.4s ease',
        }} />
      </Box>
    </Box>
);

// ─── Pokemon Card ─────────────────────────────────────────────────────────────

const PokemonCard: React.FC<{ pokemon: Pokemon; isActive: boolean; isOwn?: boolean }> = ({ pokemon, isActive, isOwn }) => {
  const fainted = pokemon.fainted || pokemon.status === 'fnt';
  return (
      <Box sx={{
        p: 1.5,
        borderRadius: 2,
        bgcolor: isActive ? (isOwn ? 'rgba(68,136,255,0.15)' : 'rgba(255,80,80,0.15)') : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isActive ? (isOwn ? '#4488ff' : '#ff5050') : 'rgba(255,255,255,0.1)'}`,
        opacity: fainted ? 0.4 : 1,
        transition: 'all 0.3s',
        minWidth: 140,
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Typography sx={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 700, fontSize: '0.85rem', color: fainted ? '#666' : '#eee' }}>
            {pokemon.name}
            {pokemon.gender && <span style={{ color: pokemon.gender === 'M' ? '#88aaff' : '#ff88aa', marginLeft: 4 }}>
            {pokemon.gender === 'M' ? '♂' : '♀'}
          </span>}
          </Typography>
          <Typography sx={{ fontSize: '0.6rem', color: '#888', fontFamily: 'monospace' }}>Lv{pokemon.level}</Typography>
        </Box>
        {!fainted ? (
            <HPBar hp={pokemon.hp} maxHp={pokemon.maxHp} pct={pokemon.hpPercent} />
        ) : (
            <Typography sx={{ fontSize: '0.7rem', color: '#f04030', fontFamily: 'monospace' }}>FAINTED</Typography>
        )}
        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
          {pokemon.status && !fainted && (
              <Box sx={{ px: 0.7, py: 0.1, borderRadius: 1, bgcolor: STATUS_COLORS[pokemon.status] || '#555', fontSize: '0.55rem', fontFamily: 'monospace', fontWeight: 700, color: '#fff' }}>
                {STATUS_LABELS[pokemon.status] || pokemon.status.toUpperCase()}
              </Box>
          )}
          {isActive && Object.entries(pokemon.boosts).filter(([, v]) => v !== 0).map(([stat, val]) => (
              <Box key={stat} sx={{ px: 0.5, py: 0.1, borderRadius: 1, bgcolor: val > 0 ? 'rgba(80,200,80,0.25)' : 'rgba(200,80,80,0.25)', fontSize: '0.55rem', fontFamily: 'monospace', color: val > 0 ? '#80d080' : '#d08080' }}>
                {stat}{val > 0 ? `+${val}` : val}
              </Box>
          ))}
        </Box>
        {isActive && pokemon.item && (
            <Typography sx={{ fontSize: '0.6rem', color: '#aaa', mt: 0.3, fontStyle: 'italic' }}>@ {pokemon.item}</Typography>
        )}
      </Box>
  );
};

// ─── Player Panel ─────────────────────────────────────────────────────────────

const PlayerPanel: React.FC<{ player: PlayerState; isOwn: boolean }> = ({ player, isOwn }) => {
  const faintedCount = player.team.filter(p => p.fainted || p.status === 'fnt').length;
  const aliveCount = player.teamSize - faintedCount;
  return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 700, fontSize: '1rem', color: isOwn ? '#6699ff' : '#ff6666' }}>
            {player.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {Array.from({ length: player.teamSize }).map((_, i) => (
                <Box key={i} sx={{
                  width: 10, height: 10, borderRadius: '50%',
                  bgcolor: i < aliveCount ? (isOwn ? '#6699ff' : '#ff6666') : '#333',
                  border: '1px solid rgba(255,255,255,0.1)',
                }} />
            ))}
          </Box>
        </Box>
        {player.sideConditions.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {player.sideConditions.map(c => (
                  <Box key={c} sx={{ px: 0.8, py: 0.2, borderRadius: 1, bgcolor: 'rgba(255,200,50,0.15)', border: '1px solid rgba(255,200,50,0.3)', fontSize: '0.6rem', color: '#ffc832', fontFamily: 'monospace' }}>
                    {c.replace('move: ', '')}
                  </Box>
              ))}
            </Box>
        )}
        {player.active ? (
            <PokemonCard pokemon={player.active} isActive={true} isOwn={isOwn} />
        ) : (
            <Box sx={{ p: 2, borderRadius: 2, border: '1px dashed rgba(255,255,255,0.15)', textAlign: 'center' }}>
              <Typography sx={{ color: '#555', fontSize: '0.75rem' }}>No active Pokémon</Typography>
            </Box>
        )}
        <Typography sx={{ fontSize: '0.65rem', color: '#666', fontFamily: 'monospace', mt: 0.5 }}>BENCH</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, overflowY: 'auto', flex: 1 }}>
          {player.team.filter(p => !p.active).map((poke, i) => (
              <PokemonCard key={i} pokemon={poke} isActive={false} isOwn={isOwn} />
          ))}
        </Box>
      </Box>
  );
};

// ─── Move Buttons ─────────────────────────────────────────────────────────────

const MoveButton: React.FC<{ move: MoveInfo; onClick: () => void }> = ({ move, onClick }) => (
    <Button
        onClick={onClick}
        disabled={move.disabled}
        variant="outlined"
        size="small"
        sx={{
          fontFamily: '"Rajdhani", sans-serif',
          fontWeight: 600,
          fontSize: '0.8rem',
          color: move.disabled ? '#555' : '#ddd',
          borderColor: move.disabled ? '#333' : 'rgba(100,150,255,0.4)',
          bgcolor: move.disabled ? 'transparent' : 'rgba(100,150,255,0.06)',
          '&:hover': { bgcolor: 'rgba(100,150,255,0.15)', borderColor: '#6699ff' },
          textTransform: 'none',
          flex: 1,
          py: 1,
        }}
    >
      <Box sx={{ textAlign: 'left', width: '100%' }}>
        <div>{move.move}</div>
        <div style={{ fontSize: '0.65rem', color: '#888', fontFamily: 'monospace' }}>{move.pp}/{move.maxpp} PP</div>
      </Box>
    </Button>
);

// ─── Log Entry Style ──────────────────────────────────────────────────────────

const LOG_STYLES: Record<LogType, React.CSSProperties> = {
  turn:    { color: '#ffd700', fontWeight: 700, borderTop: '1px solid rgba(255,215,0,0.2)', paddingTop: 6, marginTop: 4 },
  move:    { color: '#88ccff' },
  damage:  { color: '#ff8866' },
  faint:   { color: '#ff4444', fontWeight: 600 },
  win:     { color: '#ffd700', fontWeight: 700, fontSize: '1rem' },
  system:  { color: '#999' },
  status:  { color: '#cc88ff' },
  switch:  { color: '#88ffaa' },
  boost:   { color: '#ffbb44' },
  weather: { color: '#66ccff' },
};

// ─── Main Component ───────────────────────────────────────────────────────────

const BattleSimulator: React.FC = () => {
  const [battleStarted, setBattleStarted] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<'p1' | 'p2'>('p1');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [battleState, setBattleState] = useState<BattleState>(makeInitialBattleState());
  const wsRef = useRef<WebSocket | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  const battleStateRef = useRef<BattleState>(battleState);

  // Keep ref in sync
  useEffect(() => { battleStateRef.current = battleState; }, [battleState]);

  // Auto-scroll log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (wsRef.current) return;
    setConnectionStatus('connecting');
    const ws = new WebSocket('ws://localhost:3001');
    wsRef.current = ws;

    ws.onopen = () => { setConnectionStatus('connected'); };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'update' || data.type === 'sideupdate') {
        const sidePlayer: 'p1' | 'p2' | undefined = data.type === 'sideupdate' ? data.player : undefined;
        const { state: nextState, logs: newLogs } = processMessage(
            battleStateRef.current,
            data.message,
            sidePlayer
        );
        battleStateRef.current = nextState;
        setBattleState(nextState);
        if (newLogs.length) setLogs(prev => [...prev, ...newLogs]);

        // Update current player based on requests
        if (sidePlayer && nextState.requestData) {
          setCurrentPlayer(sidePlayer);
        }
      }
    };

    ws.onerror = () => { setConnectionStatus('disconnected'); };
    ws.onclose = () => { setConnectionStatus('disconnected'); wsRef.current = null; };

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
    setCurrentPlayer(prev => prev === 'p1' ? 'p2' : 'p1');
  };

  const activeMoves = battleState.requestData?.active?.[0]?.moves;

  // Determine available switches
  const currentPlayerState = battleState[currentPlayer];
  const availableSwitches = currentPlayerState.team.filter(p => !p.active && !p.fainted && p.status !== 'fnt');

  return (
      <Box sx={{
        minHeight: '100vh',
        bgcolor: '#0d0f14',
        color: '#ddd',
        fontFamily: '"Rajdhani", sans-serif',
        p: 0,
      }}>
        {/* Google Fonts */}
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');`}</style>

        {/* Header */}
        <Box sx={{
          px: 3, py: 2,
          bgcolor: '#0a0c10',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Box>
            <Typography sx={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 700, fontSize: '1.4rem', letterSpacing: 2, color: '#fff' }}>
              ⚔ BATTLE SIMULATOR
            </Typography>
            {battleState.tier && (
                <Typography sx={{ fontSize: '0.7rem', color: '#888', fontFamily: 'monospace', letterSpacing: 1 }}>
                  {battleState.tier} · Gen {battleState.gen}
                </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {battleState.weather && (
                <Chip label={battleState.weather} size="small" sx={{ bgcolor: 'rgba(100,180,255,0.15)', color: '#88ccff', fontFamily: 'monospace', fontSize: '0.65rem', height: 22 }} />
            )}
            {battleState.fieldConditions.map(c => (
                <Chip key={c} label={c.replace('move: ', '')} size="small" sx={{ bgcolor: 'rgba(255,200,50,0.12)', color: '#ffcc44', fontFamily: 'monospace', fontSize: '0.65rem', height: 22 }} />
            ))}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, px: 1.5, py: 0.5, borderRadius: 2, bgcolor: connectionStatus === 'connected' ? 'rgba(60,200,60,0.1)' : 'rgba(255,60,60,0.1)', border: `1px solid ${connectionStatus === 'connected' ? 'rgba(60,200,60,0.3)' : 'rgba(255,60,60,0.3)'}` }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: connectionStatus === 'connected' ? '#3dc83d' : '#ff4040', animation: connectionStatus === 'connecting' ? 'pulse 1s infinite' : 'none' }} />
              <Typography sx={{ fontSize: '0.7rem', fontFamily: 'monospace', color: connectionStatus === 'connected' ? '#3dc83d' : '#ff4040' }}>
                {connectionStatus}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Layout */}
        {!battleStarted ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 73px)', flexDirection: 'column', gap: 3 }}>
              <Typography sx={{ fontFamily: '"Rajdhani", sans-serif', fontSize: '2rem', fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: 3 }}>
                READY FOR BATTLE?
              </Typography>
              <Typography sx={{ color: '#666', fontFamily: 'monospace', fontSize: '0.8rem', textAlign: 'center' }}>
                Gen 7 Random Battle Format
              </Typography>
              <Button
                  variant="contained"
                  onClick={startBattle}
                  disabled={connectionStatus !== 'connected'}
                  sx={{
                    fontFamily: '"Rajdhani", sans-serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    letterSpacing: 2,
                    px: 5, py: 1.5,
                    bgcolor: '#4488ff',
                    '&:hover': { bgcolor: '#5599ff' },
                    '&:disabled': { bgcolor: '#222', color: '#555' },
                    borderRadius: 2,
                  }}
              >
                START RANDOM BATTLE
              </Button>
            </Box>
        ) : (
            <Grid container sx={{ height: 'calc(100vh - 73px)' }}>
              {/* P1 Panel */}
              <Grid item xs={2.5} sx={{ borderRight: '1px solid rgba(255,255,255,0.07)', p: 2, overflowY: 'auto', bgcolor: '#0b0d12' }}>
                <PlayerPanel player={battleState.p1} isOwn={true} />
              </Grid>

              {/* Center: Log + Controls */}
              <Grid item xs={7} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Turn indicator */}
                <Box sx={{ px: 3, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#0c0e13' }}>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#666' }}>
                    TURN {battleState.turn || '—'}
                  </Typography>
                  {battleState.winner ? (
                      <Typography sx={{ fontFamily: '"Rajdhani", sans-serif', fontWeight: 700, color: '#ffd700' }}>
                        🏆 {battleState.winner === 'tie' ? 'TIE GAME' : `${battleState.winner} WINS`}
                      </Typography>
                  ) : (
                      <Typography sx={{ fontFamily: 'monospace', fontSize: '0.75rem', color: currentPlayer === 'p1' ? '#6699ff' : '#ff6666' }}>
                        {currentPlayer.toUpperCase()} to move
                      </Typography>
                  )}
                </Box>

                {/* Battle Log */}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2.5, display: 'flex', flexDirection: 'column', gap: 0.3 }}>
                  {logs.length === 0 && (
                      <Typography sx={{ color: '#444', fontFamily: 'monospace', fontSize: '0.75rem', textAlign: 'center', mt: 4 }}>
                        Battle log will appear here...
                      </Typography>
                  )}
                  {logs.map((entry, i) => (
                      <Typography key={i} sx={{ fontSize: '0.8rem', fontFamily: '"Share Tech Mono", monospace', lineHeight: 1.6, ...LOG_STYLES[entry.type] }}>
                        {entry.text}
                      </Typography>
                  ))}
                  <div ref={logEndRef} />
                </Box>

                {/* Controls */}
                {!battleState.winner && (
                    <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.07)', bgcolor: '#0b0d12' }}>
                      {activeMoves && activeMoves.length > 0 ? (
                          <>
                            <Typography sx={{ fontSize: '0.65rem', color: '#666', fontFamily: 'monospace', mb: 1, letterSpacing: 1 }}>
                              MOVES — {currentPlayer.toUpperCase()} · {currentPlayerState.active?.name || '???'}
                            </Typography>
                            <Grid container spacing={1} sx={{ mb: 1.5 }}>
                              {activeMoves.map((move, i) => (
                                  <Grid item xs={6} key={i}>
                                    <MoveButton move={move} onClick={() => makeMove(`move ${i + 1}`)} />
                                  </Grid>
                              ))}
                            </Grid>
                          </>
                      ) : (
                          <>
                            <Typography sx={{ fontSize: '0.65rem', color: '#666', fontFamily: 'monospace', mb: 1, letterSpacing: 1 }}>
                              MOVES — {currentPlayer.toUpperCase()}
                            </Typography>
                            <Grid container spacing={1} sx={{ mb: 1.5 }}>
                              {[1, 2, 3, 4].map(n => (
                                  <Grid item xs={6} key={n}>
                                    <Button variant="outlined" size="small" onClick={() => makeMove(`move ${n}`)} sx={{ width: '100%', fontFamily: '"Rajdhani", sans-serif', color: '#aaa', borderColor: 'rgba(255,255,255,0.15)', textTransform: 'none', '&:hover': { borderColor: '#6699ff', color: '#6699ff' } }}>
                                      Move {n}
                                    </Button>
                                  </Grid>
                              ))}
                            </Grid>
                          </>
                      )}

                      {availableSwitches.length > 0 && (
                          <>
                            <Typography sx={{ fontSize: '0.65rem', color: '#666', fontFamily: 'monospace', mb: 1, letterSpacing: 1 }}>SWITCHES</Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {availableSwitches.map((poke, i) => {
                                const slotIndex = currentPlayerState.team.indexOf(poke) + 1;
                                return (
                                    <Button key={i} variant="outlined" size="small" onClick={() => makeMove(`switch ${slotIndex}`)}
                                            sx={{ fontFamily: '"Rajdhani", sans-serif', color: '#88ffaa', borderColor: 'rgba(136,255,170,0.25)', textTransform: 'none', fontSize: '0.75rem', '&:hover': { borderColor: '#88ffaa', bgcolor: 'rgba(136,255,170,0.08)' } }}>
                                      ↔ {poke.name} ({poke.hpPercent}%)
                                    </Button>
                                );
                              })}
                            </Box>
                          </>
                      )}
                    </Box>
                )}
              </Grid>

              {/* P2 Panel */}
              <Grid item xs={2.5} sx={{ borderLeft: '1px solid rgba(255,255,255,0.07)', p: 2, overflowY: 'auto', bgcolor: '#0b0d12' }}>
                <PlayerPanel player={battleState.p2} isOwn={false} />
              </Grid>
            </Grid>
        )}

        <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
      </Box>
  );
};

export default BattleSimulator;