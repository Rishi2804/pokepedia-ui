import {IAbilityDetails} from "../types.ts";
import {PokemonType, VersionGroup} from "../../../global/enums.ts";
import {AbilityDetails} from "../../../global/types.ts";

export function prepareForUI(ability: IAbilityDetails): AbilityDetails {
    return {
        ...ability,
        descriptions: ability.descriptions.map(description => {
            return {
                versionGroups: description.versionGroups.map(key => VersionGroup[key]),
                description: description.description
            }
        }),
        pokemon: ability.pokemon.map(mon => {
            return {
                    dexNumber: mon.speciesId,
                    speciesId: mon.speciesId,
                    pokemonId: mon.pokemonId,
                    name: mon.name,
                    type1: PokemonType[mon.type1],
                    type2: mon.type2 ? PokemonType[mon.type2] : null,
            }
        })
    }
}