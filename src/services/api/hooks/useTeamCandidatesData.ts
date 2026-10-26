import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseTeamCandidates} from "../parsers/parseTeamCandidates.ts";

// Also called imperatively via queryClient.fetchQuery(teamCandidatesQuery(...)),
// the way teamCandidateQuery is, so a cache hit when the list is already loaded.
export const teamCandidatesQuery = (versionString: string) => ({
    queryKey: ['team-candidates', versionString],
    queryFn: () => getJson(`${ENDPOINTS.GET_TEAM_CANDIDATES}/${versionString}`, parseTeamCandidates),
});

export const useTeamCandidatesDetails = (versionString: string) =>
    useQuery({
        ...teamCandidatesQuery(versionString),
        enabled: !!versionString,
        placeholderData: keepPreviousData,
    });
