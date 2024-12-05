import {IPokedexDetails} from "../types.ts";
import {PokemonType} from "../../../global/enums.ts";
import {PokedexDetails} from "../../../global/types.ts";

export function prepareForUI(dex: IPokedexDetails[]): PokedexDetails[]  {
    return dex.map(item => {
        return {
            name: item.name,
            pokemon: item.pokemon.map((mon) => {
                return {
                    ...mon,
                    type1: PokemonType[mon.type1],
                    type2: mon.type2 ? PokemonType[mon.type2] : null,
                };
            })
        }
    })
}