import {PokemonTeamMember, TeamCandidateSummary} from "../types.ts";
import {toShowdownId} from "../utils.ts";

// Everything here runs on the Showdown data the API sends with each candidate
// (showdownId, showdownName, battleOnly), which the scraper joins from
// Showdown's own dex. It used to be a 46-entry override table and a
// 163-entry battle-only table kept by hand in this file and again in the
// battle server.

// The name a real Showdown client expects for this team member, for export.
// A member from before candidates carried it (or whose candidate isn't loaded)
// falls back to title-casing its slug's segments, which is right for all but
// the few formes Showdown names differently.
export function showdownNameFor(member: PokemonTeamMember, candidates: TeamCandidateSummary[]): string {
    const candidate = candidates.find(c => c.id === member.id);
    if (candidate) return candidate.showdownName;
    if (!member.slug) return member.name;
    return member.slug.split('-').map(seg => seg.charAt(0).toUpperCase() + seg.slice(1)).join('-');
}

// For import: toID the pasted species name and match it against each
// candidate's Showdown id. Showdown ids are unique, so there is nothing to
// disambiguate (our "maushold" and "maushold-family-of-three" are "maushold"
// and "mausholdfour").
export function resolveSlugFromShowdownName(name: string, candidates: TeamCandidateSummary[]): TeamCandidateSummary | undefined {
    const target = toShowdownId(name);
    return candidates.find(c => c.showdownId === target);
}

/**
 * A "battle-only" forme (Mega/Primal/Crowned/Zen/... - anything
 * sim/team-validator.ts would refuse to accept as a submitted species) can
 * never legally be a team's species; only its base species + the right item
 * can. Resolves a candidate's own slug (add-from-picker) or a raw pasted
 * Showdown name (import) to {the base candidate to actually submit, the item
 * that reaching this forme requires - if any, whether it's a Gmax forme}.
 * Returns undefined for any ordinary, always-selectable forme (Rotom-Wash,
 * Raichu-Alola, ...), and for a forme that isn't among the candidates, which
 * means the game it was pasted into doesn't have it.
 *
 * Two species (Necrozma-Ultra, Zygarde-Complete/-Mega) have more than one
 * legal base forme, disambiguated in a real battle by which move is chosen -
 * the API reports the first as the default; picking the other variant means
 * picking that candidate directly instead.
 */
export function resolveBattleOnlyBase(
    nameOrSlug: string,
    candidates: TeamCandidateSummary[]
): { candidate: TeamCandidateSummary; requiredItem?: { slug: string; name: string }; gigantamax?: true } | undefined {
    // A slug (add-from-picker, saved members) is matched as-is first: not every
    // slug normalises onto its Showdown id ("meowstic-female-mega" is
    // "meowsticfmega"). A pasted name only has its Showdown id to go on.
    const forme = candidates.find(c => c.slug === nameOrSlug)
        ?? candidates.find(c => c.showdownId === toShowdownId(nameOrSlug));
    const battleOnly = forme?.battleOnly;
    if (!battleOnly || battleOnly.baseId === null) return undefined;
    const base = candidates.find(c => c.id === battleOnly.baseId);
    if (!base) return undefined;
    return {
        candidate: base,
        requiredItem: battleOnly.requiredItem
            ? {slug: battleOnly.requiredItem.showdownId, name: battleOnly.requiredItem.name}
            : undefined,
        gigantamax: battleOnly.gigantamax ? true : undefined,
    };
}
