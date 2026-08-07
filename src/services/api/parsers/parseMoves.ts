import {MoveSnapshot} from "../../../global/types.ts";
import {MoveClass, PokemonType} from "../../../global/enums.ts";
import {asEnum} from "../parse.ts";
import {groupByGen} from "./shared.ts";

interface WireMoveSnap {
    id: number;
    name: string;
    type: string;
    moveClass: string;
    power: number | null;
    accuracy: number | null;
    pp: number | null;
    gen: number;
}

function parseMoveSnap(m: WireMoveSnap): MoveSnapshot {
    return {
        ...m,
        type: asEnum(PokemonType, m.type, 'type'),
        moveClass: asEnum(MoveClass, m.moveClass, 'moveClass'),
    };
}

export function parseMoves(json: unknown): MoveSnapshot[][] {
    const moves = (json as WireMoveSnap[]).map(parseMoveSnap);
    return groupByGen(moves, 1, 9);
}
