// sessionStorage (not localStorage) deliberately - a battle session belongs
// to one tab, matching the two-tabs-per-battle model (see the battle plan's
// Phase 3 "Gen agreement" section). Centralized so BattleHome and BattleRoom
// never risk drifting on the storage key or the shape stored under it.

const KEY = 'pokepedia-battle-session';

export interface BattleSession {
    code: string;
    seatToken: string;
}

export function saveBattleSession(session: BattleSession): void {
    sessionStorage.setItem(KEY, JSON.stringify(session));
}

export function loadBattleSession(): BattleSession | null {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.code === 'string' && typeof parsed?.seatToken === 'string') return parsed;
    } catch {
        // fall through
    }
    return null;
}

export function clearBattleSession(): void {
    sessionStorage.removeItem(KEY);
}
