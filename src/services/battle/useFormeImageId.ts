import {useMemo} from "react";
import {showdownIdFromSlug, toShowdownId} from "../../global/data/showdownSpecies.ts";
import {useTeamCandidatesDetails} from "../api/hooks/useTeamCandidatesData.ts";

export type FormeImageIdResolver = (speciesForme: string, fallback: number | null) => number | null;

// Bench icons stay HOME renders (PokemonImg by numeric id), but a team's saved
// roster only has art for the species it was built with - Mega Evolution and
// other mid-battle forme changes have no entry. The national team-candidates
// list already has every forme's own HOME id (each is its own `pokemon` row -
// see toShowdownTeam.ts's toVisualMeta doc comment for why the same problem
// exists there), so this just joins the wire's speciesForme against it on
// Showdown's own id space. Falls back to the caller's id (typically the
// battle server's own dex-number-based guess) while the list is loading or
// for a forme this resolves to nothing for.
export function useFormeImageId(): FormeImageIdResolver {
    const {data} = useTeamCandidatesDetails('national');

    const byShowdownId = useMemo(() => {
        const map = new Map<string, number>();
        for (const group of data ?? []) {
            for (const candidate of group.pokemon) {
                map.set(showdownIdFromSlug(candidate.slug), candidate.id);
            }
        }
        return map;
    }, [data]);

    return (speciesForme, fallback) => byShowdownId.get(toShowdownId(speciesForme)) ?? fallback;
}
