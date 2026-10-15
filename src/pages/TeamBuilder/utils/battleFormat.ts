import {VersionGroup} from "../../../global/enums.ts";
import type {BattleFormatKey, SupportedGen} from "../../../services/battle/protocol.ts";
import {VersionToGen} from "../TeamPage/constants.ts";

// The battle format a team plays under, which is also the format whose item
// pool it draws from. National/home teams aren't pinned to one game's item
// pool, so they battle in (and draw items from) National Dex - the only
// place Mega Stones and Z-Crystals are legal alongside gen 9 mechanics.
// Legends: Z-A gets its own key so it offers its Mega Stones without pulling
// in the rest of the National Dex pool.
export function battleFormatKeyFor(versionGroup: VersionGroup | null): BattleFormatKey {
    if (!versionGroup) return 'nationaldex';
    if (versionGroup === VersionGroup.LEGENDS_ZA) return 'legendsza';
    return VersionToGen[versionGroup] as SupportedGen;
}
