export interface ShowdownStats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface PokemonShowdownMember {
  name: string;
  species: string;
  item?: string;
  ability: string;
  moves: string[];
  nature: string;
  evs: ShowdownStats;
  ivs: ShowdownStats;
  gender: "M" | "F" | "N";
  level: number;
  happiness: number;
  gigantamax?: boolean;
  dynamaxLevel?: number;
  teraType?: string;
}

export interface Pokemon {
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

export interface MoveInfo {
  move: string;
  id: string;
  pp: number;
  maxpp: number;
  disabled: boolean;
  target: string;
}

export interface PlayerState {
  id: 'p1' | 'p2';
  name: string;
  teamSize: number;
  active: Pokemon | null;
  team: Pokemon[];
  sideConditions: string[];
}

export interface BattleState {
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

export interface RequestData {
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

export type LogType = 'turn' | 'move' | 'damage' | 'faint' | 'win' | 'system' | 'status' | 'switch' | 'boost' | 'weather';

export interface LogEntry {
  text: string;
  type: LogType;
}
