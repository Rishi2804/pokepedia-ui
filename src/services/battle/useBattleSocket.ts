import {useCallback, useEffect, useRef, useState} from "react";
import type {ClientMessage, ServerMessage} from "./protocol.ts";

export type ConnectionStatus = 'connecting' | 'open' | 'closed';

/**
 * Hand-rolled instead of react-use-websocket: the create/join/resume
 * handshake wants explicit control over exactly when a socket opens and
 * what happens to it across a route change, and that's small enough here
 * that a dependency isn't worth it.
 *
 * `url: null` defers connecting - callers that need something ready first
 * (a chosen team, a resume token read from sessionStorage) pass null until
 * then. `onMessage` is read through a ref so passing a new inline callback
 * on every render doesn't tear down and reopen the socket.
 */
export const useBattleSocket = (url: string | null, onMessage: (message: ServerMessage) => void) => {
    const [status, setStatus] = useState<ConnectionStatus>('connecting');
    const wsRef = useRef<WebSocket | null>(null);
    const onMessageRef = useRef(onMessage);
    onMessageRef.current = onMessage;

    useEffect(() => {
        if (!url) {
            setStatus('connecting');
            return;
        }

        setStatus('connecting');
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => setStatus('open');
        ws.onclose = () => setStatus('closed');
        ws.onerror = () => setStatus('closed');
        ws.onmessage = (event: MessageEvent<string>) => {
            const message: ServerMessage = JSON.parse(event.data);
            onMessageRef.current(message);
        };

        return () => {
            ws.close();
            wsRef.current = null;
        };
    }, [url]);

    const send = useCallback((message: ClientMessage) => {
        wsRef.current?.send(JSON.stringify(message));
    }, []);

    return {status, send};
};
