import {BattleState, LogEntry, PokemonShowdownMember} from '../../pages/BattleSimulator/types';
import { PokemonTeam } from '../../global/types';

// ─── Connection ───────────────────────────────────────────────────────────────

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

// ─── Outbound WS message shapes ───────────────────────────────────────────────

export interface StartBattleMessage {
    type: 'start-battle';
    format: string;
    team1: PokemonShowdownMember[];
    team2: PokemonShowdownMember[];
}

export interface MoveMessage {
    type: 'move';
    player: 'p1' | 'p2';
    choice: string;
}

export interface ValidateTeamMessage {
    type: 'validate-team';
    team: PokemonShowdownMember[];
}

export type OutboundWSMessage = StartBattleMessage | MoveMessage | ValidateTeamMessage;

// ─── Inbound WS message shapes ────────────────────────────────────────────────

export interface UpdateWSMessage {
    type: 'update';
    message: string;
}

export interface SideUpdateWSMessage {
    type: 'sideupdate';
    message: string;
    player?: 'p1' | 'p2';
}

export interface ValidateTeamResultWSMessage {
    type: 'validate-team';
    result: string | null;
}

export type InboundWSMessage =
    | UpdateWSMessage
    | SideUpdateWSMessage
    | ValidateTeamResultWSMessage;

// ─── Hook return shapes ───────────────────────────────────────────────────────

export interface UseBattleWebSocketReturn {
    connectionStatus: ConnectionStatus;
    send: (msg: OutboundWSMessage) => void;
}

export interface UseBattleActionsParams {
    send: (msg: OutboundWSMessage) => void;
    battleGen: string;
    p1Team: PokemonTeam | undefined;
    p2Team: PokemonTeam | undefined;
    currentPlayer: 'p1' | 'p2';
    setCurrentPlayer: React.Dispatch<React.SetStateAction<'p1' | 'p2'>>;
    setBattleStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setBattleState: React.Dispatch<React.SetStateAction<BattleState>>;
    setLogs: React.Dispatch<React.SetStateAction<LogEntry[]>>;
}

export interface UseBattleActionsReturn {
    startBattle: () => void;
    makeMove: (choice: string) => void;
    validateTeam: (team: PokemonTeam) => void;
}