import {PokemonSnapshot} from "../../../global/types.ts";
import {PokemonType, VersionGroup} from "../../../global/enums.ts";
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
    versionGroups: string[];
    description: string;
}

export function parseDescriptions(descriptions: WireDescription[]) {
    return descriptions.map(d => ({
        versionGroups: d.versionGroups.map(vg => asEnum(VersionGroup, vg, 'versionGroups')),
        description: d.description,
    }));
}

export function groupByGen<T extends { gen: number }>(items: T[], firstGen: number, bucketCount: number): T[][] {
    const buckets: T[][] = Array.from({length: bucketCount}, () => []);
    for (const item of items) {
        buckets[item.gen - firstGen].push(item);
    }
    return buckets;
}
