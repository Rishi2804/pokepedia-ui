import {useQuery} from "@tanstack/react-query";
import type {VersionGroup} from "../../global/enums.ts";
import {BATTLE_HTTP_URL, ROOM_CODE_LENGTH} from "./constants.ts";

export interface BattleRoomInfo {
    code: string;
    /** The game the host's team was built for; null for a Home team. */
    versionGroup: VersionGroup | null;
    formatName: string;
    host: string;
    joinable: boolean;
}

// Looks a room up by code once it is fully typed, so the join screen can show
// its format and lock the team picker to its version group. Resolves to null
// for a code no room has.
export const useBattleRoom = (code: string) =>
    useQuery({
        queryKey: ['battle-room', code],
        queryFn: async (): Promise<BattleRoomInfo | null> => {
            const response = await fetch(`${BATTLE_HTTP_URL}/rooms/${code}`);
            if (response.status === 404) return null;
            if (!response.ok) throw new Error(`Room lookup failed (${response.status})`);
            return response.json();
        },
        enabled: code.length === ROOM_CODE_LENGTH,
        retry: false,
        gcTime: 0,
    });
