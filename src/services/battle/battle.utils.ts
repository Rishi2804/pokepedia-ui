import { OutboundWSMessage } from './types';

/**
 * Sends a typed message over an open WebSocket.
 * Silently drops the message if the socket is not ready.
 */
export function sendWSMessage(ws: WebSocket | null, msg: OutboundWSMessage): void {
    if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(msg));
    }
}