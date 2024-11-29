import {IMoveSnapshot} from "../types.ts";
import {MoveClass, PokemonType} from "../../../global/enums.ts";
import {MoveSnapshot} from "../../../global/types.ts";

export function prepareForUI(moves: IMoveSnapshot[]): MoveSnapshot[][] {
    const genSeperated: MoveSnapshot[][] = new Array(9).fill([]).map(() => []);
    moves.forEach(move => {
        const item = {
            ...move,
            type: PokemonType[move.type],
            moveClass: MoveClass[move.moveClass]
        }
        genSeperated[move.gen-1].push(item)
    })
    return genSeperated
}