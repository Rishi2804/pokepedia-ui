import {PokemonType} from "../../../global/enums.ts";
import type {NatureName} from "../../../global/data/natures.ts";
import {NATURES} from "../../../global/data/natures.ts";
import type {StatKey, StatSpread} from "../../../global/types.ts";
import type {IvModel} from "../genRules.ts";

// ---- Gen 3+ final stat formulas ----
// Also used by the Pokemon page's level-50 min/max range display
// (src/pages/Pokemon/components/BaseStats/components/StatSection.tsx),
// which previously duplicated these inline.

export function calcHp(base: number, iv: number, ev: number, level: number): number {
    return Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10;
}

export function calcStat(base: number, iv: number, ev: number, level: number, natureMultiplier: number): number {
    return Math.floor((Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5) * natureMultiplier);
}

// ---- Gen 1-2: stat exp (0-65535) stands in for EVs; there is no nature yet ----

export function calcHpGen12(base: number, dv: number, statExp: number, level: number): number {
    return Math.floor(((base + dv) * 2 + Math.floor(Math.sqrt(statExp) / 4)) * level / 100) + level + 10;
}

export function calcStatGen12(base: number, dv: number, statExp: number, level: number): number {
    return Math.floor(((base + dv) * 2 + Math.floor(Math.sqrt(statExp) / 4)) * level / 100) + 5;
}

// Gen 1-2 HP DV is derived from the LSBs of the other four DVs, not chosen
// independently. Special Attack's DV stands in for the single "Special" DV
// these games actually have (Special Defense always mirrors it here).
// Verified against Pokemon Showdown's sim/dex.ts (getHiddenPower, gen<=2 branch).
export function hpDvFromDvs(ivs: StatSpread): number {
    return 8 * (ivs.atk % 2) + 4 * (ivs.def % 2) + 2 * (ivs.spe % 2) + (ivs.spa % 2);
}

export function natureMultiplier(nature: NatureName, stat: StatKey): number {
    if (stat === 'hp') return 1;
    const n = NATURES[nature];
    if (n.plus === stat) return 1.1;
    if (n.minus === stat) return 0.9;
    return 1;
}

// ---- Hidden Power ----
// The type formulas and the IV/DV tables below are taken directly from Pokemon
// Showdown (sim/dex.ts's getHiddenPower, and data/typechart.ts's HPivs/HPdvs)
// rather than re-derived: the obvious "maximize the number of set bits"
// back-solve does NOT reproduce Showdown's actual canonical choices for most
// types, so guessing at this table is not safe.

export const HIDDEN_POWER_TYPES: PokemonType[] = [
    PokemonType.FIGHTING, PokemonType.FLYING, PokemonType.POISON, PokemonType.GROUND,
    PokemonType.ROCK, PokemonType.BUG, PokemonType.GHOST, PokemonType.STEEL,
    PokemonType.FIRE, PokemonType.WATER, PokemonType.GRASS, PokemonType.ELECTRIC,
    PokemonType.PSYCHIC, PokemonType.ICE, PokemonType.DRAGON, PokemonType.DARK,
];

// Gen 3+: bit order is HP, Atk, Def, Spe, SpA, SpD — Speed comes before the
// special stats, unlike every other IV/EV listing.
export function hiddenPowerType(ivs: StatSpread): PokemonType {
    const bits = [ivs.hp, ivs.atk, ivs.def, ivs.spe, ivs.spa, ivs.spd].map(iv => iv % 2);
    const weighted = bits[0] + 2 * bits[1] + 4 * bits[2] + 8 * bits[3] + 16 * bits[4] + 32 * bits[5];
    return HIDDEN_POWER_TYPES[Math.floor(weighted * 15 / 63)];
}

// Gen 2 only depends on the Attack and Defense DVs. Note this formula CAN
// land on Dark (index 15) for an arbitrary DV roll, even though Dark has no
// entry in HP_DV_OVERRIDES below — see the comment there.
export function hiddenPowerTypeGen2(ivs: StatSpread): PokemonType {
    return HIDDEN_POWER_TYPES[4 * (ivs.atk % 4) + (ivs.def % 4)];
}

// Sparse overrides layered onto a base of 31 (gen 3+) or DV 15 (gen 1-2).
// Only the listed stats drop below the cap; everything else stays maxed.
const HP_IV_OVERRIDES: Partial<Record<PokemonType, Partial<StatSpread>>> = {
    [PokemonType.FIGHTING]: {def: 30, spa: 30, spd: 30, spe: 30},
    [PokemonType.FLYING]: {hp: 30, atk: 30, def: 30, spa: 30, spd: 30},
    [PokemonType.POISON]: {def: 30, spa: 30, spd: 30},
    [PokemonType.GROUND]: {spa: 30, spd: 30},
    [PokemonType.ROCK]: {def: 30, spd: 30, spe: 30},
    [PokemonType.BUG]: {atk: 30, def: 30, spd: 30},
    [PokemonType.GHOST]: {def: 30, spd: 30},
    [PokemonType.STEEL]: {spd: 30},
    [PokemonType.FIRE]: {atk: 30, spa: 30, spe: 30},
    [PokemonType.WATER]: {atk: 30, def: 30, spa: 30},
    [PokemonType.GRASS]: {atk: 30, spa: 30},
    [PokemonType.ELECTRIC]: {spa: 30},
    [PokemonType.PSYCHIC]: {atk: 30, spe: 30},
    [PokemonType.ICE]: {atk: 30, def: 30},
    [PokemonType.DRAGON]: {atk: 30},
    [PokemonType.DARK]: {},
};

// Dark has no entry: Generation II's Hidden Power cannot legally be obtained
// as Dark-type (a documented quirk of the original games, reproduced as-is
// by Showdown — dark is the only type with no HPdvs table). It's excluded
// from hiddenPowerOptions('dv') below rather than given a made-up spread.
const HP_DV_OVERRIDES: Partial<Record<PokemonType, Partial<StatSpread>>> = {
    [PokemonType.FIGHTING]: {atk: 12, def: 12},
    [PokemonType.FLYING]: {atk: 12, def: 13},
    [PokemonType.POISON]: {atk: 12, def: 14},
    [PokemonType.GROUND]: {atk: 12},
    [PokemonType.ROCK]: {atk: 13, def: 12},
    [PokemonType.BUG]: {atk: 13, def: 13},
    [PokemonType.GHOST]: {atk: 13, def: 14},
    [PokemonType.STEEL]: {atk: 13},
    [PokemonType.FIRE]: {atk: 14, def: 12},
    [PokemonType.WATER]: {atk: 14, def: 13},
    [PokemonType.GRASS]: {atk: 14, def: 14},
    [PokemonType.ELECTRIC]: {atk: 14},
    [PokemonType.PSYCHIC]: {def: 12},
    [PokemonType.ICE]: {def: 13},
    [PokemonType.DRAGON]: {def: 14},
};

// The selectable Hidden Power types for a dropdown: all 16 from gen 3 on,
// but only 15 (no Dark) in gen 1-2 — see HP_DV_OVERRIDES above. Gen 1 has no
// Hidden Power at all (callers should gate on GenRules.hiddenPower first).
export function hiddenPowerOptions(ivModel: IvModel): PokemonType[] {
    return ivModel === 'dv'
        ? HIDDEN_POWER_TYPES.filter(t => t !== PokemonType.DARK)
        : HIDDEN_POWER_TYPES;
}

// Picking a Hidden Power type edits the IVs/DVs to match, the way Showdown's
// teambuilder does, rather than storing the type as independent state.
export function ivsForHiddenPower(type: PokemonType, ivModel: IvModel): StatSpread {
    if (ivModel === 'dv') {
        const overrides = HP_DV_OVERRIDES[type] ?? {};
        const dvs: StatSpread = {hp: 15, atk: 15, def: 15, spa: 15, spd: 15, spe: 15, ...overrides};
        dvs.hp = hpDvFromDvs(dvs);
        return dvs;
    }
    const overrides = HP_IV_OVERRIDES[type] ?? {};
    return {hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31, ...overrides};
}

// Shedinja always has 1 HP regardless of base stat, IVs, EVs, or level.
export const SHEDINJA_ID = 292;
