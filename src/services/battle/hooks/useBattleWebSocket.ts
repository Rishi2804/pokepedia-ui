import { useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { BattleState, LogEntry } from '../../../pages/BattleSimulator/types';
import { processMessage } from '../../../pages/BattleSimulator/utils';
import { ConnectionStatus, InboundWSMessage, OutboundWSMessage, UseBattleWebSocketReturn } from '../types';
import { BATTLE_WS_URL } from '../constants';

const READY_STATE_MAP: Record<ReadyState, ConnectionStatus> = {
    [ReadyState.CONNECTING]:     'connecting',
    [ReadyState.OPEN]:           'connected',
    [ReadyState.CLOSING]:        'disconnected',
    [ReadyState.CLOSED]:         'disconnected',
    [ReadyState.UNINSTANTIATED]: 'disconnected',
};

interface UseBattleWebSocketOptions {
    onStateChange: (next: BattleState) => void;
    onLogsChange: (newLogs: LogEntry[]) => void;
    onPlayerChange: (player: 'p1' | 'p2') => void;
    getBattleState: () => BattleState;
}

export function useBattleWebSocket({
                                       onStateChange,
                                       onLogsChange,
                                       onPlayerChange,
                                       getBattleState,
                                   }: UseBattleWebSocketOptions): UseBattleWebSocketReturn {
    const callbacksRef = useRef({ onStateChange, onLogsChange, onPlayerChange, getBattleState });
    useEffect(() => {
        callbacksRef.current = { onStateChange, onLogsChange, onPlayerChange, getBattleState };
    });

    const { sendJsonMessage, readyState } = useWebSocket(BATTLE_WS_URL, {
        shouldReconnect: () => true,
        onOpen: () => console.log('[WS] Connected to', BATTLE_WS_URL),
        onClose: () => console.log('[WS] Disconnected'),
        onError: (event) => console.error('[WS] Error:', event),
        onMessage: (event) => {
            const data = JSON.parse(event.data) as InboundWSMessage;

            const { onStateChange, onLogsChange, onPlayerChange, getBattleState } = callbacksRef.current;

            if (data.type === 'update' || data.type === 'sideupdate') {
                // processMessage reads from getBattleState() (the ref) so it always
                // sees the latest state even if two messages arrive before a re-render.
                // onStateChange updates the ref synchronously via battleStateRef before
                // calling setBattleState, so each message builds on the previous one.
                const { state: nextState, logs: newLogs } = processMessage(getBattleState(), data.message);
                onStateChange(nextState);

                if (newLogs.length) onLogsChange(newLogs);

                // For sideupdates, the envelope player field is ground truth for whose
                // turn it is — it comes directly from the server routing, not from the
                // message body. Use requestData as a fallback only.
                if (data.type === 'sideupdate') {
                    const player: 'p1' | 'p2' | undefined =
                        data.player ??
                        (nextState.requestData?.side?.id as 'p1' | 'p2' | undefined);
                    if (player) onPlayerChange(player);
                }
            } else if (data.type === 'validate-team') {
                console.log('validate-team result:', data.result);
            }
        },
    });

    const send = (msg: OutboundWSMessage) => sendJsonMessage(msg);

    return {
        connectionStatus: READY_STATE_MAP[readyState],
        send,
    };
}