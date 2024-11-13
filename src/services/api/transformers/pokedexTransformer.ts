import {IPokemonSnapshot} from "../types.ts";
import {PokemonType} from "../../../global/enums.ts";

export function prepareForUI(dex: IPokemonSnapshot[]) {
    const transformedDex = dex
    transformedDex.forEach((pokemon) => {
        pokemon.type1 = PokemonType[pokemon.type1 as keyof typeof PokemonType];
        if (pokemon.type2) pokemon.type2 = PokemonType[pokemon.type2 as keyof typeof PokemonType];
    })
    return transformedDex
}