import {IPokemonSnapshot} from "../types.ts";
import {PokemonType} from "../../../global/enums.ts";
import {PokemonSnapshot} from "../../../global/types.ts";

export function prepareForUI(dex: IPokemonSnapshot[]): PokemonSnapshot[]  {
    const transformedDex: PokemonSnapshot[] = dex.map((pokemon) => {
        return {
            ...pokemon,
            type1: PokemonType[pokemon.type1 as keyof typeof PokemonType],
            type2: pokemon.type2 ? PokemonType[pokemon.type2 as keyof typeof PokemonType] : null,
        };
    });

    return transformedDex;
}