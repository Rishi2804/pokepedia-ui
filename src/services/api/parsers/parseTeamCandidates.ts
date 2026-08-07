import {CandidatesList} from "../../../global/types.ts";
import {toTeamCandidate, WireTeamCandidate} from "./shared.ts";

interface WireGroup {
    listName: string;
    pokemon: WireTeamCandidate[];
}

export function parseTeamCandidates(json: unknown): CandidatesList[] {
    const groups = json as WireGroup[];
    return groups.map(group => ({
        listName: group.listName,
        pokemon: group.pokemon.map(toTeamCandidate),
    }));
}
