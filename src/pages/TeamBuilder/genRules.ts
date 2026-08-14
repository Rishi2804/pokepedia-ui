import {VersionGroup} from "../../global/enums.ts";

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
}

const GEN_1: GenRules = {
    abilities: false, items: false, natures: false,
    evModel: 'statExp', evLabel: 'Stat Exp', evCap: 65535, evTotalCap: null,
    ivModel: 'dv', hiddenPower: false, tera: false, dynamax: false,
    happiness: false, pokeball: false,
};

const GEN_2: GenRules = {
    ...GEN_1,
    items: true, hiddenPower: true, happiness: true,
};

const GEN_3_5: GenRules = {
    abilities: true, items: true, natures: true,
    evModel: 'ev255', evLabel: 'EVs', evCap: 255, evTotalCap: 510,
    ivModel: 'iv', hiddenPower: true, tera: false, dynamax: false,
    happiness: true, pokeball: true,
};

const GEN_6_7: GenRules = {
    ...GEN_3_5,
    evModel: 'ev252', evCap: 252,
};

const LGPE: GenRules = {
    abilities: false, items: false, natures: true,
    evModel: 'av', evLabel: 'AVs', evCap: 200, evTotalCap: null,
    ivModel: 'iv', hiddenPower: false, tera: false, dynamax: false,
    happiness: false, pokeball: false,
};

const SWSH: GenRules = {
    ...GEN_6_7,
    hiddenPower: false, dynamax: true,
};

const BDSP: GenRules = {
    ...GEN_6_7,
};

const LA: GenRules = {
    abilities: false, items: false, natures: false,
    evModel: 'effortLevel', evLabel: 'Effort Level', evCap: 10, evTotalCap: null,
    ivModel: 'iv', hiddenPower: false, tera: false, dynamax: false,
    happiness: false, pokeball: false,
};

const SV: GenRules = {
    ...GEN_6_7,
    hiddenPower: false, tera: true,
};

// One entry per VersionGroup rather than deriving from TeamPage/constants.ts's
// gen number — several version groups share a gen number (SWSH/BDSP/LA are all
// gen 8) but have unrelated rule sets, so the gen number alone can't select one.
const GEN_RULES: Record<VersionGroup, GenRules> = {
    [VersionGroup.RED_BLUE]: GEN_1,
    [VersionGroup.YELLOW]: GEN_1,
    [VersionGroup.GOLD_SILVER]: GEN_2,
    [VersionGroup.CRYSTAL]: GEN_2,
    [VersionGroup.RUBY_SAPPHIRE]: GEN_3_5,
    [VersionGroup.EMERALD]: GEN_3_5,
    [VersionGroup.FIRERED_LEAFGREEN]: GEN_3_5,
    [VersionGroup.DIAMOND_PEARL]: GEN_3_5,
    [VersionGroup.PLATINUM]: GEN_3_5,
    [VersionGroup.HEARTGOLD_SOULSILVER]: GEN_3_5,
    [VersionGroup.BLACK_WHITE]: GEN_3_5,
    [VersionGroup.BLACK_2_WHITE_2]: GEN_3_5,
    [VersionGroup.X_Y]: GEN_6_7,
    [VersionGroup.OMEGA_RUBY_ALPHA_SAPPHIRE]: GEN_6_7,
    [VersionGroup.SUN_MOON]: GEN_6_7,
    [VersionGroup.ULTRA_SUN_ULTRA_MOON]: GEN_6_7,
    [VersionGroup.LETS_GO_PIKACHU_LETS_GO_EEVEE]: LGPE,
    [VersionGroup.SWORD_SHIELD]: SWSH,
    [VersionGroup.BRILLIANT_DIAMOND_AND_SHINING_PEARL]: BDSP,
    [VersionGroup.LEGENDS_ARCEUS]: LA,
    [VersionGroup.SCARLET_VIOLET]: SV,
};

// A null versionGroup means the "Home"/national team (see teamStore.createNewTeam)
// which isn't pinned to one game, so it gets the most current, most permissive
// rule set — the same convention TypeTeamTable.tsx uses when guarding VersionToGen
// lookups against a null versionGroup.
export function getGenRules(versionGroup: VersionGroup | null): GenRules {
    return versionGroup ? GEN_RULES[versionGroup] : SV;
}
