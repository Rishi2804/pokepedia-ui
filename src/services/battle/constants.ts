export const BATTLE_WS_URL = import.meta.env.VITE_BATTLE_WS_URL as string;

// The battle server's plain-HTTP side (room lookup) lives on the same host/port as its WebSocket.
export const BATTLE_HTTP_URL = BATTLE_WS_URL.replace(/^ws/, 'http');

// Mirrors CODE_LENGTH in the battle server's rooms.ts.
export const ROOM_CODE_LENGTH = 6;
