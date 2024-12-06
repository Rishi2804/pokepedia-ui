import {ICandidatesList} from "../types.ts";
import {CandidatesList} from "../../../global/types.ts";
import {MoveClass, PokemonType} from "../../../global/enums.ts";

export function prepareForUI(lists: ICandidatesList[]): CandidatesList[]  {
    return lists.map(candidates => {
        return {
            ...candidates,
            pokemon: candidates.pokemon.map(mon => {
                return {
                    ...mon,
                    type1: PokemonType[mon.type1],
                    type2: mon.type2 ? PokemonType[mon.type2] : null,
                    moves: mon.moves.map(move => {
                        return{
                            ...move,
                            moveClass: MoveClass[move.moveClass],
                            type: PokemonType[move.type],
                        }
                    })
                }
            })
        }
    })
}