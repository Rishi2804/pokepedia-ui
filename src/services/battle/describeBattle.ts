import {VersionGroup} from "../../global/enums.ts";
import {versionGroupLabel} from "../../global/labels.ts";
import {VersionToGen} from "../../pages/TeamBuilder/TeamPage/constants.ts";

// The sentence shown under the team picker before a room exists. The server
// decides the real format from the same version group; this only mirrors it
// for display.
export function describeBattle(versionGroup: VersionGroup | null): string {
    if (!versionGroup) {
        return 'This will be a National Dex Anything Goes battle (Home) — every Pokémon from every generation, with Mega Evolution, Z-Moves and Terastallization all available.';
    }
    if (versionGroup === VersionGroup.LEGENDS_ZA) {
        return 'This will be a Legends: Z-A battle — Mega Evolution is available, Terastallization is not.';
    }
    return `This will be a Gen ${VersionToGen[versionGroup]} Anything Goes battle (${versionGroupLabel[versionGroup]}).`;
}
