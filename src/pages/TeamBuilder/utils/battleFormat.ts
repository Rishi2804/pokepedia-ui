import {VersionGroup} from "../../../global/enums.ts";
import type {BattleFormatKey} from "../../../services/battle/protocol.ts";
import {getGenRules} from "../genRules.ts";

// The battle format a team plays under, which is also the format whose item
// pool it draws from. It comes from the battle server's own per-game rules (see
// genRules.ts), so the format the picker offers items for is the one the server
// then validates the team in: a National/home team plays National Dex AG (the
// only place Mega Stones and Z-Crystals are legal alongside gen 9 mechanics),
// Legends: Z-A gets its own key so it offers its Mega Stones without pulling in
// the rest of the National Dex pool, and every other game plays its generation.
export function battleFormatKeyFor(versionGroup: VersionGroup | null): BattleFormatKey {
    return getGenRules(versionGroup).formatKey;
}
