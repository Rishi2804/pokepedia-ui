import {IMoveDetails} from "../types.ts";
import {LearnMethod, MoveClass, PokemonType, VersionGroup} from "../../../global/enums.ts";
import {MoveDetails} from "../../../global/types.ts";

export function prepareForUI(move: IMoveDetails): MoveDetails {
    return {
        ...move,
        type: PokemonType[move.type],
        moveClass: MoveClass[move.moveClass],
        pastMoveValues: move.pastMoveValues.map(values => {
            return {
                ...values,
                versionGroups: values.versionGroups.map(key => VersionGroup[key])
            }
        }),
        descriptions: move.descriptions.map(description => {
            return {
                versionGroups: description.versionGroups.map(key => VersionGroup[key]),
                description: description.description
            }
        }),
        pokemonLearnable: move.pokemon.map(list => {
            return {
                method: LearnMethod[list.method],
                pokemon: list.pokemon.map(mon => {
                    return {
                        dexNumber: mon.speciesId,
                        speciesId: mon.speciesId,
                        pokemonId: mon.id,
                        name: mon.name,
                        type1: PokemonType[mon.type1],
                        type2: mon.type2 ? PokemonType[mon.type2] : null,
                    }
                })
            }
        })
    }
}