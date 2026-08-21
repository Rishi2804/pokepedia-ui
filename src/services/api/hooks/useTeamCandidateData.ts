import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseTeamCandidate} from "../parsers/parseTeamCandidate.ts";

// Also called imperatively via queryClient.fetchQuery(teamCandidateQuery(...))
// — same query key, so it's a cache hit if the set editor already fetched
// this candidate. getJson must only be called from inside a queryFn like
// this one; see SetEditor.tsx / TeamSelection.tsx for those call sites.
export const teamCandidateQuery = (versionString: string, id: number) => ({
    queryKey: ['team-candidate', versionString, id],
    queryFn: () => getJson(`${ENDPOINTS.GET_TEAM_CANDIDATES}/${versionString}/${id}`, parseTeamCandidate),
});

export const useTeamCandidateDetails = (versionString: string, id: number) =>
    useQuery({
        ...teamCandidateQuery(versionString, id),
        enabled: !!versionString && !!id,
    });
