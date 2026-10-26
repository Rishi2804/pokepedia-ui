import {VersionGroup} from "../../global/enums.ts";
import type {BattleFormatKey} from "../../services/battle/protocol.ts";
import battleRules from "../../global/data/battleRules.json";

export type EvModel = 'ev255' | 'ev252' | 'statExp' | 'av' | 'effortLevel';
export type IvModel = 'iv' | 'dv';

export interface GenRules {
    abilities: boolean;
    items: boolean;
    natures: boolean;
    evModel: EvModel;
    evLabel: string;
    evCap: number;
    evTotalCap: number | null;
    ivModel: IvModel;
    hiddenPower: boolean;
    tera: boolean;
    dynamax: boolean;
    happiness: boolean;
    pokeball: boolean;
    // The battle format this game's teams play under; see battleFormat.ts.
    formatKey: BattleFormatKey;
}

// The per-game rules are not kept here: they are the battle server's own table
// (pokepedia-battle/src/versionRules.ts), exported to
// global/data/battleRules.json by `npm run dumprules` in that project, so the
// team builder and the server converting its teams can't disagree. There is one
// entry per VersionGroup rather than one per generation, since several groups
// share a gen number (SWSH/BDSP/LA are all gen 8, SV/ZA both gen 9) with
// unrelated rules. Re-run the dump after changing a game's rules there.
const rules = battleRules as unknown as {
    versionGroups: Record<VersionGroup, GenRules>;
    home: GenRules;
};

// A null versionGroup means the "Home"/national team (see teamStore.createNewTeam)
// which isn't pinned to one game, so it gets the most current, most permissive
// rule set - the same convention TypeTeamTable.tsx uses when guarding VersionToGen
// lookups against a null versionGroup.
export function getGenRules(versionGroup: VersionGroup | null): GenRules {
    return versionGroup ? rules.versionGroups[versionGroup] : rules.home;
}
