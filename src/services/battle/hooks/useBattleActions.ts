import { useCallback, useRef } from 'react';
import { makeInitialBattleState } from '../../../pages/BattleSimulator/utils';
import { makeShowdownTeam } from '../transformers/showdownTransformer';
import { BATTLE_FORMATS } from '../constants';
import {
    UseBattleActionsParams,
    UseBattleActionsReturn,
} from '../types';

/**
 * Encapsulates all user-initiated battle actions.
 *
 * validateAndStart sends both teams for validation simultaneously, then starts
 * the battle only if both come back clean. The WS hook calls onValidateResult
 * for each response; we track both here with a ref before committing.
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
                                     setValidation,
                                 }: UseBattleActionsParams): UseBattleActionsReturn {

    // Accumulate both validation results before deciding whether to start.
    // Using a ref so the callbacks always close over the same object.
    const pendingValidation = useRef<{
        p1: string | null | undefined;  // undefined = not yet received
        p2: string | null | undefined;
    }>({ p1: undefined, p2: undefined });

    /**
     * Called by useBattleWebSocket each time a validate-team result arrives.
     * `player` identifies which team the result belongs to.
     * `error` is null on success, or a string describing the problem.
     */
    const onValidateResult = useCallback(
        (player: 'p1' | 'p2', error: string | null) => {
            pendingValidation.current[player] = error;

            const { p1, p2 } = pendingValidation.current;

            // Wait until both responses have arrived
            if (p1 === undefined || p2 === undefined) return;

            if (p1 !== null || p2 !== null) {
                // At least one team is invalid — surface errors and stop
                setValidation({ status: 'error', p1Error: p1, p2Error: p2 });
                return;
            }

            // Both clean — start the battle
            setValidation({ status: 'idle', p1Error: null, p2Error: null });
            send({
                type: 'start-battle',
                format: BATTLE_FORMATS.anythingGoes(battleGen),
                team1: makeShowdownTeam(p1Team!),
                team2: makeShowdownTeam(p2Team!),
            });
            setBattleStarted(true);
            setBattleState(makeInitialBattleState());
            setLogs([]);
        },
        [send, battleGen, p1Team, p2Team, setBattleStarted, setBattleState, setLogs, setValidation],
    );

    const validateAndStart = useCallback(() => {
        if (!p1Team || !p2Team) return;

        // Reset accumulator and set UI to validating
        pendingValidation.current = { p1: undefined, p2: undefined };
        setValidation({ status: 'validating', p1Error: null, p2Error: null });

        const format = BATTLE_FORMATS.anythingGoes(battleGen);
        send({ type: 'validate-team', player: 'p1', format, team: makeShowdownTeam(p1Team) });
        send({ type: 'validate-team', player: 'p2', format, team: makeShowdownTeam(p2Team) });
    }, [send, p1Team, p2Team, setValidation]);

    const makeMove = useCallback(
        (choice: string) => {
            send({ type: 'move', player: currentPlayer, choice });
            setCurrentPlayer(prev => (prev === 'p1' ? 'p2' : 'p1'));
        },
        [send, currentPlayer, setCurrentPlayer],
    );

    return { validateAndStart, makeMove, onValidateResult };
}