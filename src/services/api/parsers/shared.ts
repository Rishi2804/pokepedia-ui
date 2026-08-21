import {Description, PokemonSnapshot, StatSpread, TeamCandidate, TeamCandidateSummary, TeamMove} from "../../../global/types.ts";
import {Game, MoveClass, PokemonType} from "../../../global/enums.ts";
import {asEnum, asNullableEnum} from "../parse.ts";

export interface WirePokemonSnap {
    speciesId: number;
    id: number;
    name: string;
    type1: string;
    type2: string | null;
}

// Move/ability endpoints don't send a real dex number, so speciesId stands in for it (matches prior behavior).
export function toPokemonSnapshot(mon: WirePokemonSnap): PokemonSnapshot {
    return {
        dexNumber: mon.speciesId,
        speciesId: mon.speciesId,
        pokemonId: mon.id,
        name: mon.name,
        type1: asEnum(PokemonType, mon.type1, 'type1'),
        type2: asNullableEnum(PokemonType, mon.type2, 'type2'),
    };
}

export interface WireDescription {
    games: string[];
    text: string;
}

// Shared by pokemon, move and ability parsers — all three endpoints send the
// same shape, already grouped by text and ordered by release date server-side.
export function parseDescriptions(descriptions: WireDescription[]): Description[] {
    return descriptions.map(d => ({
        games: d.games.map(g => asEnum(Game, g, 'games')),
        text: d.text,
    }));
}

export function groupByGen<T extends { gen: number }>(items: T[], firstGen: number, bucketCount: number): T[][] {
    const buckets: T[][] = Array.from({length: bucketCount}, () => []);
    for (const item of items) {
        buckets[item.gen - firstGen].push(item);
    }
    return buckets;
}

export interface WireTeamMove {
    id: number;
    name: string;
    type: string;
    moveClass: string;
}

export interface WireTeamCandidateSummary {
    id: number;
    name: string;
    slug: string;
    gen: number;
    type1: string;
    type2: string | null;
    genderRate: number;
}

export interface WireStats {
    hp: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    speed: number;
    bst: number;
}

export interface WireTeamCandidate extends WireTeamCandidateSummary {
    stats: WireStats;
    abilities: { id: number; name: string }[];
    moves: WireTeamMove[];
}

export function toTeamMove(m: WireTeamMove): TeamMove {
    return {
        id: m.id,
        name: m.name,
        type: asEnum(PokemonType, m.type, 'type'),
        moveClass: asEnum(MoveClass, m.moveClass, 'moveClass'),
    };
}

// The wire sends spatk/spdef/speed; everything past this boundary speaks
// Showdown's stat keys, so the remap happens once, here.
export function toStatSpread(stats: WireStats): StatSpread {
    return {
        hp: stats.hp,
        atk: stats.atk,
        def: stats.def,
        spa: stats.spatk,
        spd: stats.spdef,
        spe: stats.speed,
    };
}

// Built field-by-field rather than spread: toTeamCandidate below passes the
// full WireTeamCandidate through here, and spreading it would leak its raw
// stats/abilities/moves onto the summary.
export function toTeamCandidateSummary(c: WireTeamCandidateSummary): TeamCandidateSummary {
    return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        gen: c.gen,
        genderRate: c.genderRate,
        type1: asEnum(PokemonType, c.type1, 'type1'),
        type2: asNullableEnum(PokemonType, c.type2, 'type2'),
    };
}

export function toTeamCandidate(c: WireTeamCandidate): TeamCandidate {
    return {
        ...toTeamCandidateSummary(c),
        baseStats: toStatSpread(c.stats),
        abilities: c.abilities,
        moves: c.moves.map(toTeamMove),
    };
}
