import type {QueryClient} from "@tanstack/react-query";
import {resolveBattleOnlyBase} from "../../../global/data/showdownSpecies.ts";
import type {VersionGroup} from "../../../global/enums.ts";
import type {HoldableItem, PokemonTeamMember, TeamCandidateSummary} from "../../../global/types.ts";
import {teamCandidateQuery} from "../../../services/api/hooks/useTeamCandidateData.ts";
import {holdableItemsQuery} from "../../../services/api/hooks/useHoldableItems.ts";
import type {GenRules} from "../genRules.ts";
import {battleFormatKeyFor} from "./battleFormat.ts";
import {importSet, parseSpeciesName, resolveSpecies, splitTeamText} from "./showdownText.ts";

interface ImportTeamArgs {
    text: string;
    allCandidates: TeamCandidateSummary[];
    versionGroup: VersionGroup | null;
    versionSlug: string;
    rules: GenRules;
    queryClient: QueryClient;
}

// Imports a pasted Showdown team (up to 6 sets) into team members. Shared by
// the Team Builder's import panel and the Battle page's paste tab so both
// treat battle-only formes (Mega/Gmax/Crowned/...) the same way.
export async function importTeamText({text, allCandidates, versionGroup, versionSlug, rules, queryClient}: ImportTeamArgs):
    Promise<{ members: PokemonTeamMember[]; errors: string[] }> {
    const blocks = splitTeamText(text).slice(0, 6);
    const errors: string[] = [];
    const members: PokemonTeamMember[] = [];

    // The items this team's format allows; a set naming any other item reports
    // it instead of silently dropping it.
    let items: HoldableItem[] = [];
    if (rules.items) {
        try {
            items = await queryClient.fetchQuery(holdableItemsQuery(battleFormatKeyFor(versionGroup)));
        } catch {
            errors.push("Couldn't load the item list, so held items were skipped.");
        }
    }

    for (const block of blocks) {
        const speciesName = parseSpeciesName(block);
        const pickedCandidate = resolveSpecies(speciesName, allCandidates);
        const battleOnly = resolveBattleOnlyBase(speciesName, allCandidates);
        const resolved = battleOnly?.candidate ?? pickedCandidate;
        if (!resolved) {
            errors.push(`"${speciesName}" isn't available in this version group.`);
            continue;
        }
        try {
            // Fetched against the base species so importSet resolves
            // ability/moves against its real pool (Mega Emboar's own
            // ability list is just "Mold Breaker", never something a
            // player actually picks - see the battle server's teamConvert.ts).
            // The roster keeps showing whatever forme was pasted, so the
            // identity fields get restored to it afterward.
            const detail = await queryClient.fetchQuery(teamCandidateQuery(versionSlug, resolved.id));
            const {member, errors: setErrors} = importSet(block, detail, versionGroup, rules, items);
            errors.push(...setErrors);
            if (member && battleOnly) {
                if (pickedCandidate) {
                    member.id = pickedCandidate.id;
                    member.slug = pickedCandidate.slug;
                    member.name = pickedCandidate.name;
                    member.type1 = pickedCandidate.type1;
                    member.type2 = pickedCandidate.type2;
                    member.gen = pickedCandidate.gen;
                }
                if (battleOnly.requiredItem) {
                    if (member.item && member.item !== battleOnly.requiredItem.slug) {
                        errors.push(`${speciesName} transforms in-battle with ${battleOnly.requiredItem.name}, please fix its item.`);
                    }
                    member.item = battleOnly.requiredItem.slug;
                }
                if (battleOnly.gigantamax) member.gigantamax = true;
            }
            if (member) members.push(member);
        } catch {
            errors.push(`Couldn't load data for ${resolved.name}.`);
        }
    }

    return {members, errors};
}
