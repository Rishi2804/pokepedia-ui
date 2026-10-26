import type {PokemonTeamMember, TeamCandidateSummary} from "../../global/types.ts";
import {toShowdownId} from "../../global/utils.ts";
import type {BattleTeamMember} from "./protocol.ts";

// A field pick that identifies everything by what the PokePedia API sends with
// it - the battle server owns everything else Showdown-specific (forme
// resolution, EV/IV scale, default abilities, Hidden Power...), so nothing here
// converts units or guesses a Showdown name from a slug.
//
// The species' Showdown id comes from the candidate list, not the member, so a
// team saved before the API sent ids still battles. Moves and abilities carry
// their id from when they were picked; an older team falls back to the name,
// which Showdown resolves for all but a few (both "As One" abilities).
export function toBattleTeam(members: PokemonTeamMember[], candidates: TeamCandidateSummary[]): BattleTeamMember[] {
    return members.map(member => ({
        pokemonId: member.id,
        slug: member.slug,
        showdownId: candidates.find(c => c.id === member.id)?.showdownId ?? toShowdownId(member.slug),
        nickname: member.nickname,
        shiny: member.shiny,
        gender: member.gender,
        ability: member.ability?.showdownId ?? member.ability?.name ?? null,
        moves: member.moves.filter(move => move !== null).map(move => move.showdownId ?? move.name),
        level: member.level,
        nature: member.nature,
        item: member.item,
        evs: member.evs,
        ivs: member.ivs,
        happiness: member.happiness,
        teraType: member.teraType ?? null,
        dynamaxLevel: member.dynamaxLevel,
        gigantamax: member.gigantamax,
    }));
}
