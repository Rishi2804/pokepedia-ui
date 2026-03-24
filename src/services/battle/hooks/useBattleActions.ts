import { useCallback } from 'react';
import { PokemonTeam } from '../../../global/types';
import { makeInitialBattleState } from '../../../pages/BattleSimulator/utils';
import { makeShowdownTeam } from '../transformers/showdownTransformer';
import { BATTLE_FORMATS } from '../constants';
import { OutboundWSMessage, UseBattleActionsParams, UseBattleActionsReturn } from '../types';

/**
 * Encapsulates all user-initiated battle actions.
 *
 * Note: currentPlayer is NOT toggled here on makeMove — it is driven
 * exclusively by `sideupdate` messages from the server via onPlayerChange.
 * Toggling it client-side caused desync when moves resolved out of order
 * or during force-switch sequences.
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

    /**
     * Sends the player's choice (move, switch, or team order).
     * currentPlayer comes from the server via sideupdate — we just read it here
     * to tag the outbound message correctly.
     */
    const makeMove = useCallback(
        (choice: string) => {
            send({ type: 'move', player: currentPlayer, choice });
            // Toggle to the other player immediately — the server won't tell us who
            // goes next until after both players have submitted, so we drive it here.
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