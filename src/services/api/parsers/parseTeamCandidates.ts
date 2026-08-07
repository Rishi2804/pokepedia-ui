import {CandidatesList, TeamCandidate, TeamMove} from "../../../global/types.ts";
import {MoveClass, PokemonType} from "../../../global/enums.ts";
import {asEnum, asNullableEnum} from "../parse.ts";

interface WireMove {
    id: number;
    name: string;
    type: string;
    moveClass: string;
}

interface WireCandidate {
    id: number;
    name: string;
    gen: number;
    type1: string;
    type2: string | null;
    genderRate: number;
    abilities: { id: number; name: string }[];
    moves: WireMove[];
}

interface WireGroup {
    listName: string;
    pokemon: WireCandidate[];
}

function parseMove(m: WireMove): TeamMove {
    return {
        id: m.id,
        name: m.name,
        type: asEnum(PokemonType, m.type, 'type'),
        moveClass: asEnum(MoveClass, m.moveClass, 'moveClass'),
    };
}

function parseCandidate(c: WireCandidate): TeamCandidate {
    return {
        ...c,
        type1: asEnum(PokemonType, c.type1, 'type1'),
        type2: asNullableEnum(PokemonType, c.type2, 'type2'),
        moves: c.moves.map(parseMove),
    };
}

export function parseTeamCandidates(json: unknown): CandidatesList[] {
    const groups = json as WireGroup[];
    return groups.map(group => ({
        listName: group.listName,
        pokemon: group.pokemon.map(parseCandidate),
    }));
}
