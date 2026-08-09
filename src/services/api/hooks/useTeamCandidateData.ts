import {useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseTeamCandidate} from "../parsers/parseTeamCandidate.ts";

// Shared with imperative callers (import/export needs to fetch a candidate
// chosen at runtime, outside any component's render, so a hook alone can't
// cover it) via queryClient.fetchQuery(teamCandidateQuery(...)) — same query
// key, so it's a cache hit whenever the set editor already fetched this
// candidate. getJson must only ever be called from inside a queryFn like this
// one; see SetEditor.tsx / TeamSelection.tsx for the imperative call sites.
export const teamCandidateQuery = (versionString: string, id: number) => ({
    queryKey: ['team-candidate', versionString, id],
    queryFn: () => getJson(`${ENDPOINTS.GET_TEAM_CANDIDATES}/${versionString}/${id}`, parseTeamCandidate),
});

export const useTeamCandidateDetails = (versionString: string, id: number) =>
    useQuery({
        ...teamCandidateQuery(versionString, id),
        enabled: !!versionString && !!id,
    });
