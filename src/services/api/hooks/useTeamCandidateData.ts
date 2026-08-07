import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseTeamCandidate} from "../parsers/parseTeamCandidate.ts";

export const useTeamCandidateDetails = (versionString: string, id: number) =>
    useQuery({
        queryKey: ['team-candidate', versionString, id],
        queryFn: () => getJson(`${ENDPOINTS.GET_TEAM_CANDIDATES}/${versionString}/${id}`, parseTeamCandidate),
        enabled: !!versionString && !!id,
    });
