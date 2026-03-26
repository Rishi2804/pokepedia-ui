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
  // Visual metadata — ignored by the server, used by the client for sprites
  pokedexId?: number;
  shiny?: boolean;
}

export interface Pokemon {
  ident: string;
  name: string;
  details: string;
  species: string;
  level: number;
  gender: string;
  hp: number;
  maxHp: number;
  hpPercent: number;
  status: string | null;
  active: boolean;
  fainted: boolean;
  boosts: Record<string, number>;
  volatileStatuses: string[];
  moves: MoveInfo[];
  ability: string;
  item: string;
  stats: Record<string, number>;
  position: string;
  // Visual metadata carried over from the team builder
  pokedexId?: number;
  shiny?: boolean;
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

export interface PokemonVisualMeta {
  pokedexId: number;
  shiny: boolean;
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
  // Per-player request data so p2's request never overwrites p1's
  p1RequestData: RequestData | null;
  p2RequestData: RequestData | null;
  // name -> visual metadata, seeded from team builder before battle starts
  visualMeta: Record<string, PokemonVisualMeta>;
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