import {ITeamCandidate} from "../types.ts";
import {TeamCandidate} from "../../../global/types.ts";
import {MoveClass, PokemonType} from "../../../global/enums.ts";

export function prepareForUI(candidates: ITeamCandidate[]): TeamCandidate[]  {
    return candidates.map(mon => {
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