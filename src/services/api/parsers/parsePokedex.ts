import {PokedexDetails, PokemonSnapshot} from "../../../global/types.ts";
import {PokemonType} from "../../../global/enums.ts";
import {asEnum, asNullableEnum} from "../parse.ts";

interface WirePokedexEntry {
    dexNumber: number;
    speciesId: number;
    pokemonId: number;
    name: string;
    gen: number;
    type1: string;
    type2: string | null;
}

interface WirePokedexGroup {
    name: string;
    pokemon: WirePokedexEntry[];
}

function parseEntry(entry: WirePokedexEntry): PokemonSnapshot {
    return {
        dexNumber: entry.dexNumber,
        speciesId: entry.speciesId,
        pokemonId: entry.pokemonId,
        name: entry.name,
        type1: asEnum(PokemonType, entry.type1, 'type1'),
        type2: asNullableEnum(PokemonType, entry.type2, 'type2'),
    };
}

export function parsePokedex(json: unknown): PokedexDetails[] {
    const groups = json as WirePokedexGroup[];
    return groups.map(group => ({
        name: group.name,
        pokemon: group.pokemon.map(parseEntry),
    }));
}
