import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getJson} from "../api.service.ts";
import {ENDPOINTS} from "../constants.ts";
import {parseTeamCandidates} from "../parsers/parseTeamCandidates.ts";

export const useTeamCandidatesDetails = (versionString: string) =>
    useQuery({
        queryKey: ['team-candidates', versionString],
        queryFn: () => getJson(`${ENDPOINTS.GET_TEAM_CANDIDATES}/${versionString}`, parseTeamCandidates),
        enabled: !!versionString,
        placeholderData: keepPreviousData,
    });
