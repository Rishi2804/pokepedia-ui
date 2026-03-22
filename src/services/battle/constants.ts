export const BATTLE_WS_URL = 'ws://localhost:3001';

export const BATTLE_FORMATS = {
    anythingGoes: (gen: string) => `gen${gen}anythinggoes`,
} as const;