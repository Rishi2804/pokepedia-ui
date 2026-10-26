import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {VersionGroup} from "../../global/enums.ts";
import type {PokemonTeamMember, TeamCandidateSummary} from "../../global/types.ts";
import {useDebouncedValue} from "../../hooks/useDebouncedValue.ts";
import {BATTLE_HTTP_URL} from "./constants.ts";
import {toBattleTeam} from "./toBattleTeam.ts";

export interface TeamValidation {
    valid: boolean;
    problems: string[];
}

const VALIDATE_DEBOUNCE_MS = 600;

// Asks the battle server whether a team would be accepted - the same conversion
// and Showdown validation creating a room runs - so problems show while the
// team is being built, not when a battle is created. Debounced, so a burst of
// edits is one request, and the previous answer stays up until the next lands.
export function useTeamValidation(
    members: PokemonTeamMember[],
    versionGroup: VersionGroup | null,
    candidates: TeamCandidateSummary[],
) {
    const payload = useMemo(
        () => members.length === 0 ? null : {versionGroup, team: toBattleTeam(members, candidates)},
        [members, versionGroup, candidates],
    );
    const debounced = useDebouncedValue(payload, VALIDATE_DEBOUNCE_MS);

    return useQuery({
        queryKey: ['team-validation', JSON.stringify(debounced)],
        queryFn: async ({signal}): Promise<TeamValidation> => {
            const response = await fetch(`${BATTLE_HTTP_URL}/validate`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(debounced),
                signal,
            });
            if (!response.ok) throw new Error(`Validation failed with status ${response.status}`);
            const body = await response.json() as TeamValidation;
            return {valid: body.valid, problems: body.problems};
        },
        enabled: !!debounced,
        staleTime: 60_000,
        retry: false,
        placeholderData: keepPreviousData,
    });
}
