import {PLACEHOLDER_ITEMS} from "../../global/data/items.ts";
import {NATURES} from "../../global/data/natures.ts";
import {showdownNameFromSlug, toShowdownId} from "../../global/data/showdownSpecies.ts";
import {pokemonTypeLabel} from "../../global/labels.ts";
import type {PokemonTeamMember, StatSpread} from "../../global/types.ts";
import type {GenRules} from "../../pages/TeamBuilder/genRules.ts";
import {dvToShowdownIv, HIDDEN_POWER_MOVE_ID, hiddenPowerTypeFor, statExpToShowdownEv} from "../../pages/TeamBuilder/utils/stats.ts";
import type {PokemonSet, VisualMetaMap} from "./protocol.ts";

// The reverse of showdownText.ts's exportSet, producing a live PokemonSet
// object instead of paste text - same field-by-field conversions (gen-aware
// EV/IV scale, Hidden Power's separate hpType, tera/dynamax gating), just
// structured for the wire instead of for reading.

function convertEv(raw: number, rules: GenRules): number {
    return rules.evModel === 'statExp' ? statExpToShowdownEv(raw) : raw;
}

function convertIv(raw: number, rules: GenRules): number {
    return rules.ivModel === 'dv' ? dvToShowdownIv(raw) : raw;
}

function convertSpread(spread: StatSpread, rules: GenRules, convert: (raw: number, rules: GenRules) => number): StatSpread {
    return {
        hp: convert(spread.hp, rules),
        atk: convert(spread.atk, rules),
        def: convert(spread.def, rules),
        spa: convert(spread.spa, rules),
        spd: convert(spread.spd, rules),
        spe: convert(spread.spe, rules),
    };
}

function showdownGender(gender: PokemonTeamMember['gender']): string {
    if (gender === 'male') return 'M';
    if (gender === 'female') return 'F';
    return '';
}

export function toShowdownSet(member: PokemonTeamMember, rules: GenRules): PokemonSet {
    // Falls back to our own display name for teams saved before `slug` was
    // added to PokemonTeamMember - same fallback showdownText.ts's exportSet
    // uses, since neither has a migration for pre-existing localStorage data.
    const speciesName = member.slug ? showdownNameFromSlug(member.slug) : member.name;
    const itemName = member.item ? PLACEHOLDER_ITEMS.find(i => i.slug === member.item)?.name : undefined;
    const hasHiddenPower = member.moves.some(m => m?.id === HIDDEN_POWER_MOVE_ID);

    const set: PokemonSet = {
        name: member.nickname ?? speciesName,
        species: speciesName,
        item: itemName ?? '',
        ability: member.ability?.name ?? '',
        moves: member.moves.filter(m => m !== null).map(m => m.name),
        nature: NATURES[member.nature].name,
        gender: showdownGender(member.gender),
        evs: convertSpread(member.evs, rules, convertEv),
        ivs: convertSpread(member.ivs, rules, convertIv),
        level: member.level,
        shiny: member.shiny,
    };

    if (rules.happiness) set.happiness = member.happiness;
    if (rules.hiddenPower && hasHiddenPower) set.hpType = pokemonTypeLabel[hiddenPowerTypeFor(member.ivs, rules.ivModel)];
    if (rules.tera && member.teraType) set.teraType = pokemonTypeLabel[member.teraType];
    if (rules.dynamax) {
        set.dynamaxLevel = member.dynamaxLevel;
        set.gigantamax = member.gigantamax;
    }

    return set;
}

export function toShowdownTeam(members: PokemonTeamMember[], rules: GenRules): PokemonSet[] {
    return members.map(member => toShowdownSet(member, rules));
}

// Keyed by Showdown species id, not slug - the server looks this map up
// against the live battle's current species (which can change mid-battle:
// Transform, Mega Evolution, Terastallize), and toShowdownId is the same
// normalization Showdown's own toID uses. Teams saved before `slug` existed
// simply don't get a sprite entry; the server falls back to national dex
// number, then a placeholder.
export function toVisualMeta(members: PokemonTeamMember[]): VisualMetaMap {
    const meta: VisualMetaMap = {};
    for (const member of members) {
        if (!member.slug) continue;
        meta[toShowdownId(member.slug)] = {
            pokemonId: member.id,
            shiny: member.shiny,
            female: member.gender === 'female',
        };
    }
    return meta;
}
