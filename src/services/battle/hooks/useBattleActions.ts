import { useCallback } from 'react';
import { PokemonTeam } from '../../../global/types';
import { makeInitialBattleState } from '../../../pages/BattleSimulator/utils';
import { makeShowdownTeam } from '../transformers/showdownTransformer';
import { BATTLE_FORMATS } from '../constants';
import { OutboundWSMessage, UseBattleActionsParams, UseBattleActionsReturn } from '../types';

/**
 * Encapsulates all user-initiated battle actions.
 *
 * Keeps action logic out of the page component and out of the WebSocket hook —
 * it only knows how to build the right outbound messages and update the minimal
 * state slices it owns.
 */
export function useBattleActions({
                                     send,
                                     battleGen,
                                     p1Team,
                                     p2Team,
                                     currentPlayer,
                                     setCurrentPlayer,
                                     setBattleStarted,
                                     setBattleState,
                                     setLogs,
                                 }: UseBattleActionsParams): UseBattleActionsReturn {

    const startBattle = useCallback(() => {
        if (!p1Team || !p2Team) return;

        const msg: OutboundWSMessage = {
            type: 'start-battle',
            format: BATTLE_FORMATS.anythingGoes(battleGen),
            team1: makeShowdownTeam(p1Team),
            team2: makeShowdownTeam(p2Team),
        };

        send(msg);
        setBattleStarted(true);
        setBattleState(makeInitialBattleState());
        setLogs([]);
    }, [send, battleGen, p1Team, p2Team, setBattleStarted, setBattleState, setLogs]);

    const makeMove = useCallback(
        (choice: string) => {
            send({ type: 'move', player: currentPlayer, choice });
            setCurrentPlayer(prev => (prev === 'p1' ? 'p2' : 'p1'));
        },
        [send, currentPlayer, setCurrentPlayer],
    );

    const validateTeam = useCallback(
        (team: PokemonTeam) => {
            send({ type: 'validate-team', team: makeShowdownTeam(team) });
        },
        [send],
    );

    return { startBattle, makeMove, validateTeam };
}