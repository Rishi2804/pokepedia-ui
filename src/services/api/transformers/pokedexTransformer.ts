import {IPokemonSnapshot} from "../types.ts";
import {PokemonType} from "../../../global/enums.ts";
import {PokemonSnapshot} from "../../../global/types.ts";

export function prepareForUI(dex: IPokemonSnapshot[]): PokemonSnapshot[]  {
    return dex.map((pokemon) => {
        return {
            ...pokemon,
            type1: PokemonType[pokemon.type1],
            type2: pokemon.type2 ? PokemonType[pokemon.type2] : null,
        };
    });
}