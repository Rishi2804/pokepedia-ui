import { BattleState, Pokemon, PlayerState, RequestData, LogEntry, LogType } from './types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function parseDetails(details: string): { species: string; level: number; gender: string } {
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

export function parseCondition(condition: string): { hp: number; maxHp: number; hpPercent: number; status: string | null } {
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

export function parsePokemonIdent(ident: string): { player: string; position: string; name: string } {
  const match = ident.match(/^(p\d)([a-z]?):\s*(.+)$/);
  if (match) return { player: match[1], position: match[2], name: match[3] };
  return { player: '', position: '', name: ident };
}

export function makeInitialPlayer(id: 'p1' | 'p2'): PlayerState {
  return { id, name: id === 'p1' ? 'Player 1' : 'Player 2', teamSize: 6, active: null, team: [], sideConditions: [] };
}

export function makeInitialBattleState(): BattleState {
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

export function applyProtocolLine(state: BattleState, line: string): { state: BattleState; logLine: string | null } {
  if (!line.startsWith('|')) return { state, logLine: line.trim() || null };

  const parts = line.split('|');
  const cmd = parts[1];

  const newState = { ...state, p1: { ...state.p1 }, p2: { ...state.p2 } };
  let logLine: string | null = null;

  const getPlayer = (pid: string): 'p1' | 'p2' => pid.startsWith('p1') ? 'p1' : 'p2';
  const playerState = (pid: string) => pid.startsWith('p1') ? newState.p1 : newState.p2;

  const updatePokemon = (ident: string, updater: (p: Pokemon) => Pokemon) => {
    const { player, name } = parsePokemonIdent(ident);
    const pid = player as 'p1' | 'p2';
    const ps = pid === 'p1' ? newState.p1 : newState.p2;
    const updated = { ...ps };
    updated.team = ps.team.map(poke => {
      if (poke.ident === ident || poke.name === name) return updater({ ...poke });
      return poke;
    });
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
      const ident = parts[2];
      const details = parts[3];
      const condition = parts[4];
      const { player, position, name } = parsePokemonIdent(ident);
      const pid = player as 'p1' | 'p2';
      const { species, level, gender } = parseDetails(details);
      const { hp, maxHp, hpPercent, status } = parseCondition(condition);
      const ps = pid === 'p1' ? newState.p1 : newState.p2;

      const updatedTeam = ps.team.map(p => ({ ...p, active: false }));

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
      updatePokemon(parts[2], p => ({ ...p, item: '' }));
      logLine = `${name} lost its item!`;
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
        newState.requestData = reqData;
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

export function processMessage(state: BattleState, message: string): { state: BattleState; logs: LogEntry[] } {
  const lines = message.split('\n');
  const logs: LogEntry[] = [];
  let currentState = state;

  for (const line of lines) {
    if (!line.trim()) continue;
    if (line.startsWith('|split|')) continue;

    const { state: nextState, logLine } = applyProtocolLine(currentState, line);
    currentState = nextState;
    if (logLine) {
      logs.push({ text: logLine, type: classifyLog(line) });
    }
  }

  return { state: currentState, logs };
}

export function classifyLog(line: string): LogType {
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
