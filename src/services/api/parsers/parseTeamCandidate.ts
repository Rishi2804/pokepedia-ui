import {TeamCandidate} from "../../../global/types.ts";
import {toTeamCandidate, WireTeamCandidate} from "./shared.ts";

export function parseTeamCandidate(json: unknown): TeamCandidate {
    return toTeamCandidate(json as WireTeamCandidate);
}
