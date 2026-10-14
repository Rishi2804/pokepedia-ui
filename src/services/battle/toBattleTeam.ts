import type {PokemonTeamMember} from "../../global/types.ts";
import type {BattleTeamMember} from "./protocol.ts";

// A plain field pick - the battle server owns everything Showdown-specific
// (species/forme resolution, EV/IV scale, default abilities, Hidden Power...),
// so nothing here converts units or looks up Showdown names.
export function toBattleTeam(members: PokemonTeamMember[]): BattleTeamMember[] {
    return members.map(member => ({
        pokemonId: member.id,
        slug: member.slug,
        nickname: member.nickname,
        shiny: member.shiny,
        gender: member.gender,
        ability: member.ability?.name ?? null,
        moves: member.moves.filter(move => move !== null).map(move => move.name),
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
