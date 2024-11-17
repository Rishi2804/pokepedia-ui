import {IPokemonDetails} from "../types.ts";
import {PokemonDetails} from "../../../global/types.ts";
import {Game, LearnMethod, MoveClass, PokedexRegion, PokemonType, VersionGroup} from "../../../global/enums.ts";

export function prepareForUI(pokemon: IPokemonDetails): PokemonDetails {
    return {
        ...pokemon,
        type1: PokemonType[pokemon.type1],
        type2: pokemon.type2 ? PokemonType[pokemon.type2] : null,
        dexEntries: pokemon.dexEntries.map(entry => ({
            ...entry,
            game: Game[entry.game]
        })),
        dexNumbers: pokemon.dexNumbers.map(entry => ({
            ...entry,
            dexName: PokedexRegion[entry.dexName]
        })),
        movesets: pokemon.movesets.map(moveset => ({
            versionGroup: VersionGroup[moveset.versionGroup],
            learnMethodSets: moveset.learnMethodSets.map(learnsets => ({
                method: LearnMethod[learnsets.method],
                moves: learnsets.moves.map(move => ({
                    ...move,
                    type: PokemonType[move.type],
                    moveClass: MoveClass[move.moveClass]
                }))
            }))
        }))
    }
}